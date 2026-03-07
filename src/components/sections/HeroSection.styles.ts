import type { SxProps, Theme } from '@mui/material'

export const heroStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    minHeight: 520,
    background: `
      linear-gradient(to bottom, rgba(30,50,100,0.55) 0%, rgba(200,100,50,0.4) 100%),
      linear-gradient(135deg, #365288 0%, #6a4c93 40%, #c0714a 100%)
    `,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    py: { xs: 7, md: 10 },
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 2,
    mb: 2,
    display: 'block',
  },
  title: {
    color: 'white',
    fontSize: 'clamp(26px, 5vw, 44px)',
    lineHeight: 1.15,
    mb: 2.5,
    textShadow: '0 2px 12px rgba(0,0,0,0.3)',
    whiteSpace: 'pre-line',
  },
  dates: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 500,
    mb: 4.5,
  },
  ctaButton: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 2,
    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
  },
}
