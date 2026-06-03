// Reserved for future use — supporter / restaurant data and the cards that
// render it. Moved out of ExplorePage.tsx to keep that file clean; re-import
// from here when supporter data is available.
/* eslint-disable react-refresh/only-export-components */

import { Box, Typography, Link } from '@mui/material'
import { C } from '../theme/theme'

export const RESTAURANTS = [
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

export function RestaurantCard({
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

export function TipCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
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
        <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: 19, color: C.purple700, fontStyle: 'italic', fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14.5, mt: 0.5, color: C.purple700 }}>
          {body}
        </Typography>
      </Box>
    </Box>
  )
}
