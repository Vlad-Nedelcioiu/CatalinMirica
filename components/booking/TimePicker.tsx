"use client";

import { Clock } from "lucide-react";
import { QUICK_TIMES } from "@/lib/content";
import { controlClasses } from "@/components/ui/Field";
import { cn, formatTime } from "@/lib/utils";

export function TimePicker({
  date,
  value,
  onChange,
}: {
  date: string | null;
  value: string | null;
  onChange: (time: string) => void;
}) {
  if (!date) {
    return (
      <div className="flex h-full min-h-32 items-center justify-center rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">
        Select a date first, then choose a start time.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <label htmlFor="b-time" className="flex items-center gap-2 text-sm font-medium text-ink">
        <Clock className="h-4 w-4 text-brass" />
        Start time
      </label>

      <input
        id="b-time"
        type="time"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={cn(controlClasses, "mt-3")}
      />

      {/* Quick picks */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_TIMES.map((t) => {
          const active = value === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-ink hover:border-ink/50",
              )}
            >
              {formatTime(t)}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        {value ? (
          <>
            Start time set to <span className="font-medium text-ink">{formatTime(value)}</span>. This
            just helps the studio plan arrival.
          </>
        ) : (
          "Pick roughly when your event starts — this only helps the studio plan when to arrive."
        )}
      </p>
    </div>
  );
}
