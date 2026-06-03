import { useState, useEffect, useRef } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { Box, Container, Typography } from '@mui/material'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import RegisterModal from '../components/form/RegisterModal'
import { C } from '../theme/theme'

// ── Data ──────────────────────────────────────────────────────────────────────

const NEIGHBORHOODS = [
  { emoji: '🌿', tag: 'Park', area: 'Mitte / Tiergarten', name: 'Tiergarten', desc: "Berlin's green heart and largest inner-city park. Beautiful walking paths, lakes and gardens home to the beloved Café am Neuen See.", dist: '10–15 min walk', stars: 5, url: 'https://maps.google.com/?q=Tiergarten+Berlin' },
  { emoji: '🏘️', tag: 'Local Kiez', area: 'Schöneberg', name: 'Winterfeldtplatz', desc: "One of Berlin's most charming neighborhoods. Saturday market, falafel institutions, indie cafés and small boutiques.", dist: '15 min walk', stars: 5, url: 'https://maps.google.com/?q=Winterfeldtplatz+Berlin' },
  { emoji: '🛍️', tag: 'Shopping', area: 'Schöneberg', name: 'KaDeWe & Wittenbergplatz', desc: "Berlin's most famous shopping destination, anchored by the legendary KaDeWe department store and its gourmet food hall.", dist: '15–20 min walk', stars: 4, url: 'https://maps.google.com/?q=KaDeWe+Wittenbergplatz+Berlin' },
  { emoji: '🏙️', tag: 'Boulevard', area: 'Charlottenburg', name: 'Kurfürstendamm', desc: "Berlin's iconic boulevard. Elegant shopping, cafés, bookstores and a quintessential West Berlin city atmosphere.", dist: '20 min walk', stars: 5, url: 'https://maps.google.com/?q=Kurfürstendamm+Berlin' },
  { emoji: '🐒', tag: 'Lifestyle', area: 'Charlottenburg', name: 'Bikini Berlin & Zoo Area', desc: "Modern lifestyle district with the Bikini concept mall, NENI restaurant, Monkey Bar rooftop and sweeping views over the zoo.", dist: '5–10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Bikini+Berlin+Zoo' },
  { emoji: '🌳', tag: 'Elegant', area: 'Charlottenburg', name: 'Savignyplatz', desc: "One of Berlin's most elegant neighborhoods. Tree-lined streets, bookstores, Italian classics and a relaxed Berlin atmosphere.", dist: '10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Savignyplatz+Berlin' },
  { emoji: '🍜', tag: 'Food Street', area: 'Charlottenburg', name: 'Kantstraße', desc: "Berlin's famous food street. Italian, Asian and outstanding vegetarian dining sit side by side with specialty coffee shops.", dist: '10 min taxi', stars: 4, url: 'https://maps.google.com/?q=Kantstraße+Berlin' },
  { emoji: '🏛️', tag: 'Modern Berlin', area: 'Mitte', name: 'Potsdamer Platz', desc: "Contemporary architecture, shopping, the Sony Center and easy onward access to Brandenburg Gate and Mitte.", dist: '8–10 min taxi', stars: 4, url: 'https://maps.google.com/?q=Potsdamer+Platz+Berlin' },
]

