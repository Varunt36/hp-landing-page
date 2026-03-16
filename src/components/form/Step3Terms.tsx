// src/components/form/Step3Terms.tsx
// Step 3 of the registration form.
// Displays the event terms and conditions and requires the user to agree before payment.

import { useState } from 'react'
import {
  Typography, Box, Checkbox, FormControlLabel, Button, Alert,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { TERMS } from '../../data/data'
import { step3Styles } from './Step3Terms.styles'
import { sharedFormStyles } from './formShared.styles'

export default function Step3Terms() {
  const { termsAccepted, setTerms, setStep } = useRegistrationStore()

  // Local checkbox state — mirrors the store so the user's previous choice is preserved on back-nav
  const [checked, setChecked] = useState(termsAccepted)

  // Controls the warning shown when the user tries to continue without ticking the box
  const [error, setError] = useState(false)

  // Validates that the box is checked, then saves to store and advances to Step 4
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

      {/* Only shown after the user tries to proceed without accepting */}
      {error && (
        <Alert severity="warning" sx={step3Styles.alert}>
          Please agree to the terms and conditions to continue.
        </Alert>
      )}

      <FormControlLabel
        sx={{ mb: 1 }}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => { setChecked(e.target.checked); setError(false) }}
            color="secondary"
          />
        }
        label="I have read and agree to the above terms and conditions."
      />

      <Box sx={sharedFormStyles.navBox}>
        <Button variant="outlined" onClick={() => setStep(2)} sx={sharedFormStyles.backButton}>
          ← Back
        </Button>
        <Button variant="contained" color="inherit" onClick={handleNext} sx={sharedFormStyles.nextButton}>
          Next →
        </Button>
      </Box>
    </Box>
  )
}
