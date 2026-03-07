// src/components/layout/Footer.tsx
import { Box, Container, Typography, Link } from '@mui/material'
import { FOOTER } from '../../data/data'
import { footerStyles } from './Footer.styles'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={footerStyles.footer}
    >
      <Container maxWidth="md">
        <Typography variant="h6" sx={footerStyles.brand} fontWeight={700} mb={1.25}>
          {FOOTER.brand}
        </Typography>
        <Typography fontSize={14} mb={0.75}>{FOOTER.legal}</Typography>
        <Typography fontSize={14}>
          Questions? Email:{' '}
          <Link href={`mailto:${FOOTER.email}`} sx={footerStyles.emailLink}>
            {FOOTER.email}
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}