const CAFES = [
  { emoji: '🌿', tag: 'Garden Café', area: 'Charlottenburg', name: 'Café im Literaturhaus', desc: 'Elegant garden café tucked inside a historic villa — a Berlin classic for breakfast or cake.', dist: 'Elegant', stars: 5, url: 'https://maps.google.com/?q=Café+im+Literaturhaus+Berlin' },
  { emoji: '🌊', tag: 'Lakeside', area: 'Tiergarten', name: 'Café am Neuen See', desc: 'Lakeside Biergarten in the middle of Tiergarten. Rowboats, beer and big trees.', dist: '10 min walk', stars: 5, url: 'https://maps.google.com/?q=Café+am+Neuen+See+Berlin' },
  { emoji: '☕', tag: 'Local', area: 'Tiergarten', name: 'WhyNot Kaffee', desc: 'Local favorite within easy reach of Hotel Berlin for a quick espresso.', dist: 'Near hotel', stars: 4, url: 'https://maps.google.com/?q=WhyNot+Kaffee+Berlin' },
  { emoji: '🫘', tag: 'Specialty', area: 'Kreuzberg / West', name: 'Concierge Coffee', desc: "Serious specialty coffee from one of Berlin's most respected micro-roaster bars.", dist: 'Specialty', stars: 5, url: 'https://maps.google.com/?q=Concierge+Coffee+Berlin' },
  { emoji: '🏛️', tag: 'Viennese', area: 'Tiergarten', name: 'Einstein Kaffee', desc: 'Classic Viennese coffeehouse in a grand historic villa — a leisurely Berlin institution.', dist: '10 min walk', stars: 5, url: 'https://maps.google.com/?q=Einstein+Kaffee+Tiergarten+Berlin' },
  { emoji: '🍳', tag: 'Breakfast', area: 'Schöneberg', name: 'A Never Ever Ending Love Story', desc: 'Popular all-day breakfast destination with a relaxed neighborhood feel.', dist: 'Local favorite', stars: 4, url: 'https://maps.google.com/?q=A+Never+Ever+Ending+Love+Story+Berlin' },
  { emoji: '🥐', tag: 'Parisian', area: 'Savignyplatz', name: 'Café au Lait', desc: 'Parisian-style neighborhood café for croissants, long mornings and people-watching.', dist: '10 min taxi', stars: 4, url: 'https://maps.google.com/?q=Café+au+Lait+Savignyplatz+Berlin' },
]

const EXPLORE_RESTAURANTS = [
  { emoji: '🌍', tag: 'Mediterranean', area: 'Bikini Berlin', name: 'NENI Berlin', desc: 'Mediterranean & Middle Eastern sharing plates with sweeping views over the zoo and Tiergarten.', dist: '5–10 min taxi', stars: 5, url: 'https://maps.google.com/?q=NENI+Berlin+Bikini+Berlin' },
  { emoji: '🍝', tag: 'Italian', area: 'Savignyplatz', name: 'Osteria Culaccino', desc: 'Elegant, warm Italian kitchen — one of the most loved tables in the Savignyplatz area.', dist: '10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Osteria+Culaccino+Berlin' },
  { emoji: '🍕', tag: 'Italian', area: 'Kantstraße', name: 'Luigi', desc: "Modern, design-led Italian on Berlin's celebrated food street.", dist: '10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Luigi+Restaurant+Kantstraße+Berlin' },
  { emoji: '🫕', tag: 'Italian', area: "Ku'damm", name: 'Luardi – Cucina della Mamma', desc: 'Authentic Italian home cooking just off the Kurfürstendamm.', dist: '15 min walk', stars: 4, url: 'https://maps.google.com/?q=Luardi+Cucina+della+Mamma+Berlin' },
  { emoji: '🍽️', tag: 'Italian', area: 'Kantstraße', name: 'Kantinella', desc: 'Contemporary Italian, intimate and consistently excellent.', dist: '10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Kantinella+Berlin' },
  { emoji: '🌱', tag: 'Vegan', area: 'Kantstraße', name: 'Vegang', desc: 'Vegan Vietnamese — fresh, fragrant and one of the best plant-based tables in West Berlin.', dist: '10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Vegang+Berlin' },
  { emoji: '🥗', tag: 'Vegan', area: 'Kantstraße', name: 'Sen Vegan', desc: 'Vietnamese vegan cuisine with a calm, modern dining room.', dist: '10 min taxi', stars: 4, url: 'https://maps.google.com/?q=Sen+Vegan+Berlin' },
  { emoji: '🥢', tag: 'Vegetarian', area: 'Mitte', name: 'Tianfuzius', desc: 'Vegetarian Chinese — Sichuan and beyond, entirely plant-based.', dist: 'Taxi', stars: 4, url: 'https://maps.google.com/?q=Tianfuzius+Berlin' },
  { emoji: '🪷', tag: 'Indian', area: 'Charlottenburg', name: 'Lotus', desc: 'Reliable Indian vegetarian options near the hotel.', dist: 'Taxi', stars: 4, url: 'https://maps.google.com/?q=Lotus+Restaurant+Charlottenburg+Berlin' },
  { emoji: '🥣', tag: 'Vegan Bowls', area: 'Schöneberg', name: 'Bodhicitta', desc: 'Healthy vegan bowls and warm hospitality.', dist: 'Walk / Taxi', stars: 4, url: 'https://maps.google.com/?q=Bodhicitta+Berlin' },
]

