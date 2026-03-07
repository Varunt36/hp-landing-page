// src/components/form/Step2MemberDetails.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const step2Styles: Record<string, SxProps<Theme>> = {
  nameGrid: { mb: 2.5 },
  genderFormControl: { mb: 2.5 },
  dobField: { mb: 2.5 },
  emailField: { mb: 2.5 },
  phoneField: { mb: 2.5 },
  navBox: { display: 'flex', justifyContent: 'space-between', mt: 4 },
  nextButton: { color: 'white' },
}
