import type { SxProps, Theme } from '@mui/material'

export const navbarStyles: Record<string, SxProps<Theme>> = {
  appBar: {
    bgcolor: 'primary.main',
    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
  },
  toolbar: {
    maxWidth: 900,
    width: '100%',
    mx: 'auto',
    px: 2,
    justifyContent: 'space-between',
  },
  drawerBox: {
    width: 220,
  },
  desktopNav: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
  },
  navButton: {
    color: 'rgba(255,255,255,0.85)',
    '&:hover': { color: 'white' },
  },
  registerButton: {
    color: 'white',
  },
}
