import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { ABOUT_PHOTO, SITE } from "@/lib/content";
import { unsplash } from "@/lib/utils";

const highlights = [
  { title: "Photo + film, one studio", body: "Two craft teams who actually rehearse together." },
  { title: "Hand-edited, never outsourced", body: "Every frame graded in-house by the people who shot it." },
];

export function AboutTeaser() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={36}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Photo
                  src={unsplash(ABOUT_PHOTO, 1000)}
                  alt="Behind the scenes with the Timeless Visuals crew"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-line bg-cream px-6 py-5 sm:block">
                <p className="font-display text-3xl text-brass">{SITE.foundedYear}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-deep">Est. in SF</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-balance text-3xl leading-tight sm:text-4xl">
                A small crew with a cinematic obsession.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                We started Timeless Visuals to make event coverage feel less like a
                production and more like having a friend with an exceptional eye in the
                room. We stay out of the way, chase real emotion, and obsess over light —
                then hand you images and films you'll still love decades from now.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={0.1 + i * 0.06}>
                  <div className="rounded-2xl border border-line bg-paper p-5">
                    <h3 className="text-base font-semibold">{h.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-soft">{h.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link
                href="/portfolio"
                className="link-underline mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
              >
                Explore the portfolio
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
