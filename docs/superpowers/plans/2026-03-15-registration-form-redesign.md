# Registration Form Redesign — Glassmorphism Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the 5-step registration form with glassmorphism card styling, a custom icon progress stepper, consistent field spacing, step-enter animations, and upgraded payment UI.

**Architecture:** Visual-only changes — no logic, validation, store state, or API changes. All style changes are isolated to `.styles.ts` files and `sx` props. A new `formShared.styles.ts` centralises nav button styles used by all 4 active steps.

**Tech Stack:** React 18, TypeScript, MUI v5, Zustand, Vite. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-03-15-registration-form-redesign.md`

---

## Chunk 1: Foundation — CSS Keyframes, Theme, Shared Styles

### Task 1: Add CSS keyframes to `src/index.css`

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add `slideIn` and `shimmer` keyframes**

Replace the entire contents of `src/index.css` with:

```css
/* Global styles — MUI CssBaseline handles resets */

@keyframes slideIn {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes shimmer {
  from { left: -100%; }
  to   { left: 100%; }
}
```

- [ ] **Step 2: Verify the file saved correctly**

Open `src/index.css` and confirm both keyframes are present.

---

### Task 2: Update `src/theme/theme.ts` — global borderRadius + MUI overrides

**Files:**
- Modify: `src/theme/theme.ts`

- [ ] **Step 1: Change `shape.borderRadius` from 10 to 12**

Find line 94:
```ts
  shape: { borderRadius: 10 },
```
Change to:
```ts
  shape: { borderRadius: 12 },
```

- [ ] **Step 2: Add `MuiTextField` and `MuiSelect` overrides inside `components`**

The existing `components` block starts at line 95. After the closing `}` of `MuiContainer` (around line 104), add:

```ts
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255,255,255,0.8)',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: c.primary,   // #81688f mauve
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
```

- [ ] **Step 3: Keep `MuiButton.root.borderRadius` explicitly at 10**

Confirm the existing `MuiButton` override still reads:
```ts
root: { borderRadius: 10, padding: '12px 28px' },
```
If it does not have `borderRadius: 10`, add it. This prevents the global `shape: { borderRadius: 12 }` from rounding buttons too much.

- [ ] **Step 4: Verify the app still compiles**

Run: `npm run dev`
Expected: Dev server starts with no TypeScript errors in the console.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/theme/theme.ts
git commit -m "style: add CSS keyframes and MUI theme overrides for form redesign"
```

---

### Task 3: Create `src/components/form/formShared.styles.ts`

**Files:**
- Create: `src/components/form/formShared.styles.ts`

- [ ] **Step 1: Create the new file**

```ts
// src/components/form/formShared.styles.ts
// Shared navigation button and layout styles used by all registration form steps.
// Import sharedFormStyles here instead of duplicating navBox/nextButton per-step.

import type { SxProps, Theme } from '@mui/material'
import { ACCENT, SECONDARY } from '../../theme/theme'

export const sharedFormStyles: Record<string, SxProps<Theme>> = {
  // Navigation row — right-aligns buttons with gap between them.
  // flex-end ensures a single button (Step 1) goes right, not left.
  // Two buttons (Steps 2-4) cluster right: [Back] [Next/Pay].
  navBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 4,
    flexDirection: { xs: 'column-reverse', sm: 'row' },
  },

  // Next / primary action button — gradient fill, full-width on mobile
  nextButton: {
    minWidth: { xs: '100%', sm: 140 },
    background: `linear-gradient(135deg, ${ACCENT}, ${SECONDARY})`,
    color: 'white',
  },

  // Back button — outlined, full-width on mobile
  backButton: {
    minWidth: { xs: '100%', sm: 100 },
  },
}
```

- [ ] **Step 2: Verify TypeScript resolves the imports**

Run: `npm run dev`
Expected: No errors — `ACCENT` and `SECONDARY` are already exported from `theme.ts`.

