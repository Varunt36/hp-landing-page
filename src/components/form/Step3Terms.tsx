import { useState } from 'react'
import {
  Typography, Box, Checkbox, FormControlLabel, Button, Alert,
} from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import { useRegistrationStore } from '../../store/registrationStore'
import { step3Styles } from './Step3Terms.styles'
import { sharedFormStyles } from './formShared.styles'
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
      <Typography variant="h5" color="primary" fontWeight={700} mb={0.5}>
        Terms &amp; Conditions
      </Typography>
      <Typography color="text.secondary" fontSize={15} mb={2.5}>
        Please review and agree to the following before proceeding.
      </Typography>

      <Box sx={step3Styles.termsBox}>
        {/* Section header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.75 }}>
          <Box
            sx={{
              width: 32, height: 32, borderRadius: '8px',
              background: `rgba(107,74,150,0.1)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <ShieldIcon sx={{ fontSize: 18, color: C.purple700 }} />
          </Box>
          <Typography fontWeight={700} fontSize={14.5} color="text.primary">
            Data Protection (Datenschutz)
          </Typography>
        </Box>

        {/* Bullet points */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {GDPR_POINTS.map((point, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 6, height: 6, borderRadius: '50%', mt: '7px', flexShrink: 0,
                  background: C.gold600,
                }}
              />
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
