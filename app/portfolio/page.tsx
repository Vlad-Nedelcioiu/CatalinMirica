import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Gallery } from "@/components/portfolio/Gallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of weddings, engagements, concerts, corporate events and portraits captured by Timeless Visuals.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Stories we&apos;ve had the
            <br className="hidden sm:block" /> honour to tell
          </>
        }
        lead="Browse by the kind of event you're planning. Tap any frame to view it full-screen."
      />
      <Section className="pt-0">
        <Gallery />
      </Section>
    </>
  );
}
