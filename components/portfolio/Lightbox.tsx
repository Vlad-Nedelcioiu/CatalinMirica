"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PortfolioItem } from "@/lib/content";
import { unsplash } from "@/lib/utils";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onNavigate: (dir: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate]);

  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, ${item.category}`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 text-cream sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brass-soft">
            {item.category}
          </p>
          <h2 className="font-display text-lg">{item.title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image stage */}
      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            className="absolute inset-0 p-4 sm:p-8"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-full w-full">
              <Image
                src={unsplash(item.photo, 1600)}
                alt={`${item.title} — ${item.location}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / next */}
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-ink/40 text-cream transition-colors hover:bg-cream hover:text-ink sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-ink/40 text-cream transition-colors hover:bg-cream hover:text-ink sm:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-3 py-4 text-xs text-cream/70">
        <span>{item.location}</span>
        <span className="h-1 w-1 rounded-full bg-cream/40" />
        <span>{item.year}</span>
        <span className="h-1 w-1 rounded-full bg-cream/40" />
        <span>
          {index + 1} / {items.length}
        </span>
      </div>
    </motion.div>
  );
}
