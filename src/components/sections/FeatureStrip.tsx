import { Box, Container, Typography } from '@mui/material'
import SpaIcon from '@mui/icons-material/Spa'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import LanguageIcon from '@mui/icons-material/Language'
import { featureStyles as s } from './FeatureStrip.styles'

const ITEMS = [
  { Icon: SpaIcon,       title: 'Spiritual Discourses', description: 'Enlightening sessions by renowned saints and spiritual leaders.' },
  { Icon: MusicNoteIcon, title: 'Kirtan & Bhajan',      description: 'Soulful kirtans and bhajans that uplift the heart and mind.' },
  { Icon: Diversity3Icon, title: 'Seva & Satsang',      description: 'Selfless service and divine satsang to connect and grow together.' },
  { Icon: LanguageIcon,  title: 'Global Unity',          description: 'Devotees from around the world coming together in divine harmony.' },
]

export default function FeatureStrip() {
  return (
    <Box sx={s.outerBox}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={s.grid}>
          {ITEMS.map(({ Icon, title, description }, i) => (
            <Box key={title} sx={s.itemWrapper}>
              {i > 0 && <Box sx={s.divider} />}
              <Box sx={s.item}>
                <Box sx={s.iconCircle}>
                  <Icon sx={s.icon} />
                </Box>
                <Box sx={s.textBlock}>
                  <Typography sx={s.title}>{title}</Typography>
                  <Typography sx={s.description}>{description}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
