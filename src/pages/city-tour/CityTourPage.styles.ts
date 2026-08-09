// src/pages/city-tour/CityTourPage.styles.ts
import type { SxProps, Theme } from '@mui/material'
import { C } from '../../theme/theme'

export const cityTourStyles: Record<string, SxProps<Theme>> = {
  outer: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    px: { xs: 2, sm: 3 },
    py: { xs: 4, md: 6 },
    background: `linear-gradient(180deg, ${C.lavender50}, ${C.cream})`,
  },

  paper: {
    maxWidth: 640,
    width: '100%',
    p: { xs: 3, sm: 5 },
    borderRadius: 3,
    alignSelf: 'flex-start',
  },

  heading: {
    fontFamily: '"Blue Mirage", serif',
    fontSize: { xs: '1.85rem', sm: '2.25rem' },
    color: C.purple800,
    lineHeight: 1.15,
    mb: 0.5,
  },

  subheading: {
    color: C.muted,
    mb: 3,
  },

  fieldStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
  },

  phoneRow: {
    display: 'flex',
    gap: 1.5,
    alignItems: 'flex-start',
  },

  dialCodeSelect: {
    minWidth: { xs: 116, sm: 140 },
    flexShrink: 0,
  },

  attendeesHeading: {
    fontWeight: 600,
    color: C.purple800,
    mt: 1,
  },

  // The running total. Visually distinct so it reads as a summary,
  // not another input.
  totalBox: {
    mt: 3,
    p: 2.5,
    borderRadius: 2,
    background: C.lavender50,
    border: `1px solid ${C.lavender200}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
  },

  totalLabel: {
    color: C.muted,
    fontSize: '0.9rem',
  },

  totalAmount: {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: C.purple800,
    lineHeight: 1.1,
  },

  submitButton: {
    mt: 3,
    py: 1.4,
    width: '100%',
    fontSize: '1rem',
    background: `linear-gradient(135deg, ${C.purple700}, ${C.purple800})`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(135deg, ${C.purple700}, ${C.purple800})`,
      boxShadow: '0 6px 18px rgba(75,45,110,0.32)',
    },
  },

  footnote: {
    mt: 2,
    display: 'block',
    textAlign: 'center',
    color: C.muted,
  },
}
