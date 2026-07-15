import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { HERO_PHOTOS, SITE } from "@/lib/content";
import { unsplash } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft brass glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brass-soft/20 blur-3xl"
      />

      <Container className="relative pt-12 sm:pt-16">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-brass-deep" />
            Event Photography &amp; Videography
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl text-balance font-display text-5xl leading-[1.03] tracking-tight sm:text-6xl md:text-7xl">
            Where moments become{" "}
            <span className="italic text-brass">memories</span>.
          </h1>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {SITE.name} is a photography &amp; videography studio for weddings, concerts
              and the milestones in between — captured with a calm, cinematic eye that lasts
              far longer than the day itself.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex shrink-0 flex-wrap items-center gap-3">
            <Link href="/portfolio" className={buttonClasses({ size: "lg" })}>
              View portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/booking"
              className={buttonClasses({ variant: "outline", size: "lg" })}
            >
              Book a session
            </Link>
          </Reveal>
        </div>
      </Container>

      {/* Image triptych */}
      <Container className="mt-12 sm:mt-16">
        <Reveal delay={0.1} y={36}>
          {/* Main image leads in source order so the 2-col mobile grid fills
              without holes; lg:order-* restores the desktop triptych. */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
            <figure className="relative col-span-2 h-64 overflow-hidden rounded-2xl sm:h-96 lg:order-2 lg:col-span-6 lg:h-[30rem]">
              <Photo
                src={unsplash(HERO_PHOTOS.main, 1400)}
                alt="Couple sharing a first dance, photographed by Timeless Visuals"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="animate-kenburns object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/85 px-4 py-1.5 text-xs font-medium tracking-wide text-ink backdrop-blur">
                Santorini, 2023
              </figcaption>
            </figure>
            <figure className="relative col-span-1 h-56 overflow-hidden rounded-2xl sm:h-80 lg:order-1 lg:col-span-3 lg:h-[30rem]">
              <Photo
                src={unsplash(HERO_PHOTOS.a, 900)}
                alt="Outdoor wedding ceremony captured by Timeless Visuals"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative col-span-1 h-56 overflow-hidden rounded-2xl sm:h-80 lg:order-3 lg:col-span-3 lg:h-[30rem]">
              <Photo
                src={unsplash(HERO_PHOTOS.b, 900)}
                alt="Wedding reception details photographed by Timeless Visuals"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </figure>
          </div>
        </Reveal>

        {/* Trust row */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
            <p className="flex items-center gap-2">
              <span className="flex text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              Rated 5.0 across 180+ reviews
            </p>
            <p className="text-muted-deep">
              Based in San Francisco · Available worldwide · Since {SITE.foundedYear}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
