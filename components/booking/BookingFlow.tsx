"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { EVENT_TYPES, PACKAGES, TIME_SLOTS } from "@/lib/content";
import { cn, formatLongDate, formatPrice } from "@/lib/utils";
import { Calendar } from "./Calendar";
import { TimeSlots } from "./TimeSlots";
import { PackagePicker } from "./PackagePicker";
import { BookingForm, type BookingDetails } from "./BookingForm";
import { Confirmation, type ConfirmedBooking } from "./Confirmation";

type Booked = { date: string; slot: string };

const STEPS = ["Package", "Date & time", "Your details", "Review"];
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const initialDetails: BookingDetails = {
  eventType: EVENT_TYPES[0],
  name: "",
  email: "",
  phone: "",
  location: "",
  guests: "",
  message: "",
};

export function BookingFlow() {
  const [booked, setBooked] = useState<Booked[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(true);

  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  const [packageId, setPackageId] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [details, setDetails] = useState<BookingDetails>(initialDetails);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  async function loadAvailability() {
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();
      setBooked(data.booked ?? []);
    } catch {
      /* availability is best-effort; the server still guards on submit */
    } finally {
      setLoadingAvail(false);
    }
  }

  useEffect(() => {
    loadAvailability();
  }, []);

  // Gently scroll the flow into view when changing steps (but not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const pkg = useMemo(() => PACKAGES.find((p) => p.id === packageId), [packageId]);
  const slotInfo = useMemo(() => TIME_SLOTS.find((s) => s.id === slot), [slot]);

  const canContinue = (() => {
    if (step === 0) return Boolean(packageId);
    if (step === 1) return Boolean(date && slot);
    if (step === 2)
      return (
        details.name.trim().length > 0 &&
        isEmail(details.email) &&
        details.phone.trim().length > 0 &&
        details.location.trim().length > 0
      );
    return true;
  })();

  function goTo(next: number) {
    setStep(next);
    setMaxStep((m) => Math.max(m, next));
  }

  function handleContinue() {
    if (!canContinue) return;
    if (step < STEPS.length - 1) goTo(step + 1);
    else submit();
  }

  function selectDate(iso: string) {
    setDate(iso);
    setSlot(null);
  }

  function updateDetail(key: keyof BookingDetails, value: string) {
    setDetails((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const { [key]: _omit, ...rest } = e;
      return rest;
    });
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          date,
          slot,
          eventType: details.eventType,
          name: details.name.trim(),
          email: details.email.trim(),
          phone: details.phone.trim(),
          location: details.location.trim(),
          guests: details.guests ? Number(details.guests) : undefined,
          message: details.message.trim() || undefined,
        }),
      });

      if (res.status === 201) {
        setConfirmed({
          id: (await res.json()).booking.id,
          packageId,
          eventType: details.eventType,
          date: date!,
          slot: slot!,
          name: details.name.trim(),
          email: details.email.trim(),
          location: details.location.trim(),
        });
        return;
      }
      if (res.status === 409) {
        setSubmitError("That time was just booked by someone else. Please pick another slot.");
        await loadAvailability();
        setSlot(null);
        goTo(1);
        return;
      }
      if (res.status === 422) {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors ?? {});
        setSubmitError("Please check the highlighted fields.");
        setStep(2);
        return;
      }
      setSubmitError("Something went wrong saving your booking. Please try again.");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) return <Confirmation booking={confirmed} />;

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Stepper */}
      <ol className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 sm:gap-3">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          const reachable = i <= maxStep;
          return (
            <li key={label} className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && setStep(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  current
                    ? "border-ink bg-ink text-cream"
                    : done
                      ? "border-brass/40 bg-brass/10 text-brass"
                      : "border-line text-muted",
                  reachable && !current && "hover:border-ink/40",
                )}
              >
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-full text-xs",
                    current ? "bg-cream text-ink" : done ? "bg-brass text-white" : "bg-sand text-muted",
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className="hidden font-medium sm:inline">{label}</span>
              </button>
              {i < STEPS.length - 1 ? <span className="h-px w-4 bg-line sm:w-8" /> : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Step content */}
        <div>
          {step === 0 ? (
            <PackagePicker selected={packageId} onSelect={setPackageId} />
          ) : null}

          {step === 1 ? (
            loadingAvail ? (
              <div className="flex min-h-72 items-center justify-center rounded-2xl border border-line bg-paper text-sm text-muted">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading live availability…
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                <Calendar booked={booked} selected={date} onSelect={selectDate} />
                <div>
                  <h3 className="mb-3 font-display text-lg">
                    {date ? formatLongDate(date) : "Choose a date"}
                  </h3>
                  <TimeSlots date={date} booked={booked} selected={slot} onSelect={setSlot} />
                </div>
              </div>
            )
          ) : null}

          {step === 2 ? (
            <BookingForm values={details} errors={errors} onChange={updateDetail} />
          ) : null}

          {step === 3 ? (
            <ReviewCard
              pkgName={pkg ? `${pkg.name} · ${formatPrice(pkg.price)}` : "—"}
              dateLabel={date ? formatLongDate(date) : "—"}
              slotLabel={slotInfo ? `${slotInfo.label} (${slotInfo.time})` : "—"}
              details={details}
              onEdit={(s) => setStep(s)}
            />
          ) : null}

          {submitError ? (
            <p className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </p>
          ) : null}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || submitting}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-cream shadow-card transition-all hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
                </>
              ) : step === STEPS.length - 1 ? (
                <>
                  Confirm booking
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary aside */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-2xl border border-line bg-paper p-6">
            <p className="eyebrow mb-4">Your booking</p>
            <SummaryRow label="Package" value={pkg?.name ?? "Not selected"} muted={!pkg} />
            <SummaryRow
              label="Investment"
              value={pkg ? `${formatPrice(pkg.price)} starting` : "—"}
              muted={!pkg}
            />
            <SummaryRow label="Date" value={date ? formatLongDate(date) : "—"} muted={!date} />
            <SummaryRow
              label="Time"
              value={slotInfo ? slotInfo.label : "—"}
              muted={!slotInfo}
            />
            <SummaryRow label="Event" value={details.eventType} />

            <div className="mt-5 rounded-xl bg-sand/50 p-4 text-xs leading-relaxed text-ink-soft">
              Submitting places a <span className="font-semibold text-ink">soft hold</span> on
              your date. No payment is taken until your quote and agreement are signed.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <span className="text-xs uppercase tracking-[0.14em] text-muted">{label}</span>
      <span className={cn("text-right text-sm font-medium", muted ? "text-muted" : "text-ink")}>
        {value}
      </span>
    </div>
  );
}

