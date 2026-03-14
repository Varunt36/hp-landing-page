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
