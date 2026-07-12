import { Box, Container, Typography, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HotelIcon from '@mui/icons-material/Hotel'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import FlightIcon from '@mui/icons-material/Flight';
import SendIcon from '@mui/icons-material/Send';
import { C } from '../../theme/theme'

type LinePart =
  | { text: string; bold?: boolean }
  | { text: string; href: string };
type Line = string | { text: string; bold: boolean } | { parts: LinePart[] };

const items: {
  icon: React.ReactNode;
  title: string;
  lines: Line[];
  link?: { text: string; href: string; external?: boolean };
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
    ],
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Meals',
    lines: [
      'Lunch, dinner & refreshments included.',
      'Breakfast is not included at the Mahotsav venue.',
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
  {
    icon: <FlightIcon sx={{ fontSize: 22, color: C.purple800 }} />,
    title: 'Visa Invitation Letter',
    lines: [
      {
        parts: [
          { text: 'Email your passport copy to ' },
          { text: 'info@yds-germany.de', href: 'mailto:info@yds-germany.de' },
        ],
      },
    ],
  },
];

function renderLine(line: Line, i: number, fontSize: string) {
  if (typeof line === 'object' && 'parts' in line) {
    return (
      <Typography
        key={i}
        sx={{ fontSize, color: 'text.secondary', lineHeight: 1.65 }}
      >
        {line.parts.map((p, j) =>
          'href' in p ? (
            <Box
              key={j}
              component="a"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontWeight: 600,
                color: C.purple700,
                textDecoration: 'underline',
                '&:hover': { color: C.purple800 },
              }}
            >
              {p.text}
            </Box>
          ) : (
            <Box
              key={j}
              component="span"
              sx={{ fontWeight: p.bold ? 700 : 400 }}
            >
              {p.text}
            </Box>
          ),
        )}
      </Typography>
    );
  }
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

function ItemLink({
  href,
  text,
  external,
}: {
  href?: string;
  text: string;
  external?: boolean;
}) {
  return (
    <Box
      component={external ? 'a' : Link}
      {...(external
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { to: href })}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.65,
        mt: 1.25,
        px: 1.5,
        py: 0.65,
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: C.purple700,
        background: C.lavender100,
        border: `1px solid ${C.lavender300}`,
        textDecoration: 'none',
        alignSelf: 'flex-start',
        transition:
          'background .18s, border-color .18s, color .18s, box-shadow .18s',
        '&:hover': {
          background: C.lavender200,
          borderColor: C.purple600,
          color: C.purple800,
          boxShadow: `0 2px 8px rgba(107,74,150,0.15)`,
        },
      }}
    >
      {text}
      {href?.startsWith('mailto:') ? (
        <SendIcon sx={{ fontSize: 13 }} />
      ) : (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      )}
    </Box>
  );
}

export default function EventInfoSection() {
  return (
    <>
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
            <Box key={item.title} sx={{ display: 'flex', flex: 1, minWidth: 0 }}>
              {idx > 0 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: C.lavender200, mx: { md: 1.5, lg: 2.5 } }}
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
                      fontSize: { md: '0.68rem', lg: '0.78rem' },
                      letterSpacing: { md: '0.06em', lg: '0.1em' },
                      textTransform: 'uppercase',
                      color: C.purple800,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                {item.lines.map((line, i) => renderLine(line, i, '0.875rem'))}
                {item.link && (
                  <ItemLink href={item.link.href} text={item.link.text} external={item.link.external} />
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
          {items.map((item, idx) => (
            <Grid key={item.title} size={{ xs: idx === items.length - 1 && items.length % 2 !== 0 ? 12 : 6 }}>
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
                      color: C.purple800,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                {item.lines.map((line, i) => renderLine(line, i, '0.82rem'))}
                {item.link && (
                  <ItemLink href={item.link.href} text={item.link.text} external={item.link.external} />
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
            We humbly request all devotees to kindly be considerate and refrain
            from visiting Guru Hari’s accommodation independently. We will make
            every effort to arrange daily darshan opportunities for all
            devotees. Information regarding darshan will be shared in a timely
            manner through WhatsApp and Telegram.
          </Typography>
        </Box>
      </Container>
    </Box>
    </>
  );
}
