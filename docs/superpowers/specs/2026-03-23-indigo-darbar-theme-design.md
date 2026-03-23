# Indigo Darbar Theme — Design Spec
**Date:** 2026-03-23
**Project:** HariPrabodham 2026 Landing Page
**Status:** Approved

---

## Overview

Replace the current "Velvet Teal" theme (Theme 3) with a new "Indigo Darbar" palette that combines elegant devotional (deep royal indigo) with warm welcoming (saffron gold, warm ivory). The aesthetic should evoke a premium Indian spiritual event — like a beautifully printed mandir invitation or a Swaminarayan sabha programme card.

Additionally, fix two hardcoded style files that reference colours from a different theme, causing visual inconsistency.

---

## 1. Color Tokens

| Token | Value | Usage |
|---|---|---|
| `primary` | `#2D2B6B` | Navbar, buttons, borders, active states |
| `secondary` (dark variant) | `#4A4899` | Hover states, footer bg via `primary.dark` |
| `accent` | `#C8872A` | CTA buttons, email links, gold highlights |
| `bg` | `#FDF8F0` | Page background, Register section, Venue section |
| `muted` | `#7B5E3A` | `text.secondary` — body copy, descriptions, captions |
| `dark` | `#1A1940` | Footer background, deepest hero layer |
| `heroGradient` | See below | Hero section background |

**Hero Gradient:**
```
linear-gradient(to bottom, rgba(26,25,64,0.85) 0%, rgba(200,135,42,0.45) 100%),
linear-gradient(135deg, #1A1940 0%, #2D2B6B 50%, #7B3F00 100%)
```
Effect: deep midnight indigo at top fading into warm saffron/amber glow at bottom — evokes aarti sky.

---

## 2. Typography

- **Body / UI:** `DM Sans` (unchanged) — already imported via `@fontsource/dm-sans`
- **Headings (h1–h3):** Add `Cinzel, serif` — classical Roman serif that evokes inscribed stone; appropriate for a devotional event. Import via `@fontsource/cinzel`.
- **Buttons:** DM Sans, `fontWeight: 600`, `textTransform: none` (unchanged)

**Theme typography config changes:**
```ts
h1: { fontFamily: '"Cinzel", serif', fontWeight: 700 }
h2: { fontFamily: '"Cinzel", serif', fontWeight: 700 }
h3: { fontFamily: '"Cinzel", serif', fontWeight: 700 }
```

---

## 3. Shape & Elevation

- `borderRadius: 12` — unchanged
- Form glass card `boxShadow`: change from hardcoded mauve `rgba(129,104,143,0.15)` → indigo `rgba(45,43,107,0.18)`

---

## 4. Component Changes

### 4.1 `theme.ts`
- Add Theme 5 "Indigo Darbar" entry in the `themes` map with the tokens above
- Set `ACTIVE_THEME = 5`
- Add Cinzel to h1/h2/h3 typography overrides
- Install `@fontsource/cinzel` and import in `main.tsx`

### 4.2 `RegisterSection.styles.ts`
- `outerBox.background`: replace hardcoded `rgba(225,182,220,0.13) ... #F5EDF8` (lavender, Theme 1/4) with `rgba(45,43,107,0.08) ... #FDF8F0` (indigo tint on warm ivory)

### 4.3 `formShared.styles.ts`
- `nextButton.background` gradient: currently `linear-gradient(135deg, ACCENT, SECONDARY)` — this will automatically pick up the new saffron gold → medium indigo. No string change needed, just verify it reads correctly with new tokens.

### 4.4 All other style files
No changes required — they reference MUI theme tokens (`primary.main`, `background.default`, `secondary.main`, etc.) which will update automatically when the theme palette changes.

---

## 5. Section-by-Section Visual Result

| Section | Background | Key accent |
|---|---|---|
| Navbar | `#2D2B6B` deep indigo | White text |
| Hero | Indigo → saffron gradient | White title/text |
| About | `#FFFFFF` white | Indigo card borders |
| Venue | `#FDF8F0` warm ivory | Alternating with white |
| FAQ | `#FFFFFF` white | Saffron gold accordion |
| Register | `#FDF8F0` ivory radial | Indigo glass shadow |
| Footer | `#1A1940` midnight indigo | Saffron gold email link |
| Admin Login | Indigo card header gradient | Auto from theme |

---

## 6. Files to Change

| File | Change type |
|---|---|
| `src/theme/theme.ts` | Add Theme 5, set `ACTIVE_THEME = 5`, add Cinzel to h1–h3 |
| `src/main.tsx` | Add `import '@fontsource/cinzel'` |
| `src/components/sections/RegisterSection.styles.ts` | Fix hardcoded lavender background |
| `package.json` | Add `@fontsource/cinzel` dependency |

---

## 7. Out of Scope

- No structural/layout changes
- No new components
- No changes to data, routing, or API logic
- No changes to `*.styles.ts` files that already use MUI theme tokens correctly
