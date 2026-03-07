import type { SxProps, Theme } from '@mui/material'

export const footerStyles: Record<string, SxProps<Theme>> = {
  footer: {
    bgcolor: 'primary.dark',
    color: 'rgba(255,255,255,0.7)',
    py: 5,
    textAlign: 'center',
  },
  brand: {
    color: 'white',
  },
  emailLink: {
    color: 'secondary.main',
  },
}
