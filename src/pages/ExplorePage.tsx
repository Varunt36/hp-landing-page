import { useState, useEffect, useRef } from 'react'
import { Box, Container, Typography, Link } from '@mui/material'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import RegisterModal from '../components/form/RegisterModal'
import { C } from '../theme/theme'

// ── Data ──────────────────────────────────────────────────────────────────────

const HOTELS = [
  {
    tag: 'Near Venue',
    stars: 5,
    name: 'Hotel Adlon Kempinski',
    area: 'Mitte',
    dist: '0.4 km from venue',
    desc: 'Iconic five-star hotel beside the Brandenburg Gate. Spa, fine dining, and timeless German hospitality.',
    price: '€420',
  },
  {
    tag: 'Boutique',
    stars: 4,
    name: 'Hotel Zoo Berlin',
    area: 'Charlottenburg',
    dist: '2.1 km from venue',
    desc: 'A design-forward boutique stay on Kurfürstendamm — warm interiors and a leafy rooftop terrace.',
    price: '€235',
  },
  {
    tag: 'Best Value',
    stars: 3,
    name: 'Motel One Alexanderplatz',
    area: 'Mitte',
    dist: '1.6 km from venue',
    desc: 'Smart, comfortable rooms beside Alexanderplatz station — easy U-Bahn access and great value for groups.',
    price: '€119',
  },
  {
    tag: 'Family',
    stars: 4,
    name: 'Park Inn by Radisson',
    area: 'Alexanderplatz',
    dist: '1.2 km from venue',
    desc: 'Landmark tower with skyline views, family suites, vegetarian buffet and on-site parking.',
    price: '€168',
  },
  {
    tag: 'Quiet Stay',
    stars: 4,
    name: 'The Mandala Hotel',
    area: 'Potsdamer Platz',
    dist: '2.4 km from venue',
    desc: 'Calm suite-only retreat near Tiergarten — perfect for early-morning meditation and quiet reflection.',
    price: '€289',
  },
  {
    tag: 'Group Friendly',
    stars: 3,
    name: 'Adina Apartment Hotel',
    area: 'Hackescher Markt',
    dist: '1.8 km from venue',
    desc: 'Self-catering apartments with kitchens — well-suited for families and small group bookings.',
    price: '€142',
  },
]

const SIGHTS = [
  {
    cat: 'Landmark',
    name: 'Brandenburg Gate',
    desc: 'The neoclassical heart of Berlin — a symbol of unity and renewal, beautiful at dawn and lit gold at night.',
    time: '20 min',
    entry: 'Free entry',
  },
  {
    cat: 'Architecture',
    name: 'Reichstag Dome',
    desc: 'Climb Foster\'s glass dome for sweeping views of the city — register in advance for a quiet, peaceful visit.',
    time: '1 hr',
    entry: 'Free · Reserve',
  },
  {
    cat: 'Culture · UNESCO',
    name: 'Museum Island',
    desc: 'Five world-class museums on a single island in the Spree — Pergamon, Bode, Altes, Neues, Alte Nationalgalerie.',
    time: '3–4 hrs',
    entry: '€19 day pass',
  },
  {
    cat: 'Nature',
    name: 'Tiergarten Park',
    desc: 'Berlin\'s vast green lung — perfect for a contemplative morning walk among ancient trees and quiet ponds.',
    time: '1–2 hrs',
    entry: 'Free entry',
  },
  {
    cat: 'History · Art',
    name: 'East Side Gallery',
    desc: 'A 1.3 km open-air mural along the longest preserved stretch of the Berlin Wall — themes of freedom and unity.',
    time: '1 hr',
    entry: 'Free entry',
  },
  {
    cat: 'Day Trip',
    name: 'Sanssouci, Potsdam',
    desc: 'Frederick the Great\'s summer palace and gardens — a serene rococo retreat 35 minutes by S-Bahn from Berlin.',
    time: 'Half-day',
    entry: '€14 entry',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

const PLACEHOLDER_COLORS = [
  C.lavender100, C.lavender200, C.cream2, C.lavender50, C.lavender100, C.lavender200,
]

function ImgPlaceholder({ index, aspect }: { index: number; aspect: string }) {
  return (
    <Box
      sx={{
        aspectRatio: aspect,
        background: PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: { xs: 36, md: 48 },
      }}
    >
     </Box>
  )
}

function HotelCard({ hotel, index }: { hotel: typeof HOTELS[0]; index: number }) {
  return (
    <Box
      sx={{
        background: C.cream,
        border: `1px solid ${C.lavender200}B3`,
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(60,30,90,0.06), 0 2px 8px rgba(60,30,90,0.04)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: `${C.gold500}80`,
          boxShadow: '0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)',
        },
      }}
    >
      {/* Image placeholder */}
      <Box sx={{ position: 'relative' }}>
        <ImgPlaceholder index={index} aspect="16/10" />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: `${C.cream}EB`,
            backdropFilter: 'blur(6px)',
            border: `1px solid ${C.lavender200}99`,
            borderRadius: '999px',
            px: 1.25,
            py: 0.75,
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: C.purple800,
          }}
        >
          {hotel.tag}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: '22px', display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        <Typography sx={{ color: C.gold600, letterSpacing: 1, fontSize: 14 }}>
          {'★'.repeat(hotel.stars)}
        </Typography>
        <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, color: C.purple800, fontWeight: 500, lineHeight: 1.1 }}>
          {hotel.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 13, color: C.muted }}>{hotel.area}</Typography>
          <Box sx={{ width: 3, height: 3, borderRadius: '50%', background: C.lavender300 }} />
          <Typography sx={{ fontSize: 13, color: C.muted }}>{hotel.dist}</Typography>
        </Box>
        <Typography sx={{ fontSize: 14.5, lineHeight: 1.6, color: C.muted, mt: 0.5 }}>
          {hotel.desc}
        </Typography>

        {/* Footer */}
        <Box
          sx={{
            mt: 'auto',
            pt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 1.5,
            borderTop: `1px dashed ${C.lavender200}CC`,
          }}
        >
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, color: C.purple800, fontStyle: 'italic' }}>
            {hotel.price}
            <Box component="span" sx={{ fontFamily: '"Inter", sans-serif', fontSize: 12, color: C.muted, fontStyle: 'normal', ml: 0.5 }}>
              / night
            </Box>
          </Typography>
          <Link
            href="#"
            underline="none"
            sx={{ fontSize: 13, fontWeight: 600, color: C.green700, display: 'inline-flex', alignItems: 'center', gap: 0.75,
              '&:hover': { color: C.gold700 },
            }}
          >
            Book stay
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

