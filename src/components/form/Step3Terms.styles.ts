// src/components/form/Step3Terms.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const step3Styles: Record<string, SxProps<Theme>> = {
  termsBox: {
    bgcolor: 'background.default',
    borderRadius: 2,
    p: 3,
    maxHeight: 260,
    overflowY: 'auto',
    mb: 2.5,
    fontSize: 14,
    color: 'text.secondary',
    lineHeight: 1.7,
    whiteSpace: 'pre-line',
  },
  alert: { mb: 2 },
  navBox: { display: 'flex', justifyContent: 'space-between', mt: 4 },
  nextButton: { color: 'white' },
}
