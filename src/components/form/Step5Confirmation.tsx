// src/components/form/Step5Confirmation.tsx
import { Box, Typography, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useRegistrationStore } from '../../store/registrationStore'
import { FOOTER, EVENT } from '../../data/data'
import { step5Styles } from './Step5Confirmation.styles'

export default function Step5Confirmation() {
  const { confirmRef, members, reset } = useRegistrationStore()
  const primary = members[0]

  return (
    <Box textAlign="center" py={2.5}>
      <Box sx={step5Styles.iconCircle}>
        <CheckIcon sx={step5Styles.checkIcon} />
      </Box>

      <Typography variant="h4" color="primary" fontWeight={700} mb={1.5}>
        Registration Received!
      </Typography>

      <Typography color="text.secondary" mb={1}>
        Thank you{primary?.firstName ? `, ${primary.firstName}` : ''}, for registering for{' '}
        <strong>{EVENT.title}</strong>.
      </Typography>
      <Typography color="text.secondary" mb={2}>
        A confirmation email has been sent to your registered email address.
      </Typography>

      <Box sx={step5Styles.referenceBox}>
        Reference: <strong>{confirmRef || '#YDS-2026-00000'}</strong>
      </Box>

      <Typography color="text.secondary" fontSize={14} maxWidth={420} mx="auto" mb={3}>
        Please keep this reference number for your records. The YDS Germany team will be in touch with further details closer to the event.
      </Typography>

      <Typography color="text.secondary" fontSize={14} mb={3}>
        {FOOTER.closing}
      </Typography>

      <Button variant="outlined" onClick={reset}>
        Register Another Group
      </Button>
    </Box>
  )
}
