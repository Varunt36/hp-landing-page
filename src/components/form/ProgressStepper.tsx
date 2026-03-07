// src/components/form/ProgressStepper.tsx
import { Stepper, Step, StepLabel, Box } from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { progressStyles } from './ProgressStepper.styles'

const STEPS = ['Group', 'Members', 'Terms', 'Payment', 'Done']

export default function ProgressStepper() {
  const currentStep = useRegistrationStore((s) => s.currentStep)

  return (
    <Box sx={progressStyles.wrapper}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
