import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { HERO_PHOTOS } from "@/lib/content";
import { unsplash } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28">
      <Container className="px-0 sm:px-0">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center sm:px-12 sm:py-28">
          <Image
            src={unsplash(HERO_PHOTOS.main, 1600)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />

          <Reveal className="relative">
            <p className="eyebrow mb-5">Available for 2026 &amp; 2027</p>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl leading-tight text-cream sm:text-5xl">
              Let&apos;s make something timeless.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/75">
              Tell us about your event and check live availability. Dates book quickly during
              peak season — the sooner we talk, the better.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium text-ink shadow-card transition-colors hover:bg-white"
              >
                Check availability
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
