import type { Metadata } from "next";
import { CalendarDays, Inbox, Lock, MapPin, Phone } from "lucide-react";
import { getBookings, getMessages, isAdminAuthorized } from "@/lib/store";
import { PACKAGES, TIME_SLOTS } from "@/lib/content";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Container } from "@/components/site/Container";
import { cn, formatLongDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio Dashboard",
  robots: { index: false, follow: false },
};

const pkgName = (id: string) => PACKAGES.find((p) => p.id === id)?.name ?? id;
const slotLabel = (id: string) => TIME_SLOTS.find((s) => s.id === id)?.label ?? id;
const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const statusTone: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-stone-200 text-stone-600 line-through",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!isAdminAuthorized(token ?? null)) {
    return (
      <Section>
        <Container className="max-w-md text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sand text-ink">
            <Lock className="h-6 w-6" />
          </span>
          <h1 className="mt-6 font-display text-2xl">Dashboard is locked</h1>
          <p className="mt-3 text-sm text-ink-soft">
            An <code className="rounded bg-sand px-1.5 py-0.5">ADMIN_TOKEN</code> is set. Append{" "}
            <code className="rounded bg-sand px-1.5 py-0.5">?token=YOUR_TOKEN</code> to the URL to
            view bookings and messages.
          </p>
        </Container>
      </Section>
    );
  }

  const [bookings, messages] = await Promise.all([getBookings(), getMessages()]);
  const recentBookings = [...bookings].reverse();
  const recentMessages = [...messages].reverse();
  const tokenQuery = token ? `?token=${encodeURIComponent(token)}` : "";

  return (
    <>
      <PageHeader
        eyebrow="Internal"
        title="Studio dashboard"
        lead="Booking requests and contact messages captured by the site. Data is stored locally in the project's /data folder."
      />

      <Section className="pt-2">
        <Container>
          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total bookings", value: bookings.length },
              {
                label: "Pending",
                value: bookings.filter((b) => b.status === "pending").length,
              },
              { label: "Messages", value: messages.length },
              {
                label: "Upcoming",
                value: bookings.filter((b) => b.date >= new Date().toISOString().slice(0, 10))
                  .length,
              },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-paper p-5">
                <p className="font-display text-3xl text-brass">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {/* Bookings */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl">
                <CalendarDays className="h-5 w-5 text-brass" />
                Bookings
              </h2>
              <div className="mt-5 space-y-4">
                {recentBookings.length === 0 ? (
                  <EmptyState text="No bookings yet. Submit one from the booking page to see it here." />
                ) : (
                  recentBookings.map((b) => (
                    <article key={b.id} className="rounded-2xl border border-line bg-paper p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-lg">{formatLongDate(b.date)}</p>
                          <p className="text-sm text-ink-soft">
                            {slotLabel(b.slot)} · {b.eventType} · {pkgName(b.packageId)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                            statusTone[b.status],
                          )}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3 text-sm text-ink-soft">
                        <span className="font-medium text-ink">{b.name}</span>
                        <a href={`mailto:${b.email}`} className="hover:text-brass">
                          {b.email}
                        </a>
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" /> {b.phone}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {b.location}
                        </span>
                        {b.guests ? <span>{b.guests} guests</span> : null}
                      </div>
                      {b.message ? (
                        <p className="mt-3 rounded-lg bg-sand/50 p-3 text-sm text-ink-soft">
                          {b.message}
                        </p>
                      ) : null}
                      <p className="mt-3 text-xs text-muted">
                        Requested {when(b.createdAt)} · Ref {b.id.slice(0, 8).toUpperCase()}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Messages */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl">
                <Inbox className="h-5 w-5 text-brass" />
                Messages
              </h2>
              <div className="mt-5 space-y-4">
                {recentMessages.length === 0 ? (
                  <EmptyState text="No messages yet. Submit the contact form to see it here." />
                ) : (
                  recentMessages.map((m) => (
                    <article key={m.id} className="rounded-2xl border border-line bg-paper p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-ink">{m.name}</p>
                          <a href={`mailto:${m.email}`} className="text-sm text-ink-soft hover:text-brass">
                            {m.email}
                          </a>
                        </div>
                        {m.subject ? (
                          <span className="rounded-full bg-sand px-2.5 py-1 text-xs text-ink-soft">
                            {m.subject}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.message}</p>
                      {m.phone ? <p className="mt-2 text-xs text-muted">Phone: {m.phone}</p> : null}
                      <p className="mt-2 text-xs text-muted">Received {when(m.createdAt)}</p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>

          <p className="mt-12 rounded-xl border border-line bg-sand/40 p-4 text-xs text-ink-soft">
            This page reflects the JSON files in <code>/data</code>. It&apos;s open in local
            development; set <code>ADMIN_TOKEN</code> in <code>.env.local</code> to require{" "}
            <code>?token=…</code>{tokenQuery ? " (currently authorised via token)" : ""}.
          </p>
        </Container>
      </Section>
    </>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">
      {text}
    </div>
  );
}
