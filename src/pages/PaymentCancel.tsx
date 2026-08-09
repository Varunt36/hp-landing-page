// src/pages/PaymentCancel.tsx
// Shown when the user cancels or abandons the Stripe checkout.
// No charge is ever made at this point — Stripe only captures on completion.
// Reference number is read from ?ref= query param (set by backend in Stripe cancel_url),
// with sessionStorage as a fallback.
//
// The backend points both checkouts here, so "Try Again" has to be aimed from
// the flow mark left behind by whichever form started the payment.
import { useSearchParams } from 'react-router-dom'
import { Box, Typography, Button, Paper } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { paymentCancelStyles as s } from './PaymentCancel.styles'
import { usePageMeta } from '../hooks/usePageMeta'
import { getPaymentFlow } from '../utils/paymentFlow'

export default function PaymentCancel() {
  const isCityTour = getPaymentFlow() === 'city-tour'

  usePageMeta(
    'Payment Cancelled',
    isCityTour
      ? 'Your payment was cancelled — no charge was made. Return to book the HPAM Germany 2026 Berlin City Tour.'
      : 'Your payment was cancelled — no charge was made. Return to register for HP Amrut Mahotsav 2026.',
  )
  const [params] = useSearchParams()
  // Prefer query param (set by backend in Stripe cancel_url); fall back to
  // sessionStorage. The fallback is registration-only — hp_confirm_ref is
  // written by Step4Payment, so on a city tour cancel it would be a leftover
  // from an earlier registration attempt, not this booking.
  const ref = params.get('ref') || (isCityTour ? null : sessionStorage.getItem('hp_confirm_ref'))

  return (
    <Box sx={s.outer}>
      <Paper elevation={3} sx={s.paper}>
        <CancelOutlinedIcon sx={s.icon} />

        <Typography variant="h5" fontWeight={700} mb={1}>
          Payment Cancelled
        </Typography>

        {ref && (
          <Typography variant="body2" color="text.secondary" mb={1}>
            Reference: <strong>{ref}</strong>
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" mb={4}>
          Your payment was cancelled. No charge has been made. You can try again below.
        </Typography>

        <Button variant="contained" href={isCityTour ? '/city-tour' : '/#register'} sx={s.tryAgainButton}>
          Try Again
        </Button>
        <Button variant="outlined" href="/">
          Back to Home
        </Button>
      </Paper>
    </Box>
  )
}
