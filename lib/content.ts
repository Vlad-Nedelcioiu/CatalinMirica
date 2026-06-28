import {
  Camera,
  Clapperboard,
  Sparkles,
  Users,
  AtSign,
  Play,
  Share2,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Studio details                                                            */
/* -------------------------------------------------------------------------- */

export const SITE = {
  name: "Timeless Visuals",
  tagline: "Where moments become memories.",
  email: "hello@timelessvisuals.studio",
  phone: "+1 (415) 555-0182",
  address: "27 Marina Boulevard, Studio 4 · San Francisco, CA",
  instagram: "@timelessvisuals",
  foundedYear: 2017,
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: AtSign as LucideIcon },
    { label: "YouTube", href: "https://youtube.com", icon: Play as LucideIcon },
    { label: "Facebook", href: "https://facebook.com", icon: Share2 as LucideIcon },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Camera,
    title: "Wedding Photography",
    description:
      "Documentary-led coverage of your day — candid emotion, fine details, and portraits that feel like you.",
    features: ["Full-day coverage", "Two photographers", "Hand-edited gallery"],
  },
  {
    icon: Clapperboard,
    title: "Cinematic Videography",
    description:
      "Highlight films and full-length features, scored and colour-graded to play like a short film.",
    features: ["4K cinema cameras", "Licensed soundtrack", "Highlight + feature cut"],
  },
  {
    icon: Sparkles,
    title: "Event Coverage",
    description:
      "Concerts, galas, launches and corporate events captured with a fast, unobtrusive crew.",
    features: ["Same-day previews", "Multi-camera teams", "Brand-ready delivery"],
  },
  {
    icon: Users,
    title: "Portrait Sessions",
    description:
      "Editorial portraits for individuals, couples, families and teams — in studio or on location.",
    features: ["Direction included", "Studio or location", "Print-ready files"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Packages                                                                   */
/* -------------------------------------------------------------------------- */

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
};

export const PACKAGES: Package[] = [
  {
    id: "essentials",
    name: "The Essentials",
    tagline: "Half-day stories for intimate gatherings.",
    price: 1200,
    duration: "4 hours of coverage",
    features: [
      "One lead photographer",
      "150+ hand-edited photos",
      "Private online gallery",
      "Personal print release",
    ],
  },
  {
    id: "signature",
    name: "The Signature",
    tagline: "Our most-loved photo + film package.",
    price: 2400,
    duration: "8 hours of coverage",
    popular: true,
    features: [
      "Two photographers + one cinematographer",
      "400+ hand-edited photos",
      "3–4 min highlight film",
      "Online gallery + sneak peek in 48h",
    ],
  },
  {
    id: "heirloom",
    name: "The Heirloom",
    tagline: "Two-day cinematic coverage, start to finish.",
    price: 4200,
    duration: "2 days of coverage",
    features: [
      "Three-person crew",
      "700+ hand-edited photos",
      "8 min film + teaser + full feature",
      "Engagement session & premium album",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Booking — event types & time slots                                        */
/* -------------------------------------------------------------------------- */

export const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Corporate Event",
  "Concert / Live Show",
  "Portrait Session",
  "Other",
] as const;

export type TimeSlot = { id: string; label: string; time: string };

export const TIME_SLOTS: TimeSlot[] = [
  { id: "morning", label: "Morning", time: "8:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", time: "12:00 – 17:00" },
  { id: "evening", label: "Evening", time: "17:00 – 22:00" },
];

/* -------------------------------------------------------------------------- */
/*  Portfolio                                                                  */
/* -------------------------------------------------------------------------- */

export const PORTFOLIO_CATEGORIES = [
  "Weddings",
  "Engagements",
  "Concerts",
  "Corporate",
  "Portraits",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  photo: string; // Unsplash photo path, e.g. "photo-1519741497674-611481863552"
  location: string;
  year: number;
  span?: "tall" | "wide";
};

export const PORTFOLIO: PortfolioItem[] = [
  { id: "w1", title: "Rings & Vows", category: "Weddings", photo: "photo-1519741497674-611481863552", location: "Tuscany, IT", year: 2024, span: "wide" },
  { id: "w2", title: "Garden Ceremony", category: "Weddings", photo: "photo-1465495976277-4387d4b0b4c6", location: "Napa Valley, US", year: 2023, span: "tall" },
  { id: "w3", title: "The Reception", category: "Weddings", photo: "photo-1511285560929-80b456fea0bc", location: "Lake Como, IT", year: 2024 },
  { id: "w4", title: "First Dance", category: "Weddings", photo: "photo-1519225421980-715cb0215aed", location: "Santorini, GR", year: 2023, span: "tall" },
  { id: "e1", title: "Coastal Promise", category: "Engagements", photo: "photo-1537633552985-df8429e8048b", location: "Big Sur, US", year: 2024 },
  { id: "e2", title: "She Said Yes", category: "Engagements", photo: "photo-1494790108377-be9c29b29330", location: "Lisbon, PT", year: 2023 },
  { id: "e3", title: "Golden Fields", category: "Engagements", photo: "photo-1517841905240-472988babdf9", location: "Provence, FR", year: 2024, span: "wide" },
  { id: "c1", title: "Stage Lights", category: "Concerts", photo: "photo-1501281668745-f7f57925c3b4", location: "Berlin, DE", year: 2024, span: "tall" },
  { id: "c2", title: "The Crowd", category: "Concerts", photo: "photo-1470229722913-7c0e2dbbafd3", location: "London, UK", year: 2023 },
  { id: "c3", title: "Encore", category: "Concerts", photo: "photo-1459749411175-04bf5292ceea", location: "Austin, US", year: 2024 },
  { id: "o1", title: "Keynote", category: "Corporate", photo: "photo-1540575467063-178a50c2df87", location: "Singapore", year: 2024, span: "wide" },
  { id: "o2", title: "The Summit", category: "Corporate", photo: "photo-1517048676732-d65bc937f952", location: "New York, US", year: 2023 },
  { id: "o3", title: "Boardroom", category: "Corporate", photo: "photo-1505373877841-8d25f7d46678", location: "Zürich, CH", year: 2024 },
  { id: "p1", title: "Studio No. 4", category: "Portraits", photo: "photo-1500648767791-00dcc994a43e", location: "Paris, FR", year: 2024, span: "tall" },
  { id: "p2", title: "Natural Light", category: "Portraits", photo: "photo-1534528741775-53994a69daeb", location: "Copenhagen, DK", year: 2023 },
];

/* Images reused on the home page. */
export const HERO_PHOTOS = {
  main: "photo-1519225421980-715cb0215aed",
  a: "photo-1465495976277-4387d4b0b4c6",
  b: "photo-1511285560929-80b456fea0bc",
};

export const ABOUT_PHOTO = "photo-1452587925148-ce544e77e70d";

/* -------------------------------------------------------------------------- */
/*  How we work                                                               */
/* -------------------------------------------------------------------------- */

export const PROCESS = [
  { step: "01", title: "Say hello", description: "Tell us about your event and the moments that matter most to you." },
  { step: "02", title: "Plan together", description: "We craft a shot list and timeline, then lock your date and package." },
  { step: "03", title: "The day", description: "Our crew blends in, capturing emotion and detail without the fuss." },
  { step: "04", title: "Relive it", description: "Receive a hand-edited gallery and cinematic film to keep forever." },
];

/* -------------------------------------------------------------------------- */
/*  Stats                                                                      */
/* -------------------------------------------------------------------------- */

export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 350, suffix: "+", label: "Events captured" },
  { value: 9, label: "Years behind the lens" },
  { value: 180, suffix: "+", label: "Five-star reviews" },
  { value: 12, label: "Awards & features" },
];

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They captured our wedding exactly as it felt — warm, a little chaotic, and full of love. The film still makes us cry.",
    name: "Sarah & Daniel",
    role: "Wedding · Lake Como",
    photo: "photo-1438761681033-6461ffad8d80",
  },
  {
    quote:
      "Our product launch looked like a feature film the next morning. Calm crew, flawless delivery, zero hand-holding needed.",
    name: "Marcus Lindberg",
    role: "Head of Events, Nordix",
    photo: "photo-1500648767791-00dcc994a43e",
  },
  {
    quote:
      "Every portrait felt effortless. I've never been comfortable in front of a camera until this session.",
    name: "Amara Okafor",
    role: "Portrait session · Copenhagen",
    photo: "photo-1534528741775-53994a69daeb",
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "For weddings and large events we recommend 6–12 months ahead. Portrait and smaller sessions can often be arranged within a few weeks — check live availability on our booking page.",
  },
  {
    q: "Do you travel for destination events?",
    a: "Absolutely. We're based in San Francisco but shoot worldwide. Travel and accommodation are added at cost with no markup, and we'll handle the logistics.",
  },
  {
    q: "When will we receive our photos and film?",
    a: "Sneak-peek images arrive within 48 hours. Full galleries are delivered in 2–3 weeks, and cinematic films in 4–6 weeks.",
  },
  {
    q: "Do you offer both photography and videography?",
    a: "Yes — our Signature and Heirloom packages include a dedicated photo and film crew so the two teams never get in each other's way.",
  },
  {
    q: "What happens after I request a date?",
    a: "Submitting the booking form places a soft hold on your date and slot. We'll confirm details and send an agreement within one business day — you're not charged until everything is signed.",
  },
  {
    q: "Can we customise a package?",
    a: "Of course. The packages are starting points; tell us what you need on the contact form and we'll tailor a quote.",
  },
];
