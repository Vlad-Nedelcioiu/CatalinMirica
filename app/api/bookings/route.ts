import { NextResponse } from "next/server";
import {
  addBooking,
  getBookings,
  getBookedSlots,
  isAdminAuthorized,
  SlotTakenError,
} from "@/lib/store";
import { EVENT_TYPES, PACKAGES, TIME_SLOTS } from "@/lib/content";

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

  try {
    const booking = await addBooking({
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
    return NextResponse.json(
      { ok: true, booking: { id: booking.id, date: booking.date, slot: booking.slot } },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return NextResponse.json({ error: err.message, code: "SLOT_TAKEN" }, { status: 409 });
    }
    return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
  }
}
