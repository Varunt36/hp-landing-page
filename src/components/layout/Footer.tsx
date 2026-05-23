import { Box, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FOOTER } from '../../data/data'
import { C } from '../../theme/theme'

export default function Footer() {
  const navigate = useNavigate()

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
            Na mein rahu na meri aarzoo rahe | May neither I nor my desires
            remain.
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
          <Typography sx={{ fontSize: 'inherit', color: 'inherit' }}>
            {FOOTER.legal}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
              flexWrap: 'wrap',
            }}
          >
            <Box
              component="span"
              role="button"
              tabIndex={0}
              onClick={() => navigate('/impressum')}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && navigate('/impressum')
              }
              sx={{
                color: `${C.cream}99`,
                cursor: 'pointer',
                fontSize: 13,
                '&:hover': { color: C.gold300 },
                transition: 'color .2s',
              }}
            >
              Impressum
            </Box>
            <Box
              component="a"
              href={`mailto:${FOOTER.email}`}
              sx={{
                color: `${C.cream}99`,
                '&:hover': { color: C.gold300 },
                transition: 'color .2s',
                fontSize: 13,
              }}
            >
              {FOOTER.email}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
