"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/site/Container";
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  type PortfolioItem,
} from "@/lib/content";
import { Lightbox } from "./Lightbox";
import { cn, unsplash } from "@/lib/utils";

const filters = ["All", ...PORTFOLIO_CATEGORIES] as const;
type Filter = (typeof filters)[number];

function aspectFor(span?: "tall" | "wide") {
  if (span === "tall") return "aspect-[3/4]";
  if (span === "wide") return "aspect-[4/3]";
  return "aspect-square";
}

export function Gallery({ initialItemId }: { initialItemId?: string }) {
  const [filter, setFilter] = useState<Filter>("All");
  // Deep links (e.g. /portfolio?item=w4 from a featured card) open the
  // lightbox straight onto that story; the filter starts at "All" so the
  // index lines up with the unfiltered list.
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(() => {
    if (!initialItemId) return null;
    const i = PORTFOLIO.findIndex((p) => p.id === initialItemId);
    return i === -1 ? null : i;
  });

  const items = useMemo<PortfolioItem[]>(
    () => (filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter],
  );

  const navigate = (dir: number) =>
    setLightboxIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));

  return (
    <Container>
      {/* Filters */}
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {filters.map((f) => {
          const count = f === "All" ? PORTFOLIO.length : PORTFOLIO.filter((p) => p.category === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setLightboxIndex(null);
              }}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-paper text-ink-soft hover:border-ink/40 hover:text-ink",
              )}
            >
              {f}
              <span className={cn("ml-2 text-xs", active ? "text-cream/60" : "text-muted")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
            aria-label={`Open ${item.title}`}
          >
            <div className={cn("relative w-full", aspectFor(item.span))}>
              <Image
                src={unsplash(item.photo, 800)}
                alt={`${item.title} — ${item.category}, ${item.location}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brass-soft">
                  {item.category}
                </p>
                <h3 className="mt-1 font-display text-xl text-cream">{item.title}</h3>
                <p className="text-xs text-cream/70">
                  {item.location} · {item.year}
                </p>
              </div>
            </div>
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}
