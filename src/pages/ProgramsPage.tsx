import { Box } from '@mui/material'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProgramsSection from '../components/sections/ProgramsSection'
import RegisterModal from '../components/form/RegisterModal'

export default function ProgramsPage() {
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
