// src/pages/city-tour/CityTourSuccess.tsx
// Landing page after Stripe checkout for the city tour.
//
// Adapted from PaymentSuccess.tsx, not copied: the polling, timeout and error
// behaviour are identical, but the city tour issues no QR codes, so the copy
// must not promise them.

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { cityTourSuccessStyles as s } from './CityTourSuccess.styles'
import { usePageMeta } from '../../hooks/usePageMeta'
import { pollPaymentStatus } from '../../api/registrations'

type Phase = 'polling' | 'success' | 'error'

export default function CityTourSuccess() {
  usePageMeta('City Tour Confirmed', 'Your place on the HPAM Germany 2026 Berlin City Tour is confirmed.')

  const [params] = useSearchParams()
  const navigate = useNavigate()
  const intentId = params.get('intent_id')

  const [phase,     setPhase]     = useState<Phase>(intentId ? 'polling' : 'error')
  const [reference, setReference] = useState<string | null>(null)
  const [errorMsg,  setErrorMsg]  = useState<string | null>(
    intentId ? null : 'No payment reference found in the URL. Please contact support if you completed a payment.',
  )
  const didPoll = useRef(false)

  // Poll once; the guard prevents a double fire under React strict mode.
  useEffect(() => {
    if (!intentId || didPoll.current) return
    didPoll.current = true

    pollPaymentStatus(intentId)
      .then((data) => {
        // 'consumed' is the success terminal state for both flows.
        if ((data.status === 'paid' || data.status === 'consumed') && data.reference) {
          setReference(data.reference)
          setPhase('success')
        } else if (data.status === 'failed' || data.status === 'expired' || data.status === 'not_found') {
          setErrorMsg(data.failure_reason ?? 'Your booking could not be confirmed. Please contact support.')
          setPhase('error')
        } else {
          setErrorMsg('Payment received but your booking reference is not yet available. Please contact support.')
          setPhase('error')
        }
      })
      .catch((err: unknown) => {
        setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred. Please contact support.')
        setPhase('error')
      })
  }, [intentId])

  if (phase === 'polling') {
    return (
      <Box sx={s.outer}>
        <Paper elevation={3} sx={s.paper}>
          <CircularProgress size={52} sx={{ color: 'success.main', mb: 3 }} />
          <Typography variant="h6" fontWeight={600} mb={1}>
            Confirming your booking…
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait — this usually takes just a few seconds.
          </Typography>
        </Paper>
      </Box>
    )
  }

  if (phase === 'error') {
    return (
      <Box sx={s.outer}>
        <Paper elevation={3} sx={s.paper}>
          <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
            {errorMsg}
          </Alert>
          <Typography variant="body2" color="text.secondary" mb={3}>
            If you were charged, please contact us with your payment details and we will resolve this promptly.
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={s.outer}>
      <Paper elevation={3} sx={s.paper}>
        <CheckCircleOutlineIcon sx={s.icon} />

        <Typography variant="h5" fontWeight={700} mb={1}>
          You're booked on the City Tour!
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Thank you for your payment.
        </Typography>

        {reference && (
          <Box sx={s.referenceBox}>
            <Typography variant="caption" color="text.secondary" display="block">
              Booking reference
            </Typography>
            <Typography sx={s.referenceValue}>{reference}</Typography>
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" mb={3}>
          A confirmation email with your booking details is on its way. Please
          check your inbox — and your spam folder, just in case.
        </Typography>

        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Home →
        </Button>
      </Paper>
    </Box>
  )
}