Note: The migration of each step to import from this file happens in Tasks 6–9 (Chunks 3–4). This task only creates the shared file.

- [ ] **Step 3: Commit**

```bash
git add src/components/form/formShared.styles.ts
git commit -m "style: add shared form nav button styles"
```

---

## Chunk 2: Shell — RegisterSection Glass Card + Custom Stepper

### Task 4: Update `RegisterSection.styles.ts` and `RegisterSection.tsx`

**Files:**
- Modify: `src/components/sections/RegisterSection.styles.ts`
- Modify: `src/components/sections/RegisterSection.tsx`

- [ ] **Step 1: Replace `RegisterSection.styles.ts` entirely**

```ts
// src/components/sections/RegisterSection.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const registerStyles: Record<string, SxProps<Theme>> = {
  // Outer section — radial gradient so the glass card has depth behind it
  outerBox: {
    background: 'radial-gradient(ellipse at top, rgba(225,182,220,0.13) 0%, #F5EDF8 60%)',
    py: { xs: 7, md: 10 },
  },

  // Frosted glass card that wraps each form step
  paper: {
    maxWidth: 600,
    mx: 'auto',
    p: { xs: '24px', md: '40px' },
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 40px rgba(129, 104, 143, 0.15)',
  },

  // Step transition wrapper — receives key={currentStep} to trigger slideIn on remount
  stepWrapper: {
    animation: 'slideIn 300ms ease both',
  },
}
```

- [ ] **Step 2: Update `RegisterSection.tsx` — wrap step component with keyed `Box`**

Open `src/components/sections/RegisterSection.tsx`. Find the `<Paper>` block:
```tsx
        <Paper
          elevation={0}
          sx={registerStyles.paper}
        >
          {stepComponents[currentStep]}
        </Paper>
```

Replace with:
```tsx
        <Paper
          elevation={0}
          sx={registerStyles.paper}
        >
          <Box key={currentStep} sx={registerStyles.stepWrapper}>
            {stepComponents[currentStep]}
          </Box>
        </Paper>
```

Also add `Box` to the existing import if it isn't already there:
```tsx
import { Box, Container, Typography, Paper } from '@mui/material'
```

- [ ] **Step 3: Visual check**

Run `npm run dev`, open the browser. The register section should have a soft radial gradient background (not flat white). The Paper should appear frosted/translucent. Clicking Next should trigger a subtle slide-in on the next step.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/RegisterSection.styles.ts src/components/sections/RegisterSection.tsx
git commit -m "style: glassmorphism card and step slide-in animation for RegisterSection"
```

---

### Task 5: Replace `ProgressStepper.tsx` with custom icon stepper

**Files:**
- Modify: `src/components/form/ProgressStepper.tsx`
- Modify: `src/components/form/ProgressStepper.styles.ts`

- [ ] **Step 1: Replace `ProgressStepper.styles.ts` entirely**

```ts
// src/components/form/ProgressStepper.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const progressStyles: Record<string, SxProps<Theme>> = {
  wrapper: {
    maxWidth: 560,
    mx: 'auto',
    my: 5,
  },
  // Row that holds circles + connectors
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Label row beneath the circles
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 1,
  },
  // Connector line between circles
  connector: {
    flex: 1,
    height: '2px',
    mx: 0.5,
  },
}
```

- [ ] **Step 2: Replace `ProgressStepper.tsx` entirely**

```tsx
// src/components/form/ProgressStepper.tsx
// Custom branded step indicator — replaces the default MUI Stepper.
// Shows numbered circles (pending), filled circles (active/complete), and connecting lines.

import { Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useRegistrationStore } from '../../store/registrationStore'
import { progressStyles } from './ProgressStepper.styles'

const STEPS = ['Group', 'Members', 'Terms', 'Payment', 'Done']

// Colors matching Boudoir Luxe theme
const PRIMARY   = '#81688f'   // active step fill
const SECONDARY = '#6ea096'   // complete step fill
const MUTED     = '#c5b8cc'   // pending step border/color

