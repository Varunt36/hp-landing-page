// src/pages/city-tour/CityTourPage.tsx
// Berlin City Tour booking form.
//
// One screen, not a stepper: this collects four contact fields, up to five bare
// names, and a checkbox. The five-step RegisterModal exists because the main
// registration needs name/gender/DOB/email/phone per person plus quota checks —
// none of which apply here.

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { COUNTRIES, PEOPLE } from "../../data/data";
import {
  MAX_ATTENDEES,
  fetchSeatsRemaining,
  submitCityTour,
} from "../../api/cityTour";
import { cityTourStyles as s } from "./CityTourPage.styles";
import { usePageMeta } from "../../hooks/usePageMeta";
import { markPaymentFlow } from "../../utils/paymentFlow";
import { C } from "../../theme/theme";

// Presentational only. The backend's CITY_TOUR_DONATION_EUR is what Stripe
// actually charges — if these two drift, the form shows one number and bills
// another. Keep them in step.
const RAW_DONATION = Number(import.meta.env.VITE_CITY_TOUR_DONATION);
const DONATION_EUR =
  Number.isFinite(RAW_DONATION) && RAW_DONATION > 0 ? RAW_DONATION : 30;

const DEFAULT_COUNTRY = "DE"; // the tour is in Berlin; most bookers are local

// Who a turned-away booker should call. The first PEOPLE entry, so the number
// lives in data.ts only — RegistrationClosed lists the same people.
const TOUR_CONTACT = PEOPLE[0];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = {
  email?: string;
  country?: string;
  phone?: string;
  terms?: string;
  names?: Record<number, string>;
};

function dialCodeFor(countryCode: string): string {
  return COUNTRIES.find((c) => c.code === countryCode)?.dialCode ?? "";
}

