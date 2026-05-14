import React from 'react'
import {
  Dialog, DialogTitle, DialogContent,
  IconButton, Typography, Box,
  useMediaQuery, useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ProgressStepper from './ProgressStepper'
import Step1GroupInfo from './Step1GroupInfo'
import Step2MemberDetails from './Step2MemberDetails'
import Step3Terms from './Step3Terms'
import Step4Payment from './Step4Payment'
import Step5Confirmation from './Step5Confirmation'
import { useRegistrationStore } from '../../store/registrationStore'
import { C } from '../../theme/theme'

export default function RegisterModal() {
  const theme    = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { modalOpen, closeModal, currentStep } = useRegistrationStore()

  const stepComponents: Record<number, React.ReactElement> = {
    1: <Step1GroupInfo />,
    2: <Step2MemberDetails />,
    3: <Step3Terms />,
    4: <Step4Payment />,
    5: <Step5Confirmation />,
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={closeModal}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            borderRadius: isMobile ? 0 : '22px',
            bgcolor: C.cream,
            border: `1px solid ${C.lavender200}`,
            boxShadow: '0 8px 40px rgba(48, 24, 80, 0.18)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${C.gold500}, ${C.lavender300}, ${C.gold500})`,
              zIndex: 1,
            },
          },
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle
        sx={{
          textAlign: 'center',
          pt: { xs: 3.5, md: 4.5 },
          px: { xs: 2, md: 4 },
          pb: 0,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={closeModal}
          size="small"
          sx={{ position: 'absolute', top: 12, right: 12, color: C.muted }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Typography
          component="span"
          sx={{
            display: 'block',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: C.green700,
            fontWeight: 600,
            mb: 1,
          }}
        >
          Reserve your place
        </Typography>

        <Typography
          variant="h2"
          component="p"
          sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, lineHeight: 1.2 }}
        >
          Registration
        </Typography>

        {/* Gold divider ornament */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.25,
            mt: 1.5,
          }}
        >
          <Box sx={{ height: '1px', width: 36, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
          <Typography component="span" sx={{ color: C.gold600, fontSize: 12, lineHeight: 1 }}>✦</Typography>
          <Box sx={{ height: '1px', width: 36, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
        </Box>
      </DialogTitle>

      {/* ── Content ── */}
      <DialogContent sx={{ px: { xs: 2, md: 4 }, pb: 4, pt: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.1rem', md: '1.35rem' }, mb: 0.75 }}
          >
            Begin your divine journey
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            Please share a few details. A confirmation will be sent to your email.
          </Typography>
        </Box>

        <ProgressStepper />

        <Box key={currentStep} sx={{ animation: 'slideIn 300ms ease both' }}>
          {stepComponents[currentStep]}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
