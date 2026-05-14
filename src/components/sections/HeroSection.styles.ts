import type { SxProps, Theme } from '@mui/material'
import { C, HERO_GRADIENT } from '../../theme/theme';

export const heroStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    background: HERO_GRADIENT,
    overflow: 'hidden',
    position: 'relative',
    isolation: 'isolate',
    pt: { xs: '90px', md: '130px' },
    pb: { xs: 8, md: 12 },
  },

  waveBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    pointerEvents: 'none',
    color: `${C.lavender200}99`,
  },

  // 3-column grid: logo | title+cta | portrait
  grid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 660px' },
    gap: { xs: 4, md: 4 },
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 2,
  },

  // Col 1 — logo, centred vertically
  logoCol: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroLogoImg: {
    width: '100%',
    maxWidth: 270,
    height: 'auto',
    display: 'block',
    filter: 'drop-shadow(0 6px 24px rgba(107,74,150,0.28))',
  },

  // Col 2 — center: title · sutra · cta · countdown
  centerCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'flex-start' },
    textAlign: { xs: 'center', md: 'left' },
  },

  // Title image — full center column width, dominant
  titleImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    mb: 1,
    filter: 'drop-shadow(0 2px 12px rgba(107,74,150,0.20))',
  },

  // Sutra image — 70% width, clearly secondary
  sutraImg: {
    width: '70%',
    height: 'auto',
    display: 'block',
    opacity: 0.82,
    filter: 'drop-shadow(0 1px 4px rgba(107,74,150,0.08))',
    alignSelf: 'center',
  },

  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: { xs: 'center', md: 'flex-start' },
    gap: '18px',
    mt: 2.5,
    color: C.green700,
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: { xs: '1.1rem', md: '1.25rem' },
    '&::before, &::after': {
      content: '""',
      height: '1px',
      width: '28px',
      background: C.gold500,
      display: 'block',
    },
  },

  ctaRow: {
    display: 'flex',
    gap: 1.5,
    mt: 4,
    flexWrap: 'wrap',
  },

  // ── Countdown ──
  countdown: {
    mt: 4.5,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 1.5,
    maxWidth: { xs: '100%', md: 420 },
  },
  cdCell: {
    background: `color-mix(in srgb, ${C.cream} 70%, transparent)`,
    border: `1px solid ${C.lavender200}CC`,
    borderRadius: '14px',
    px: 1,
    py: { xs: 1.25, md: 1.75 },
    textAlign: 'center',
    backdropFilter: 'blur(6px)',
  },
  cdNum: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: { xs: '1.6rem', md: '2rem' },
    color: C.purple800,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.02em',
    fontWeight: 500,
  },
  cdLabel: {
    fontSize: { xs: '0.6rem', md: '0.65rem' },
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    color: C.gold700,
    mt: 0.75,
    fontWeight: 600,
  },

  // ── Right portrait column — empty spacer keeps text from overlapping ──
  portraitCol: {
    display: { xs: 'none', md: 'block' },
  },

  // Absolutely fills the full right side of the hero from top to bottom
  portraitWrap: {
    display: { xs: 'none', md: 'block' },
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '48%',
    zIndex: 1,
  },

  portraitImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top center',
    display: 'block',
  },
};
