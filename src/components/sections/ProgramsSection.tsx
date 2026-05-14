import { Box, Container, Typography } from '@mui/material'
import { C } from '../../theme/theme'

const DAYS = [
  {
    num: 'Day One',
    title: 'Awakening',
    date: 'Friday, 15 August 2026',
    desc: 'Inaugural arati & lamp lighting.\nWelcome discourse and opening kirtan.',
  },
  {
    num: 'Day Two',
    title: 'Devotion',
    date: 'Saturday, 16 August 2026',
    desc: 'Yoga, discourse and sevā workshops.\nMahā-kirtan with classical artists.',
  },
  {
    num: 'Day Three',
    title: 'Unity',
    date: 'Sunday, 17 August 2026',
    desc: 'Group satsaṅg and youth dialogue.\nClosing blessings and mahā-prasād.',
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
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.green700,
              fontWeight: 600,
            }}
          >
            About the Mahotsav
          </Typography>
          <Typography
            variant="h2"
            sx={{ mt: 1, fontSize: { xs: '1.7rem', md: 'clamp(1.7rem, 3.4vw, 2.75rem)' }, color: C.purple800 }}
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
            A three-day gathering of discourses, devotional music, and sevā — honouring timeless
            wisdom and rekindling the inner flame of love, compassion, and oneness.
          </Typography>
        </Box>

        {/* ── Section heading ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            component="span"
            sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}
          >
            Three Days · Three Journeys
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, color: C.purple800 }}>
            The Programs
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
            ✦
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
          </Box>
        </Box>

        {/* ── Day cards ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
          {DAYS.map(({ num, title, date, desc }) => (
            <Box key={num} sx={card}>
              <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: C.gold700, fontSize: 14, letterSpacing: '0.04em' }}>
                {num}
              </Typography>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.625rem' }, mt: 0.75, color: C.purple800 }}>
                {title}
              </Typography>
              <Typography sx={{ color: C.green700, fontSize: 14, mt: 0.5, fontWeight: 500 }}>
                {date}
              </Typography>
              <Typography
                sx={{
                  mt: 1.75, fontSize: { xs: 14, md: 14.5 }, lineHeight: 1.55,
                  color: C.muted, fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
                  whiteSpace: 'pre-line',
                }}
              >
                {desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
