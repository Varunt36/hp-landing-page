import { Box, Container, Typography, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HotelIcon from '@mui/icons-material/Hotel'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import { C } from '../../theme/theme'

type Line = string | { text: string; bold: boolean }

const items: {
  icon: React.ReactNode;
  title: string;
  lines: Line[];
  link?: { text: string; href: string };
}[] = [
  {
    icon: <AccessTimeIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Date & Time',
    lines: ['15 Aug 2026, 16:00 to', '17 Aug 2026, 14:00'],
    link: { text: 'About the Mahotsav', href: '/venue#programme' },
  },
  {
    icon: <HotelIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Accommodation and Transportation',
    lines: [
      { text: 'Please arrange your own stay and accomodation.', bold: true },
      'Discounted hotel rooms are available at the event location.',
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
    lines: [
      '€290 per person.',
      'Children under 5 attend free. Registration is still required for all members.',
    ],
  },
];

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
        {/* Section heading */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="h2"
            sx={{
              mt: 0.75,
              fontFamily: '"Blue Mirage", serif',
              fontSize: { xs: '1.75rem', md: 'clamp(1.9rem, 3.4vw, 2.75rem)' },
              color: C.purple800,
            }}
          >
            Mahotsav at a Glance
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
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  {item.icon}
                  <Typography
                    sx={{
                      fontFamily: '"Blue Mirage", serif',
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
                {item.link && (
                  <Box
                    component={Link}
                    to={item.link.href}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: C.purple600,
                      textDecoration: 'none',
                      '&:hover': {
                        color: C.purple800,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item.link.text} →
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Mobile: 2×2 grid */}
        <Grid
          container
          spacing={3}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          {items.map((item) => (
            <Grid key={item.title} size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mb: 0.25,
                  }}
                >
                  {item.icon}
                  <Typography
                    sx={{
                      fontFamily: '"Blue Mirage", serif',
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
                {item.link && (
                  <Box
                    component="a"
                    href={item.link.href}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: C.purple600,
                      textDecoration: 'none',
                      '&:hover': {
                        color: C.purple800,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item.link.text} →
                  </Box>
                )}
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
            It is our humble request that all devotees kindly be considerate and
            avoid visiting Guru Hari's accommodation without prior notice.
            Should darshan be arranged, devotees will be notified in a timely
            manner through WhatsApp, Telegram, or a personal invitation.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
