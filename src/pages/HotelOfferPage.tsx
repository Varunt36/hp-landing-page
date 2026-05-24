import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Box, Container, Typography, Button } from '@mui/material'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import RegisterModal from '../components/form/RegisterModal'
import HotelRecommendation from '../components/form/HotelRecommendation'
import { C } from '../theme/theme'

function InfoCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ borderRadius: '14px', border: `1px solid ${C.lavender200}B3`, background: C.cream, p: { xs: 2, sm: 2.5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
        {icon}
        <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold700, fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  )
}

const GALLERY = [
  { src: 'https://image-tc.galaxy.tf/wijpeg-c7yk1bdmxspzbbkxn74bu1wzo/hbb-exterior-facade-entrance_wide.jpg?width=800&height=534', label: 'Entrance' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-f0blvir61nx6wouvf5oapqdml/exterior-facade-detail_wide.jpg?width=800&height=534',        label: 'Exterior' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-c7ny81uus8dfcngpgc36m454s/hbb-lobby-checkin_wide.jpg?width=800&height=534',             label: 'Lobby' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-2d0d51s89ag8vh9t7n6mafvrq/hbb-lobby-11_wide.jpg?width=800&height=534',                  label: 'Lobby Hall' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-bskxsc383lycgkfymw27k0nmn/hbb-standard-room-01_wide.jpg?width=800&height=534',          label: 'Room' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-2jslx92deu8twm9wcgbnx55s6/hbb-executive-suite-03_wide.jpg?width=800&height=534',        label: 'Suite' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-cdn9p0ely5jl4h1yhf5x7fdw/breakfast-area1_wide.jpg?width=800&height=534',               label: 'Breakfast' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-8g0864gjpl5rztnq62ri3rzdu/bar-1_wide.jpg?width=800&height=534',                        label: 'Bar' },
]

const BOOK_URL = 'https://www.radissonhotels.com/en-us/booking/room-display?hotelCode=DEBERAAA&checkInDate=2026-08-15&checkOutDate=2026-08-17&adults%5B%5D=1&children%5B%5D=0&aoc%5B%5D=&searchType=pac&promotionCode=YDSINDZE&voucher=&brands=&brandFirst=&so='

export default function HotelOfferPage() {
  usePageMeta('Plan Your Stay', 'Book Hotel Berlin for HP Amrut Mahotsav 2026 — exclusive group rate, breakfast included, right at the venue.')
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          pt: { xs: '64px', md: '72px' },
          minHeight: '100vh',
          background: `radial-gradient(900px 400px at 50% 0%, ${C.lavender100}B3, transparent 65%), ${C.cream}`,
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>

          {/* ── Page heading ── */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography component="span" sx={{ fontFamily: '"Blue Mirage", serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.purple600, fontWeight: 600 }}>
              Next Step
            </Typography>
            <Typography variant="h2" sx={{ mt: 0.75, fontSize: { xs: '1.9rem', md: '2.6rem' }, color: C.purple800 }}>
              Plan Your Stay
            </Typography>
            <Typography sx={{ mt: 1.25, fontSize: { xs: 15, md: 16 }, color: C.muted }}>
              You're all set! The Mahotsav takes place at Hotel Berlin — stay right at the venue.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
              <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
              ✦
              <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
            </Box>
          </Box>

          {/* ── 2-column layout ── */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2.5, md: 3 }, alignItems: 'start' }}>

            {/* ── LEFT: Hotel card + pricing ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <HotelRecommendation imageSrc={GALLERY[active].src} gallery={GALLERY} active={active} onSelect={setActive} bookUrl={BOOK_URL} />

              {/* Pricing table */}
              <Box sx={{ borderRadius: '18px', overflow: 'hidden', border: `1px solid ${C.lavender200}B3`, background: C.cream }}>
                {/* Header */}
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, borderBottom: `1px solid ${C.lavender200}B3`, display: 'flex', alignItems: 'center', gap: 1.25, background: `${C.lavender50}80` }}>
                  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.gold700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '0.85rem', sm: '0.95rem' }, color: C.purple800, fontWeight: 600, lineHeight: 1.4 }}>
                    2-Night Stay · Check-in 15 Aug · Check-out 17 Aug
                  </Typography>
                </Box>

                {/* Column headers */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr auto auto', sm: '1fr 100px 100px' }, px: { xs: 2, sm: 3 }, py: 1.25, borderBottom: `1px solid ${C.lavender200}60`, gap: { xs: 1, sm: 0 } }}>
                  {[['Option', 'left'], ['Total', 'right'], ['Per Night', 'right']].map(([h, align]) => (
                    <Typography key={h} sx={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, fontWeight: 600, textAlign: align as 'left' | 'right' }}>
                      {h}
                    </Typography>
                  ))}
                </Box>

                {/* Single occupancy */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr auto auto', sm: '1fr 100px 100px' }, px: { xs: 2, sm: 3 }, py: 2, borderBottom: `1px dashed ${C.lavender200}B3`, alignItems: 'center', gap: { xs: 1, sm: 0 } }}>
                  <Typography sx={{ fontSize: { xs: 13.5, sm: 14.5 }, color: C.ink }}>Single occupancy</Typography>
                  <Typography sx={{ fontSize: { xs: 13.5, sm: 14.5 }, color: C.ink, textAlign: 'right' }}>€170.00</Typography>
                  <Typography sx={{ fontSize: { xs: 13.5, sm: 14.5 }, color: C.ink, textAlign: 'right' }}>€170.00</Typography>
                </Box>

                {/* Double occupancy */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr auto auto', sm: '1fr 100px 100px' }, px: { xs: 2, sm: 3 }, py: 2, alignItems: 'center', gap: { xs: 1, sm: 0 } }}>
                  <Box>
                    <Typography sx={{ fontSize: { xs: 13.5, sm: 14.5 }, color: C.ink }}>Double occupancy</Typography>
                    <Typography sx={{ fontSize: 12, color: C.muted }}>sharing</Typography>
                  </Box>
                  <Typography sx={{ fontSize: { xs: 13.5, sm: 14.5 }, color: C.ink, textAlign: 'right' }}>€216.00</Typography>
                  <Typography sx={{ fontSize: { xs: 13.5, sm: 14.5 }, color: C.green700, fontWeight: 700, textAlign: 'right' }}>€108.00</Typography>
                </Box>
              </Box>
            </Box>

            {/* ── RIGHT: Info cards + CTA ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* Meal plan */}
              <InfoCard
                label="Meal Plan"
                icon={
                  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.gold700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>
                }
              >
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.purple800, fontWeight: 600, fontStyle: 'italic' }}>
                  Breakfast Included
                </Typography>
              </InfoCard>

              {/* Check-in / Check-out */}
              <InfoCard
                label="Check-in · Check-out"
                icon={
                  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.gold700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                }
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 1, sm: 1.5 }, mb: 1.25 }}>
                  {[['Check-in', '15 Aug 2026', '15:00'], ['Check-out', '17 Aug 2026', '12:00']].map(([label, date, time]) => (
                    <Box key={label} sx={{ background: `${C.lavender50}CC`, borderRadius: '10px', p: { xs: 1.25, sm: 1.5 }, textAlign: 'center' }}>
                      <Typography sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>{label}</Typography>
                      <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '0.875rem', sm: '1rem' }, color: C.purple800, mt: 0.25, lineHeight: 1.2 }}>{date}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: C.muted, mt: 0.25 }}>{time}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
                  Early check-in or late check-out can be requested at the hotel — subject to availability, not guaranteed.
                </Typography>
              </InfoCard>

              {/* Cancellation policy */}
              <InfoCard
                label="Cancellation Policy"
                icon={
                  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.green700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: C.green700, flexShrink: 0, mt: '4px' }} />
                  <Typography sx={{ fontSize: { xs: 13, sm: 14 }, color: C.purple800, fontWeight: 600, lineHeight: 1.5 }}>
                    Free cancellation until 18:00 · 1 August 2026
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>
                  Late cancellation or no-show will incur a penalty charge. If paid with Points or Cash+Points, the corresponding point deduction will be applied.
                </Typography>
              </InfoCard>

              {/* CTA buttons */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mt: 0.5 }}>
                <Button
                  variant="contained"
                  size="large"
                  component="a"
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  sx={{ borderRadius: '12px', py: 1.5 }}
                >
                  Book Now ↗
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/')}
                  fullWidth
                  sx={{ borderRadius: '12px', py: 1.5 }}
                >
                  Skip to Home
                </Button>
              </Box>

            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}
