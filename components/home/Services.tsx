import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <Section id="services" className="bg-paper">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.07}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-cream/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-cream transition-colors group-hover:bg-brass">
                  <service.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-xl">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 shrink-0 text-brass" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
