import type { SxProps, Theme } from '@mui/material'
import { HERO_GRADIENT } from '../../theme/theme'

export const heroStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    minHeight: 640,
    background: HERO_GRADIENT,
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
  titleImage: {
    width: 'clamp(360px, 100vw, 1200px)',
    maxWidth: '1200px',
    mx: 'auto',
    mb: 0,
    display: 'block',
    height: 'auto',
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
};
