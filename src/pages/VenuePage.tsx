import { Box } from '@mui/material'
import { usePageMeta } from '../hooks/usePageMeta'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import VenueSection from '../components/sections/VenueSection'
import ProgramsSection from '../components/sections/ProgramsSection'
import RegisterModal from '../components/form/RegisterModal'

export default function VenuePage() {
  usePageMeta('Venue', 'Hotel Berlin, Berlin — Lützowplatz 17, the home of HP Amrut Mahotsav 2026. Directions, programs and booking info.')
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>
        <VenueSection />
        <ProgramsSection />
      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}
