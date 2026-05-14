import type { SxProps, Theme } from '@mui/material'
import { C } from '../../theme/theme'

export const faqStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    background: `linear-gradient(180deg, ${C.lavender50} 0%, ${C.cream} 100%)`,
    py: { xs: 10, md: 13 },
  },
  h2: {
    color: C.purple800,
  },
  accordion: {
    bgcolor: C.cream,
    mb: 1.5,
    borderRadius: '14px !important',
    border: `1px solid ${C.lavender200}B3`,
    boxShadow: 'none',
    '&:before': { display: 'none' },
    '&.Mui-expanded': {
      borderColor: `${C.gold500}60`,
      boxShadow: `0 4px 14px rgba(60,30,90,0.06)`,
    },
  },
  expandIcon: {
    color: C.gold600,
  },
  summaryText: {
    color: C.purple800,
    fontWeight: 600,
  },
  detailsText: {
    color: C.muted,
  },
}
