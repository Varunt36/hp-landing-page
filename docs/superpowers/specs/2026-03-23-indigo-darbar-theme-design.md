# Indigo Darbar Theme — Design Spec
**Date:** 2026-03-23
**Project:** HariPrabodham 2026 Landing Page
**Status:** Approved

---

## Overview

Replace the current "Velvet Teal" theme (Theme 3) with a new "Indigo Darbar" palette that combines elegant devotional (deep royal indigo) with warm welcoming (saffron gold, warm ivory). The aesthetic should evoke a premium Indian spiritual event — like a beautifully printed mandir invitation or a Swaminarayan sabha programme card.

Additionally, fix four style files that hardcode colours from a different theme, causing visual inconsistency across the form flow.

---

## 1. Color Tokens

The `themes` map in `theme.ts` uses seven fixed field names per entry. Theme 5 must use exactly these same field names (the object is typed `as const` and consumed directly):

| Field name in `themes` map | MUI palette mapping | Value | Visual role |
|---|---|---|---|
| `primary` | `palette.primary.main` | `#2D2B6B` | Navbar, buttons, FAQ bg, borders |
| `secondary` | `palette.primary.dark` | `#4A4899` | Footer background |
| `accent` | `palette.secondary.main` | `#C8872A` | CTA buttons, email links, gold highlights |
| `bg` | `palette.background.default` | `#FDF8F0` | Page background, Register section, Venue section |
| `muted` | `palette.text.secondary` | `#7B5E3A` | Body copy, descriptions, captions |
| `dark` | `palette.text.primary` | `#1A1940` | Footer background (via `primary.dark`), body text |
| `heroGradient` | Exported as `HERO_GRADIENT` | See below | Hero section background |

**Hero Gradient:**
```
linear-gradient(to bottom, rgba(26,25,64,0.85) 0%, rgba(200,135,42,0.45) 100%),
linear-gradient(135deg, #1A1940 0%, #2D2B6B 50%, #7B3F00 100%)
```
Effect: deep midnight indigo at top fading into warm saffron/amber glow at bottom — evokes aarti sky.

---

## 2. Typography

- **Body / UI:** `DM Sans` (unchanged) — already imported via `@fontsource/dm-sans`
- **Headings (h1–h3):** Add `Cinzel, serif` — classical Roman serif that evokes inscribed stone; appropriate for a devotional event. Install `@fontsource/cinzel` and import in `main.tsx`.
- **Buttons:** DM Sans, `fontWeight: 600`, `textTransform: none` (unchanged)

**Theme typography config additions:**
```ts
h1: { fontFamily: '"Cinzel", serif', fontWeight: 700 }
h2: { fontFamily: '"Cinzel", serif', fontWeight: 700 }
h3: { fontFamily: '"Cinzel", serif', fontWeight: 700 }
```

---

## 3. Shape & Elevation

- `borderRadius: 12` — unchanged
- Form glass card `boxShadow`: change from hardcoded mauve `rgba(129,104,143,0.15)` → indigo `rgba(45,43,107,0.18)` (see Section 4.2)

---

## 4. Component Changes

### 4.1 `src/theme/theme.ts`
- Add Theme 5 "Indigo Darbar" entry in the `themes` map using the exact seven field names from Section 1
- Set `ACTIVE_THEME = 5`
- Update the `ACTIVE_THEME` comment block (lines 4–9) to add `5 = 🪔 Indigo Darbar`
- Add Cinzel `fontFamily` to h1, h2, h3 typography overrides
- Remove the stale inline comment `// #81688f mauve` on the `MuiTextField` `borderColor` line (it documents the old Theme 4 colour and will be incorrect once Theme 5 is active)

### 4.2 `src/components/sections/RegisterSection.styles.ts`
Two changes in this file:
1. `outerBox.background`: replace hardcoded `rgba(225,182,220,0.13) ... #F5EDF8` (lavender, Theme 1/4) with `rgba(45,43,107,0.08) ... #FDF8F0` (indigo tint on warm ivory)
2. `paper.boxShadow`: replace hardcoded `rgba(129, 104, 143, 0.15)` (mauve) with `rgba(45, 43, 107, 0.18)` (indigo)

