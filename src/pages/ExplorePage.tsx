import { useState, useEffect, useRef } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { Box, Container, Typography, Link } from '@mui/material'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import RegisterModal from '../components/form/RegisterModal'
import { C } from '../theme/theme'

// ── Data ──────────────────────────────────────────────────────────────────────

const RESTAURANTS = [
  {
    tag: 'Coffeehouse',
    stars: 4,
    name: 'Café Einstein Stammhaus',
    area: 'Tiergarten',
    dist: '2.6 km from venue',
    desc: 'Grand Viennese coffeehouse in a historic villa, perfect for a leisurely breakfast or a quiet afternoon cake.',
    price: '€18',
    image:
      'https://images.unsplash.com/photo-1775059956734-78ffd2075cec?w=600&q=75&auto=format&fit=crop',
    url: 'https://www.cafeeinstein.com',
  },
  {
    tag: 'Fine Dining',
    stars: 5,
    name: 'Restaurant Tim Raue',
    area: 'Kreuzberg',
    dist: '3.2 km from venue',
    desc: 'Two Michelin-star destination, bold Asian-inspired cuisine rooted in Japanese, Thai and Chinese tradition.',
    price: '€95',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75&auto=format&fit=crop',
    url: 'https://www.tim-raue.com',
  },
  {
    tag: 'Since 1621',
    stars: 4,
    name: 'Zur Letzten Instanz',
    area: 'Mitte',
    dist: '1.1 km from venue',
    desc: "Berlin's oldest restaurant, hearty German classics served in cosy timber interiors since the 17th century.",
    price: '€22',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75&auto=format&fit=crop',
    url: 'https://www.zurletzteninstanz.com',
  },
  {
    tag: 'Vegetarian',
    stars: 5,
    name: 'Cookies Cream',
    area: 'Mitte',
    dist: '0.5 km from venue',
    desc: 'Award-winning vegetarian fine dining hidden in a Berlin courtyard, creative, seasonal and entirely meat-free.',
    price: '€65',
    image:
      'https://plus.unsplash.com/premium_photo-1755706181246-00e8aa5ca334?w=600&q=75&auto=format&fit=crop',
    url: 'https://www.cookiescream.com',
  },
  {
    tag: 'Riverside',
    stars: 4,
    name: 'Grill Royal',
    area: 'Mitte',
    dist: '1.4 km from venue',
    desc: 'Stylish dining on the banks of the Spree, premium grills, fresh fish and an iconic Berlin waterfront setting.',
    price: '€55',
    image:
      'https://plus.unsplash.com/premium_photo-1745946640146-5521cb53a5b5?w=600&q=75&auto=format&fit=crop',
    url: 'https://www.grillroyal.com',
  },
  {
    tag: 'Indian',
    stars: 4,
    name: 'Amrit Restaurant',
    area: 'Kreuzberg',
    dist: '2.8 km from venue',
    desc: "Berlin's most-loved Indian restaurant with an extensive vegetarian menu, aromatic curries and warm hospitality.",
    price: '€20',
    image:
      'https://plus.unsplash.com/premium_photo-1745946640178-69beac3840cc?w=600&q=75&auto=format&fit=crop',
    url: 'https://www.amrit.de',
  },
];

const SIGHTS = [
  {
    cat: 'Landmark',
    name: 'Brandenburg Gate',
    desc: 'The neoclassical heart of Berlin, a symbol of unity and renewal, beautiful at dawn and lit gold at night.',
    time: '20 min',
    entry: 'Free entry',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=75&auto=format&fit=crop',
  },
  {
    cat: 'Architecture',
    name: 'Reichstag Dome',
    desc: 'Climb Foster\'s glass dome for sweeping views of the city, register in advance for a quiet, peaceful visit.',
    time: '1 hr',
    entry: 'Free · Reserve',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=75&auto=format&fit=crop',
  },
  {
    cat: 'Culture · UNESCO',
    name: 'Museum Island',
    desc: 'Five world-class museums on a single island in the Spree, Pergamon, Bode, Altes, Neues, Alte Nationalgalerie.',
    time: '3–4 hrs',
    entry: '€19 day pass',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=75&auto=format&fit=crop',
  },
  {
    cat: 'Nature',
    name: 'Tiergarten Park',
    desc: 'Berlin\'s vast green lung, perfect for a contemplative morning walk among ancient trees and quiet ponds.',
    time: '1–2 hrs',
    entry: 'Free entry',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75&auto=format&fit=crop',
  },
  {
    cat: 'History · Art',
    name: 'East Side Gallery',
    desc: 'A 1.3 km open-air mural along the longest preserved stretch of the Berlin Wall, themes of freedom and unity.',
    time: '1 hr',
    entry: 'Free entry',
    image: 'https://images.unsplash.com/photo-1646489752489-e5831112c767?w=600&q=75&auto=format&fit=crop',
  },
  {
    cat: 'Day Trip',
    name: 'Sanssouci, Potsdam',
    desc: 'Frederick the Great\'s summer palace and gardens, a serene rococo retreat 35 minutes by S-Bahn from Berlin.',
    time: 'Half-day',
    entry: '€14 entry',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=75&auto=format&fit=crop',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────


function RestaurantCard({
  restaurant,
}: {
  restaurant: (typeof RESTAURANTS)[0];
}) {
  return (
    <Box
      sx={{
        background: C.cream,
        border: `1px solid ${C.lavender200}B3`,
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow:
          '0 1px 2px rgba(60,30,90,0.06), 0 2px 8px rgba(60,30,90,0.04)',
        display: 'flex',
        flexDirection: 'column',
        transition:
          'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: `${C.gold500}80`,
          boxShadow:
            '0 4px 14px rgba(60,30,90,0.08), 0 12px 40px rgba(60,30,90,0.06)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.background = C.lavender100;
            e.currentTarget.src =
              'data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          }}
          sx={{
            width: '100%',
            aspectRatio: '16/10',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: `${C.cream}EB`,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
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
          {restaurant.tag}
        </Box>
      </Box>

      <Box
        sx={{
          p: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flex: 1,
        }}
      >
        <Typography sx={{ color: C.gold600, letterSpacing: 1, fontSize: 14 }}>
          {'★'.repeat(restaurant.stars)}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 24,
            color: C.purple800,
            fontWeight: 500,
            lineHeight: 1.1,
          }}
        >
          {restaurant.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Typography sx={{ fontSize: 13, color: C.muted }}>
            {restaurant.area}
          </Typography>
          <Box
            sx={{
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: C.lavender300,
            }}
          />
          <Typography sx={{ fontSize: 13, color: C.muted }}>
            {restaurant.dist}
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: 14.5, lineHeight: 1.6, color: C.muted, mt: 0.5 }}
        >
          {restaurant.desc}
        </Typography>

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
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 22,
              color: C.purple800,
              fontStyle: 'italic',
            }}
          >
            {restaurant.price}
            <Box
              component="span"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                color: C.muted,
                fontStyle: 'normal',
                ml: 0.5,
              }}
            >
              / person
            </Box>
          </Typography>
          <Link
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: C.purple800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              '&:hover': { color: C.gold700 },
            }}
          >
            Reserve table
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