const SHOPPING = [
  { emoji: '🏪', tag: 'Luxury', area: 'Wittenbergplatz', name: 'KaDeWe', desc: "Continental Europe's most famous department store with its legendary 6th-floor gourmet hall.", dist: '15–20 min walk', stars: 5, url: 'https://maps.google.com/?q=KaDeWe+Berlin' },
  { emoji: '🛍️', tag: 'Concept Mall', area: 'Zoo / Charlottenburg', name: 'Bikini Berlin', desc: 'Design, fashion and lifestyle concept mall — independent labels with a real point of view.', dist: '5–10 min taxi', stars: 5, url: 'https://maps.google.com/?q=Bikini+Berlin+Mall' },
  { emoji: '🏙️', tag: 'Boulevard', area: 'Charlottenburg', name: 'Kurfürstendamm', desc: "Berlin's most famous shopping boulevard — international brands and grand café culture.", dist: '20 min walk', stars: 5, url: 'https://maps.google.com/?q=Kurfürstendamm+Berlin' },
  { emoji: '🏬', tag: 'Modern Mall', area: 'Leipziger Platz', name: 'Mall of Berlin', desc: 'Large modern shopping center with international brands all under one roof.', dist: 'Taxi', stars: 4, url: 'https://maps.google.com/?q=Mall+of+Berlin' },
]

const HIGHLIGHTS = [
  { category: 'For Atmosphere',         places: ['Savignyplatz', 'Café am Literaturhaus'] },
  { category: 'For Nature',             places: ['Tiergarten', 'Café am Neuen See'] },
  { category: 'For Food',               places: ['Kantstraße', 'NENI Berlin'] },
  { category: 'For Shopping',           places: ['KaDeWe', 'Bikini Berlin', 'Mall of Berlin'] },
  { category: 'For Local Berlin Flair', places: ['Winterfeldtplatz'] },
  { category: 'For Elegant West Berlin',places: ['Savignyplatz', "Ku'damm"] },
]

const ESSENTIALS = [
  { emoji: '🛒', title: 'Supermarkets Nearby', body: 'EDEKA and Netto are the closest supermarkets to the venue. Both stock fresh produce, drinks and daily groceries at reasonable prices.' },
  { emoji: '🌙', title: 'Spätkauf (Late Shops)', body: "Berlin's beloved Spätis are local convenience stores open late into the night — great for water, snacks, fruit and daily essentials after a long day." },
  { emoji: '🚇', title: 'Getting Around', body: 'The BVG day pass (€9.50) covers all U-Bahn, S-Bahn, trams and buses. The venue is minutes from Lützowplatz bus stop. Buy tickets via the BVG app.' },
  { emoji: '💳', title: 'Payments', body: 'Germany is still cash-friendly. Carry some euros — many smaller cafés and markets prefer cash. Cards accepted at most restaurants and shops.' },
  { emoji: '🌤️', title: 'Weather in August', body: 'Berlin in August is warm and pleasant — typically 22–28°C. Light layers for evenings and comfortable walking shoes recommended.' },
  { emoji: '🗣️', title: 'Language Tips', body: 'Most Berliners in central areas speak English well. A simple "Danke" (thank you) and "Bitte" (please) is always appreciated.' },
]


// ── Sub-components ────────────────────────────────────────────────────────────

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
          color: C.purple700,
          fontWeight: 600,
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          mt: 1,
          color: C.purple700,
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

type Section = 'hotels' | 'explore' | 'highlights' | 'essentials'

const NAV_TABS: { id: Section; label: string }[] = [
  { id: 'hotels',     label: 'Our Sponsors' },
  { id: 'explore',    label: 'Around Town' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'essentials', label: 'Essentials' },
]

