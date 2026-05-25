import { useState } from 'react'
import {
  Typography, Box, Checkbox, FormControlLabel, Button, Alert,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { step3Styles } from './Step3Terms.styles'
import { sharedFormStyles } from './FormShared.styles'
import { C } from '../../theme/theme'

const GDPR_POINTS = [
  'By registering, you consent to the processing of your personal data under the EU GDPR (DSGVO) and German BDSG, solely for registration and event logistics.',
  'You may access, correct, or request deletion of your data, or withdraw consent at any time, by contacting the organising team.',
]

export default function Step3Terms() {
  const { termsAccepted, setTerms, setStep } = useRegistrationStore()
  const [checked, setChecked] = useState(termsAccepted)
  const [error, setError] = useState(false)

  const handleNext = () => {
    if (!checked) { setError(true); return }
    setTerms(true)
    setStep(4)
  }

  return (
    <Box>
      {/* Step heading */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: { xs: '1.55rem', sm: '1.75rem' },
            fontWeight: 700,
            fontStyle: 'italic',
            color: C.purple800,
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          Data Protection
        </Typography>
        <Typography color="text.secondary" fontSize={14.5}>
          Your data is handled with the same care we bring to our seva.
        </Typography>
      </Box>

      {/* GDPR card */}
      <Box sx={step3Styles.termsBox}>
        {/* Points */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {GDPR_POINTS.map((point, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <Box component="span" sx={{ mt: '6px', width: 6, height: 6, borderRadius: '50%', background: C.gold700, flexShrink: 0 }} />
              <Typography fontSize={13.5} color="text.secondary" lineHeight={1.7}>
                {point}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {error && (
        <Alert severity="warning" sx={step3Styles.alert}>
          Please agree to the terms and conditions to continue.
        </Alert>
      )}

      <FormControlLabel
        sx={{ mb: 1, '& .MuiFormControlLabel-label': { color: C.purple600 } }}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => { setChecked(e.target.checked); setError(false) }}
            sx={{
              color: C.purple600,
              '&.Mui-checked': { color: C.purple600 },
            }}
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
