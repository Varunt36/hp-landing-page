import type { SxProps, Theme } from '@mui/material'
import { C, HERO_GRADIENT } from '../../theme/theme';

export const heroStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    background: HERO_GRADIENT,
    overflow: 'hidden',
    position: 'relative',
    isolation: 'isolate',
    pt: { xs: '10px', md: '20px' },
    pb: { xs: '80px', md: '160px' },
  },

  waveBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    pointerEvents: 'none',
  },

  // 3-column grid: swamiji | content | portrait
  grid: {
    display: { xs: 'none', md: 'grid' },
    gridTemplateColumns: { md: '1fr 360px', lg: '420px 1fr 420px' },
    gap: 3,
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 2,
  },

  // Col 0: Swamiji cutout (lg+)
  swamijiCol: {
    display: { xs: 'none', md: 'none', lg: 'flex' },
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  swamijiImg: {
    width: '100%',
    maxWidth: 420,
    height: 'auto',
    display: 'block',
    filter: 'drop-shadow(0 8px 32px rgba(107,74,150,0.22)) drop-shadow(0 2px 8px rgba(107,74,150,0.12))',
  },

  // Col 1: title · sutra · cta · countdown
  centerCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  titleImg: {
    width: '100%',
    height: 'auto',
    display: { xs: 'none', md: 'block' },
    mb: 0,
    filter: 'drop-shadow(0 2px 12px rgba(107,74,150,0.20))',
  },

  sutraImg: {
    width: '70%',
    height: 'auto',
    display: { xs: 'none', md: 'block' },
    opacity: 0.82,
    filter: 'drop-shadow(0 1px 4px rgba(107,74,150,0.08))',
    alignSelf: 'center',
  },

  metaRow: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: '18px',
    mt: 1.5,
    color: C.purple600,
    fontFamily: '"Blue Mirage", serif',
    fontSize: { xs: '1.2rem', md: '1.4rem' },
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
    mt: 2.5,
    flexWrap: 'wrap',
  },

  // Countdown
  countdown: {
    mt: 2,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 1.5,
    maxWidth: 420,
  },

  cdCell: {
    background: `color-mix(in srgb, ${C.cream} 70%, transparent)`,
    border: `1px solid ${C.lavender200}CC`,
    borderRadius: '14px',
    px: { xs: 0.5, md: 1 },
    py: { xs: 0.75, md: 1.75 },
    textAlign: 'center',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  },

  cdNum: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: { xs: '1.2rem', md: '2rem' },
    color: C.purple800,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.02em',
    fontWeight: 500,
  },

  cdLabel: {
    fontSize: { xs: '0.52rem', md: '0.65rem' },
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: C.gold700,
    mt: { xs: 0.4, md: 0.75 },
    fontWeight: 600,
  },

  // Col 2: right portrait (md+)
  rightImgCol: {
    display: { xs: 'none', md: 'block' },
    overflow: 'hidden',
    borderRadius: '18px',
  },

  rightImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top left',
    display: 'block',
    WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)',
    maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)',
    WebkitMaskComposite: 'source-in',
    maskComposite: 'intersect',
  },

};
