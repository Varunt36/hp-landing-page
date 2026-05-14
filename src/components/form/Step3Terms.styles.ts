// src/components/form/Step3Terms.styles.ts
// navBox/nextButton/backButton come from formShared.styles.ts.
import type { SxProps, Theme } from '@mui/material'

export const step3Styles: Record<string, SxProps<Theme>> = {
  // Scrollable terms content box — tinted to contrast with the glass card behind it
  termsBox: {
    bgcolor: 'rgba(253, 248, 240, 0.8)',
    borderRadius: '12px',
    p: 2.5,
    mb: 2.5,
    border: '1px solid rgba(45, 43, 107, 0.15)',
  },
  alert: { mb: 2 },
}
