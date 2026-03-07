import type { SxProps, Theme } from '@mui/material'

export const faqStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    bgcolor: 'primary.main',
    py: { xs: 7, md: 10 },
  },
  h2: {
    color: 'white',
  },
  accordion: {
    bgcolor: 'rgba(255,255,255,0.1)',
    mb: 1.5,
    borderRadius: 2,
    '&:before': { display: 'none' },
    boxShadow: 'none',
  },
  expandIcon: {
    color: 'rgba(255,255,255,0.7)',
  },
  summaryText: {
    color: 'white',
  },
  detailsText: {
    color: 'rgba(255,255,255,0.8)',
  },
}
