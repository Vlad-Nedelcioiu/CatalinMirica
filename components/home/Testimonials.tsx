"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Photo } from "@/components/site/Photo";
import { TESTIMONIALS } from "@/lib/content";
import { cn, unsplash } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const prefersReduced = useReducedMotion();
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-advance only while the user hasn't paused it, isn't reading it
  // (hover/focus), and doesn't prefer reduced motion. `index` in the deps
  // restarts the countdown after manual navigation instead of fighting it.
  const autoplay = !paused && !engaged && !prefersReduced;
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [autoplay, count, index]);

  const active = TESTIMONIALS[index];

  return (
    <Section>
      <Container>
        <SectionHeading title="Trusted on the day that matters" align="center" />

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="relative mx-auto mt-12 max-w-3xl text-center"
          onMouseEnter={() => setEngaged(true)}
          onMouseLeave={() => setEngaged(false)}
          onFocusCapture={() => setEngaged(true)}
          onBlurCapture={() => setEngaged(false)}
        >
          <Quote aria-hidden className="mx-auto h-10 w-10 text-brass/30" />

          <div
            className="mt-6 min-h-[11rem] sm:min-h-[9rem]"
            aria-live={autoplay ? "off" : "polite"}
          >
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`Testimonial ${index + 1} of ${count}`}
              >
                <p className="text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
                  “{active.quote}”
                </p>
                <footer className="mt-8 flex items-center justify-center gap-3">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Photo
                      src={unsplash(active.photo, 120)}
                      alt={active.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-ink">{active.name}</span>
                    <span className="block text-xs text-muted-deep">{active.role}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "flex h-6 items-center justify-center",
                    i === index ? "w-8" : "w-6",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-brass" : "w-2 bg-line",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume automatic rotation" : "Pause automatic rotation"}
              aria-pressed={paused}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
