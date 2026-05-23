import { Box } from '@mui/material'
import { usePageMeta } from '../hooks/usePageMeta'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProgramsSection from '../components/sections/ProgramsSection'
import RegisterModal from '../components/form/RegisterModal'

export default function ProgramsPage() {
  usePageMeta('Programs', 'Full schedule for HP Amrut Mahotsav 2026 — kirtan, satsang, and devotional programs across 3 days in Berlin.')
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>
        <ProgramsSection />
      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}
