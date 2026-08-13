// src/api/cityTour.ts
// Data layer for the Berlin City Tour booking. Mirrors registrations.ts, which
// owns the shared error parsing and the payment-status polling both flows use.

import { supabase } from "../lib/supabase";
import { parseApiError } from "./registrations";

// Mirrors MAX_ATTENDEES in hp-registration-api/app/models/city_tour.py and the
// CHECK (member_count BETWEEN 1 AND 5) in sql/city_tour.sql. Change all three
// together, or a payment succeeds and the booking insert fails.
export const MAX_ATTENDEES = 5;

// Total seats on the tour. Enforced here in the browser only — the backend
// accepts any booking — so this caps the form, it does not secure the tour.
// See docs/superpowers/specs/2026-08-13-city-tour-seat-limit-design.md.
export const CITY_TOUR_CAPACITY = 53;

export interface CityTourPayload {
  email: string;
  country: string; // ISO-2
  dialCode: string; // e.g. '+49'
  phone: string; // national part, as typed
  memberNames: string[]; // 1..MAX_ATTENDEES, in display order
  termsAccepted: boolean;
}

export interface CityTourResult {
  payment_url: string;
  reference: string; // the intent UUID, not CT-2026-… — see below
}

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * Build a strict E.164 number: '+' + country code + national digits.
 *
 * Do NOT reuse the phone line from submitRegistration() — it strips the '+'
 * (`dialCode.replace(/\+/g, '')`), producing "49 176 1234567". The city tour
 * backend strips only [\s\-()] and then requires /^\+[1-9][0-9]{6,14}$/, so a
 * missing '+' fails validation outright. The main registration flow has a
 * looser regex, which is why the same string works there.
 *
 * The leading trunk '0' people type out of habit ("0176…") is dropped: it is a
 * national-dialling prefix that must not appear in E.164. Mobile numbers do not
 * begin with a significant 0 in any country we list, so this is safe here —
 * it would not be for landlines in e.g. Italy.
 */
export function toE164(dialCode: string, phone: string): string {
  const dial = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
  const national = phone.replace(/\D/g, "").replace(/^0+/, "");
  return `${dial}${national}`;
}

/**
 * Seats still available on the tour, or null if the count could not be read.
 *
 * Every city_tour_members row is a paid attendee — the backend inserts them
 * only after the Stripe webhook confirms — so COUNT(*) is the whole story. No
 * payment-status join, unlike the main registration's country quota.
 *
 * `head: true` fetches the count header without any rows, and anon only holds
 * SELECT on `id` anyway (supabase/003_city_tour_seat_count.sql).
 *
 * null and 0 must stay distinct: 0 means the tour is genuinely full, null
 * means we do not know. The page fails open on null — a Supabase blip should
 * not turn away a booking.
 */
export async function fetchSeatsRemaining(): Promise<number | null> {
  const { count, error } = await supabase
    .from("city_tour_members")
    .select("id", { count: "exact", head: true });

  if (error || count === null) return null;
  return Math.max(0, CITY_TOUR_CAPACITY - count);
}

export async function submitCityTour(
  payload: CityTourPayload,
): Promise<CityTourResult> {
  if (!API_URL) throw new Error("Configuration error: API URL is not set.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${API_URL}/city-tour/create-payment`, {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email.trim().toLowerCase(),
        country: payload.country,
        phone: toE164(payload.dialCode, payload.phone),
        terms_accepted: payload.termsAccepted,
        members: payload.memberNames.map((full_name) => ({
          full_name: full_name.trim(),
        })),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(parseApiError(err as Record<string, unknown>));
    }

    // `reference` here is the payment-intent UUID. The real CT-2026-NNNNN
    // reference does not exist until the Stripe webhook fires, and is read back
    // on the success page via pollPaymentStatus().
    return res.json();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error(
        "The request timed out. Please check your connection and try again.",
      );
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
