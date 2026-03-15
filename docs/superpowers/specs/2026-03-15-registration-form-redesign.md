# Registration Form Redesign — Glassmorphism Option A

**Date:** 2026-03-15
**Scope:** Registration form steps 1–4, progress stepper, section wrapper
**Theme:** Boudoir Luxe (Theme 4) — mauve `#81688f`, sea glass `#6ea096`, warm gold `#E8C55A`

---

## 1. Goals

- Elevate the visual quality of the multi-step registration form to match the premium feel of the event
- Fix inconsistent field spacing and UX across all steps
- Improve mobile experience (full-width buttons, responsive field layout)
- Add smooth step-enter animations
- Replace the plain MUI stepper with a branded custom progress indicator

---

## 2. Affected Files

| File | Change |
|------|--------|
| `src/components/sections/RegisterSection.tsx` | Background gradient, glass Paper, step transition wrapper |
| `src/components/sections/RegisterSection.styles.ts` | New glassmorphism styles |
| `src/components/form/ProgressStepper.tsx` | Replace with custom icon stepper |
| `src/components/form/ProgressStepper.styles.ts` | Custom stepper styles |
| `src/components/form/formShared.styles.ts` | **New file** — shared `navBox` responsive style |
| `src/components/form/Step1GroupInfo.tsx` | Use shared navBox, gap-based spacing |
| `src/components/form/Step1GroupInfo.styles.ts` | Gap-based spacing, import shared navBox |
| `src/components/form/Step2MemberDetails.tsx` | Member Chip badge, field spacing |
| `src/components/form/Step2MemberDetails.styles.ts` | Gap-based spacing, import shared navBox |
| `src/components/form/Step3Terms.tsx` | Terms card visual upgrade |
| `src/components/form/Step3Terms.styles.ts` | Inner card styles, shared navBox |
| `src/components/form/Step4Payment.tsx` | Payment card, shimmer pay button, spinner |
| `src/components/form/Step4Payment.styles.ts` | New inner card, divider/text colors, shimmer |
| `src/theme/theme.ts` | MUI TextField/Select overrides, global borderRadius update |
| `src/components/form/Step5Confirmation.tsx` | No changes |
| `src/components/form/Step5Confirmation.styles.ts` | No changes |
| `src/pages/PaymentSuccess.tsx` | No changes — addressed in a follow-up |
| `src/pages/PaymentCancel.tsx` | No changes — addressed in a follow-up |

---

## 3. Design Details

### 3.1 RegisterSection — Glass Card Wrapper

**Outer box background:**
```
background: radial-gradient(ellipse at top, rgba(225,182,220,0.13) 0%, #F5EDF8 60%)
```

**Paper (glass card):**
```
background: rgba(255, 255, 255, 0.65)
backdropFilter: blur(20px)
border: 1px solid rgba(255, 255, 255, 0.4)
boxShadow: 0 8px 40px rgba(129, 104, 143, 0.15)
borderRadius: 20px
padding: { xs: '24px', md: '40px' }
```

---

### 3.2 Custom Progress Stepper

Replace the default MUI `Stepper` and all `Step`/`StepLabel` MUI components entirely with custom JSX using `Box` and `Typography`. Do not use MUI's `Stepper` component as a base — the required styling (custom icons, custom connector, label visibility toggle) would require deeper overrides than a full replacement. Accessibility: each step circle gets `role="img"` and `aria-label` for screen readers.

**Step circles:** 40×40px, border-radius 50%
- **Pending:** `border: 2px solid #c5b8cc`, `color: #c5b8cc`, numbered label inside
- **Active:** `background: #81688f`, `color: white`, `boxShadow: 0 0 0 4px rgba(129,104,143,0.25)`, numbered label
- **Complete:** `background: #6ea096`, `color: white`, MUI `CheckIcon` (fontSize 18) inside

**Connector line:** `height: 2px`, `flex: 1`, `mx: 0.5`
- Pending: `background: #c5b8cc`
- Complete: `background: #6ea096`

**Labels:** MUI `Typography` `variant="caption"` centered below each circle
- Desktop (≥ `sm` / 600px): all labels visible
- Mobile (< `sm`): only the active step label visible; others `display: none`

No external libraries — implemented with `Box`, `Typography`, MUI `CheckIcon` only.

---

### 3.3 Form Fields — Global Overrides (`theme.ts`)

**Change global `shape.borderRadius` from `10` to `12`.** Update the existing `MuiButton` override to keep buttons at `10` explicitly:

```ts
shape: { borderRadius: 12 },
components: {
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 10, padding: '12px 28px' },
      sizeLarge: { padding: '14px 36px', fontSize: '16px' },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          background: 'rgba(255,255,255,0.8)',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY,   // PRIMARY = #81688f (mauve)
            borderWidth: 2,
          },
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      outlined: {
        background: 'rgba(255,255,255,0.8)',
      },
    },
  },
}
```

**Field spacing in all steps:** Replace ad-hoc `mt` values with a `Box` wrapper using `display: 'flex', flexDirection: 'column', gap: '20px'` around all fields in each step.

---

### 3.4 Step Transitions (Enter Only)

Exit animation is **not in scope** — implementing exit requires a `setTimeout` delay before the Zustand `setStep` call, which would touch store logic and falls outside the visual-only redesign. Only enter animation is implemented.

