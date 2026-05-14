import { Box, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FOOTER, NAV_LINKS } from '../../data/data'
import { C } from '../../theme/theme'
import { useRegistrationStore } from '../../store/registrationStore'

export default function Footer() {
  const navigate = useNavigate()
  const openModal = useRegistrationStore((s) => s.openModal)

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(180deg, ${C.purple800}, ${C.purple900})`,
        color: `${C.cream}E6`,
        pt: { xs: 5, md: 6 },
        pb: { xs: 3, md: 3.5 },
      }}
    >
      <Container maxWidth="lg">
        {/* Tagline */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: { xs: '1.25rem', md: 'clamp(1.25rem, 2.4vw, 1.75rem)' },
              color: C.cream,
              lineHeight: 1.4,
            }}
          >
            Let us come together to celebrate devotion, wisdom and love.
          </Typography>
          <Typography
            sx={{
              display: 'block',
              mt: 1,
              fontFamily: '"Inter", sans-serif',
              fontSize: { xs: '0.7rem', md: '0.75rem' },
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.gold300,
              fontWeight: 600,
            }}
          >
            Be a part of this divine journey
          </Typography>
        </Box>

        {/* Links */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: C.gold300, fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
            Explore &amp; Get Involved
          </Typography>
          <Box
            component="ul"
            sx={{ listStyle: 'none', p: 0, mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px' }}
          >
            {NAV_LINKS.map((link) => (
              <Box
                key={link.href}
                component="li"
                onClick={() => navigate(link.href)}
                sx={{
                  fontSize: 14.5, color: `${C.cream}CC`, cursor: 'pointer',
                  '&:hover': { color: C.gold300 },
                  transition: 'color .2s',
                }}
              >
                {link.label}
              </Box>
            ))}
            <Box
              component="li"
              onClick={openModal}
              sx={{
                fontSize: 14.5, color: `${C.cream}CC`, cursor: 'pointer',
                '&:hover': { color: C.gold300 },
                transition: 'color .2s',
              }}
            >
              Register Now
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: { xs: 2.5, md: 3 },
            borderTop: `1px solid ${C.cream}2E`,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
            fontSize: 13,
            color: `${C.cream}99`,
          }}
        >
          <Typography sx={{ fontSize: 'inherit', color: 'inherit' }}>{FOOTER.legal}</Typography>
          <Box component="a" href={`mailto:${FOOTER.email}`} sx={{ color: `${C.cream}99`, '&:hover': { color: C.gold300 }, transition: 'color .2s', fontSize: 13 }}>
            {FOOTER.email}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
