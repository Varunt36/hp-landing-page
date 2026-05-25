import { type ReactNode } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { C } from '../../theme/theme';

const subLabelSx = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: C.gold700,
  mb: 0.5,
};

const bodyTextSx = {
  fontSize: { xs: 14, md: 14.5 },
  lineHeight: 1.6,
  color: C.ink,
};

function Ornament() {
  return (
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
  );
}

const CAR_RENTALS = [
  { label: 'Sixt', href: 'https://www.sixt.com' },
  { label: 'Hertz', href: 'https://www.hertz.com' },
  { label: 'Europcar', href: 'https://www.europcar.com' },
];

const REACH: {
  icon: ReactNode;
  title: string;
  detail: ReactNode;
  time: string;
}[] = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 16l9-3 9-3 1 1-9 3-9 3z" />
        <path d="M11 13l3 5" />
        <path d="M11 13L8 7" />
      </svg>
    ),
    title: 'From BER Airport',
    detail: (
      <>
        <Box sx={{ mb: 1.5 }}>
          <Typography sx={subLabelSx}>By Car · ~ 26 min</Typography>
          <Box
            component="a"
            href="https://www.google.com/maps/dir/Berlin+Brandenburg+Airport+(BER)/Hotel+Berlin+Berlin,+L%C3%BCtzowplatz+17,+10785+Berlin"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              mt: 0.5,
              mb: 1,
              fontSize: 13,
              fontWeight: 600,
              color: C.purple700,
              textDecoration: 'none',
              border: `1px solid ${C.lavender300}`,
              borderRadius: '999px',
              px: 1.5,
              py: 0.5,
              transition: 'background .2s, border-color .2s',
              '&:hover': {
                background: C.lavender100,
                borderColor: C.purple700,
              },
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Navigate from Airport
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 15 },
              fontWeight: 700,
              color: C.purple800,
              mb: 0.75,
            }}
          >
            You can rent a car from the platforms below — each link opens their
            booking page:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {CAR_RENTALS.map(({ label, href }) => (
              <Box
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: C.purple700,
                  border: `1px solid ${C.lavender300}`,
                  borderRadius: '999px',
                  px: 1.25,
                  py: 0.35,
                  textDecoration: 'none',
                  transition: 'background .2s, border-color .2s',
                  '&:hover': {
                    background: C.lavender100,
                    borderColor: C.purple700,
                  },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
          <Typography
            sx={{ fontSize: 14, color: C.purple800, fontWeight: 700, mt: 1 }}
          >
            Paid parking on site — approx. €20–€25 per day.
          </Typography>
        </Box>

        <Box sx={{ borderTop: `1px dashed ${C.lavender200}`, my: 1.5 }} />

        <Box>
          <Typography sx={subLabelSx}>By Train · ~ 1 hour</Typography>
          <Typography sx={bodyTextSx}>
            From the airport take the train RE7 or RB14 to Zoologischer Garten,
            then the bus 100 to Lützowplatz, which stops directly in front of
            the hotel.
          </Typography>
        </Box>
      </>
    ),
    time: '',
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M2 11h20" />
        <path d="M7 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
        <path d="M6 21l2-4M18 21l-2-4" />
      </svg>
    ),
    title: 'From Berlin Hauptbahnhof',
    detail:
      'Take S-Bahn S5, S7 or S75 two stops to Zoologischer Garten, then ride bus 100 or 200 to Lützowplatz — the stop is directly in front of the hotel.',
    time: '~ 25 min',
  },
];

