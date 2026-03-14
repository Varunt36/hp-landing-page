# Payment Cancel & Retry — Design Spec

**Date:** 2026-03-14
**Branch:** nikul-ui-getData4Frontend
**Scope:** Frontend-only

---

## Problem

When a user cancels or abandons the Stripe checkout, they are redirected to `/payment/cancel`. The current page shows a minimal message and a "Try Again" button that links to `/#register` — an empty form. Users with multiple members lose all their previously entered data and must re-enter everything from scratch.

---

## Solution: Approach 1 — Save & Reuse Stripe URL

Before redirecting to Stripe, save the full booking data and the Stripe session URL to `sessionStorage`. On the cancel page, read that data to show a booking summary and provide a one-click "Retry Payment" button.

No backend changes required. No new API endpoints.

---

## Architecture

### Data Flow

```
Step 4 handlePay()
  → POST /create-payment  →  { reference, payment_url }
  → sessionStorage.setItem('hp_confirm_ref',  reference)      ← already exists
  → sessionStorage.setItem('hp_payment_url',  payment_url)    ← NEW
  → sessionStorage.setItem('hp_form_data',    JSON({ groupInfo, members }))  ← NEW
  → window.location.href = payment_url

Stripe hosted checkout
  → cancel  →  /payment/cancel
  → success →  /payment/success

/payment/cancel
  → read hp_form_data, hp_confirm_ref, hp_payment_url from sessionStorage
  → render booking summary
  → "Retry Payment" → window.location.href = hp_payment_url
  → fallback if hp_payment_url missing → show expiry message + link to /#register
```

---

## Component Changes

### 1. `src/components/form/Step4Payment.tsx`

**Change:** In `handlePay()`, after receiving `result` from `submitRegistration()` and before `window.location.href = result.payment_url`, add:

```ts
sessionStorage.setItem('hp_form_data',   JSON.stringify({ groupInfo, members }))
sessionStorage.setItem('hp_payment_url', result.payment_url)
```

No other changes to this file.

### 2. `src/pages/PaymentCancel.tsx`

**Replace** the current minimal UI with a booking summary page:

**Data sources (all from sessionStorage):**
- `hp_confirm_ref` — reference number (already read via `params.get('ref') || sessionStorage.getItem('hp_confirm_ref')`). Note: the backend may or may not append `?ref=` to the Stripe cancel URL; the sessionStorage fallback is the reliable path.
- `hp_payment_url` — Stripe session URL for retry
- `hp_form_data` — `{ groupInfo, members: MemberDetail[] }`

**Pricing:** Import `PRICING` from `../data/data` and calculate totals client-side (same logic as Step 4's `PaymentSummary` component). Use `members.length` (not `groupInfo.memberCount`) as the authoritative member count for all pricing calculations, since that is what was actually submitted to the backend.

**Styles:** Import and reuse `step4Styles` from `../components/form/Step4Payment.styles` for the booking summary box (`summaryBox`, `memberRow`, `divider`, `totalRow`). Add any cancel-page-specific tokens to `PaymentCancel.styles.ts` only if they differ from the Step 4 tokens.

**UI sections:**
1. Cancel icon + "Payment Cancelled" heading (keep existing)
2. Reference number row (keep existing)
3. **Booking summary box** — list each member's full name + per-person price (using `members.length` for count), then base total, service fee, and grand total (reuse `step4Styles` layout tokens)
4. "Retry Payment" primary button — `window.location.href = hp_payment_url`
5. "Back to Home" secondary button (keep existing)
6. **Expiry fallback** — if `hp_payment_url` is falsy, replace the retry button with: *"Your payment session has expired. Please register again."* and a "Register Again" link to `/#register`

---

## Session Storage Keys (full set after this change)

| Key | Status | Written in | Read in | Purpose |
|---|---|---|---|---|
| `hp_confirm_ref` | existing | Step4Payment | PaymentCancel, PaymentSuccess | Reference number |
| `hp_payment_url` | **NEW** | Step4Payment | PaymentCancel | Stripe session URL for retry |
| `hp_form_data` | **NEW** | Step4Payment | PaymentCancel | Member names + group info for summary |

---

## Error Handling

- `hp_form_data` missing or malformed (e.g. sessionStorage cleared): skip the booking summary box entirely — do not attempt to render member rows or compute totals. Show only the reference number and retry button (if `hp_payment_url` exists). The `JSON.parse` call must be wrapped in a try/catch; validate that the result has a non-empty `members` array before rendering.
- `hp_payment_url` missing: hide retry button, show expiry message + "Register Again" link
- Stripe session expired (user retried after >24h): Stripe will show its own expired-session error page — acceptable for now

---

## Out of Scope

- Backend retry endpoint (`POST /retry-payment/{ref}`) — deferred
- Duplicate registration prevention — deferred to backend
- Pre-populating the full form from sessionStorage — not needed with this approach
- Clearing `hp_payment_url` / `hp_form_data` from sessionStorage on successful payment — accepted edge case; if a user completes payment then manually navigates to `/payment/cancel`, the stale retry button will appear but the consumed Stripe URL will simply show an error on Stripe's side
