"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/site/Container";
import { STATS, type Stat } from "@/lib/content";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-line bg-sand/50">
      <Container className="py-14 sm:py-16">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat: Stat, i) => (
            <div
              key={stat.label}
              className={
                "px-2 text-center lg:px-6 " +
                (i !== 0 ? "lg:border-l lg:border-line" : "")
              }
            >
              <dd className="font-display text-4xl text-brass sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft sm:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
