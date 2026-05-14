// src/components/form/formShared.styles.ts
// Shared navigation button and layout styles used by all registration form steps.
// Import sharedFormStyles here instead of duplicating navBox/nextButton per-step.

import type { SxProps, Theme } from '@mui/material'
import { C } from '../../theme/theme'

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
    background: `linear-gradient(135deg, ${C.purple700}, ${C.purple800})`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(135deg, ${C.purple700}, ${C.purple800})`,
      boxShadow: '0 6px 18px rgba(75,45,110,0.32)',
      transform: 'translateY(-1px)',
    },
  },

  backButton: {
    minWidth: { xs: '100%', sm: 100 },
  },
}
