import Link from "next/link";
import { Aperture, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";
import { SITE } from "@/lib/content";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sand/60">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream">
                <Aperture className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-display text-lg tracking-tight">Timeless Visuals</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              An events photography &amp; videography studio capturing weddings, concerts,
              and milestones with a calm, cinematic eye.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {SITE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-deep">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/booking", label: "Book a session" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-soft transition-colors hover:text-brass-deep">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-deep">
              Studio
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-ink-soft">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brass" />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brass-deep">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brass" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brass-deep">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <Link href="/booking" className={cn(buttonClasses({ size: "sm", variant: "outline" }), "mt-6")}>
              Book a session
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted-deep sm:flex-row">
          <p>© {year} Timeless Visuals. All rights reserved.</p>
          <a
            href={SITE.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            {SITE.instagram}
          </a>
        </div>
      </Container>
    </footer>
  );
}