**Mechanism:**
1. In `RegisterSection.tsx`, wrap the active step component in a `Box` with `key={currentStep}`:
   ```tsx
   <Box key={currentStep} sx={registerStyles.stepWrapper}>
     {stepComponents[currentStep]}
   </Box>
   ```
2. `stepWrapper` applies `animation: 'slideIn 300ms ease both'`
3. `@keyframes slideIn` is defined in `src/index.css`:
   ```css
   @keyframes slideIn {
     from { opacity: 0; transform: translateX(24px); }
     to   { opacity: 1; transform: translateX(0); }
   }
   ```
   React's remount on `key` change triggers this animation on every step transition.

---

### 3.5 Step 2 — Member Badge

Replace plain `"Member 1 of 4"` `Typography` with a MUI `Chip`:
```tsx
<Chip
  label={`Member ${currentMember} of ${groupInfo.memberCount}`}
  color="primary"
  variant="outlined"
  size="small"
  sx={{ mb: 2 }}
/>
```

**`middleName` field:** Not added in this redesign. "Field cleanup" means spacing/gap only — no new fields.

---

### 3.6 Step 4 — Payment Summary Card

**Inner card** (replaces solid mauve `summaryBox`):
```
background: rgba(129, 104, 143, 0.06)
border: 1px solid rgba(129, 104, 143, 0.2)
borderRadius: 14px
padding: 20px
```

**Text inside inner card:** Use theme default `text.primary` (dark `#4A3057`). All `color: 'white'` overrides on inner typography are removed.

**Divider inside inner card:**
```
borderColor: rgba(129, 104, 143, 0.3)   /* replaces rgba(255,255,255,0.2) */
```

**Total row highlight:**
```
background: rgba(232, 197, 90, 0.15)
borderRadius: 8px
padding: '8px 12px'
```

**Pay & Register button:**
- Do **not** use `color="secondary"` (MUI would override the gradient with palette color)
- Use `color="inherit"` and override `background` via `sx`:
  ```ts
  sx={{
    background: 'linear-gradient(135deg, #E8C55A, #6ea096)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&:hover::after': {
      content: '""',
      position: 'absolute',
      top: 0, left: '-100%',
      width: '100%', height: '100%',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
      animation: 'shimmer 800ms ease forwards',
    },
  }}
  ```
- `@keyframes shimmer` in `src/index.css`:
  ```css
  @keyframes shimmer {
    from { left: -100%; }
    to   { left: 100%; }
  }
  ```
- The `position: relative` and `overflow: hidden` on the button are required for the pseudo-element to clip correctly — they are included in the `sx` object above, not in `formShared.styles.ts`
- Loading state: replace button content with `<CircularProgress size={20} sx={{ color: 'white' }} />`

---

### 3.7 Shared Navigation Buttons (`formShared.styles.ts`)

**New file:** `src/components/form/formShared.styles.ts`

Exports a single shared style object used by all steps:

```ts
import type { SxProps, Theme } from '@mui/material'
import { ACCENT, SECONDARY } from '../../theme/theme'

export const sharedFormStyles: Record<string, SxProps<Theme>> = {
  navBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 4,
    flexDirection: { xs: 'column-reverse', sm: 'row' },
  },
  nextButton: {
    minWidth: { xs: '100%', sm: 140 },
    background: `linear-gradient(135deg, ${ACCENT}, ${SECONDARY})`,
    color: 'white',
  },
  backButton: {
    minWidth: { xs: '100%', sm: 100 },
  },
}
```

Each step's `.styles.ts` removes its own `navBox`/`nextButton` and imports from `sharedFormStyles` instead.

**All Next buttons in Steps 1–3** must use `color="inherit"` (not `color="secondary"`) so MUI does not override the gradient `background` from `sharedFormStyles.nextButton`. The gradient is `linear-gradient(135deg, ${ACCENT}, ${SECONDARY})` where `ACCENT=#E8C55A` and `SECONDARY=#6ea096`.

The Pay button in Step 4 spreads `sharedFormStyles.nextButton` and adds the shimmer overrides from section 3.6 (`position: relative`, `overflow: hidden`, `&:hover::after` shimmer). It also uses `color="inherit"`.

---

## 4. What Is Not Changing

- Form logic, validation, Zustand store state
- Step 5 (Confirmation) — no visual changes
- `PaymentSuccess.tsx` / `PaymentCancel.tsx` — no changes; glass treatment for these pages is a follow-up task
- Routing, API calls, Stripe integration
- Theme palette colors and font
- `middleName` field — stored but not rendered; no change

---

## 5. Success Criteria

- [ ] Glass card renders correctly on desktop and mobile with frosted appearance
- [ ] Outer section has radial gradient background (not plain white)
- [ ] Custom stepper shows correct pending/active/complete states for all 5 steps
- [ ] Stepper connector lines fill correctly as steps complete
- [ ] Mobile stepper hides non-active labels below 600px
- [ ] All form fields have consistent 20px gap spacing across all steps
- [ ] Step enter animation (slideIn) plays on every step transition
- [ ] Member Chip badge shows "Member X of Y" in Step 2
- [ ] Step 4 inner card is translucent (not solid mauve) with dark text
- [ ] Step 4 divider is visible on light background
- [ ] Step 4 total row has gold highlight
- [ ] Pay button has gradient fill and shimmer on hover
- [ ] Pay button shows CircularProgress spinner during loading
- [ ] Navigation buttons stack full-width on mobile (xs)
- [ ] `MuiButton` stays at borderRadius 10 after global shape change to 12
