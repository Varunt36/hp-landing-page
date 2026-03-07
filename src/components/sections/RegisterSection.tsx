// src/components/sections/RegisterSection.tsx
import React from 'react'
import { Box, Container, Typography, Paper } from '@mui/material'
import ProgressStepper from '../form/ProgressStepper'
import Step1GroupInfo from '../form/Step1GroupInfo'
import Step2MemberDetails from '../form/Step2MemberDetails'
import Step3Terms from '../form/Step3Terms'
import Step4Payment from '../form/Step4Payment'
import Step5Confirmation from '../form/Step5Confirmation'
import { useRegistrationStore } from '../../store/registrationStore'
import { registerStyles } from './RegisterSection.styles'

export default function RegisterSection() {
  const currentStep = useRegistrationStore((s) => s.currentStep)

  const stepComponents: Record<number, React.ReactElement> = {
    1: <Step1GroupInfo />,
    2: <Step2MemberDetails />,
    3: <Step3Terms />,
    4: <Step4Payment />,
    5: <Step5Confirmation />,
  }

  return (
    <Box id="register" sx={registerStyles.outerBox}>
      <Container maxWidth="md">
        <Typography variant="h2" color="primary" textAlign="center">
          Register for the Event
        </Typography>
        <Typography color="text.secondary" textAlign="center" mt={1}>
          Fill in the details below to secure your spot.
        </Typography>

        <ProgressStepper />

        <Paper
          elevation={0}
          sx={registerStyles.paper}
        >
          {stepComponents[currentStep]}
        </Paper>
      </Container>
    </Box>
  )
}
