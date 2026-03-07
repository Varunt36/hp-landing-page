// src/components/form/Step5Confirmation.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const step5Styles: Record<string, SxProps<Theme>> = {
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    bgcolor: 'secondary.main',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    mb: 2.5,
  },
  checkIcon: { fontSize: 36 },
  referenceBox: {
    display: 'inline-block',
    bgcolor: 'background.default',
    border: '1.5px solid',
    borderColor: 'divider',
    borderRadius: 2,
    px: 2.5,
    py: 1.25,
    fontSize: 15,
    my: 1.75,
  },
}
