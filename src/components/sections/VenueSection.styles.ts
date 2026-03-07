import type { SxProps, Theme } from '@mui/material'

export const venueStyles: Record<string, SxProps<Theme>> = {
  outerBox: {
    bgcolor: 'background.default',
    py: { xs: 7, md: 10 },
  },
  venuePaper: {
    p: 3,
    mb: 2.5,
    borderRadius: 2,
  },
  travelPaper: {
    p: 3,
    borderRadius: 2,
  },
  listItem: {
    gap: 1.5,
  },
  mapIframe: {
    border: 0,
    borderRadius: 2,
    display: 'block',
  },
}
