// src/components/form/Step4Payment.tsx/// Step 4 of the registration form — payment.
// Shows a cost breakdown for all members, then submits the full registration payload
// to the backend. On success, the user is redirected to Stripe's hosted checkout page.

import { useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckIcon from '@mui/icons-material/Check';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useRegistrationStore } from '../../store/registrationStore';
import { PRICING } from '../../data/data';
import {
  submitRegistration,
  type RegistrationPayload,
} from '../../api/registrations';
import { step4Styles } from './Step4Payment.styles';
import { sharedFormStyles } from './formShared.styles';
import { C } from '../../theme/theme';

type PayMethod = 'card' | 'paypal';

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

function PayPalLogo({ muted, light }: { muted?: boolean; light?: boolean }) {
  const iconColor = light ? 'white' : muted ? '#aaa' : '#003087';
  const textColor = light ? 'white' : muted ? '#aaa' : '#003087';
  const spanColor = light ? 'rgba(255,255,255,0.85)' : muted ? '#aaa' : '#009CDE';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 20, height: 20, flexShrink: 0 }}>
        <path fill={iconColor}
          d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.59 3.025-2.566 6.643-8.993 6.643h-2.19a.64.64 0 0 0-.633.74l-1.12 7.106a.641.641 0 0 0 .633.74h3.578l.924-5.856h2.19c5.08 0 8.2-2.463 9.26-7.34.48-2.208.193-3.878-.998-4.746z" />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: 16, color: textColor, letterSpacing: '-0.01em' }}>
        Pay<Box component="span" sx={{ color: spanColor }}>Pal</Box>
      </Typography>
    </Box>
  );
}

function MethodTile({ method, selected, onSelect }: {
  method: PayMethod; selected: PayMethod; onSelect: (m: PayMethod) => void;
}) {
  const isSelected = method === selected;
  return (
    <Box
      onClick={() => onSelect(method)}
      sx={{
        flex: 1,
        position: 'relative',
        borderRadius: '10px',
        border: isSelected ? `1.5px solid ${C.purple700}` : '1.5px solid rgba(45,43,107,0.15)',
        background: isSelected
          ? `linear-gradient(135deg, rgba(107,74,150,0.10), rgba(107,74,150,0.04))`
          : 'rgba(250,249,255,0.7)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 1.25,
        minHeight: 64,
        '&:hover': { borderColor: C.purple700, background: `rgba(107,74,150,0.05)` },
      }}
    >
      {/* Checkmark */}
      <Box sx={{
        position: 'absolute', top: 6, right: 6,
        width: 16, height: 16, borderRadius: '50%',
        background: isSelected ? C.purple700 : 'rgba(45,43,107,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
      }}>
        <CheckIcon sx={{ fontSize: 10, color: isSelected ? 'white' : 'rgba(45,43,107,0.25)' }} />
      </Box>

      {method === 'card' ? (
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCardIcon sx={{ fontSize: 17, color: isSelected ? C.purple700 : 'text.secondary', flexShrink: 0 }} />
            <Typography fontWeight={600} fontSize={12.5} color={isSelected ? C.purple800 : 'text.primary'} noWrap>
              Credit / Debit Card
            </Typography>
          </Box>
          <Box sx={{ mt: 0.75, pr: 2 }}>
            <CardBrands />
          </Box>
        </Box>
      ) : (
        <Box sx={{ pr: 2.5 }}>
          <PayPalLogo muted={!isSelected} />
        </Box>
      )}
    </Box>
  );
}

// Reads pricing config from data.ts — change perPerson or serviceFeeRate there to update all totals
function PaymentSummary() {
  const { groupInfo } = useRegistrationStore();
  const count = groupInfo.memberCount;
  const grand = count * PRICING.perPerson;

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
          <Typography fontSize={13.5} color="text.secondary">Attendees</Typography>
          <Typography fontSize={13.5} fontWeight={600}>
            {count} {count === 1 ? 'person' : 'persons'}
          </Typography>
        </Box>
        <Box sx={step4Styles.summaryRow}>
          <Typography fontSize={13.5} color="text.secondary">Price per person</Typography>
          <Typography fontSize={13.5} fontWeight={600}>
            {PRICING.currency}{PRICING.perPerson.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={step4Styles.divider} />

      {/* Grand total */}
      <Box sx={step4Styles.grandTotalRow}>
        <Typography fontWeight={700} fontSize={15}>Total</Typography>
        <Typography fontWeight={700} fontSize={22} color={C.purple800}>
          {PRICING.currency}{grand.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Step4Payment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payMethod, setPayMethod] = useState<PayMethod>('card');
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
        paymentMethod: payMethod === 'card' ? 'stripe' : 'paypal',
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

      {/* Pay With selector */}
      <Box sx={step4Styles.payWithRow}>
        <Typography sx={step4Styles.payWithLabel}>Pay With</Typography>
        <Divider sx={step4Styles.payWithDivider} />
      </Box>
      <Box sx={step4Styles.methodRow}>
        <MethodTile method="card" selected={payMethod} onSelect={setPayMethod} />
        <MethodTile method="paypal" selected={payMethod} onSelect={setPayMethod} />
      </Box>

      {/* Reassurance message — payment is handled entirely by Stripe */}
      <Box sx={step4Styles.stripeNotice}>
        <LockIcon fontSize="small" />
        <Typography variant="body2">
          You will be redirected to Stripe's secure checkout to complete
          payment. Card, PayPal, and other methods are available there.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
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
