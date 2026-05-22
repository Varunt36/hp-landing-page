// src/pages/PaymentSuccess.tsx
// Shown after Stripe redirects back on successful payment.
// Reference number is read from the ?ref= query param (set by the backend in the Stripe success URL),
// with sessionStorage as a fallback for browsers that strip query params on redirect.
// Auto-redirects to home after REDIRECT_SECONDS seconds.
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Paper } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { paymentSuccessStyles as s } from './PaymentSuccess.styles'
import { usePageMeta } from '../hooks/usePageMeta'

const REDIRECT_SECONDS = 8

export default function PaymentSuccess() {
  usePageMeta('Registration Confirmed', 'Your registration for HP Amrut Mahotsav 2026 is confirmed. See you in Berlin!')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  // Prefer query param (set by backend in Stripe success_url); fall back to sessionStorage
  const ref = params.get('ref') || sessionStorage.getItem('hp_confirm_ref')

  const [countdown, setCountdown] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/hotel-offer')
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  return (
    <Box sx={s.outer}>
      <Paper elevation={3} sx={s.paper}>
        <CheckCircleOutlineIcon sx={s.icon} />

        <Typography variant="h5" fontWeight={700} mb={1}>
          Registration Confirmed!
        </Typography>

        {ref && (
          <Typography variant="body1" color="text.secondary" mb={2}>
            Reference: <strong>{ref}</strong>
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
