import { Box, Container, Typography } from '@mui/material'
import { C } from '../../theme/theme'
import { FOOTER } from '../../data/data'

const CONTACTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4z"/><path d="M4 6l8 7 8-7"/>
      </svg>
    ),
    title: 'Email',
    sub: 'For general queries',
    link: `mailto:${FOOTER.email}`,
    linkText: FOOTER.email,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Phone',
    sub: 'Mon – Sat · 09:00 to 18:00 CET',
    link: 'tel:+4930123456',
    linkText: '+49 176 85645884',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Office',
    sub: 'Mahotsav Coordination',
    link: '#venue',
    linkText: 'Berlin, Germany',
  },
]

export default function ContactSection() {
  return (
    <Box
      id="contact"
      sx={{ background: C.cream, py: { xs: 10, md: 13 } }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
            Reach Out
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, color: C.purple800 }}>Contact</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
            ✦
            <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
          {CONTACTS.map(({ icon, title, sub, link, linkText }) => (
            <Box
              key={title}
              sx={{
                background: C.cream,
                border: `1px solid ${C.lavender200}B3`,
                borderRadius: '18px',
                p: { xs: 3.5, md: 4 },
                textAlign: 'center',
                transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  borderColor: `${C.gold500}80`,
                  boxShadow: '0 1px 2px rgba(60,30,90,0.06), 0 4px 14px rgba(60,30,90,0.06)',
                },
              }}
            >
              <Box
                sx={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: C.lavender50,
                  border: `1px solid ${C.gold500}80`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: C.purple700, mb: 1.75,
                }}
              >
                {icon}
              </Box>
              <Typography variant="h3" sx={{ fontSize: '1.375rem', fontStyle: 'italic', color: C.purple700 }}>
                {title}
              </Typography>
              <Typography sx={{ fontSize: 14.5, mt: 0.75, color: C.muted }}>
                {sub}
              </Typography>
              <Box
                component="a"
                href={link}
                sx={{
                  display: 'block', mt: 1, color: C.green700,
                  fontWeight: 500, fontSize: 15,
                  '&:hover': { color: C.gold600 },
                }}
              >
                {linkText}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
