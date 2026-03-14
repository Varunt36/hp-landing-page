// src/components/form/Step4Payment.tsx
// Step 4 of the registration form — payment.
// Shows a cost breakdown for all members, then submits the full registration payload
// to the backend. On success, the user is redirected to Stripe's hosted checkout page.

import { useState } from 'react'
import {
  Typography, Box, Divider, Button, Alert, CircularProgress,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useRegistrationStore } from '../../store/registrationStore'
import { PRICING } from '../../data/data'
import { submitRegistration, type RegistrationPayload } from '../../api/registrations'
import { step4Styles } from './Step4Payment.styles'
import { sharedFormStyles } from './formShared.styles'

// Reads pricing config from data.ts — change perPerson or serviceFeeRate there to update all totals
function PaymentSummary() {
  const { groupInfo, members } = useRegistrationStore()
  const base  = groupInfo.memberCount * PRICING.perPerson
  const fee   = base * PRICING.serviceFeeRate
  const grand = base + fee

  return (
    <Box sx={step4Styles.summaryBox}>
      {/* One row per registered member; falls back to "Member N" if name is missing */}
      {members.map((m, i) => (
        <Box key={m.email || i} sx={step4Styles.memberRow}>
          <Typography>{m.firstName || `Member ${i + 1}`} {m.lastName}</Typography>
          <Typography>{PRICING.currency}{PRICING.perPerson.toFixed(2)}</Typography>
        </Box>
      ))}

      <Divider sx={step4Styles.divider} />

      <Box sx={step4Styles.totalRow}>
        <Typography>Base Total</Typography>
        <Typography>{PRICING.currency}{base.toFixed(2)}</Typography>
      </Box>

      {/* Service fee covers payment processing costs (Stripe) */}
      <Box sx={step4Styles.totalRow}>
        <Typography>Service Fee ({PRICING.serviceFeeRate * 100}%)</Typography>
        <Typography>{PRICING.currency}{fee.toFixed(2)}</Typography>
      </Box>

      <Divider sx={step4Styles.divider} />

      {/* Grand total — gold highlighted row */}
      <Box sx={step4Styles.grandTotalRow}>
        <Typography fontWeight={700} fontSize={18}>Total</Typography>
        <Typography fontWeight={700} fontSize={18}>{PRICING.currency}{grand.toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}

export default function Step4Payment() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const { groupInfo, members, termsAccepted, setStep, setConfirmRef } = useRegistrationStore()

  const handlePay = async () => {
    setError('')
    if (members.length < groupInfo.memberCount) {
      setError('Please complete all member details before proceeding.')
      return
    }
    setLoading(true)
    try {
      const payload: RegistrationPayload = {
        country:       groupInfo.country,
        karyakarta:    groupInfo.karyakarta,
        memberCount:   groupInfo.memberCount,
        members,
        termsAccepted,
      }
      const result = await submitRegistration(payload)

      // Persist reference before redirect in two ways:
      // 1. Zustand store — used by Step 5 if the app stays in-memory
      // 2. sessionStorage — survives the full-page navigation that Stripe's redirect causes
      setConfirmRef(result.reference)
      sessionStorage.setItem('hp_confirm_ref', result.reference)
      window.location.href = result.payment_url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={3}>
        Payment Summary
      </Typography>

      <PaymentSummary />

      {/* Reassurance message — payment is handled entirely by Stripe */}
      <Box sx={step4Styles.stripeNotice}>
        <LockIcon fontSize="small" />
        <Typography variant="body2">
          You will be redirected to Stripe's secure checkout to complete payment.
          Card, PayPal, and other methods are available there.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <Box sx={sharedFormStyles.navBox}>
        <Button
          variant="outlined"
          onClick={() => setStep(3)}
          disabled={loading}
          sx={sharedFormStyles.backButton}
        >
          ← Back
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handlePay}
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? 'Processing payment, please wait' : undefined}
          sx={step4Styles.payButton}
        >
          {loading
            ? <CircularProgress size={20} sx={{ color: 'white' }} />
            : 'Pay & Register'
          }
        </Button>
      </Box>
    </Box>
  )
}
