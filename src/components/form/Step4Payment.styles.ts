// src/components/form/Step4Payment.styles.ts
// navBox/backButton come from formShared.styles.ts.
// The Pay button has its own sx on the component (shimmer + gradient) extending sharedFormStyles.nextButton.
import type { SxProps, Theme } from '@mui/material'
import { C } from '../../theme/theme'

export const step4Styles: Record<string, SxProps<Theme>> = {
  // Translucent inner card replacing the previous solid mauve box
  summaryBox: {
    background: 'rgba(45, 43, 107, 0.06)',
    border: '1px solid rgba(45, 43, 107, 0.2)',
    borderRadius: '14px',
    p: '20px',
    mb: 3.5,
  },

  // Centred ticket icon above the event name
  ticketIconWrap: {
    width: 44,
    height: 44,
    borderRadius: '12px',
    background: `rgba(200,135,42,0.12)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    mb: 1.25,
  },

  eventName: {
    fontFamily: '"Cormorant Garamond", serif',
    fontWeight: 700,
    fontSize: { xs: '1.05rem', sm: '1.15rem' },
    color: C.purple800,
    lineHeight: 1.3,
  },

  eventMeta: {
    fontSize: 12,
    color: 'text.secondary',
    mt: 0.5,
    letterSpacing: '0.02em',
  },

  // Label / value row in the summary
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Divider between member rows and totals — visible on light background
  divider: {
    borderColor: 'rgba(45, 43, 107, 0.3)',
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
    background: `rgba(200, 135, 42, 0.15)`,
    borderRadius: '8px',
    px: '12px',
    mx: '-12px',
  },

  // Pay With section heading row
  payWithRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 1.5,
  },

  payWithLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: 'text.secondary',
    whiteSpace: 'nowrap',
  },

  payWithDivider: {
    flex: 1,
    borderColor: 'rgba(45, 43, 107, 0.15)',
  },

  // Row of method tiles
  methodRow: {
    display: 'flex',
    gap: 1,
    mb: 2.5,
  },

  // Stripe reassurance row (lock icon + message)
  stripeNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mt: 1,
    mb: 2,
    color: 'text.secondary',
  },

  // Pay button — purple gradient matching theme primary
  payButton: {
    minWidth: { xs: '100%', sm: 160 },
    background: `linear-gradient(135deg, ${C.purple700}, ${C.purple800})`,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 4px 14px rgba(75,45,110,0.28)`,
    '&:hover': {
      background: `linear-gradient(135deg, ${C.purple700}, ${C.purple800})`,
      boxShadow: `0 8px 22px rgba(75,45,110,0.36)`,
      transform: 'translateY(-1px)',
    },
  },
}
