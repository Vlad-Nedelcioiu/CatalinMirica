"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Field, controlClasses } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const interests = [
  "General enquiry",
  "Wedding",
  "Event / concert",
  "Corporate",
  "Portrait session",
];

const initial = { name: "", email: "", phone: "", subject: interests[0], message: "" };
type FormState = typeof initial;
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 201) {
        setStatus("success");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (data?.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-3xl border border-line bg-paper p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brass/10 text-brass">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl">Message received</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thank you, {form.name.split(" ")[0] || "friend"} — we&apos;ll get back to you within
          one business day. Keep an eye on your inbox.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setStatus("idle");
          }}
          className="link-underline mt-6 text-sm font-medium text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={update("name")}
            placeholder="Jamie Rivera"
            className={controlClasses}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@email.com"
            className={controlClasses}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" hint="Optional">
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+1 (___) ___-____"
            className={controlClasses}
            autoComplete="tel"
          />
        </Field>
        <Field label="I'm interested in" htmlFor="subject">
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={update("subject")}
            className={controlClasses}
          >
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tell us about your event" htmlFor="message" required error={errors.message}>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={update("message")}
            rows={5}
            placeholder="Date, location, what you're celebrating, and anything you're dreaming of…"
            className={cn(controlClasses, "resize-y")}
          />
        </Field>
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium text-cream shadow-card transition-all duration-300 hover:bg-ink/90 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
