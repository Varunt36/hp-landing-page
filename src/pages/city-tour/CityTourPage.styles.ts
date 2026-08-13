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

  // Shown while the seat count is in flight, in place of the form. Sized so
  // the card does not visibly resize when the form takes over.
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },

  soldOutBox: {
    textAlign: 'center',
    py: { xs: 2, md: 3 },
  },

  soldOutHeading: {
    fontFamily: '"Blue Mirage", serif',
    fontSize: { xs: '1.15rem', md: '1.3rem' },
    color: C.purple800,
    mb: 1.5,
  },

  soldOutBody: {
    color: C.purple700,
    fontSize: '0.95rem',
    maxWidth: 420,
    mx: 'auto',
  },

  soldOutContact: {
    mt: 2.5,
    mx: 'auto',
    maxWidth: 260,
    p: 2,
    borderRadius: '14px',
    border: `1px solid ${C.lavender200}B3`,
  },

  soldOutContactName: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: C.purple800,
  },

  soldOutContactLink: {
    display: 'block',
    mt: 0.5,
    fontSize: '0.95rem',
    color: C.muted,
    textDecoration: 'none',
    '&:hover': { color: C.purple800 },
  },
}
