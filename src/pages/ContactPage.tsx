import { Box } from '@mui/material'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ContactSection from '../components/sections/ContactSection'
import RegisterModal from '../components/form/RegisterModal'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>
        <ContactSection />
      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}
