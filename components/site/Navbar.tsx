"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Aperture, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { buttonClasses } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-line bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Timeless Visuals home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition-colors group-hover:bg-brass">
            <Aperture className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight">Timeless Visuals</span>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-muted">
              Photo &amp; Film
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "link-underline text-sm font-medium transition-colors",
                isActive(l.href) ? "text-brass" : "text-ink-soft hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/booking" className={cn(buttonClasses({ size: "sm" }), "hidden sm:inline-flex")}>
            Book a Session
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-line bg-cream transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-3 font-display text-2xl transition-colors",
                isActive(l.href) ? "text-brass" : "text-ink hover:text-brass",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className={cn(buttonClasses({ size: "md" }), "mt-3 w-full")}>
            Book a Session
          </Link>
        </Container>
      </div>
    </header>
  );
}
