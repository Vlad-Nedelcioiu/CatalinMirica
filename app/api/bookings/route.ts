import { NextResponse } from "next/server";
import { escapeHtml, sendEmail } from "@/lib/email";
import {
  addBooking,
  getBookings,
  getBookedSlots,
  isAdminAuthorized,
  SlotTakenError,
  type Booking,
} from "@/lib/store";
import { EVENT_TYPES, PACKAGES, SITE, TIME_SLOTS } from "@/lib/content";

export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.searchParams.get("scope") === "admin") {
    const token = request.headers.get("x-admin-token") ?? url.searchParams.get("token");
    if (!isAdminAuthorized(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bookings = await getBookings();
    return NextResponse.json({ bookings: [...bookings].reverse() });
  }

  // Public availability — only the taken date+slot pairs, no personal data.
  const booked = await getBookedSlots();
  return NextResponse.json({ booked, slots: TIME_SLOTS });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const packageId = String(body.packageId ?? "");
  const eventType = String(body.eventType ?? "");
  const date = String(body.date ?? "");
  const slot = String(body.slot ?? "");
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const location = String(body.location ?? "").trim();
  const guests = body.guests ? Number(body.guests) : undefined;
  const message = body.message ? String(body.message).trim() : undefined;

  const errors: Record<string, string> = {};
  if (!PACKAGES.some((p) => p.id === packageId)) errors.packageId = "Choose a package.";
  if (!(EVENT_TYPES as readonly string[]).includes(eventType))
    errors.eventType = "Choose an event type.";
  if (!isDate(date)) errors.date = "Pick a valid date.";
  else if (date < todayISO()) errors.date = "Pick a date in the future.";
  if (!TIME_SLOTS.some((s) => s.id === slot)) errors.slot = "Pick a time slot.";
  if (!name) errors.name = "Your name is required.";
  if (!isEmail(email)) errors.email = "Enter a valid email.";
  if (!phone) errors.phone = "A phone number helps us confirm.";
  if (!location) errors.location = "Where is the event?";
  if (guests !== undefined && (Number.isNaN(guests) || guests < 0))
    errors.guests = "Enter a valid guest count.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  let booking: Booking;
  try {
    booking = await addBooking({
      packageId,
      eventType,
      date,
      slot,
      name,
      email,
      phone,
      location,
      guests,
      message,
    });
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return NextResponse.json({ error: err.message, code: "SLOT_TAKEN" }, { status: 409 });
    }
    return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
  }

  // Best-effort notifications — sendEmail never throws, so a mail failure
  // (or Resend rejecting the customer address in test mode) can't turn a
  // successfully-saved booking into an error response.
  const toEmail = process.env.CONTACT_EMAIL;
  if (toEmail) {
    const pkg = PACKAGES.find((p) => p.id === packageId)!;
    const timeSlot = TIME_SLOTS.find((s) => s.id === slot)!;
    const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const priceLabel = `${pkg.name} — $${pkg.price.toLocaleString()}`;

    await Promise.all([
      // Email to studio owner
      sendEmail({
        to: toEmail,
        replyTo: email,
        subject: `New booking request — ${name} · ${formattedDate}`,
        html: `
            <h2>New booking request</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px">
              <tr><td style="padding:6px 0;color:#888;width:140px">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
              <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:6px 0;color:#888">Phone</td><td>${escapeHtml(phone)}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Event type</td><td>${escapeHtml(eventType)}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Date</td><td>${formattedDate}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Time slot</td><td>${timeSlot.label} (${timeSlot.time})</td></tr>
              <tr><td style="padding:6px 0;color:#888">Location</td><td>${escapeHtml(location)}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Package</td><td>${priceLabel}</td></tr>
              ${guests !== undefined ? `<tr><td style="padding:6px 0;color:#888">Guests</td><td>${guests}</td></tr>` : ""}
              ${message ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top">Notes</td><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr>` : ""}
            </table>
            <p style="margin-top:24px;color:#888;font-size:13px">Booking ID: ${booking.id}</p>
          `,
      }),
      // Confirmation email to customer
      sendEmail({
        to: email,
        subject: `We received your booking request — ${SITE.name}`,
        html: `
            <h2>Thanks, ${escapeHtml(name)}!</h2>
            <p>We've received your booking request and will confirm everything within one business day.</p>
            <h3 style="margin-top:24px">Your request summary</h3>
            <table style="border-collapse:collapse;width:100%;max-width:500px">
              <tr><td style="padding:6px 0;color:#888;width:140px">Date</td><td><strong>${formattedDate}</strong></td></tr>
              <tr><td style="padding:6px 0;color:#888">Time slot</td><td>${timeSlot.label} (${timeSlot.time})</td></tr>
              <tr><td style="padding:6px 0;color:#888">Event type</td><td>${escapeHtml(eventType)}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Location</td><td>${escapeHtml(location)}</td></tr>
              <tr><td style="padding:6px 0;color:#888">Package</td><td>${priceLabel}</td></tr>
            </table>
            <p style="margin-top:24px">In the meantime, feel free to reply to this email with any questions.</p>
            <p>— The ${SITE.name} team</p>
            <p style="margin-top:32px;color:#888;font-size:12px">${SITE.address} · ${SITE.phone}</p>
          `,
      }),
    ]);
  }

  return NextResponse.json(
    { ok: true, booking: { id: booking.id, date: booking.date, slot: booking.slot } },
    { status: 201 },
  );
}