export default function CityTourPage() {
  usePageMeta(
    "Berlin City Tour",
    "Join the HPAM Germany 2026 Berlin City Tour. Reserve your place.",
  );

  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [dialCode, setDialCode] = useState(dialCodeFor(DEFAULT_COUNTRY));
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState(1);
  const [names, setNames] = useState<string[]>([""]);
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Seats left on the tour. Three meanings, all distinct:
  //   undefined — still loading; render neither the form nor the sold-out note
  //   null      — the count could not be read; fail open, offer the full form
  //   number    — seats left, 0 meaning full
  const [remaining, setRemaining] = useState<number | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let active = true;
    fetchSeatsRemaining()
      .then((seats) => {
        if (active) setRemaining(seats);
      })
      // fetchSeatsRemaining already returns null instead of throwing; this is
      // belt and braces so an unexpected throw still leaves the form usable
      // rather than stranding the page on the spinner.
      .catch(() => {
        if (active) setRemaining(null);
      });
    return () => {
      active = false;
    };
  }, []);

  // Largest group still bookable. Unknown count (null) offers the full range —
  // the backend does not enforce the cap, so failing open is a deliberate call.
  const maxSelectable = Math.min(MAX_ATTENDEES, remaining ?? MAX_ATTENDEES);

  const total = useMemo(() => count * DONATION_EUR, [count]);

  // Resize the name list, preserving anything already typed.
  const handleCountChange = (next: number) => {
    setCount(next);
    setNames((prev) => Array.from({ length: next }, (_, i) => prev[i] ?? ""));
    setErrors((e) => ({ ...e, names: undefined }));
  };

  const handleCountryChange = (next: string) => {
    setCountry(next);
    setDialCode(dialCodeFor(next));
    setErrors((e) => ({ ...e, country: undefined }));
  };

  const updateName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
    setErrors((e) => {
      if (!e.names?.[index]) return e;
      const next = { ...e.names };
      delete next[index];
      return { ...e, names: next };
    });
  };

  // Mirrors the backend's CityTourInput validators, so the common mistakes are
  // caught before a round trip. The backend remains the authority.
  const validate = (): Errors => {
    const next: Errors = {};

    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address.";

    if (!country) next.country = "Country is required.";

    const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
    if (!digits) next.phone = "Mobile number is required.";
    else if (digits.length < 5) next.phone = "That number looks too short.";
    else if (digits.length > 14) next.phone = "That number looks too long.";

    const nameErrors: Record<number, string> = {};
    names.forEach((raw, i) => {
      const n = raw.trim().replace(/\s+/g, " ");
      if (!n) nameErrors[i] = "Full name is required.";
      else if (n.length > 100)
        nameErrors[i] = "Full name must be 100 characters or fewer.";
      else if (/[<>&]/.test(n))
        nameErrors[i] = "Please remove the characters < > &";
    });
    if (Object.keys(nameErrors).length > 0) next.names = nameErrors;

    if (!terms) next.terms = "Please accept the terms to continue.";

    return next;
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const { payment_url } = await submitCityTour({
        email,
        country,
        dialCode,
        phone,
        memberNames: names,
        termsAccepted: terms,
      });
      // Tells /payment/cancel to send an abandoned checkout back here rather
      // than to the main registration — the cancel_url is shared by both flows.
      markPaymentFlow("city-tour");
      // Full navigation, not a router push — this leaves the SPA for Stripe.
      window.location.href = payment_url;
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
    // No setSubmitting(false) on success: the redirect is in flight and the
    // button must stay disabled so the tour cannot be booked twice.
  };

  // Hold the form back until the seat count lands. Rendering it first would
  // paint a bookable form and then pull it away when a full tour comes back.
  if (remaining === undefined) {
    return (
      <Box sx={s.outer}>
        <Paper elevation={3} sx={s.paper}>
          <Typography sx={s.heading}>Berlin City Tour</Typography>
          <Box sx={s.loadingBox}>
            <CircularProgress sx={{ color: C.purple700 }} />
          </Box>
        </Paper>
      </Box>
    );
  }

  if (remaining === 0) {
    return (
      <Box sx={s.outer}>
        <Paper elevation={3} sx={s.paper}>
          <Typography sx={s.heading}>Berlin City Tour</Typography>
          <Box sx={s.soldOutBox}>
            <Typography variant="h3" component="p" sx={s.soldOutHeading}>
              The tour is fully booked
            </Typography>
            <Typography sx={s.soldOutBody}>
              Jai Swaminarayan, every place on the Berlin City Tour has now been
              taken. For any queries, please contact:
            </Typography>

            {/* Read from PEOPLE rather than repeating the number here —
                RegistrationClosed renders the same entries for the main
                registration, so the digits live in data.ts alone. */}
            <Box sx={s.soldOutContact}>
              <Typography sx={s.soldOutContactName}>
                {TOUR_CONTACT.name}
              </Typography>
              <Box
                component="a"
                href={TOUR_CONTACT.phone}
                sx={s.soldOutContactLink}
              >
                {TOUR_CONTACT.phone.replace("tel:", "")}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={s.outer}>
      <Paper elevation={3} sx={s.paper}>
        <Typography sx={s.heading}>Berlin City Tour</Typography>
        <Typography variant="body2" sx={s.subheading}>
          Reserve your place.
        </Typography>

        <Box sx={s.fieldStack}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((x) => ({ ...x, email: undefined }));
            }}
            error={!!errors.email}
            helperText={errors.email ?? "Your confirmation will be sent here."}
            autoComplete="email"
          />

          <FormControl fullWidth required error={!!errors.country}>
            <InputLabel>Country of residence</InputLabel>
            <Select
              value={country}
              label="Country of residence"
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {c.flag}&nbsp;&nbsp;{c.label}
                </MenuItem>
              ))}
            </Select>
            {errors.country && (
              <FormHelperText>{errors.country}</FormHelperText>
            )}
          </FormControl>

          <Box>
            <Box sx={s.phoneRow}>
              <FormControl sx={s.dialCodeSelect}>
                <InputLabel>Code</InputLabel>
                <Select
                  value={dialCode}
                  label="Code"
                  onChange={(e) => setDialCode(e.target.value)}
                >
                  {/* Several countries share a dial code (+1), so the ISO code
                      is the key while the value stays the dial code itself. */}
                  {COUNTRIES.map((c) => (
                    <MenuItem key={c.code} value={c.dialCode}>
                      {c.flag}&nbsp;{c.dialCode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                label="Mobile number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((x) => ({ ...x, phone: undefined }));
                }}
                error={!!errors.phone}
                autoComplete="tel-national"
                placeholder="176 1234567"
              />
            </Box>
            <FormHelperText error={!!errors.phone} sx={{ mx: 1.75 }}>
              {errors.phone ?? "Without the leading 0."}
            </FormHelperText>
          </Box>

          <FormControl fullWidth required>
            <InputLabel>Number of attendees</InputLabel>
            <Select
              value={count}
              label="Number of attendees"
              onChange={(e) => handleCountChange(Number(e.target.value))}
            >
              {/* Capped at the seats left, so a group of five cannot book into
                  a tour with three places open. */}
              {Array.from({ length: maxSelectable }, (_, i) => i + 1).map(
                (n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>

          <Typography variant="subtitle2" sx={s.attendeesHeading}>
            {count === 1 ? "Attendee name" : "Attendee names"}
          </Typography>

          {names.map((name, i) => (
            <TextField
              key={i}
              fullWidth
              required
              label={`Full name ${i + 1}`}
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              error={!!errors.names?.[i]}
              helperText={errors.names?.[i]}
              autoComplete="off"
            />
          ))}

          <FormControl error={!!errors.terms}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={terms}
                  onChange={(e) => {
                    setTerms(e.target.checked);
                    setErrors((x) => ({ ...x, terms: undefined }));
                  }}
                  sx={{
                    color: C.purple600,
                    "&.Mui-checked": { color: C.purple700 },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I accept the terms and the data privacy policy.
                </Typography>
              }
            />
            {errors.terms && <FormHelperText>{errors.terms}</FormHelperText>}
          </FormControl>
        </Box>

        <Box sx={s.totalBox}>
          <Box>
            <Typography sx={s.totalLabel}>
              {count} × €{DONATION_EUR} per person
            </Typography>
            <Typography sx={s.totalAmount}>€{total.toFixed(2)}</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: C.muted, maxWidth: 280 }}>
            For the Berlin City Tour, collected securely via Stripe.
          </Typography>
        </Box>

        {submitError && (
          <Alert severity="error" sx={{ mt: 3, whiteSpace: "pre-line" }}>
            {submitError}
          </Alert>
        )}

        <Button
          variant="contained"
          color="inherit"
          onClick={handleSubmit}
          disabled={submitting}
          sx={s.submitButton}
        >
          {submitting ? (
            <>
              <CircularProgress size={18} sx={{ color: "white", mr: 1.5 }} />
              Redirecting…
            </>
          ) : (
            "Continue to payment →"
          )}
        </Button>

        <Typography variant="caption" sx={s.footnote}>
          You will be redirected to Stripe to complete your payment.
        </Typography>
      </Paper>
    </Box>
  );
}
