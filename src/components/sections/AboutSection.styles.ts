import type { SxProps, Theme } from '@mui/material'

export const aboutStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    bgcolor: 'background.paper',
    py: { xs: 7, md: 10 },
  },
  description: {
    whiteSpace: 'pre-line',
  },
  card: {
    bgcolor: 'background.default',
    borderTop: '4px solid',
    borderColor: 'secondary.main',
    textAlign: 'center',
    p: 0,
  },
}
