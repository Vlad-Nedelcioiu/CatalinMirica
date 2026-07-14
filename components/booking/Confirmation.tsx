"use client";

import Link from "next/link";
import { CalendarCheck, Check, Mail } from "lucide-react";
import { PACKAGES } from "@/lib/content";
import { buttonClasses } from "@/components/ui/Button";
import { cn, formatLongDate, formatPrice, formatTime } from "@/lib/utils";

export type ConfirmedBooking = {
  id: string;
  packageId: string;
  eventType: string;
  date: string;
  time: string;
  name: string;
  email: string;
  location: string;
};

export function Confirmation({ booking }: { booking: ConfirmedBooking }) {
  const pkg = PACKAGES.find((p) => p.id === booking.packageId);
  const ref = booking.id.slice(0, 8).toUpperCase();

  const rows = [
    { label: "Event", value: booking.eventType },
    { label: "Package", value: pkg ? `${pkg.name} · ${formatPrice(pkg.price)}` : "—" },
    { label: "Date", value: formatLongDate(booking.date) },
    { label: "Start time", value: formatTime(booking.time) },
    { label: "Location", value: booking.location },
  ];

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brass/10 text-brass">
        <Check className="h-8 w-8" />
      </span>
      <h2 className="mt-6 font-display text-3xl sm:text-4xl">
        You&apos;re on the calendar, {booking.name.split(" ")[0]}.
      </h2>
      <p className="mt-3 text-ink-soft">
        We&apos;ve placed a soft hold on your date. A confirmation is on its way to{" "}
        <span className="text-ink">{booking.email}</span>.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-paper p-6 text-left sm:p-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="flex items-center gap-2 font-display text-lg">
            <CalendarCheck className="h-5 w-5 text-brass" />
            Booking summary
          </span>
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium tracking-wide text-ink-soft">
            Ref {ref}
          </span>
        </div>
        <dl className="mt-4 space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 text-sm">
              <dt className="text-muted">{r.label}</dt>
              <dd className="text-right font-medium text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-sand/40 p-5 text-left text-sm text-ink-soft">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
        <p>
          <span className="font-semibold text-ink">What&apos;s next:</span> we&apos;ll review the
          details and send a tailored quote and agreement within one business day. You&apos;re not
          charged until everything is signed.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClasses({})}>
          Back to home
        </Link>
        <Link href="/portfolio" className={cn(buttonClasses({ variant: "outline" }))}>
          Explore the portfolio
        </Link>
      </div>
    </div>
  );
}
