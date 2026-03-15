// src/components/form/Step5Confirmation.tsx
// Step 5 — the final screen shown after a successful payment.
// This component is rendered when Stripe redirects back to /payment/success,
// which mounts RegisterSection at step 5 using the confirmRef saved in the store.
// Clicking "Register Another Group" calls reset() to clear all store state
// and return the form to Step 1 for a fresh registration.

import { Box, Typography, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useRegistrationStore } from '../../store/registrationStore'
import { FOOTER, EVENT } from '../../data/data'
import { step5Styles } from './Step5Confirmation.styles'

export default function Step5Confirmation() {
  const { confirmRef, members, reset } = useRegistrationStore()

  // Member 1 is the primary contact — their first name is used in the thank-you message
  const primary = members[0]

  return (
    <Box textAlign="center" py={2.5}>
      {/* Success icon */}
      <Box sx={step5Styles.iconCircle}>
        <CheckIcon sx={step5Styles.checkIcon} />
      </Box>

      <Typography variant="h4" color="primary" fontWeight={700} mb={1.5}>
        Registration Received!
      </Typography>

      {/* Personalised thank-you; gracefully handles missing name with a generic fallback */}
      <Typography color="text.secondary" mb={1}>
        Thank you{primary?.firstName ? `, ${primary.firstName}` : ''}, for registering for{' '}
        <strong>{EVENT.title}</strong>.
      </Typography>
      <Typography color="text.secondary" mb={2}>
        A confirmation email has been sent to your registered email address.
      </Typography>

      {/* Reference number comes from the backend via submitRegistration() in Step 4.
          The fallback placeholder is shown if the store has been cleared (e.g. page refresh). */}
      <Box sx={step5Styles.referenceBox}>
        Reference: <strong>{confirmRef || '#YDS-2026-00000'}</strong>
      </Box>

      <Typography color="text.secondary" fontSize={14} maxWidth={420} mx="auto" mb={3}>
        Please keep this reference number for your records. The YDS Germany team will be in touch with further details closer to the event.
      </Typography>

      <Typography color="text.secondary" fontSize={14} mb={3}>
        {FOOTER.closing}
      </Typography>

      {/* Resets the entire registration store back to initial state for a new group */}
      <Button variant="outlined" onClick={reset}>
        Register Another Group
      </Button>
    </Box>
  )
}
