import { Box, Typography } from '@mui/material'
import { C } from '../../theme/theme'

const DEFAULT_IMAGE = 'https://image-tc.galaxy.tf/wijpeg-c7yk1bdmxspzbbkxn74bu1wzo/hbb-exterior-facade-entrance_wide.jpg?width=400&height=268'

const DEFAULT_BOOK_URL = 'https://www.radissonhotels.com/en-us/booking/room-display?hotelCode=DEBERAAA&checkInDate=2026-08-15&checkOutDate=2026-08-17&adults%5B%5D=1&children%5B%5D=0&aoc%5B%5D=&searchType=pac&promotionCode=YDSINDZE&voucher=&brands=&brandFirst=&so='

interface HotelRecommendationProps {
  imageSrc?: string
  gallery?: { src: string; label: string }[]
  active?: number
  onSelect?: (i: number) => void
  bookUrl?: string
}

export default function HotelRecommendation({ imageSrc, gallery, active, onSelect, bookUrl = DEFAULT_BOOK_URL }: HotelRecommendationProps) {
  return (
    <Box
      sx={{
        mt: 3.5,
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid ${C.gold500}60`,
        boxShadow: '0 2px 12px rgba(60,30,90,0.07)',
      }}
    >
      {/* ── Banner ── */}
      <Box
        sx={{
          background: `linear-gradient(90deg, ${C.gold600}22, ${C.lavender200}55, ${C.gold600}22)`,
          borderBottom: `1px solid ${C.gold500}40`,
          px: 2.5,
          py: 1.25,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Blue Mirage", serif',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.gold700,
            fontWeight: 600,
          }}
        >
          ✦ Exclusive Offer · HP Amrut Mahotsav 2026 ✦
        </Typography>
      </Box>

      {/* ── Card body ── */}
      <Box
        sx={{
          background: C.cream,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
          gap: 0,
        }}
      >
        {/* Hotel image + thumbnails */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            component="img"
            src={imageSrc ?? DEFAULT_IMAGE}
            alt="Hotel Berlin, Berlin"
            loading="lazy"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/4/45/Luetzowplatz.Hotel.Berlin.Berlin.jpg'
            }}
            sx={{
              width: '100%',
              height: { xs: 180, sm: 200 },
              objectFit: 'cover',
              display: 'block',
              flexShrink: 0,
            }}
          />
          {gallery && gallery.length > 0 && (
            <Box sx={{
              display: 'flex', gap: 0.5, p: 0.75,
              background: `${C.lavender50}80`,
              overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {gallery.map((photo, i) => (
                <Box
                  key={photo.label}
                  component="button"
                  type="button"
                  onClick={() => onSelect?.(i)}
                  sx={{
                    flexShrink: 0, width: 52, height: 36, borderRadius: '5px', overflow: 'hidden',
                    cursor: 'pointer', p: 0,
                    border: `2px solid ${i === active ? C.gold500 : 'transparent'}`,
                    opacity: i === active ? 1 : 0.6,
                    transition: 'border-color .2s, opacity .2s',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Box component="img" src={photo.src} alt={photo.label} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Info */}
        <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: '1.2rem', sm: '1.375rem' },
                fontWeight: 600,
                color: C.purple800,
                lineHeight: 1.2,
              }}
            >
              Hotel Berlin, Berlin
            </Typography>
            <Typography sx={{ color: C.gold500, fontSize: 13, lineHeight: 1 }}>
              ★★★★
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 13, color: C.muted, mb: 1.75 }}>
            Lützowplatz 17 · 10785 Berlin · The event venue
          </Typography>

          {/* Perks */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
            {[
              'Walk directly to all Mahotsav sessions',
              'Breakfast included in group rate',
              'Mention HP Amrut Mahotsav 2026 when booking',
            ].map((perk) => (
              <Box key={perk} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: `${C.green700}18`,
                    border: `1px solid ${C.green700}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: '1px',
                  }}
                >
                  <svg aria-hidden="true" width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={C.green700} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Box>
                <Typography sx={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>
                  {perk}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* CTA */}
          <Box
            component="a"
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 2.25,
              py: 1,
              borderRadius: '999px',
              background: C.green700,
              color: C.cream,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background .2s, transform .2s',
              '&:hover': {
                background: C.green800,
                transform: 'translateY(-1px)',
              },
            }}
          >
            Book Now
            <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
