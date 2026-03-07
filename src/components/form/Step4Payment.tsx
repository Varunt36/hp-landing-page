// src/components/form/Step4Payment.tsx
import { useState } from 'react'
import {
  Typography, Box, Tabs, Tab, Divider, Button,
  Grid, TextField,
} from '@mui/material'
import { useRegistrationStore } from '../../store/registrationStore'
import { PRICING } from '../../data/data'
import { submitRegistration, type RegistrationPayload } from '../../api/registrations'
import { step4Styles } from './Step4Payment.styles'

function PaymentSummary() {
  const { groupInfo, members } = useRegistrationStore()
  const base  = groupInfo.memberCount * PRICING.perPerson
  const fee   = base * PRICING.serviceFeeRate
  const grand = base + fee

  return (
    <Box sx={step4Styles.summaryBox}>
      {members.map((m, i) => (
        <Box key={i} sx={step4Styles.memberRow}>
          <Typography>{m.firstName || `Member ${i + 1}`} {m.lastName}</Typography>
          <Typography>{PRICING.currency}{PRICING.perPerson.toFixed(2)}</Typography>
        </Box>
      ))}
      <Divider sx={step4Styles.divider} />
      <Box sx={step4Styles.totalRow}>
        <Typography>Base Total</Typography>
        <Typography>{PRICING.currency}{base.toFixed(2)}</Typography>
      </Box>
      <Box sx={step4Styles.totalRow}>
        <Typography>Service Fee ({PRICING.serviceFeeRate * 100}%)</Typography>
        <Typography>{PRICING.currency}{fee.toFixed(2)}</Typography>
      </Box>
      <Divider sx={step4Styles.divider} />
      <Box sx={step4Styles.totalRow}>
        <Typography fontWeight={700} fontSize={18}>Total</Typography>
        <Typography fontWeight={700} fontSize={18}>{PRICING.currency}{grand.toFixed(2)}</Typography>
      </Box>
    </Box>
  )
}

function StripePlaceholder() {
  return (
    <Box>
      <Typography fontWeight={700} color="primary" mb={0.5}>Credit Card Details</Typography>
      <Typography fontSize={12} color="text.secondary" mb={2.5}>
        Powered by Stripe — integration coming soon
      </Typography>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="First Name" disabled />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Last Name" disabled />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Card Number" placeholder="1234 1234 1234 1234" disabled />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField fullWidth label="MM / YY" disabled />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField fullWidth label="CVC" disabled />
        </Grid>
      </Grid>
    </Box>
  )
}

function PayPalPlaceholder() {
  return (
    <Box sx={step4Styles.paypalBox}>
      <Typography color="text.secondary">PayPal integration coming soon.</Typography>
    </Box>
  )
}

export default function Step4Payment() {
  const [tab,     setTab]     = useState(0)
  const [loading, setLoading] = useState(false)
  const { groupInfo, members, termsAccepted, setStep, setConfirmRef } = useRegistrationStore()

  const handlePay = async () => {
    setLoading(true)
    try {
      const payload: RegistrationPayload = {
        country:       groupInfo.country,
        karyakarta:    groupInfo.karyakarta,
        memberCount:   groupInfo.memberCount,
        members:       members,
        termsAccepted,
      }
      const result = await submitRegistration(payload)
      setConfirmRef(result.reference)
      setStep(5)
    } catch (err) {
      console.error(err)
      // TODO: show error snackbar
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

      <Tabs value={tab} onChange={(_, v: number) => setTab(v)} sx={step4Styles.tabsBar}>
        <Tab label="Stripe" />
        <Tab label="PayPal" />
      </Tabs>

      {tab === 0 && <StripePlaceholder />}
      {tab === 1 && <PayPalPlaceholder />}

      <Box sx={step4Styles.navBox}>
        <Button variant="outlined" onClick={() => setStep(3)}>← Back</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePay}
          disabled={loading}
          sx={step4Styles.nextButton}
        >
          {loading ? 'Processing…' : 'Pay & Register'}
        </Button>
      </Box>
    </Box>
  )
}
