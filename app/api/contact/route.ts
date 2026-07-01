import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addMessage, getMessages, isAdminAuthorized } from "@/lib/store";

export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = request.headers.get("x-admin-token") ?? url.searchParams.get("token");
  if (!isAdminAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const messages = await getMessages();
  return NextResponse.json({ messages: [...messages].reverse() });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const phone = body.phone ? String(body.phone).trim() : undefined;
  const subject = body.subject ? String(body.subject).trim() : undefined;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10) errors.message = "A little more detail helps (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const saved = await addMessage({ name, email, message, phone, subject });

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (apiKey && toEmail) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Timeless Visuals <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New contact: ${subject ?? `message from ${name}`}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });
  }

  return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
}
