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
import { TIME_SLOTS } from "@/lib/content";
import { cn } from "@/lib/utils";

type Booked = { date: string; slot: string };

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({
  booked,
  selected,
  onSelect,
}: {
  booked: Booked[];
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  const today = startOfToday();
  const [month, setMonth] = useState(() => startOfMonth(today));

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  const slotCount = TIME_SLOTS.length;
  const takenForDay = (iso: string) => booked.filter((b) => b.date === iso).length;
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
          const taken = takenForDay(iso);
          const full = taken >= slotCount;
          const partial = taken > 0 && !full;
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
              {partial && !isSelected ? (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-brass" />
              ) : null}
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
          <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Limited slots
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-muted/50 line-through">00</span> Fully booked
        </span>
      </div>
    </div>
  );
}
