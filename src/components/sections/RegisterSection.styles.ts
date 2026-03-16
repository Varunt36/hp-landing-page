import type { SxProps, Theme } from '@mui/material'

export const registerStyles: Record<string, SxProps<Theme>> = {
  // Outer section — radial gradient so the glass card has depth behind it
  outerBox: {
    background: 'radial-gradient(ellipse at top, rgba(225,182,220,0.13) 0%, #F5EDF8 60%)',
    py: { xs: 7, md: 10 },
  },

  // Frosted glass card that wraps each form step
  paper: {
    maxWidth: 600,
    mx: 'auto',
    p: { xs: '24px', md: '40px' },
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 40px rgba(129, 104, 143, 0.15)',
  },

  // Step transition wrapper — receives key={currentStep} to trigger slideIn on remount
  stepWrapper: {
    animation: 'slideIn 300ms ease both',
  },
}
