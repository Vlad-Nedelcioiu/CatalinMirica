import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Check live availability and reserve your date with Timeless Visuals. Choose a package, pick a date and time, and tell us about your event.",
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Check availability & reserve your date"
        lead="Choose a package, pick an open date and time, and share a few details. It takes about two minutes — and no payment is taken until your quote is signed."
      />
      <Section className="pt-2">
        <Container>
          <BookingFlow />
        </Container>
      </Section>
    </>
  );
}
