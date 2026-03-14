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
