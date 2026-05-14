import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import RegisterModal from './components/form/RegisterModal'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import AdminLogin from './pages/admin/AdminLogin'
import AdminScan from './pages/admin/AdminScan'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ProgramsPage from './pages/ProgramsPage'
import VenuePage from './pages/VenuePage'
import ExplorePage from './pages/ExplorePage'
import ContactPage from './pages/ContactPage'

// ── Shared page shell ──
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: '64px', md: '72px' } }}>
        {children}
      </Box>
      <Footer />
      <RegisterModal />
    </>
  )
}

// ── Landing page (Home) ──
function LandingPage() {
  return (
    <PageShell>
      <HeroSection />
    </PageShell>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"                element={<LandingPage />} />
      <Route path="/programs"        element={<ProgramsPage />} />
      <Route path="/venue"           element={<VenuePage />} />
      <Route path="/explore"         element={<ExplorePage />} />
      <Route path="/contact"         element={<ContactPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel"  element={<PaymentCancel />} />
      <Route path="/admin/login"     element={<AdminLogin />} />
      <Route path="/admin/scan"      element={<ProtectedRoute><AdminScan /></ProtectedRoute>} />
    </Routes>
  )
}
