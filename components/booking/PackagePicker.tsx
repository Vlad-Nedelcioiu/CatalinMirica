"use client";

import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { cn, formatPrice } from "@/lib/utils";

export function PackagePicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PACKAGES.map((p) => {
        const active = selected === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            aria-pressed={active}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-paper p-6 text-left transition-all duration-300",
              active
                ? "border-ink shadow-card ring-1 ring-ink"
                : p.popular
                  ? "border-brass/40 hover:border-brass"
                  : "border-line hover:border-ink/40",
            )}
          >
            {p.popular ? (
              <Badge tone="brass" className="absolute -top-3 right-5">
                Most popular
              </Badge>
            ) : null}

            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl">{p.name}</h3>
              <span
                className={cn(
                  "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                  active ? "border-ink bg-ink text-cream" : "border-line",
                )}
              >
                {active ? <Check className="h-3.5 w-3.5" /> : null}
              </span>
            </div>

            <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="font-display text-3xl">{formatPrice(p.price)}</span>
              <span className="text-xs text-muted">starting</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{p.duration}</p>

            <ul className="mt-5 space-y-2 border-t border-line pt-5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
