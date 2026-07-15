import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/content";
import { cn, unsplash } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services" className="bg-paper">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="Coverage shaped around your event"
            lead="One studio for photography and film, so the story stays consistent from the first look to the final frame."
          />
          <Reveal>
            <Link
              href="/booking"
              className="link-underline hidden items-center gap-1.5 text-sm font-medium text-ink md:inline-flex"
            >
              See packages
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Editorial rows: each service is shown, not iconified. */}
        <div className="mt-14 flex flex-col">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title}>
              <article className="grid items-center gap-6 border-t border-line py-10 sm:gap-10 md:grid-cols-12 md:py-12">
                <Link
                  href="/portfolio"
                  aria-label={`${service.title} — view related work`}
                  className={cn(
                    "group relative block h-56 overflow-hidden rounded-2xl sm:h-64 md:col-span-5",
                    i % 2 === 1 && "md:order-2",
                  )}
                >
                  <Photo
                    src={unsplash(service.photo, 900)}
                    alt={service.photoAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                </Link>
                <div className={cn("md:col-span-7", i % 2 === 1 && "md:order-1")}>
                  <h3 className="text-2xl">{service.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm text-muted-deep">{service.features.join(" · ")}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="md:hidden">
          <Link
            href="/booking"
            className="link-underline inline-flex items-center gap-1.5 border-t border-line pt-6 text-sm font-medium text-ink"
          >
            See packages
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
