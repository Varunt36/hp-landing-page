// src/components/form/RegistrationClosed.tsx
import { Box, Typography } from '@mui/material'
import { C } from '../../theme/theme'
import { PEOPLE } from '../../data/data'

export default function RegistrationClosed() {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 3, md: 4 } }}>
      <Typography
        variant="h3"
        component="p"
        sx={{
          fontFamily: '"Blue Mirage", serif',
          fontSize: { xs: '1.15rem', md: '1.3rem' },
          color: C.purple800,
          mb: 1.5,
        }}
      >
        Registration is now closed
      </Typography>

      <Typography sx={{ color: C.purple700, fontSize: '0.95rem', mb: 3, maxWidth: 420, mx: 'auto' }}>
        Jai Swaminarayan Bhagat, registration for HariPrabodham Amrut Mahotsav 2026 has now closed.
        For any queries, please reach out to one of us below.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        {PEOPLE.map((person) => (
          <Box
            key={person.name}
            sx={{
              border: `1px solid ${C.lavender200}B3`,
              borderRadius: '14px',
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: C.purple800 }}>
              {person.name}
            </Typography>
            <Box
              component="a"
              href={person.phone}
              sx={{
                display: 'block',
                mt: 0.5,
                fontSize: '0.95rem',
                color: C.muted,
                textDecoration: 'none',
                '&:hover': { color: C.purple800 },
              }}
            >
              {person.phone.replace('tel:', '')}
            </Box>
            <Box
              component="a"
              href={person.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                mt: 0.5,
                fontSize: '0.95rem',
                color: C.muted,
                textDecoration: 'none',
                '&:hover': { color: C.purple800 },
              }}
            >
              WhatsApp
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
