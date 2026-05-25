import { Box, Container, Typography } from '@mui/material'
import { C } from '../../theme/theme'

const DAYS: { date: string; sessions: { name: string; time: string }[] }[] = [
  {
    date: 'Saturday, 15 August',
    sessions: [
      { name: 'Session 1', time: 'Afternoon' },
    ],
  },
  {
    date: 'Sunday, 16 August',
    sessions: [
      { name: 'Session 2', time: 'Morning' },
      { name: 'Session 3', time: 'Afternoon' },
      { name: 'Cultural Program', time: 'Evening' },
    ],
  },
  {
    date: 'Monday, 17 August',
    sessions: [
      { name: "Session 4: Guruhari Pragatya Din Celebration", time: 'Morning' },
    ],
  },
]

const card = {
  background: C.cream,
  border: `1px solid ${C.lavender200}B3`,
  borderRadius: '18px',
  p: { xs: 3, md: 3.5 },
  boxShadow: '0 1px 2px rgba(60,30,90,0.06), 0 2px 8px rgba(60,30,90,0.04)',
  transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
  cursor: 'default',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)',
    borderColor: `${C.gold500}80`,
  },
}

export default function ProgramsSection() {
  return (
    <Box
      id="programme"
      sx={{
        background: `linear-gradient(180deg, ${C.cream} 0%, ${C.lavender50} 100%)`,
        py: { xs: 10, md: 13 },
      }}
    >
      <Container maxWidth="lg">
        {/* ── Compact about intro ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography
            component="span"
            sx={{
              fontFamily: '"Blue Mirage", serif',
              fontSize: '1rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.purple600,
              fontWeight: 600,
            }}
          >
            About the Mahotsav
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              fontSize: { xs: '1.7rem', md: 'clamp(1.7rem, 3.4vw, 2.75rem)' },
              color: C.purple800,
            }}
          >
            A divine celebration of awakening, unity &amp; selfless service.
          </Typography>
          <Typography
            sx={{
              mt: 1.75,
              mx: 'auto',
              maxWidth: 920,
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.75,
              color: C.ink,
            }}
          >
            A three-day gathering of discourses, devotional music, and sevā
            honouring timeless wisdom and rekindling the inner flame of love,
            compassion, and oneness.
          </Typography>
        </Box>

        {/* ── Section heading ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            component="span"
            sx={{
              fontFamily: '"Blue Mirage", serif',
              fontSize: '1rem',
              color: C.purple600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Three Days · Three Journeys
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, color: C.purple800 }}>
            The Programs
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.25,
              mt: 1.75,
              color: C.gold600,
              fontSize: 14,
            }}
          >
            <Box
              sx={{
                height: '1px',
                width: 40,
                background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)`,
              }}
            />
            ✦
            <Box
              sx={{
                height: '1px',
                width: 40,
                background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)`,
              }}
            />
          </Box>
        </Box>

        {/* ── Day cards ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, md: 2.75 },
          }}
        >
          {DAYS.map(({ date, sessions }) => (
            <Box key={date} sx={card}>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: 'italic',
                  color: C.purple800,
                  fontSize: { xs: '1.3rem', md: '1.4rem' },
                  fontWeight: 600,
                  mb: 1.75,
                }}
              >
                {date}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {sessions.map(({ name, time }) => (
                  <Box
                    key={name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                      pt: 1,
                      borderTop: `1px dashed ${C.lavender200}`,
                      '&:first-of-type': { borderTop: 'none', pt: 0 },
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: 13.5, md: 14 }, color: C.ink, lineHeight: 1.4 }}>
                      {name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: C.gold700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
