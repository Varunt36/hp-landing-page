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