export default function VenueSection() {
  const reachCard = {
    background: C.cream,
    border: `1px solid ${C.lavender200}B3`,
    borderRadius: '18px',
    p: { xs: 3, md: 3.5 },
    boxShadow: '0 1px 2px rgba(60,30,90,0.06)',
    transition:
      'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      borderColor: `${C.gold500}80`,
      boxShadow: '0 4px 14px rgba(60,30,90,0.08)',
    },
  };

  return (
    <Box
      id="venue"
      sx={{
        background: `linear-gradient(180deg, ${C.cream} 0%, ${C.lavender50} 100%)`,
        py: { xs: 10, md: 13 },
      }}
    >
      <Container maxWidth="lg">
        {/* ── Section header ── */}
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
            Where it happens
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              color: C.purple800,
              fontFamily: '"Blue Mirage", serif',
            }}
          >
            The Venue
          </Typography>
          <Ornament />
        </Box>

        {/* ── Venue card ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            background: C.cream,
            border: `1px solid ${C.lavender200}B3`,
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow:
              '0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)',
            mb: { xs: 8, md: 10 },
          }}
        >
          {/* Info side */}
          <Box sx={{ p: { xs: 3.5, md: 6 } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Blue Mirage", serif',
                fontSize: {
                  xs: '1.75rem',
                  md: 'clamp(1.9rem, 3.4vw, 2.75rem)',
                },
                color: C.purple800,
              }}
            >
              Hotel Berlin, Berlin
            </Typography>
            <Typography sx={{ mt: 1.5, color: C.muted, lineHeight: 1.75 }}>
              Set in the heart of west Berlin at Lützowplatz a serene yet
              central setting for satsaṅg, music, prasād and quiet reflection.
            </Typography>

            <Box component="dl" sx={{ mt: 3, display: 'grid', gap: 2.25 }}>
              {[
                { dt: 'Address', dd: 'Lützowplatz 17, 10785 Berlin, Germany' },
                { dt: 'Nearest Airport', dd: 'Berlin Brandenburg (BER)' },
                { dt: 'Phone', dd: '+49 30 26050' },
              ].map(({ dt, dd }) => (
                <Box key={dt}>
                  <Typography
                    component="dt"
                    sx={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: C.gold700,
                      fontWeight: 600,
                    }}
                  >
                    {dt}
                  </Typography>
                  <Typography
                    component="dd"
                    sx={{
                      mt: 0.5,
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: { xs: '1.1rem', md: '1.2rem' },
                      color: C.purple800,
                      fontStyle: 'italic',
                      ml: 0,
                    }}
                  >
                    {dd}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                mt: 3.5,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                href="https://www.google.com/maps/dir/?api=1&destination=Hotel+Berlin+Berlin+L%C3%BCtzowplatz+17+10785+Berlin"
                target="_blank"
                rel="noopener"
                component="a"
                startIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
                  </svg>
                }
              >
                Get Directions
              </Button>
            </Box>
          </Box>

          {/* Map side */}
          <Box
            sx={{
              background: C.lavender100,
              minHeight: { xs: 260, md: 360 },
              position: 'relative',
              order: { xs: -1, md: 0 },
            }}
          >
            <Box
              component="iframe"
              title="Hotel Berlin location"
              src="https://maps.google.com/maps?q=Hotel%20Berlin%20Berlin%2C%20L%C3%BCtzowplatz%2017%2C%2010785%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              sx={{
                border: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                filter: 'saturate(0.85) hue-rotate(-8deg)',
                minHeight: { xs: 260, md: 360 },
              }}
            />
          </Box>
        </Box>

        {/* ── How to reach ── */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
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
              Getting here
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1,
                color: C.purple800,
                fontFamily: '"Blue Mirage", serif',
              }}
            >
              How to reach the venue
            </Typography>
            <Ornament />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: { xs: 2.5, md: 2.75 },
            }}
          >
            {REACH.map(({ icon, title, detail, time }) => (
              <Box key={title} component="article" sx={reachCard}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: C.lavender50,
                    border: `1px solid ${C.gold500}80`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: C.purple700,
                    mb: 1.75,
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.3rem', md: '1.375rem' },
                    color: C.purple800,
                    fontFamily: '"Blue Mirage", serif',
                  }}
                >
                  {title}
                </Typography>
                <Box
                  sx={{
                    mt: 1.25,
                    fontSize: { xs: 14, md: 14.5 },
                    lineHeight: 1.6,
                    color: C.ink,
                  }}
                >
                  {detail}
                </Box>
                {time && (
                  <Typography
                    sx={{
                      display: 'block',
                      mt: 1.75,
                      fontSize: '0.65rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: C.gold700,
                      fontWeight: 600,
                      pt: 1.5,
                      borderTop: `1px dashed ${C.lavender200}`,
                    }}
                  >
                    {time}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
