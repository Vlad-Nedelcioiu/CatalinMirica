"use client";

import { Clock } from "lucide-react";
import { TIME_SLOTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TimeSlots({
  date,
  booked,
  selected,
  onSelect,
}: {
  date: string | null;
  booked: { date: string; slot: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  if (!date) {
    return (
      <div className="flex h-full min-h-32 items-center justify-center rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">
        Select a date to see available start times.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {TIME_SLOTS.map((s) => {
        const taken = booked.some((b) => b.date === date && b.slot === s.id);
        const active = selected === s.id;
        return (
          <button
            key={s.id}
            type="button"
            disabled={taken}
            onClick={() => onSelect(s.id)}
            aria-pressed={active}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
              taken
                ? "cursor-not-allowed border-line bg-sand/40 text-muted"
                : active
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-paper text-ink hover:border-ink/50",
            )}
          >
            <span className="flex items-center gap-2.5">
              <Clock className={cn("h-4 w-4", active ? "text-cream" : "text-brass")} />
              <span className="font-medium">{s.label}</span>
            </span>
            <span className={cn("text-sm", active ? "text-cream/80" : "text-muted")}>
              {taken ? "Booked" : s.time}
            </span>
          </button>
        );
      })}
    </div>
  );
}
