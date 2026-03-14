// src/components/form/ProgressStepper.tsx
// Custom branded step indicator — replaces the default MUI Stepper.
// Shows numbered circles (pending), filled circles (active/complete), and connecting lines.

import { Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useRegistrationStore } from '../../store/registrationStore'
import { progressStyles } from './ProgressStepper.styles'

const STEPS = ['Group', 'Members', 'Terms', 'Payment', 'Done']

// Colors matching Boudoir Luxe theme
const PRIMARY   = '#81688f'   // active step fill
const SECONDARY = '#6ea096'   // complete step fill
const MUTED     = '#c5b8cc'   // pending step border/color

type CircleProps = { index: number; activeStep: number }

function StepCircle({ index, activeStep }: CircleProps) {
  const isComplete = index < activeStep
  const isActive   = index === activeStep

  const bg     = isComplete ? SECONDARY : isActive ? PRIMARY : 'transparent'
  const border = isComplete || isActive ? 'none' : `2px solid ${MUTED}`
  const color  = isComplete || isActive ? 'white' : MUTED
  const shadow = isActive ? `0 0 0 4px rgba(129,104,143,0.25)` : 'none'

  return (
    <Box
      role="img"
      aria-label={`Step ${index + 1}: ${STEPS[index]}${isComplete ? ' (complete)' : isActive ? ' (current)' : ''}`}
      sx={{
        width: 40, height: 40,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        background: bg,
        border,
        color,
        boxShadow: shadow,
        transition: 'all 300ms ease',
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {isComplete
        ? <CheckIcon sx={{ fontSize: 18 }} />
        : index + 1
      }
    </Box>
  )
}

export default function ProgressStepper() {
  const currentStep = useRegistrationStore((s) => s.currentStep)
  const activeStep  = currentStep - 1   // 0-based index

  return (
    <Box sx={progressStyles.wrapper}>
      {/* Circle row with connectors */}
      <Box sx={progressStyles.row}>
        {STEPS.map((label, i) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <StepCircle index={i} activeStep={activeStep} />
            {i < STEPS.length - 1 && (
              <Box
                sx={{
                  ...progressStyles.connector,
                  background: i < activeStep ? SECONDARY : MUTED,
                  transition: 'background 300ms ease',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Label row */}
      <Box sx={progressStyles.labelRow}>
        {STEPS.map((label, i) => (
          <Typography
            key={label}
            variant="caption"
            sx={{
              flex: 1,
              textAlign: 'center',
              color: i === activeStep ? PRIMARY : MUTED,
              fontWeight: i === activeStep ? 700 : 400,
              // Hide non-active labels on mobile
              display: { xs: i === activeStep ? 'block' : 'none', sm: 'block' },
              transition: 'color 300ms ease',
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
