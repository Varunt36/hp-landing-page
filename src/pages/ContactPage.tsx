import { Box } from '@mui/material'
import { usePageMeta } from '../hooks/usePageMeta'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ContactSection from '../components/sections/ContactSection'
import RegisterModal from '../components/form/RegisterModal'

export default function ContactPage() {
  usePageMeta('Contact', 'Get in touch with HariPrabodham Germany — questions about HP Amrut Mahotsav 2026, Berlin.')
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