function SightCard({ sight, index }: { sight: typeof SIGHTS[0]; index: number }) {
  return (
    <Box
      sx={{
        background: C.cream,
        border: `1px solid ${C.lavender200}B3`,
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(60,30,90,0.06), 0 2px 8px rgba(60,30,90,0.04)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: `${C.gold500}80`,
          boxShadow: '0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)',
        },
      }}
    >
      <ImgPlaceholder index={index + 2} aspect="4/3" />
      <Box sx={{ p: '22px', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <Typography sx={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.gold700, fontWeight: 600 }}>
          {sight.cat}
        </Typography>
        <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, color: C.purple800, fontWeight: 500, lineHeight: 1.1 }}>
          {sight.name}
        </Typography>
        <Typography sx={{ fontSize: 14.5, lineHeight: 1.6, color: C.muted }}>
          {sight.desc}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mt: 0.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 13, color: C.muted }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            <Typography component="span" sx={{ fontSize: 13, color: C.muted }}>{sight.time}</Typography>
          </Box>
          <Typography sx={{ fontSize: 13, color: C.muted }}>{sight.entry}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

function TipCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Box
      sx={{
        mt: 4.5,
        background: C.cream,
        border: `1px solid ${C.lavender200}B3`,
        borderRadius: '18px',
        p: { xs: '22px', md: '28px 32px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
        gap: { xs: 2, sm: 2.75 },
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 52, height: 52, borderRadius: '50%',
          background: C.lavender50,
          border: `1px solid ${C.gold500}80`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.purple700,
          mx: { xs: 'auto', sm: 0 },
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 19, color: C.purple800, fontStyle: 'italic', fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14.5, mt: 0.5, color: C.muted }}>
          {body}
        </Typography>
      </Box>
    </Box>
  )
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
      <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, color: C.purple800, fontSize: { xs: '1.8rem', md: 'clamp(1.8rem, 4vw, 3.25rem)' } }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, mt: 1.75, color: C.gold600, fontSize: 14 }}>
        <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to right, transparent, ${C.gold500}, transparent)` }} />
        ✦
        <Box sx={{ height: '1px', width: 40, background: `linear-gradient(to left, transparent, ${C.gold500}, transparent)` }} />
      </Box>
      {desc && (
        <Typography sx={{ maxWidth: 640, mx: 'auto', mt: 1.75, fontSize: { xs: 15, md: 17 }, color: C.muted }}>
          {desc}
        </Typography>
      )}
    </Box>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [activeSection, setActiveSection] = useState<'hotels' | 'sights'>('hotels')
  const hotelsRef = useRef<HTMLElement>(null)
  const sightsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const sightsTop = sightsRef.current?.getBoundingClientRect().top ?? Infinity
      setActiveSection(sightsTop < 200 ? 'sights' : 'hotels')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>

        {/* ── Page hero ── */}
        <Box
          sx={{
            py: { xs: '72px', md: '96px' },
            textAlign: 'center',
            background: `radial-gradient(700px 380px at 50% 0%, ${C.lavender100}B3, transparent 70%), ${C.cream}`,
          }}
        >
          <Container maxWidth="lg">
            <Typography component="span" sx={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green700, fontWeight: 600 }}>
              Plan Your Visit
            </Typography>
            <Typography variant="h1" sx={{ mt: 0.75, fontSize: { xs: '2.25rem', md: 'clamp(2.25rem, 4.4vw, 3.5rem)' }, color: C.purple800, fontStyle: 'italic' }}>
              Explore Berlin
            </Typography>
            <Typography sx={{ maxWidth: 720, mx: 'auto', mt: 1.75, fontSize: { xs: 15, md: 17 }, color: C.muted }}>
              Where to stay, what to see — make the most of your journey to the Mahotsav. From boutique stays to timeless landmarks.
            </Typography>
          </Container>
        </Box>

        {/* ── Sticky sub-nav ── */}
        <Box
          component="nav"
          aria-label="Explore sections"
          sx={{
            position: 'sticky',
            top: { xs: 64, md: 72 },
            zIndex: 30,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            py: 1.75,
            background: `${C.cream}EB`,
            backdropFilter: 'saturate(140%) blur(10px)',
            WebkitBackdropFilter: 'saturate(140%) blur(10px)',
            borderBottom: `1px solid ${C.lavender200}80`,
          }}
        >
          {[
            { id: 'hotels', label: 'Hotels' },
            { id: 'sights', label: 'What to See in Berlin' },
          ].map(({ id, label }) => (
            <Box
              key={id}
              component="button"
              onClick={() => scrollTo(id)}
              sx={{
                px: 2.5, py: 1.25,
                borderRadius: '999px',
                fontSize: 14, fontWeight: 600, letterSpacing: '0.02em',
                cursor: 'pointer',
                border: `1px solid ${activeSection === id ? C.purple800 : `${C.lavender200}99`}`,
                background: activeSection === id ? C.purple800 : `${C.lavender100}80`,
                color: activeSection === id ? C.cream : C.purple800,
                transition: 'all .2s ease',
                fontFamily: '"Inter", sans-serif',
                '&:hover': {
                  background: activeSection === id ? C.purple800 : C.lavender100,
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {/* ── Hotels section ── */}
        <Box
          component="section"
          id="hotels"
          ref={hotelsRef}
          sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: '140px' }}
        >
          <Container maxWidth="lg">
            <SectionHead
              eyebrow="Where to Stay"
              title="Recommended Hotels"
              desc="A curated selection close to the venue and central Berlin — from quiet boutique retreats to convenient transit-friendly stays."
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
              {HOTELS.map((hotel, i) => (
                <HotelCard key={hotel.name} hotel={hotel} index={i} />
              ))}
            </Box>
            <TipCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
              }
              title="A quiet tip for devotees"
              body='All listed hotels are within a short S-Bahn or taxi ride of the Mahotsav venue. Group bookings of 6+ rooms qualify for the Mahotsav rate — mention "HP Amrut 2026" at booking.'
            />
          </Container>
        </Box>

        {/* ── What to See section ── */}
        <Box
          component="section"
          id="sights"
          ref={sightsRef}
          sx={{
            py: { xs: 8, md: 10 },
            scrollMarginTop: '140px',
            background: `linear-gradient(180deg, ${C.cream} 0%, ${C.lavender50} 100%)`,
            borderTop: `1px dashed ${C.lavender200}B3`,
          }}
        >
          <Container maxWidth="lg">
            <SectionHead
              eyebrow="Beyond the Mahotsav"
              title="What to See in Berlin"
              desc="Take an afternoon to wander Berlin's most cherished landmarks — moments of quiet reflection between sessions."
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
              {SIGHTS.map((sight, i) => (
                <SightCard key={sight.name} sight={sight} index={i} />
              ))}
            </Box>
            <TipCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              }
              title="Getting around"
              body="Berlin's BVG day-pass (€9.50) covers all U-Bahn, S-Bahn, trams and buses. The venue is a 6-minute walk from Alexanderplatz station and most landmarks above are within 20 minutes by transit."
            />
          </Container>
        </Box>

      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}
