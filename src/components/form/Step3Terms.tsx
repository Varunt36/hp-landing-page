import { useState } from 'react'
import {
  Typography, Box, Checkbox, FormControlLabel, Button, Alert,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { step3Styles } from './Step3Terms.styles'
import { sharedFormStyles } from './formShared.styles'
import { C } from '../../theme/theme'

const GDPR_POINTS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'By registering, you consent to the processing of your personal data under the EU GDPR (DSGVO) and German BDSG, solely for registration and event logistics.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    text: 'You may access, correct, or request deletion of your data, or withdraw consent at any time, by contacting the organising team.',
  },
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
              <Box
                sx={{
                  width: 30, height: 30, borderRadius: '8px', flexShrink: 0, mt: '1px',
                  background: `rgba(200,135,42,0.10)`,
                  border: `1px solid rgba(200,135,42,0.22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: C.gold700,
                }}
              >
                {point.icon}
              </Box>
              <Typography fontSize={13.5} color="text.secondary" lineHeight={1.7}>
                {point.text}
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