function ReviewCard({
  pkgName,
  dateLabel,
  slotLabel,
  details,
  onEdit,
}: {
  pkgName: string;
  dateLabel: string;
  slotLabel: string;
  details: BookingDetails;
  onEdit: (step: number) => void;
}) {
  const sections: { title: string; step: number; rows: [string, string][] }[] = [
    { title: "Package", step: 0, rows: [["Package", pkgName]] },
    {
      title: "Date & time",
      step: 1,
      rows: [
        ["Date", dateLabel],
        ["Start time", slotLabel],
      ],
    },
    {
      title: "Details",
      step: 2,
      rows: [
        ["Event", details.eventType],
        ["Name", details.name],
        ["Email", details.email],
        ["Phone", details.phone],
        ["Location", details.location],
        ...(details.guests ? ([["Guests", details.guests]] as [string, string][]) : []),
        ...(details.message ? ([["Notes", details.message]] as [string, string][]) : []),
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((sec) => (
        <div key={sec.title} className="rounded-2xl border border-line bg-paper p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg">{sec.title}</h3>
            <button
              type="button"
              onClick={() => onEdit(sec.step)}
              className="link-underline text-sm font-medium text-brass"
            >
              Edit
            </button>
          </div>
          <dl className="mt-4 space-y-2.5">
            {sec.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 text-sm">
                <dt className="shrink-0 text-muted">{k}</dt>
                <dd className="text-right font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
