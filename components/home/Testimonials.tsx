"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { TESTIMONIALS } from "@/lib/content";
import { cn, unsplash } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [count]);

  const active = TESTIMONIALS[index];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Kind words" title="Trusted on the day that matters" align="center" />

        <div className="relative mx-auto mt-12 max-w-3xl text-center">
          <Quote className="mx-auto h-10 w-10 text-brass/30" />

          <div className="mt-6 min-h-[11rem] sm:min-h-[9rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
                  “{active.quote}”
                </p>
                <footer className="mt-8 flex items-center justify-center gap-3">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={unsplash(active.photo, 120)}
                      alt={active.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-ink">{active.name}</span>
                    <span className="block text-xs text-muted">{active.role}</span>
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
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-brass" : "w-2 bg-line hover:bg-muted",
                  )}
                />
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
          </div>
        </div>
      </Container>
    </Section>
  );
}
