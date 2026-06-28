import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-12 sm:pb-14 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-brass-soft/15 blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          {eyebrow ? (
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-brass" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-3xl text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {lead}
            </p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
