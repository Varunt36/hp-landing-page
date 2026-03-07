// src/components/form/Step3Terms.tsx
import { useState } from 'react'
import {
  Typography, Box, Checkbox, FormControlLabel, Button, Alert,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { TERMS } from '../../data/data'
import { step3Styles } from './Step3Terms.styles'

export default function Step3Terms() {
  const { termsAccepted, setTerms, setStep } = useRegistrationStore()
  const [checked, setChecked] = useState(termsAccepted)
  const [error,   setError]   = useState(false)

  const handleNext = () => {
    if (!checked) { setError(true); return }
    setTerms(true)
    setStep(4)
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        In the Spirit of Seva
      </Typography>
      <Typography color="text.secondary" fontSize={15} mb={2}>
        By registering for this event, you agree to the following:
      </Typography>

      <Box sx={step3Styles.termsBox}>
        {TERMS}
      </Box>

      {error && (
        <Alert severity="warning" sx={step3Styles.alert}>
          Please agree to the terms and conditions to continue.
        </Alert>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => { setChecked(e.target.checked); setError(false) }}
            color="secondary"
          />
        }
        label="I have read and agree to the above terms and conditions."
      />

      <Box sx={step3Styles.navBox}>
        <Button variant="outlined" onClick={() => setStep(2)}>← Back</Button>
        <Button variant="contained" color="secondary" onClick={handleNext} sx={step3Styles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
