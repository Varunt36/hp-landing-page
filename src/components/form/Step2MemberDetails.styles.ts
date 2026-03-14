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
