import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  packageId: string;
  eventType: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:MM (24h) — when the studio should arrive
  name: string;
  email: string;
  phone: string;
  location: string;
  guests?: number;
  message?: string;
};

export type ContactMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

/* -------------------------------------------------------------------------- */
/*  Low-level JSON file helpers (with a tiny write queue)                      */
/* -------------------------------------------------------------------------- */

const DATA_DIR = path.join(process.cwd(), "data");

const filePath = (name: string) => path.join(DATA_DIR, name);

async function readJson<T>(name: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath(name), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Serialise writes per file within this process to avoid lost updates.
const locks = new Map<string, Promise<unknown>>();

function withLock<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(name) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(
    name,
    next.catch(() => {}),
  );
  return next;
}

async function writeJson(name: string, data: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath(name), JSON.stringify(data, null, 2), "utf8");
}

/* -------------------------------------------------------------------------- */
/*  Bookings                                                                   */
/* -------------------------------------------------------------------------- */

const BOOKINGS_FILE = "bookings.json";

export async function getBookings(): Promise<Booking[]> {
  return readJson<Booking[]>(BOOKINGS_FILE, []);
}

/** Dates that are taken (anything not cancelled). One booking per day. */
export async function getBookedDates(): Promise<string[]> {
  const bookings = await getBookings();
  const dates = bookings.filter((b) => b.status !== "cancelled").map((b) => b.date);
  return [...new Set(dates)];
}

export class DateTakenError extends Error {
  constructor() {
    super("That date is no longer available.");
    this.name = "DateTakenError";
  }
}

export async function addBooking(
  input: Omit<Booking, "id" | "createdAt" | "status">,
): Promise<Booking> {
  return withLock(BOOKINGS_FILE, async () => {
    const bookings = await getBookings();
    const clash = bookings.some((b) => b.status !== "cancelled" && b.date === input.date);
    if (clash) throw new DateTakenError();

    const booking: Booking = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      ...input,
    };
    bookings.push(booking);
    await writeJson(BOOKINGS_FILE, bookings);
    return booking;
  });
}

/* -------------------------------------------------------------------------- */
/*  Contact messages                                                          */
/* -------------------------------------------------------------------------- */

const CONTACT_FILE = "contact.json";

export async function getMessages(): Promise<ContactMessage[]> {
  return readJson<ContactMessage[]>(CONTACT_FILE, []);
}

export async function addMessage(
  input: Omit<ContactMessage, "id" | "createdAt">,
): Promise<ContactMessage> {
  return withLock(CONTACT_FILE, async () => {
    const messages = await getMessages();
    const message: ContactMessage = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
    };
    messages.push(message);
    await writeJson(CONTACT_FILE, messages);
    return message;
  });
}

/* -------------------------------------------------------------------------- */
/*  Admin auth                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Admin is open when no ADMIN_TOKEN is configured (handy for local dev).
 * When a token is set, the supplied value must match exactly.
 */
export function isAdminAuthorized(provided: string | null | undefined): boolean {
  const required = process.env.ADMIN_TOKEN;
  if (!required) return true;
  return provided === required;
}
