// src/components/form/ProgressStepper.tsx
// Custom branded step indicator — replaces the default MUI Stepper.
// Shows numbered circles (pending), filled circles (active/complete), and connecting lines.

import { Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useRegistrationStore } from '../../store/registrationStore'
import { progressStyles } from './ProgressStepper.styles'
import { PRIMARY, SECONDARY } from '../../theme/theme'

const STEPS = ['Group', 'Members', 'Terms', 'Payment', 'Done']

// Muted color for inactive step circles — intentionally dimmer than theme.MUTED
const STEP_MUTED = '#c5b8cc'

type CircleProps = { index: number; activeStep: number }

function StepCircle({ index, activeStep }: CircleProps) {
  const isComplete = index < activeStep
  const isActive   = index === activeStep

  const bg     = isComplete ? SECONDARY : isActive ? PRIMARY : 'transparent'
  const border = isComplete || isActive ? 'none' : `2px solid ${STEP_MUTED}`
  const color  = isComplete || isActive ? 'white' : STEP_MUTED
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
      {/* Single row: each step is a column of [connector | circle | label], connectors fill space */}
      <Box sx={progressStyles.row}>
        {STEPS.map((label, i) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: i < STEPS.length - 1 ? 1 : 'none',
            }}
          >
            {/* Step column: circle above label */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StepCircle index={i} activeStep={activeStep} />
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  textAlign: 'center',
                  color: i === activeStep ? PRIMARY : STEP_MUTED,
                  fontWeight: i === activeStep ? 700 : 400,
                  display: { xs: i === activeStep ? 'block' : 'none', sm: 'block' },
                  transition: 'color 300ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
            </Box>

            {/* Connector to next step */}
            {i < STEPS.length - 1 && (
              <Box
                sx={{
                  ...progressStyles.connector,
                  background: i < activeStep ? SECONDARY : STEP_MUTED,
                  transition: 'background 300ms ease',
                  alignSelf: 'flex-start',
                  mt: '20px', // vertically center with circle (40px / 2 = 20px)
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
