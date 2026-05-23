// src/components/form/Step4Payment.tsx/// Step 4 of the registration form — payment.
// Shows a cost breakdown for all members, then submits the full registration payload
// to the backend. On success, the user is redirected to Stripe's hosted checkout page.

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Divider,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useRegistrationStore } from '../../store/registrationStore';
import {
  submitRegistration,
  type RegistrationPayload,
} from '../../api/registrations';
import { step4Styles } from './Step4Payment.styles';
import { sharedFormStyles } from './FormShared.styles';
import { C } from '../../theme/theme';

const PRICING = {
  perPerson: Number(import.meta.env.VITE_PRICE_PER_PERSON) || 290,
  currency: (import.meta.env.VITE_CURRENCY as string) || '€',
};

const EVENT_DATE = new Date('2026-08-15')

function ageAtEvent(dob: string): number {
  const birth = new Date(dob)
  let age = EVENT_DATE.getFullYear() - birth.getFullYear()
  const m = EVENT_DATE.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && EVENT_DATE.getDate() < birth.getDate())) age--
  return age
}

function CardBrands() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <Box sx={{ px: 0.6, height: 16, borderRadius: '2px', background: '#1A1F71', display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 7.5, fontWeight: 900, color: 'white', fontStyle: 'italic', letterSpacing: '0.03em' }}>VISA</Typography>
      </Box>
      <Box sx={{ position: 'relative', width: 22, height: 16, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 11, height: 11, borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0 }} />
        <Box sx={{ width: 11, height: 11, borderRadius: '50%', background: '#F79E1B', position: 'absolute', left: 6, opacity: 0.92 }} />
      </Box>
      <Box sx={{ px: 0.6, height: 16, borderRadius: '2px', background: '#2E77BC', display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 6.5, fontWeight: 700, color: 'white', letterSpacing: '0.02em' }}>AMEX</Typography>
      </Box>
    </Box>
  );
}


function PaymentSummary() {
  const { groupInfo, members } = useRegistrationStore();
  const total = groupInfo.memberCount;

  const paidCount = members.filter(m => !m.dob || ageAtEvent(m.dob) >= 5).length
  const freeCount = members.filter(m => m.dob && ageAtEvent(m.dob) < 5).length
  // members not yet filled default to paid
  const unpopulated = total - members.length
  const effectivePaid = paidCount + unpopulated
  const grand = effectivePaid * PRICING.perPerson;

  return (
    <Box sx={step4Styles.summaryBox}>
      {/* Event identity */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Box sx={step4Styles.ticketIconWrap}>
          <ConfirmationNumberIcon sx={{ fontSize: 20, color: C.gold600 }} />
        </Box>
        <Typography sx={step4Styles.eventName}>
          Hari Prabodham Amrut Mahotsav
        </Typography>
        <Typography sx={step4Styles.eventMeta}>
          Germany · 15 – 17 August 2026
        </Typography>
      </Box>

      <Divider sx={step4Styles.divider} />

      {/* Summary rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 1.5 }}>
        <Box sx={step4Styles.summaryRow}>
          <Typography fontSize={13.5} color="text.secondary">
            {freeCount > 0 ? 'Attendees (age 5+)' : 'Attendees'}
          </Typography>
          <Typography fontSize={13.5} fontWeight={600}>
            {effectivePaid} {effectivePaid === 1 ? 'person' : 'persons'}
          </Typography>
        </Box>
        <Box sx={step4Styles.summaryRow}>
          <Typography fontSize={13.5} color="text.secondary">Price per person</Typography>
          <Typography fontSize={13.5} fontWeight={600}>
            {PRICING.currency}{PRICING.perPerson.toFixed(2)}
          </Typography>
        </Box>
        {freeCount > 0 && (
          <Box sx={step4Styles.summaryRow}>
            <Typography fontSize={13.5} color="text.secondary">
              Children under 5
            </Typography>
            <Typography fontSize={13.5} fontWeight={600} color="success.main">
              {freeCount} {freeCount === 1 ? 'child' : 'children'} — Free
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={step4Styles.divider} />

      {/* Grand total */}
      <Box sx={step4Styles.grandTotalRow}>
        <Typography fontWeight={700} fontSize={15}>Total</Typography>
        <Typography fontWeight={700} fontSize={22} color={C.purple800}>
          {PRICING.currency}{grand.toFixed(2)}
        </Typography>
      </Box>

      {freeCount > 0 && (
        <Typography fontSize={12} color="text.secondary" textAlign="center" mt={1}>
          Children under 5 attend free — registration is still required for all members.
        </Typography>
      )}
    </Box>
  );
}

export default function Step4Payment() {
  const [loading, setLoading] = useState(false);
  const [slowRequest, setSlowRequest] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading) { setSlowRequest(false); return }
    const t = setTimeout(() => setSlowRequest(true), 6_000)
    return () => clearTimeout(t)
  }, [loading]);
  const { groupInfo, members, termsAccepted, setStep, setConfirmRef } =
    useRegistrationStore();

  const handlePay = async () => {
    setError('');
    if (members.length < groupInfo.memberCount) {
      setError('Please complete all member details before proceeding.');
      return;
    }
    setLoading(true);
    try {
      const payload: RegistrationPayload = {
        country: groupInfo.country,
        karyakarta: groupInfo.karyakarta,
        memberCount: groupInfo.memberCount,
        members,
        termsAccepted,
      };
      const result = await submitRegistration(payload);

      // Persist reference before redirect in two ways:
      // 1. Zustand store — used by Step 5 if the app stays in-memory
      // 2. sessionStorage — survives the full-page navigation that Stripe's redirect causes
      setConfirmRef(result.reference);
      sessionStorage.setItem('hp_confirm_ref', result.reference);
      window.location.href = result.payment_url;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={3}>
        Mahotsav Registration
      </Typography>

      <PaymentSummary />

      {/* Reassurance message */}
      <Box sx={step4Styles.stripeNotice}>
        <LockIcon fontSize="small" />
        <Typography variant="body2">
          You will be redirected to Stripe's secure checkout to complete payment by credit or debit card.
        </Typography>
      </Box>

      {slowRequest && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Taking longer than usual — our server may be waking up. Please wait a moment.
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2, whiteSpace: 'pre-line' }}
          action={
            error.includes('Member') ? (
              <Button color="inherit" size="small" onClick={() => setStep(2)}>
                Fix Details
              </Button>
            ) : undefined
          }
        >
          {error}
        </Alert>
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
          {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Pay'}
        </Button>
      </Box>
    </Box>
  );
}
