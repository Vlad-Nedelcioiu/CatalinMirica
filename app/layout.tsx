import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
