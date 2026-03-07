import type { SxProps, Theme } from '@mui/material'

export const registerStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    bgcolor: 'background.default',
    py: { xs: 7, md: 10 },
  },
  paper: {
    maxWidth: 600,
    mx: 'auto',
    p: { xs: 3, sm: 5 },
    borderRadius: 3,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
}
