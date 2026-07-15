import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { PORTFOLIO } from "@/lib/content";
import { cn, unsplash } from "@/lib/utils";

const featuredIds = ["w4", "c1", "o1", "e3", "p1"];
const featured = featuredIds
  .map((id) => PORTFOLIO.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

/* Grid placement per slot; extra items beyond the layout are not rendered,
   and missing ids simply shorten the grid instead of crashing. */
const layout = [
  "h-72 md:col-span-7 md:h-[26rem]",
  "h-72 md:col-span-5 md:h-[26rem]",
  "h-64 md:col-span-4",
  "h-64 md:col-span-4",
  "h-64 md:col-span-4",
];

function WorkCard({
  item,
  className,
}: {
  item: (typeof PORTFOLIO)[number];
  className?: string;
}) {
  return (
    <Link
      href={`/portfolio?item=${item.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl",
        className,
      )}
    >
      <Photo
        src={unsplash(item.photo, 1100)}
        alt={`${item.title} — ${item.category}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
      />
      {/* Caption scrim eases OFF on hover — interest reveals the photograph. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brass-soft">
            {item.category}
          </p>
          <h3 className="mt-1 font-display text-xl text-cream">{item.title}</h3>
          <p className="text-xs text-cream/70">{item.location}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 translate-y-1 place-items-center rounded-full bg-cream/15 text-cream opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function FeaturedWork() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="A few moments we're proud of"
            lead="From candlelit receptions to sold-out stages — a glimpse of the stories we've told."
          />
          <Reveal>
            <Link
              href="/portfolio"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              View full portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal y={36} className="mt-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {featured.slice(0, layout.length).map((item, i) => (
              <WorkCard key={item.id} item={item} className={layout[i]} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