function SightCard({ sight }: { sight: typeof SIGHTS[0] }) {
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
      <Box
        component="img"
        src={sight.image}
        alt={sight.name}
        loading="lazy"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.style.background = C.lavender100
          e.currentTarget.src = 'data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        }}
        sx={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
      />
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
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
        {eyebrow}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          mt: 1,
          color: C.purple800,
          fontSize: { xs: '1.8rem', md: 'clamp(1.8rem, 4vw, 3.25rem)' },
          fontFamily: '"Blue Mirage", serif',
        }}
      >
        {title}
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
      {desc && (
        <Typography
          sx={{
            maxWidth: 640,
            mx: 'auto',
            mt: 1.75,
            fontSize: { xs: 15, md: 17 },
            color: C.muted,
          }}
        >
          {desc}
        </Typography>
      )}
    </Box>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  usePageMeta('Explore Berlin', 'Restaurants, landmarks and tips near HP Amrut Mahotsav 2026 in Berlin — curated for satsang attendees.')
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
              Plan Your Visit
            </Typography>
            <Typography
              variant="h1"
              sx={{
                mt: 0.75,
                fontSize: {
                  xs: '2.25rem',
                  md: 'clamp(2.25rem, 4.4vw, 3.5rem)',
                },
                color: C.purple800,
                fontStyle: 'italic',
                fontFamily: '"Blue Mirage", serif',
              }}
            >
              Explore Berlin
            </Typography>
            <Typography
              sx={{
                maxWidth: 720,
                mx: 'auto',
                mt: 1.75,
                fontSize: { xs: 15, md: 17 },
                color: C.muted,
              }}
            >
              Where to stay, what to see make the most of your journey to the
              Mahotsav. From boutique stays to timeless landmarks.
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
            { id: 'hotels', label: 'Restaurants' },
            { id: 'sights', label: 'What to See in Berlin' },
          ].map(({ id, label }) => (
            <Box
              key={id}
              component="button"
              type="button"
              onClick={() => scrollTo(id)}
              sx={{
                px: 2.5,
                py: 1.25,
                borderRadius: '999px',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                border: `1px solid ${activeSection === id ? C.purple800 : `${C.lavender200}99`}`,
                background:
                  activeSection === id ? C.purple800 : `${C.lavender100}80`,
                color: activeSection === id ? C.cream : C.purple800,
                transition: 'all .2s ease',
                fontFamily: '"Blue Mirage", serif',
                '&:hover': {
                  background:
                    activeSection === id ? C.purple800 : C.lavender100,
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {/* ── Restaurants section ── */}
        <Box
          component="section"
          id="hotels"
          ref={hotelsRef}
          sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: '140px' }}
        >
          <Container maxWidth="lg">
            <SectionHead
              eyebrow="💛 Special Thanks to Our Supporters"
              title="Our Supporters"
              desc="We sincerely thank our Gold Partners for contributing their support during the event and helping us create memorable moments for our devotees and community. Your trust and collaboration truly made a difference."
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2,1fr)',
                  md: 'repeat(3,1fr)',
                },
                gap: { xs: 2.5, md: 2.75 },
              }}
            >
              {RESTAURANTS.map((restaurant) => (
                <RestaurantCard key={restaurant.name} restaurant={restaurant} />
              ))}
            </Box>
            <TipCard
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              }
              title="Dining near the Mahotsav"
              body="All listed restaurants are reachable within 15 minutes by U-Bahn or taxi from the venue. Several offer extensive vegetarian menus, ideal for devotees attending the Mahotsav."
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
              desc="Take an afternoon to wander Berlin's most cherished landmarks, moments of quiet reflection between sessions."
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2,1fr)',
                  md: 'repeat(3,1fr)',
                },
                gap: { xs: 2.5, md: 2.75 },
              }}
            >
              {SIGHTS.map((sight) => (
                <SightCard key={sight.name} sight={sight} />
              ))}
            </Box>
            <TipCard
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
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
  );
}
