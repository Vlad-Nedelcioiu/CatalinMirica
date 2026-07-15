import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { unsplash } from "@/lib/utils";

/** The album's back cover: one photograph, one quiet line, an unhurried invitation. */
export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <Photo
        src={unsplash("photo-1537633552985-df8429e8048b", 2000)}
        alt="Couple walking the Big Sur coastline at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Content sits low on the photograph, where the scrim is strongest. */}
      <div aria-hidden className="absolute inset-0 bg-ink/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />

      <Container className="relative flex min-h-[34rem] flex-col items-center justify-end pb-20 pt-40 text-center sm:min-h-[38rem] sm:pb-24">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl leading-tight text-cream sm:text-5xl">
            Let&apos;s make something timeless.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/90">
            Tell us about your day. Booking places a soft hold on your date — nothing is
            charged until everything&apos;s signed.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Book a session
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-8 py-4 text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
