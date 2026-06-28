"use client";

import { EVENT_TYPES } from "@/lib/content";
import { Field, controlClasses } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export type BookingDetails = {
  eventType: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  guests: string;
  message: string;
};

export function BookingForm({
  values,
  errors,
  onChange,
}: {
  values: BookingDetails;
  errors: Record<string, string>;
  onChange: (key: keyof BookingDetails, value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="b-name" required error={errors.name}>
          <input
            id="b-name"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Jamie Rivera"
            className={controlClasses}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" htmlFor="b-email" required error={errors.email}>
          <input
            id="b-email"
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@email.com"
            className={controlClasses}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone" htmlFor="b-phone" required error={errors.phone}>
          <input
            id="b-phone"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (___) ___-____"
            className={controlClasses}
            autoComplete="tel"
          />
        </Field>
        <Field label="Event location" htmlFor="b-location" required error={errors.location}>
          <input
            id="b-location"
            value={values.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="Venue, city"
            className={controlClasses}
          />
        </Field>
        <Field label="Event type" htmlFor="b-eventType">
          <select
            id="b-eventType"
            value={values.eventType}
            onChange={(e) => onChange("eventType", e.target.value)}
            className={controlClasses}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Approx. guests" htmlFor="b-guests" hint="Optional" error={errors.guests}>
          <input
            id="b-guests"
            type="number"
            min={0}
            value={values.guests}
            onChange={(e) => onChange("guests", e.target.value)}
            placeholder="120"
            className={controlClasses}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Anything else we should know?" htmlFor="b-message" hint="Optional">
          <textarea
            id="b-message"
            value={values.message}
            onChange={(e) => onChange("message", e.target.value)}
            rows={4}
            placeholder="Timeline, must-have shots, the vibe you're going for…"
            className={cn(controlClasses, "resize-y")}
          />
        </Field>
      </div>
    </div>
  );
}
