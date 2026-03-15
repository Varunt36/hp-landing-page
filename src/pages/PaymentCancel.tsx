// src/pages/PaymentCancel.tsx
// Shown when the user cancels or abandons the Stripe checkout.
// No charge is ever made at this point — Stripe only captures on completion.
// Reference number is read from ?ref= query param (set by backend in Stripe cancel_url),
// with sessionStorage as a fallback.
import { useSearchParams } from 'react-router-dom'
import { Box, Typography, Button, Paper } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { paymentCancelStyles as s } from './PaymentCancel.styles'

export default function PaymentCancel() {
  const [params] = useSearchParams()
  // Prefer query param (set by backend in Stripe cancel_url); fall back to sessionStorage
  const ref = params.get('ref') || sessionStorage.getItem('hp_confirm_ref')

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

        <Button variant="contained" href="/#register" sx={s.tryAgainButton}>
          Try Again
        </Button>
        <Button variant="outlined" href="/">
          Back to Home
        </Button>
      </Paper>
    </Box>
  )
}
