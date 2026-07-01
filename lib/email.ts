import { Resend } from "resend";

const FROM = "Timeless Visuals <onboarding@resend.dev>";

/** Escape user-supplied text before interpolating it into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type EmailArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Send an email if Resend is configured. Best-effort by design: never throws,
 * so a mail failure can't break the request that already persisted the data.
 * Returns true only when Resend accepted the message.
 */
export async function sendEmail({ to, subject, html, replyTo }: EmailArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from: FROM, to, subject, html, replyTo });
    if (error) {
      console.error("Email send failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email send threw:", err);
    return false;
  }
}
