import type { SxProps, Theme } from '@mui/material'
import { C } from '../../theme/theme'

export const featureStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    bgcolor: C.cream,
    borderTop: `1px solid ${C.lavender200}`,
    borderBottom: `1px solid ${C.lavender200}`,
    py: { xs: 4.5, md: 5.5 },
    position: 'relative',
    overflow: 'hidden',
  },

  grid: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'stretch',
    gap: { xs: 3, sm: 0 },
  },

  itemWrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
  },

  divider: {
    width: '1px',
    bgcolor: `${C.lavender200}CC`,
    mx: { sm: 1, md: 1.5 },
    my: { xs: 0, sm: 0.5 },
    display: { xs: 'none', sm: 'block' },
    flexShrink: 0,
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 1.75,
    flex: 1,
    px: { xs: 1, sm: 1.5, md: 2 },
  },

  iconCircle: {
    width: 62,
    height: 62,
    minWidth: 62,
    borderRadius: '50%',
    border: `1.5px solid ${C.gold500}66`,
    bgcolor: `${C.lavender50}`,
    background: `radial-gradient(circle at 30% 25%, ${C.lavender50}, transparent 60%), ${C.cream}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: C.purple700,
  },

  icon: {
    fontSize: 26,
    color: C.purple700,
  },

  textBlock: {
    pt: 0.5,
  },

  title: {
    color: C.purple800,
    fontWeight: 700,
    fontSize: { xs: 14, md: 15 },
    mb: 0.5,
    lineHeight: 1.3,
    fontFamily: '"Inter", sans-serif',
  },

  description: {
    color: C.muted,
    fontSize: { xs: 12, md: 13 },
    lineHeight: 1.6,
  },
}