export default function ExplorePage() {
  usePageMeta('Explore Berlin', 'Restaurants, landmarks and tips near HP Amrut Mahotsav 2026 in Berlin — curated for satsang attendees.')
  const [activeSection, setActiveSection] = useState<Section>('hotels')
  const [exploreSubTab, setExploreSubTab] = useState<'neighborhoods' | 'cafes' | 'restaurants' | 'shopping'>('neighborhoods')
  const hotelsRef     = useRef<HTMLElement>(null)
  const exploreRef    = useRef<HTMLElement>(null)
  const highlightsRef = useRef<HTMLElement>(null)
  const essentialsRef = useRef<HTMLElement>(null)

  const isClickScrolling = useRef(false)
  const clickScrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const pairs: [Section, React.RefObject<HTMLElement | null>][] = [
      ['hotels',     hotelsRef],
      ['explore',    exploreRef],
      ['highlights', highlightsRef],
      ['essentials', essentialsRef],
    ]
    const onScroll = () => {
      // Don't let the scroll-spy fight a tab click while it's smooth-scrolling.
      if (isClickScrolling.current) return
      const THRESHOLD = 220
      let active: Section = 'hotels'
      for (const [id, ref] of pairs) {
        if ((ref.current?.getBoundingClientRect().top ?? Infinity) < THRESHOLD) {
          active = id
        }
      }
      setActiveSection(active)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: Section) => {
    setActiveSection(id)
    isClickScrolling.current = true
    clearTimeout(clickScrollTimer.current)
    clickScrollTimer.current = setTimeout(() => {
      isClickScrolling.current = false
    }, 800)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>
        {/* ── Page hero ── */}
        <Box
          sx={{
            py: { xs: '48px', md: '64px' },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `radial-gradient(700px 380px at 50% 0%, ${C.lavender100}B3, transparent 70%), ${C.cream}`,
          }}
        >
          <Container maxWidth="md">

            {/* Eyebrow */}
            <Typography
              component="span"
              sx={{
                fontFamily: '"Blue Mirage", serif',
                fontSize: { xs: '0.7rem', md: '0.78rem' },
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: C.purple700,
                fontWeight: 700,
              }}
            >
              Your Guide Around the Divine Grace Time with Guruhari
            </Typography>

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                mt: 1.25,
                fontSize: { xs: '1.9rem', md: 'clamp(2rem, 4vw, 3rem)' },
                color: C.purple800,
                fontStyle: 'italic',
                fontFamily: '"Blue Mirage", serif',
                lineHeight: 1.25,
              }}
            >
              Discover Berlin – A City Guruhari Has Visited Many Times
            </Typography>

            {/* Body */}
            <Typography sx={{ maxWidth: 620, mx: 'auto', mt: 2.5, fontSize: { xs: 15, md: 16.5 }, color: C.purple700, lineHeight: 1.8 }}>
              Between spiritual gatherings and precious moments with loved ones, take time to explore the neighborhoods, cafés, parks and restaurants of a city that has welcomed Swamiji many times over the years.
            </Typography>

            {/* Quote */}
            <Typography
              sx={{
                maxWidth: 560,
                mx: 'auto',
                mt: 3.5,
                fontSize: { xs: 16, md: 19 },
                color: C.purple700,
                fontStyle: 'italic',
                lineHeight: 1.7,
                fontFamily: '"Blue Mirage", serif',
              }}
            >
              "Wherever Guruhari goes, memories are created, hearts are touched, and places become special forever."
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
            justifyContent: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 0.75, md: 1 },
            pt: { xs: 1.75, md: 2.5 },
            pb: { xs: 1.25, md: 1.75 },
            px: { xs: 2, md: 0 },
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            background: `${C.cream}EB`,
            backdropFilter: 'saturate(140%) blur(10px)',
            WebkitBackdropFilter: 'saturate(140%) blur(10px)',
            borderBottom: `1px solid ${C.lavender200}80`,
          }}
        >
          {NAV_TABS.map(({ id, label }) => (
            <Box
              key={id}
              component="button"
              type="button"
              onClick={() => scrollTo(id)}
              sx={{
                px: { xs: 1.75, md: 2.5 },
                py: { xs: 0.9, md: 1.25 },
                borderRadius: '999px',
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                border: `1px solid ${activeSection === id ? C.purple800 : `${C.lavender200}99`}`,
                background: activeSection === id ? C.purple800 : `${C.lavender100}80`,
                color: activeSection === id ? C.cream : C.purple800,
                transition: 'all .2s ease',
                fontFamily: '"Blue Mirage", serif',
                '&:hover': { background: activeSection === id ? C.purple800 : C.lavender100 },
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
            {/* Coming soon placeholder */}
            <Box
              sx={{
                textAlign: 'center',
                py: { xs: 6, md: 8 },
                px: 3,
                borderRadius: '20px',
                border: `1px dashed ${C.lavender300}`,
                background: `linear-gradient(135deg, ${C.lavender50} 0%, ${C.cream2} 100%)`,
              }}
            >
              <Typography sx={{ fontSize: { xs: 36, md: 44 }, mb: 2 }}>✨</Typography>
              <Typography
                sx={{
                  fontFamily: '"Blue Mirage", serif',
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  color: C.purple700,
                  fontStyle: 'italic',
                  mb: 1.25,
                }}
              >
                Coming Soon
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 15 }, color: C.muted, maxWidth: 420, mx: 'auto', lineHeight: 1.7 }}>
                Our supporters will be announced here. Stay tuned for updates.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ── Explore (with sub-tabs) ── */}
        <Box
          component="section"
          id="explore"
          ref={exploreRef}
          sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: '140px', borderTop: `1px dashed ${C.lavender200}B3` }}
        >
          <Container maxWidth="lg">
            {/* Explore section header */}
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
              <Typography
                component="span"
                sx={{
                  fontFamily: '"Blue Mirage", serif',
                  fontSize: '0.78rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: C.purple700,
                  fontWeight: 700,
                }}
              >
                Your Stay at Lützowplatz
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  mt: 1,
                  color: C.purple800,
                  fontFamily: '"Blue Mirage", serif',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: 'clamp(2rem, 5vw, 3.5rem)' },
                  fontStyle: 'italic',
                  lineHeight: 1.15,
                }}
              >
                Explore around Hotel Berlin
              </Typography>

              <Typography
                sx={{
                  maxWidth: 600,
                  mx: 'auto',
                  mt: 1.75,
                  fontSize: { xs: 15, md: 17 },
                  color: C.purple700,
                  lineHeight: 1.7,
                }}
              >
                A curated companion to the most beautiful neighborhoods, cafés, restaurants and shopping destinations within easy reach of Hotel Berlin.
              </Typography>

              {/* Feature pills */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 2, md: 3 }, mt: 2.5, flexWrap: 'wrap' }}>
                {[
                  { icon: '🚶', label: 'Walking distance' },
                  { icon: '🚗', label: 'Short taxi rides' },
                  { icon: '🌿', label: 'Green & local' },
                ].map(({ icon, label }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography sx={{ fontSize: 15 }}>{icon}</Typography>
                    <Typography sx={{ fontSize: 14, color: C.purple700, fontWeight: 500 }}>{label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── Sub-tab nav ── */}
            <Box sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 0.75, md: 1 },
              mb: { xs: 4, md: 5 },
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              pb: 0.5,
            }}>
              {([
                { id: 'neighborhoods', label: 'Neighborhoods', icon: '📍' },
                { id: 'cafes',         label: 'Cafés',          icon: '☕' },
                { id: 'restaurants',   label: 'Restaurants',    icon: '🍽️' },
                { id: 'shopping',      label: 'Shopping',       icon: '🛍️' },
              ] as const).map(({ id, label, icon }) => (
                <Box
                  key={id}
                  component="button"
                  type="button"
                  onClick={() => setExploreSubTab(id)}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.75,
                    px: { xs: 1.75, md: 2.25 }, py: { xs: 0.9, md: 1.1 },
                    borderRadius: '999px',
                    fontSize: { xs: 13.5, md: 15 },
                    fontWeight: 600,
                    fontFamily: '"Blue Mirage", serif',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    border: `1px solid ${exploreSubTab === id ? C.purple800 : `${C.lavender200}99`}`,
                    background: exploreSubTab === id ? C.purple800 : `${C.lavender100}80`,
                    color: exploreSubTab === id ? C.cream : C.purple800,
                    transition: 'all .2s ease',
                    '&:hover': { background: exploreSubTab === id ? C.purple800 : C.lavender100 },
                  }}
                >
                  <span>{icon}</span> {label}
                </Box>
              ))}
            </Box>

            {/* ── Sub-tab content ── */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
              {(exploreSubTab === 'neighborhoods' ? NEIGHBORHOODS
                : exploreSubTab === 'cafes'        ? CAFES
                : exploreSubTab === 'restaurants'  ? EXPLORE_RESTAURANTS
                : SHOPPING
              ).map((item) => {
                const { tag, area, name, desc, dist } = item as { emoji: string; tag: string; area: string; name: string; desc: string; dist: string; stars?: number; url?: string }
                const url = (item as { url?: string }).url
                const stars = (item as { stars?: number }).stars
                return (
                <Box key={name} sx={{ background: C.cream, border: `1px solid ${C.lavender200}B3`, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(60,30,90,0.06)', transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-4px)', borderColor: `${C.gold500}80`, boxShadow: '0 4px 14px rgba(60,30,90,0.1)' } }}>
                  <Box sx={{ px: 3, pt: 2.5, pb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                      <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.purple700, background: C.lavender100, border: `1px solid ${C.lavender200}`, borderRadius: '999px', px: 1.25, py: 0.4 }}>{tag}</Typography>
                      {stars && (
                        <Typography sx={{ fontSize: 13, color: C.gold600, letterSpacing: 1 }}>{'★'.repeat(stars)}</Typography>
                      )}
                    </Box>
                    <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: 22, color: C.purple700, fontWeight: 700, lineHeight: 1.15, mb: 0.4 }}>{name}</Typography>
                    <Typography sx={{ fontSize: 13, color: C.muted, mb: 1.25 }}>{area}</Typography>
                    <Typography sx={{ fontSize: 14, color: C.muted, lineHeight: 1.65, mb: 2 }}>{desc}</Typography>
                  </Box>
                  <Box sx={{ px: 3, py: 1.25, borderTop: `1px dashed ${C.lavender200}CC`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gold700} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                      <Typography sx={{ fontSize: 13, color: C.gold700, fontWeight: 600 }}>{dist}</Typography>
                    </Box>
                    <Box component="a" href={url} target="_blank" rel="noopener noreferrer"
                      sx={{ fontSize: 13, fontWeight: 600, color: C.purple700, textDecoration: 'none', '&:hover': { color: C.purple800, textDecoration: 'underline' } }}>
                      Discover →
                    </Box>
                  </Box>
                </Box>
              )})}
            </Box>
          </Container>
        </Box>

        {/* ── Highlights ── */}
        <Box
          component="section"
          id="highlights"
          ref={highlightsRef}
          sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: '140px', background: `linear-gradient(180deg, ${C.lavender50} 0%, ${C.cream} 100%)`, borderTop: `1px dashed ${C.lavender200}B3` }}
        >
          <Container maxWidth="lg">
            <SectionHead
              eyebrow="Personal Favorites"
              title="A few highlights"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
              {HIGHLIGHTS.map(({ category, places }) => (
                <Box key={category} sx={{ background: C.cream, border: `1px solid ${C.purple700}B3`, borderRadius: '18px', p: 3, boxShadow: '0 1px 2px rgba(60,30,90,0.06)', transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-4px)', borderColor: `${C.gold500}80`, boxShadow: '0 4px 14px rgba(60,30,90,0.1)' } }}>
                  <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '1.25rem', md: '1.35rem' }, color: C.purple700, fontWeight: 700, mb: 1.75 }}>
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {places.map((place) => (
                      <Box key={place} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: 13, color: C.gold600, lineHeight: 1, flexShrink: 0 }}>✦</Typography>
                        <Typography sx={{ fontSize: 14.5, color: C.purple700, fontWeight: 500 }}>{place}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ── Essentials ── */}
        <Box
          component="section"
          id="essentials"
          ref={essentialsRef}
          sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: '140px', borderTop: `1px dashed ${C.purple700}B3` }}
        >
          <Container maxWidth="lg">
            <SectionHead
              eyebrow="Practical Guide"
              title="Essentials"
              desc="Everything you need to know before you arrive — transport, money, weather and more."
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: { xs: 2.5, md: 2.75 } }}>
              {ESSENTIALS.map(({ emoji, title, body }) => (
                <Box key={title} sx={{ background: C.cream, border: `1px solid ${C.purple700}B3`, borderRadius: '18px', p: 3, boxShadow: '0 1px 2px rgba(60,30,90,0.06)', transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 14px rgba(60,30,90,0.1)' } }}>
                  <Typography sx={{ fontSize: 36, mb: 1.5 }}>{emoji}</Typography>
                  <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: 22, color: C.purple700, fontWeight: 700, mb: 1 }}>{title}</Typography>
                  <Typography sx={{ fontSize: 14.5, color: C.purple600, lineHeight: 1.6 }}>{body}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

      </Box>
      <Footer />
      <RegisterModal />
    </>
  );
}
