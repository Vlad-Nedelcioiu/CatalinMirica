# Timeless Visuals

A complete, modern website for **Timeless Visuals** — an events photography &
videography studio. Built with the latest stack and a light, editorial aesthetic.

- **Home** — cinematic hero, services, featured work, process, animated stats, testimonials
- **Portfolio** — category-filterable gallery with a full-screen lightbox (keyboard + arrow nav)
- **Contact** — validated contact form (persisted), studio details, map, FAQ accordion
- **Booking** — multi-step flow with a real **availability calendar** (one booking per day),
  a start-time picker, package picker, and a confirmation step. Saved server-side.
- **Admin** (`/admin`) — a lightweight dashboard listing all bookings and messages.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [date-fns](https://date-fns.org) for the calendar · [lucide-react](https://lucide.dev) icons
- `next/image` with curated [Unsplash](https://unsplash.com) photography

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run in production mode:

```bash
npm run build
npm start
```

## How the booking system works

- The booking page (`/booking`) fetches live availability from `GET /api/bookings`,
  which returns the list of dates already taken.
- The calendar disables past dates and greys out any day that already has a booking —
  it's **one booking per day**. The client also picks a start time (just so the studio
  knows when to arrive; it doesn't affect availability).
- Submitting the flow `POST`s to `/api/bookings`. The server re-checks the date to guard
  against double-booking (returns `409` if it was just taken) and stores the request.
- Contact form submissions `POST` to `/api/contact`.

### Data storage

Bookings and messages are stored as JSON files in **`/data`** (`bookings.json`,
`contact.json`), created automatically on first write. This is perfect for local use and
self-hosted/long-running Node deployments. These files are git-ignored.

> On serverless platforms (e.g. Vercel) the filesystem is ephemeral — swap `lib/store.ts`
> for a database (Postgres, SQLite, Prisma, etc.) before deploying there. The data access is
> isolated in that one file, so it's a small change.

### Admin dashboard

Visit `/admin` to see all bookings and messages. It's open in local development. To require
a token, set one in `.env.local`:

```bash
ADMIN_TOKEN=your-secret
```

Then open `/admin?token=your-secret`.

## Customising

- **Studio info, services, packages, portfolio, testimonials, FAQs** all live in
  [`lib/content.ts`](lib/content.ts) — edit there, no component changes needed.
- **Photos** use Unsplash IDs (e.g. `photo-1519741497674-611481863552`). Replace the `photo`
  values in `lib/content.ts`, or drop real images into `/public` and point to them. If you
  add a new external image host, allow it in `next.config.ts` under `images.remotePatterns`.
- **Brand colours & fonts** are defined as design tokens in
  [`app/globals.css`](app/globals.css) (`@theme` block).

## Project structure

```
app/            routes (home, portfolio, contact, booking, admin) + API + layout
components/
  site/         layout primitives (Navbar, Footer, Container, Section, Reveal, PageHeader)
  ui/           Button, Field, Badge
  home/         home-page sections
  portfolio/    Gallery + Lightbox
  contact/      ContactForm + Accordion
  booking/      BookingFlow, Calendar, TimeSlots, PackagePicker, BookingForm, Confirmation
lib/            content.ts (data), store.ts (persistence), utils.ts (helpers)
data/           runtime JSON store (git-ignored, auto-created)
```
