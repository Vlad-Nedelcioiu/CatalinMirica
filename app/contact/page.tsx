import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Accordion } from "@/components/contact/Accordion";
import { FAQS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Timeless Visuals to plan your wedding, event or portrait session.",
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: SITE.address,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "By appointment · Mon–Sat, 9–6",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your event"
        lead="Share a few details and we'll reply within one business day. Prefer to lock a date right away? Check live availability on the booking page."
      />

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Details */}
            <Reveal>
              <div className="flex flex-col gap-8">
                <ul className="space-y-6">
                  {details.map((d) => (
                    <li key={d.label} className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-cream">
                        <d.icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                          {d.label}
                        </p>
                        {d.href ? (
                          <a href={d.href} className="text-base text-ink transition-colors hover:text-brass">
                            {d.value}
                          </a>
                        ) : (
                          <p className="text-base text-ink">{d.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {SITE.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                    >
                      <s.icon className="h-4 w-4" />
                      {s.label}
                    </a>
                  ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-line">
                  <iframe
                    title="Timeless Visuals studio location"
                    src="https://www.google.com/maps?q=Marina+Boulevard+San+Francisco&output=embed"
                    className="h-64 w-full grayscale-[0.2]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion items={FAQS} />
            <p className="mt-8 text-center text-sm text-ink-soft">
              Still curious?{" "}
              <Link href="/booking" className="link-underline font-medium text-ink">
                Check availability
              </Link>{" "}
              or drop us a line above.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
