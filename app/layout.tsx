import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MotionProvider } from "@/components/site/MotionProvider";
import { HERO_PHOTOS } from "@/lib/content";
import { unsplash } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://timelessvisuals.studio"),
  title: {
    default: "Timeless Visuals — Event Photography & Videography",
    template: "%s · Timeless Visuals",
  },
  description:
    "Timeless Visuals is an events photography and videography studio capturing weddings, concerts, corporate events and portraits with a calm, cinematic eye.",
  keywords: [
    "event photography",
    "wedding videography",
    "concert photography",
    "corporate event photographer",
    "portrait session",
    "Timeless Visuals",
  ],
  authors: [{ name: "Timeless Visuals" }],
  openGraph: {
    type: "website",
    title: "Timeless Visuals — Event Photography & Videography",
    description:
      "Weddings, concerts, corporate events and portraits captured with a calm, cinematic eye.",
    siteName: "Timeless Visuals",
    images: [
      {
        url: `${unsplash(HERO_PHOTOS.main, 1200)}&h=630`,
        width: 1200,
        height: 630,
        alt: "Couple sharing a first dance, photographed by Timeless Visuals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeless Visuals — Event Photography & Videography",
    description:
      "Weddings, concerts, corporate events and portraits captured with a calm, cinematic eye.",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Without JS, framer-motion's server-rendered initial styles would
            leave revealed content invisible; force it visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-cream"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
