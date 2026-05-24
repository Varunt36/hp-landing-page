import { Box, Container, Typography, Divider, Grid } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HotelIcon from '@mui/icons-material/Hotel'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import { C } from '../../theme/theme'

type Line = string | { text: string; bold: boolean }

const items: { icon: React.ReactNode; title: string; lines: Line[] }[] = [
  {
    icon: <AccessTimeIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Date & Time',
    lines: ['15 Aug 2026, 16:00 to', '17 Aug 2026, 14:00'],
  },
  {
    icon: <HotelIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Accommodation and Transportation',
    lines: [
      { text: 'Please arrange your own stay and accomodation.', bold: true },
      'Discounted hotel rooms available.',
      'Booking link sent after registration.',
    ],
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Meals',
    lines: [
      'Lunch, dinner & refreshments included.',
      'Breakfast is not included. However, if you stay at the hotel, breakfast is included in the room rate.',
    ],
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Contribution',
    lines: ['€290 per person.', 'Children under 5 attend free registration is still required for all members.'],
  },
]

function renderLine(line: Line, i: number, fontSize: string) {
  const text   = typeof line === 'string' ? line : line.text
  const isBold = typeof line === 'object' && line.bold
  return (
    <Typography
      key={i}
      sx={{
        fontSize,
        color: 'text.secondary',
        lineHeight: 1.65,
        fontWeight: isBold ? 700 : 400,
      }}
    >
      {text}
    </Typography>
  )
}

export default function EventInfoSection() {
  return (
    <Box
      component="section"
      sx={{
        borderTop: `1px solid ${C.lavender200}`,
        borderBottom: `1px solid ${C.lavender200}`,
        background: C.lavender50,
        py: { xs: 5, md: 5.5 },
      }}
    >
      <Container maxWidth="lg">
        {/* Desktop: one row with vertical dividers */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0 }}>
          {items.map((item, idx) => (
            <Box key={item.title} sx={{ display: 'flex', flex: 1 }}>
              {idx > 0 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: C.lavender200, mx: 3 }}
                />
              )}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  {item.icon}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: C.purple800,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                {item.lines.map((line, i) => renderLine(line, i, '0.875rem'))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Mobile: 2×2 grid */}
        <Grid container spacing={3} sx={{ display: { xs: 'flex', md: 'none' } }}>
          {items.map((item) => (
            <Grid key={item.title} size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                  {item.icon}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: C.teal300,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                {item.lines.map((line, i) => renderLine(line, i, '0.82rem'))}
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* Notice */}
        <Box
          sx={{
            mt: { xs: 4, md: 4.5 },
            pt: { xs: 3, md: 3.5 },
            borderTop: `1px solid ${C.lavender200}`,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '0.925rem' },
              fontWeight: 700,
              color: C.purple800,
              lineHeight: 1.7,
              maxWidth: 780,
              mx: 'auto',
            }}
          >
            We humbly request all devotees to kindly avoid visiting Guru Hari's accommodation unannounced if darshan is planned, it will be communicated via WhatsApp, Telegram, or personal invitation.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
