# Registration Landing Page — Design Doc
**Date:** 2026-03-05
**Project:** YDS Germany Event Registration
**Event:** Na me rahu na meri arzoo rahe — Aug 16–18, 2026, Berlin
**Reference:** hariprabodham.org.nz/bhakti-utsav-2026

---

## Overview

A single self-contained `index.html` prototype for an event registration landing page to be embedded under `yds-germany.de/events/`. No build tools required — open in browser directly.

---

## Visual Design

- **Colors:** Deep blue `#365288` (nav, backgrounds), Orange `#F37C3E` (CTAs, accents), Off-white `#F9F7F4` (section backgrounds)
- **Font:** DM Sans (Google Fonts) — matching YDS Germany brand
- **Aesthetic:** Warm spiritual feel, consistent with hariprabodham.org.nz reference

---

## Page Sections (top to bottom)

1. **Sticky Nav** — Logo + anchor links to page sections
2. **Hero Banner** — Full-width event art background, stylized event name, dates & location, [Register Now] CTA button
3. **About the Event** — Short spiritual description + 3 info cards (Date / Location / Organised by)
4. **Venue & How to Reach** — Address card + embedded map iframe + travel tips (train/car/plane)
5. **FAQ** — Accordion-style, 5–6 placeholder questions
6. **Registration Form** — Multi-step inline form (see below)
7. **Footer** — © YDS Germany, contact info

---

## Registration Form — 5 Steps

Progress bar shows current step throughout.

### Step 1 — Group Info
- Country of residence (dropdown)
- Local karyakarta / contact name (text)
- Number of family members attending (dropdown 1–10, note: min 1 adult over 18)

### Step 2 — Member Details (repeats per member)
- Sub-header: "Member X of N"
- Full name: First / Middle / Last
- Gender: Male / Female (radio)
- Date of birth (date picker)
- Email (member 1 only)
- Phone (member 1 only)

### Step 3 — Terms & Seva
- "In the Spirit of Seva" heading
- Scrollable T&C text (Participation & Responsibility, Health & Safety, etc.)
- Checkbox: "I agree to the above terms"

### Step 4 — Payment Summary
- Per-member price rows
- Base total / Service fee / Grand total
- Credit card fields (Stripe-style): First Name, Last Name, Card Number, MM/YY, CVC, Country

### Step 5 — Confirmation
- "Registration Received!" success screen
- Registrant name + reference number
- "Check your email" note

---

## Deliverable

Single file: `index.html` — fully self-contained, no external dependencies except Google Fonts and a placeholder map embed.