type CircleProps = { index: number; activeStep: number }

function StepCircle({ index, activeStep }: CircleProps) {
  const isComplete = index < activeStep
  const isActive   = index === activeStep

  const bg     = isComplete ? SECONDARY : isActive ? PRIMARY : 'transparent'
  const border = isComplete || isActive ? 'none' : `2px solid ${MUTED}`
  const color  = isComplete || isActive ? 'white' : MUTED
  const shadow = isActive ? `0 0 0 4px rgba(129,104,143,0.25)` : 'none'

  return (
    <Box
      role="img"
      aria-label={`Step ${index + 1}: ${STEPS[index]}${isComplete ? ' (complete)' : isActive ? ' (current)' : ''}`}
      sx={{
        width: 40, height: 40,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        background: bg,
        border,
        color,
        boxShadow: shadow,
        transition: 'all 300ms ease',
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {isComplete
        ? <CheckIcon sx={{ fontSize: 18 }} />
        : index + 1
      }
    </Box>
  )
}

export default function ProgressStepper() {
  const currentStep = useRegistrationStore((s) => s.currentStep)
  const activeStep  = currentStep - 1   // 0-based index

  return (
    <Box sx={progressStyles.wrapper}>
      {/* Circle row with connectors */}
      <Box sx={progressStyles.row}>
        {STEPS.map((label, i) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <StepCircle index={i} activeStep={activeStep} />
            {i < STEPS.length - 1 && (
              <Box
                sx={{
                  ...progressStyles.connector,
                  background: i < activeStep ? SECONDARY : MUTED,
                  transition: 'background 300ms ease',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Label row */}
      <Box sx={progressStyles.labelRow}>
        {STEPS.map((label, i) => (
          <Typography
            key={label}
            variant="caption"
            sx={{
              flex: 1,
              textAlign: 'center',
              color: i === activeStep ? PRIMARY : MUTED,
              fontWeight: i === activeStep ? 700 : 400,
              // Hide non-active labels on mobile
              display: { xs: i === activeStep ? 'block' : 'none', sm: 'block' },
              transition: 'color 300ms ease',
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Visual check**

Open the browser. The stepper should show:
- Step 1 active (filled mauve circle with glow, "Group" label)
- Steps 2–5 pending (outlined muted circles)
- Connector lines between all circles
- Click Next — Step 1 circle turns teal (complete) with a checkmark, Step 2 becomes mauve active
- On mobile, only the active step label should be visible

- [ ] **Step 4: Commit**

```bash
git add src/components/form/ProgressStepper.tsx src/components/form/ProgressStepper.styles.ts
git commit -m "style: replace MUI Stepper with custom branded icon stepper"
```

---

## Chunk 3: Form Steps — Step 1, Step 2, Step 3

### Task 6: Update Step 1 — `Step1GroupInfo.styles.ts` + `Step1GroupInfo.tsx`

**Files:**
- Modify: `src/components/form/Step1GroupInfo.styles.ts`
- Modify: `src/components/form/Step1GroupInfo.tsx`

- [ ] **Step 1: Replace `Step1GroupInfo.styles.ts` entirely**

```ts
// src/components/form/Step1GroupInfo.styles.ts
// Step 1 uses gap-based spacing (via the fieldStack wrapper in the component)
// rather than per-field mt values. navBox/nextButton come from formShared.styles.ts.
import type { SxProps, Theme } from '@mui/material'

export const step1Styles: Record<string, SxProps<Theme>> = {
  // Wraps all fields — gap drives uniform 20px spacing between each field
  fieldStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    mt: 3,
  },
}
```

- [ ] **Step 2: Update `Step1GroupInfo.tsx`**

Replace the entire file:

```tsx
// src/components/form/Step1GroupInfo.tsx
// Step 1 of the registration form.
// Collects group-level info: country, local karyakarta name, and number of members.
// On "Next", this data is saved to the global store and the form advances to Step 2.

import { useState } from 'react'
import {
  Typography, Box, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, FormHelperText,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { COUNTRIES, MAX_GROUP_SIZE } from '../../data/data'
import { step1Styles } from './Step1GroupInfo.styles'
import { sharedFormStyles } from './formShared.styles'

export default function Step1GroupInfo() {
  const { groupInfo, setGroupInfo, setStep } = useRegistrationStore()

  // Local state mirrors the store so edits don't affect global state until "Next" is clicked
  const [country,     setCountry]     = useState(groupInfo.country)
  const [karyakarta,  setKaryakarta]  = useState(groupInfo.karyakarta)
  const [memberCount, setMemberCount] = useState(groupInfo.memberCount)
  const [karyakartaError, setKaryakartaError] = useState('')

  // Validates, persists to store, then advances to Step 2
  const handleNext = () => {
    if (!karyakarta.trim()) {
      setKaryakartaError('Local karyakarta name is required.')
      return
    }
    setGroupInfo({ country, karyakarta, memberCount })
    setStep(2)
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        Group Information
      </Typography>

      {/* gap: 20px between all fields via fieldStack wrapper */}
      <Box sx={step1Styles.fieldStack}>
        {/* Country of residence — used for pricing/routing decisions */}
        <FormControl fullWidth>
          <InputLabel>Country of residence *</InputLabel>
          <Select
            value={country}
            label="Country of residence *"
            onChange={(e) => setCountry(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Karyakarta is the local YDS contact responsible for this group */}
        <TextField
          fullWidth
          label="Local karyakarta name *"
          value={karyakarta}
          onChange={(e) => { setKaryakarta(e.target.value); setKaryakartaError('') }}
          error={!!karyakartaError}
          helperText={karyakartaError}
        />

        {/* MAX_GROUP_SIZE is defined in data.ts — change it there to update the dropdown */}
        <FormControl fullWidth>
          <InputLabel>Number of family members *</InputLabel>
          <Select
            value={memberCount}
            label="Number of family members *"
            onChange={(e) => setMemberCount(Number(e.target.value))}
          >
            {Array.from({ length: MAX_GROUP_SIZE }, (_, i) => i + 1).map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            NOTE: At least one member must be over the age of 18.
          </FormHelperText>
        </FormControl>
      </Box>

      <Box sx={sharedFormStyles.navBox}>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleNext}
          sx={sharedFormStyles.nextButton}
        >
          Next →
        </Button>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Visual check**

Step 1 in the browser: fields should have consistent 20px gaps. The Next button should show a gold-to-teal gradient. No Back button on Step 1 (correct — there's nowhere to go back to).

- [ ] **Step 4: Commit**

```bash
git add src/components/form/Step1GroupInfo.styles.ts src/components/form/Step1GroupInfo.tsx
git commit -m "style: gap-based spacing and gradient Next button for Step 1"
```

---

### Task 7: Update Step 2 — `Step2MemberDetails.styles.ts` + `Step2MemberDetails.tsx`

**Files:**
- Modify: `src/components/form/Step2MemberDetails.styles.ts`
- Modify: `src/components/form/Step2MemberDetails.tsx`

- [ ] **Step 1: Replace `Step2MemberDetails.styles.ts` entirely**

```ts
// src/components/form/Step2MemberDetails.styles.ts
// navBox/nextButton/backButton come from formShared.styles.ts.
import type { SxProps, Theme } from '@mui/material'

export const step2Styles: Record<string, SxProps<Theme>> = {
  // Wraps all fields with uniform 20px gap
  fieldStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    mt: 2,
  },
}
```

- [ ] **Step 2: Replace `Step2MemberDetails.tsx` entirely**

```tsx
// src/components/form/Step2MemberDetails.tsx
// Step 2 of the registration form.
// Loops through each member (1 to groupInfo.memberCount), collecting personal details.
// Each member's data is saved to the global store before navigating forward or backward.

import { useState, useEffect } from 'react'
import {
  Typography, Box, TextField, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Button, Grid, Chip,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { type MemberDetail } from '../../api/registrations'
import { step2Styles } from './Step2MemberDetails.styles'
import { sharedFormStyles } from './formShared.styles'

// Default blank member used when a member slot hasn't been filled yet
const EMPTY_MEMBER: MemberDetail = {
  firstName: '', middleName: '', lastName: '',
  gender: 'male', dob: '', email: '', phone: '',
}

// Maps each MemberDetail field to an optional validation error message
type Errors = Partial<Record<keyof MemberDetail, string>>

// Returns a map of field-level errors; empty object means the form is valid
function validate(form: MemberDetail): Errors {
  const errors: Errors = {}
  if (!form.firstName.trim())       errors.firstName = 'First name is required.'
  if (!form.lastName.trim())        errors.lastName  = 'Last name is required.'
  if (!form.dob)                    errors.dob       = 'Date of birth is required.'
  if (!form.email?.trim())          errors.email     = 'Email is required.'
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.phone?.trim())          errors.phone     = 'Mobile number is required.'
  return errors
}

export default function Step2MemberDetails() {
  const { groupInfo, setMember, setStep } = useRegistrationStore()

  // Tracks which member (1-based) is currently being edited
  const [currentMember, setCurrentMember] = useState(1)

  // Local form state for the member currently being edited.
  const [form, setForm] = useState<MemberDetail>(
    () => useRegistrationStore.getState().members[0] ?? EMPTY_MEMBER
  )
  const [errors, setErrors] = useState<Errors>({})

  // Tracks whether the user has attempted to submit; controls when to show live errors
  const [touched, setTouched] = useState(false)

  // When navigating to a different member, load their stored data (or blank if not yet filled)
  useEffect(() => {
    const stored = useRegistrationStore.getState().members[currentMember - 1]
    setForm(stored ?? EMPTY_MEMBER)
    setErrors({})
    setTouched(false)
  }, [currentMember])

  // Updates a single field in local form state; re-validates if the user has already submitted
  const updateField = (field: keyof MemberDetail, value: string) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched) setErrors(validate(updated))
  }

  // Saves current member to the store, then moves forward or backward
  const saveAndGo = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      const errs = validate(form)
      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        setTouched(true)
        return
      }
    }
    setMember(currentMember - 1, form)
    if (direction === 'next') {
      if (currentMember < groupInfo.memberCount) {
        setCurrentMember((p) => p + 1)
      } else {
        setStep(3)
      }
    } else {
      if (currentMember > 1) {
        setCurrentMember((p) => p - 1)
      } else {
        setStep(1)
      }
    }
  }

  // Member 1 is the primary contact; their email receives all correspondence
  const isPrimary = currentMember === 1

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={1}>
        Member Details
      </Typography>

      {/* Branded member progress badge */}
      <Chip
        label={`Member ${currentMember} of ${groupInfo.memberCount}`}
        color="primary"
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      <Box sx={step2Styles.fieldStack}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="First name *" value={form.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              error={!!errors.firstName} helperText={errors.firstName} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Last name *" value={form.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              error={!!errors.lastName} helperText={errors.lastName} />
          </Grid>
        </Grid>

        <FormControl>
          <FormLabel>Gender *</FormLabel>
          <RadioGroup row value={form.gender} onChange={(e) => updateField('gender', e.target.value)}>
            <FormControlLabel value="male"   control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth label="Date of birth *" type="date"
          value={form.dob} onChange={(e) => updateField('dob', e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!errors.dob} helperText={errors.dob}
        />

        <TextField fullWidth label="Email *" type="email"
          value={form.email ?? ''} onChange={(e) => updateField('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email ?? (isPrimary ? 'All correspondence will be sent to this address.' : undefined)}
        />

        <TextField fullWidth label="Mobile number *" type="tel"
          value={form.phone ?? ''} onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+49 123 456789"
          error={!!errors.phone} helperText={errors.phone}
        />
      </Box>

      <Box sx={sharedFormStyles.navBox}>
        <Button variant="outlined" onClick={() => saveAndGo('prev')} sx={sharedFormStyles.backButton}>
          ← Back
        </Button>
        <Button variant="contained" color="inherit" onClick={() => saveAndGo('next')} sx={sharedFormStyles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Visual check**

Step 2: "Member 1 of N" Chip badge visible below the heading. Fields have consistent 20px gaps. Back and Next buttons both show correctly. On mobile, buttons stack full-width.

- [ ] **Step 4: Commit**

```bash
git add src/components/form/Step2MemberDetails.styles.ts src/components/form/Step2MemberDetails.tsx
git commit -m "style: member Chip badge, gap spacing, shared nav buttons for Step 2"
```

---

### Task 8: Update Step 3 — `Step3Terms.styles.ts` + `Step3Terms.tsx`

**Files:**
- Modify: `src/components/form/Step3Terms.styles.ts`
- Modify: `src/components/form/Step3Terms.tsx`

- [ ] **Step 1: Replace `Step3Terms.styles.ts` entirely**

```ts
// src/components/form/Step3Terms.styles.ts
// navBox/nextButton/backButton come from formShared.styles.ts.
import type { SxProps, Theme } from '@mui/material'

export const step3Styles: Record<string, SxProps<Theme>> = {
  // Scrollable terms content box — tinted to contrast with the glass card behind it
  termsBox: {
    bgcolor: 'rgba(245, 237, 248, 0.8)',
    borderRadius: 2,
    p: 3,
    maxHeight: 260,
    overflowY: 'auto',
    mb: 2.5,
    fontSize: 14,
    color: 'text.secondary',
    lineHeight: 1.7,
    whiteSpace: 'pre-line',
    border: '1px solid rgba(129,104,143,0.15)',
  },
  alert: { mb: 2 },
}
```

- [ ] **Step 2: Update `Step3Terms.tsx` — replace per-step navBox with shared styles**

Replace the entire file:

```tsx
// src/components/form/Step3Terms.tsx
// Step 3 of the registration form.
// Displays the event terms and conditions and requires the user to agree before payment.

import { useState } from 'react'
import {
  Typography, Box, Checkbox, FormControlLabel, Button, Alert,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { TERMS } from '../../data/data'
import { step3Styles } from './Step3Terms.styles'
import { sharedFormStyles } from './formShared.styles'

export default function Step3Terms() {
  const { termsAccepted, setTerms, setStep } = useRegistrationStore()

  // Local checkbox state — mirrors the store so the user's previous choice is preserved on back-nav
  const [checked, setChecked] = useState(termsAccepted)

  // Controls the warning shown when the user tries to continue without ticking the box
  const [error, setError] = useState(false)

  // Validates that the box is checked, then saves to store and advances to Step 4
  const handleNext = () => {
    if (!checked) { setError(true); return }
    setTerms(true)
    setStep(4)
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        In the Spirit of Seva
      </Typography>
      <Typography color="text.secondary" fontSize={15} mb={2}>
        By registering for this event, you agree to the following:
      </Typography>

      <Box sx={step3Styles.termsBox}>
        {TERMS}
      </Box>

      {/* Only shown after the user tries to proceed without accepting */}
      {error && (
        <Alert severity="warning" sx={step3Styles.alert}>
          Please agree to the terms and conditions to continue.
        </Alert>
      )}

      <FormControlLabel
        sx={{ mb: 1 }}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => { setChecked(e.target.checked); setError(false) }}
            color="secondary"
          />
        }
        label="I have read and agree to the above terms and conditions."
      />

      <Box sx={sharedFormStyles.navBox}>
        <Button variant="outlined" onClick={() => setStep(2)} sx={sharedFormStyles.backButton}>
          ← Back
        </Button>
        <Button variant="contained" color="inherit" onClick={handleNext} sx={sharedFormStyles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Visual check**

Step 3: Terms box should have a subtle lavender tint and border (not plain white). Next button has gradient. Back and Next stack full-width on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/form/Step3Terms.styles.ts src/components/form/Step3Terms.tsx
git commit -m "style: terms box polish and shared nav buttons for Step 3"
```

---

## Chunk 4: Payment Step

### Task 9: Update Step 4 — `Step4Payment.styles.ts` + `Step4Payment.tsx`

**Files:**
- Modify: `src/components/form/Step4Payment.styles.ts`
- Modify: `src/components/form/Step4Payment.tsx`

- [ ] **Step 1: Replace `Step4Payment.styles.ts` entirely**

```ts
// src/components/form/Step4Payment.styles.ts
// navBox/backButton come from formShared.styles.ts.
// The Pay button has its own sx on the component (shimmer + gradient) extending sharedFormStyles.nextButton.
import type { SxProps, Theme } from '@mui/material'

export const step4Styles: Record<string, SxProps<Theme>> = {
  // Translucent inner card replacing the previous solid mauve box
  summaryBox: {
    background: 'rgba(129, 104, 143, 0.06)',
    border: '1px solid rgba(129, 104, 143, 0.2)',
    borderRadius: '14px',
    p: '20px',
    mb: 3.5,
  },

  // One row per member in the summary
  memberRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 0.5,
    py: 0.75,
  },

  // Divider between member rows and totals — visible on light background
  divider: {
    borderColor: 'rgba(129, 104, 143, 0.3)',
    my: 1.5,
  },

  // Base total and service fee rows
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    py: 0.75,
  },

  // Grand total row — gold highlight
  grandTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    py: 0.75,
    background: 'rgba(232, 197, 90, 0.15)',
    borderRadius: '8px',
    px: '12px',
    mx: '-12px',
  },

  // Stripe reassurance row (lock icon + message)
  stripeNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mt: 3,
    mb: 2,
    color: 'text.secondary',
  },

  // Pay button — gradient + shimmer hover. Uses color="inherit" to prevent MUI palette override.
  payButton: {
    minWidth: { xs: '100%', sm: 160 },
    background: 'linear-gradient(135deg, #E8C55A, #6ea096)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&:hover::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
      animation: 'shimmer 800ms ease forwards',
    },
  },
}
```

- [ ] **Step 2: Replace `Step4Payment.tsx` entirely**

```tsx
// src/components/form/Step4Payment.tsx
// Step 4 of the registration form — payment.
// Shows a cost breakdown for all members, then submits the full registration payload
// to the backend. On success, the user is redirected to Stripe's hosted checkout page.

import { useState } from 'react'
import {
  Typography, Box, Divider, Button, Alert, CircularProgress,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useRegistrationStore } from '../../store/registrationStore'
import { PRICING } from '../../data/data'
import { submitRegistration, type RegistrationPayload } from '../../api/registrations'
import { step4Styles } from './Step4Payment.styles'
import { sharedFormStyles } from './formShared.styles'

// Reads pricing config from data.ts — change perPerson or serviceFeeRate there to update all totals
function PaymentSummary() {
  const { groupInfo, members } = useRegistrationStore()
  const base  = groupInfo.memberCount * PRICING.perPerson
  const fee   = base * PRICING.serviceFeeRate
  const grand = base + fee

  return (
    <Box sx={step4Styles.summaryBox}>
      {/* One row per registered member; falls back to "Member N" if name is missing */}
      {members.map((m, i) => (
        <Box key={m.email || i} sx={step4Styles.memberRow}>
          <Typography>{m.firstName || `Member ${i + 1}`} {m.lastName}</Typography>
          <Typography>{PRICING.currency}{PRICING.perPerson.toFixed(2)}</Typography>
        </Box>
      ))}

      <Divider sx={step4Styles.divider} />

      <Box sx={step4Styles.totalRow}>
        <Typography>Base Total</Typography>
        <Typography>{PRICING.currency}{base.toFixed(2)}</Typography>
      </Box>

      {/* Service fee covers payment processing costs (Stripe) */}
      <Box sx={step4Styles.totalRow}>
        <Typography>Service Fee ({PRICING.serviceFeeRate * 100}%)</Typography>
        <Typography>{PRICING.currency}{fee.toFixed(2)}</Typography>
      </Box>

      <Divider sx={step4Styles.divider} />

      {/* Grand total — gold highlighted row */}
      <Box sx={step4Styles.grandTotalRow}>
        <Typography fontWeight={700} fontSize={18}>Total</Typography>
        <Typography fontWeight={700} fontSize={18}>{PRICING.currency}{grand.toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}

export default function Step4Payment() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const { groupInfo, members, termsAccepted, setStep, setConfirmRef } = useRegistrationStore()

  const handlePay = async () => {
    setError('')
    if (members.length < groupInfo.memberCount) {
      setError('Please complete all member details before proceeding.')
      return
    }
    setLoading(true)
    try {
      const payload: RegistrationPayload = {
        country:       groupInfo.country,
        karyakarta:    groupInfo.karyakarta,
        memberCount:   groupInfo.memberCount,
        members,
        termsAccepted,
      }
      const result = await submitRegistration(payload)

      // Persist reference before redirect in two ways:
      // 1. Zustand store — used by Step 5 if the app stays in-memory
      // 2. sessionStorage — survives the full-page navigation that Stripe's redirect causes
      setConfirmRef(result.reference)
      sessionStorage.setItem('hp_confirm_ref', result.reference)
      window.location.href = result.payment_url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={3}>
        Payment Summary
      </Typography>

      <PaymentSummary />

      {/* Reassurance message — payment is handled entirely by Stripe */}
      <Box sx={step4Styles.stripeNotice}>
        <LockIcon fontSize="small" />
        <Typography variant="body2">
          You will be redirected to Stripe's secure checkout to complete payment.
          Card, PayPal, and other methods are available there.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <Box sx={sharedFormStyles.navBox}>
        <Button
          variant="outlined"
          onClick={() => setStep(3)}
          disabled={loading}
          sx={sharedFormStyles.backButton}
        >
          ← Back
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handlePay}
          disabled={loading}
          sx={step4Styles.payButton}
        >
          {loading
            ? <CircularProgress size={20} sx={{ color: 'white' }} />
            : 'Pay & Register'
          }
        </Button>
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Visual check**

Step 4:
- Summary card is translucent (not solid mauve)
- Text inside the card is dark (not white)
- Dividers are visible on the light background
- Grand total row has a subtle gold highlight
- Pay button has a gold-to-teal gradient
- Hovering the Pay button triggers a shimmer effect
- Clicking Pay shows a spinner inside the button while loading

- [ ] **Step 4: Commit**

```bash
git add src/components/form/Step4Payment.styles.ts src/components/form/Step4Payment.tsx
git commit -m "style: glassmorphism payment card, gradient pay button, shimmer and spinner for Step 4"
```

---

## Final Verification

- [ ] **Full flow walkthrough**

Run `npm run dev`. Walk through all 5 steps:
1. Step 1 — fields spaced evenly, gradient Next button
2. Step 2 — Member 1 of N badge, field gaps, back/next work
3. Step 3 — tinted terms box, gradient Next
4. Step 4 — translucent card, gold total, gradient Pay button, shimmer on hover
5. Stepper — circles change state correctly at each step

- [ ] **Mobile check**

Resize the browser to < 600px:
- Nav buttons stack full-width, Next on top
- Stepper shows only the active step label
- Glass card padding tightens to 24px

- [ ] **Final commit**

```bash
git add -A
git commit -m "style: complete registration form glassmorphism redesign"
```