### 4.3 `src/components/form/formShared.styles.ts`
- `nextButton.background` gradient uses exported `ACCENT` and `SECONDARY` constants — these will automatically pick up the new saffron gold (`#C8872A`) and medium indigo (`#4A4899`) with no string changes needed.
- Note: `payButton` in `Step4Payment.styles.ts` uses a **hardcoded** gradient (not constants) and must be updated separately — see Section 4.4.

### 4.4 `src/components/form/Step4Payment.styles.ts`
Five hardcoded colour fixes:
1. `summaryBox.background`: `rgba(129, 104, 143, 0.06)` → `rgba(45, 43, 107, 0.06)` (mauve → indigo tint)
2. `summaryBox.border`: `rgba(129, 104, 143, 0.2)` → `rgba(45, 43, 107, 0.2)` (mauve → indigo)
3. `divider.borderColor`: `rgba(129, 104, 143, 0.3)` → `rgba(45, 43, 107, 0.3)` (mauve → indigo)
4. `grandTotalRow.background`: `rgba(232, 197, 90, 0.15)` → `rgba(200, 135, 42, 0.15)` (old warm gold → new saffron gold)
5. `payButton.background` gradient: `linear-gradient(135deg, #E8C55A, #6ea096)` → `linear-gradient(135deg, ${ACCENT}, ${SECONDARY})` using imported constants (matches `nextButton` pattern); add `import { ACCENT, SECONDARY } from '../../theme/theme'` at top of file

### 4.5 `src/components/form/Step3Terms.styles.ts`
Two hardcoded colour fixes:
1. `termsBox.bgcolor`: `rgba(245, 237, 248, 0.8)` (lavender, Theme 1/4) → `rgba(253, 248, 240, 0.8)` (warm ivory tint, Theme 5 `bg`)
2. `termsBox.border`: `rgba(129,104,143,0.15)` (mauve) → `rgba(45, 43, 107, 0.15)` (indigo)

### 4.6 All other `*.styles.ts` files
No changes required — they reference MUI theme tokens (`primary.main`, `background.default`, `secondary.main`, etc.) which update automatically when the theme palette changes.

---

## 5. Section-by-Section Visual Result

| Section | Background | Key accent |
|---|---|---|
| Navbar | `#2D2B6B` deep indigo | White text |
| Hero | Indigo → saffron gradient | White title/text |
| About | `#FFFFFF` white | Indigo card top borders |
| Venue | `#FDF8F0` warm ivory | Alternates with white About |
| FAQ | `#2D2B6B` deep indigo (via `primary.main`) | White text, translucent white accordion cards |
| Register | `#FDF8F0` ivory radial with indigo tint | Indigo glass shadow |
| Footer | `#4A4899` medium indigo (via `primary.dark`) | Saffron gold email link |
| Admin Login | Indigo card header gradient | Auto from theme |

---

## 6. Files to Change

| File | Change type |
|---|---|
| `src/theme/theme.ts` | Add Theme 5, set `ACTIVE_THEME = 5`, add Cinzel to h1–h3 |
| `src/main.tsx` | Add `import '@fontsource/cinzel'` |
| `src/components/sections/RegisterSection.styles.ts` | Fix hardcoded lavender bg + mauve shadow |
| `src/components/form/Step4Payment.styles.ts` | Fix hardcoded mauve summaryBox, old gold grandTotal, hardcoded payButton gradient |
| `src/components/form/Step3Terms.styles.ts` | Fix hardcoded lavender termsBox bg + mauve border |
| `package.json` | Add `@fontsource/cinzel` dependency |

---

## 7. Out of Scope

- No structural/layout changes
- No new components
- No changes to data, routing, or API logic
- No changes to `*.styles.ts` files that already use MUI theme tokens correctly
