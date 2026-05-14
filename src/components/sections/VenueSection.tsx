import { Box, Container, Typography, Button } from '@mui/material'
import { C } from '../../theme/theme'

const REACH = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16l9-3 9-3 1 1-9 3-9 3z"/><path d="M11 13l3 5"/><path d="M11 13L8 7"/>
      </svg>
    ),
    title: 'From BER Airport',
    detail: 'Take train RE7 or RB14 to Zoologischer Garten, then bus 100 to Lützowplatz — directly in front of the hotel.',
    time: '~ 1 hour',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/>
        <circle cx="8" cy="14" r="1.2" fill="currentColor"/><circle cx="16" cy="14" r="1.2" fill="currentColor"/>
        <path d="M7 21l2-3M17 21l-2-3"/>
      </svg>
    ),
    title: 'By U-Bahn (Metro)',
    detail: 'Lines U1, U2 or U3 to U-Nollendorfplatz. Exit toward Karl-Heinrich-Ulrichs-Straße — leads directly to the hotel.',
    time: '~ 5 min walk',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14M5 17l1-5h12l1 5M6 12l1-3a2 2 0 0 1 2-1h6a2 2 0 0 1 2 1l1 3"/>
        <circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/>
      </svg>
    ),
    title: 'By Car',
    detail: 'From A100, take exit Kurfürstendamm → An der Urania, turn left. Underground parking on site.',
    time: '200+ parking spots',
  },
]

export default function VenueSection() {
  const reachCard = {
    background: C.cream,
    border: `1px solid ${C.lavender200}B3`,
    borderRadius: '18px',
    p: { xs: 3, md: 3.5 },
    boxShadow: '0 1px 2px rgba(60,30,90,0.06)',
    transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      borderColor: `${C.gold500}80`,
      boxShadow: '0 4px 14px rgba(60,30,90,0.08)',
    },
  }

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
          <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
            Where it happens
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, color: C.purple800 }}>The Venue</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
            ✦
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
          </Box>
        </Box>

        {/* ── Venue card (2-col) ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            background: C.cream,
            border: `1px solid ${C.lavender200}B3`,
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)',
            mb: { xs: 8, md: 10 },
          }}
        >
          {/* Info side */}
          <Box sx={{ p: { xs: 3.5, md: 6 } }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: 'clamp(1.9rem, 3.4vw, 2.75rem)' }, color: C.purple800 }}>
              Hotel Berlin, Berlin
            </Typography>
            <Typography sx={{ mt: 1.5, color: C.muted, lineHeight: 1.75 }}>
              Set in the heart of west Berlin at Lützowplatz — a serene yet central setting for
              satsaṅg, music, prasād and quiet reflection.
            </Typography>

            <Box component="dl" sx={{ mt: 3, display: 'grid', gap: 2.25 }}>
              {[
                { dt: 'Address',         dd: 'Lützowplatz 17, 10785 Berlin, Germany' },
                { dt: 'Nearest Airport', dd: 'Berlin Brandenburg (BER)' },
                { dt: 'Phone',           dd: '+49 30 26050' },
              ].map(({ dt, dd }) => (
                <Box key={dt}>
                  <Typography component="dt" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold700, fontWeight: 600 }}>
                    {dt}
                  </Typography>
                  <Typography component="dd" sx={{ mt: 0.5, fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '1.1rem', md: '1.2rem' }, color: C.purple800, fontStyle: 'italic', ml: 0 }}>
                    {dd}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mt: 3.5, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                href="https://www.google.com/maps/dir/?api=1&destination=Hotel+Berlin+Berlin+L%C3%BCtzowplatz+17+10785+Berlin"
                target="_blank"
                rel="noopener"
                component="a"
                startIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                }
              >
                Get Directions
              </Button>
              <Box
                component="a"
                href="https://www.hotel-berlin.de"
                target="_blank"
                rel="noopener"
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.75,
                  fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
                  fontSize: '1.1rem', color: C.green700,
                  borderBottom: `1px solid ${C.green700}66`,
                  pb: '2px', transition: 'color .2s, border-color .2s',
                  '&:hover': { color: C.gold700, borderBottomColor: C.gold700 },
                }}
              >
                hotel-berlin.de
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </Box>
            </Box>
          </Box>

          {/* Map side */}
          <Box sx={{ background: C.lavender100, minHeight: { xs: 260, md: 360 }, position: 'relative', order: { xs: -1, md: 0 } }}>
            <Box
              component="iframe"
              title="Hotel Berlin location"
              src="https://maps.google.com/maps?q=Hotel%20Berlin%20Berlin%2C%20L%C3%BCtzowplatz%2017%2C%2010785%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              sx={{ border: 0, width: '100%', height: '100%', display: 'block', filter: 'saturate(0.85) hue-rotate(-8deg)', minHeight: { xs: 260, md: 360 } }}
            />
          </Box>
        </Box>

        {/* ── How to reach ── */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
              Getting here
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, color: C.purple800 }}>
              How to reach the venue
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
              <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
              ✦
              <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
            {REACH.map(({ icon, title, detail, time }) => (
              <Box key={title} component="article" sx={reachCard}>
                <Box
                  sx={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: C.lavender50,
                    border: `1px solid ${C.gold500}80`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: C.purple700, mb: 1.75,
                  }}
                >
                  {icon}
                </Box>
                <Typography variant="h3" sx={{ fontSize: { xs: '1.3rem', md: '1.375rem' }, color: C.purple800 }}>
                  {title}
                </Typography>
                <Typography sx={{ mt: 1.25, fontSize: { xs: 14, md: 14.5 }, lineHeight: 1.6, color: C.ink }}>
                  {detail}
                </Typography>
                <Typography
                  sx={{
                    display: 'block', mt: 1.75,
                    fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: C.gold700, fontWeight: 600,
                    pt: 1.5, borderTop: `1px dashed ${C.lavender200}`,
                  }}
                >
                  {time}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  )
}
