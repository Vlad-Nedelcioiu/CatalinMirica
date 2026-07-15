import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { PROCESS } from "@/lib/content";

export function Process() {
  return (
    <Section className="bg-paper">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From hello to heirloom"
          lead="A simple, unhurried process designed to keep the planning light and the day yours."
          align="center"
        />

        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line on large screens */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-line lg:block"
          />
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08} className="relative">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-line bg-cream font-display text-lg text-brass-deep">
                {p.step}
              </div>
              <h3 className="mt-5 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
