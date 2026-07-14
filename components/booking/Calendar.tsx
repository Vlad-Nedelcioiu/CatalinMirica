"use client";

import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({
  bookedDates,
  selected,
  onSelect,
}: {
  bookedDates: string[];
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  const today = startOfToday();
  const [month, setMonth] = useState(() => startOfMonth(today));

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  const takenDates = new Set(bookedDates);
  const canGoPrev = !isSameMonth(month, today);

  return (
    <div className="rounded-2xl border border-line bg-paper p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl">{format(month, "MMMM yyyy")}</h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => canGoPrev && setMonth(subMonths(month, 1))}
            disabled={!canGoPrev}
            aria-label="Previous month"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMonth(addMonths(month, 1))}
            aria-label="Next month"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-xs font-semibold uppercase tracking-wide text-muted">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const iso = format(day, "yyyy-MM-dd");
          const inMonth = isSameMonth(day, month);
          const past = isBefore(day, today);
          const full = takenDates.has(iso);
          const isSelected = selected === iso;
          const disabled = !inMonth || past || full;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-pressed={isSelected}
              className={cn(
                "relative grid aspect-square place-items-center rounded-lg text-sm transition-colors",
                !inMonth && "opacity-0 pointer-events-none",
                inMonth && past && "cursor-not-allowed text-muted/40",
                inMonth && full && "cursor-not-allowed text-muted/40 line-through",
                inMonth && !disabled && "text-ink hover:bg-sand",
                isToday(day) && !isSelected && !disabled && "ring-1 ring-brass/50",
                isSelected && "bg-ink text-cream hover:bg-ink",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-muted/50 line-through">00</span> Booked / unavailable
        </span>
      </div>
    </div>
  );
}
