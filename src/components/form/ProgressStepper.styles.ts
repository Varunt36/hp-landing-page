// src/components/form/ProgressStepper.styles.ts
import type { SxProps, Theme } from '@mui/material'

export const progressStyles: Record<string, SxProps<Theme>> = {
  wrapper: {
    maxWidth: 560,
    mx: 'auto',
    my: 5,
  },
  // Row that holds circles + connectors
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Connector line between circles
  connector: {
    flex: 1,
    height: '2px',
    mx: 0.5,
  },
}
