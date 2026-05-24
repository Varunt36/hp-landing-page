import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { paymentSuccessStyles as s } from './PaymentSuccess.styles'
import { usePageMeta } from '../hooks/usePageMeta'
import { pollPaymentStatus } from '../api/registrations'

const REDIRECT_SECONDS = 8

type Phase = 'polling' | 'success' | 'error'

export default function PaymentSuccess() {
  usePageMeta('Registration Confirmed', 'Your registration for HP Amrut Mahotsav 2026 is confirmed. See you in Berlin!')

  const [params] = useSearchParams()
  const navigate  = useNavigate()
  const intentId  = params.get('intent_id')

  const [phase,     setPhase]     = useState<Phase>(intentId ? 'polling' : 'error')
  const [reference, setReference] = useState<string | null>(null)
  const [errorMsg,  setErrorMsg]  = useState<string | null>(
    intentId ? null : 'No payment reference found in the URL. Please contact support if you completed a payment.',
  )
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS)
  const didPoll = useRef(false)

  // Poll once; guard prevents double-fire in React strict mode
  useEffect(() => {
    if (!intentId || didPoll.current) return
    didPoll.current = true

    pollPaymentStatus(intentId)
      .then((data) => {
        if ((data.status === 'paid' || data.status === 'consumed') && data.reference) {
          sessionStorage.setItem('hp_confirm_ref', data.reference)
          setReference(data.reference)
          setPhase('success')
        } else if (data.status === 'failed' || data.status === 'expired' || data.status === 'not_found') {
          setErrorMsg(data.failure_reason ?? 'Payment could not be confirmed. Please contact support.')
          setPhase('error')
        } else {
          setErrorMsg('Payment received but reference not yet allocated. Please contact support.')
          setPhase('error')
        }
      })
      .catch((err: unknown) => {
        setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred. Please contact support.')
        setPhase('error')
      })
  }, [intentId])

  // Countdown starts only after a confirmed reference
  useEffect(() => {
    if (phase !== 'success') return
    if (countdown <= 0) { navigate('/hotel-offer'); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, countdown, navigate])

  if (phase === 'polling') {
    return (
      <Box sx={s.outer}>
        <Paper elevation={3} sx={s.paper}>
          <CircularProgress size={52} sx={{ color: 'success.main', mb: 3 }} />
          <Typography variant="h6" fontWeight={600} mb={1}>
            Confirming your payment…
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
          Registration Confirmed!
        </Typography>

        {reference && (
          <Typography variant="body1" color="text.secondary" mb={2}>
            Reference: <strong>{reference}</strong>
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" mb={3}>
          You will receive a confirmation email with your QR code(s) shortly.
          Please check your inbox (and spam folder).
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Redirecting in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}…
        </Typography>

        <Button variant="contained" onClick={() => navigate('/hotel-offer')}>
          Plan Your Stay →
        </Button>
      </Paper>
    </Box>
  )
}
