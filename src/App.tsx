import { lazy, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { C } from './theme/theme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import EventInfoSection from './components/sections/EventInfoSection'
import RegisterModal from './components/form/RegisterModal'
import ProtectedRoute from './components/auth/ProtectedRoute'

const ProgramsPage   = lazy(() => import('./pages/ProgramsPage'))
const VenuePage      = lazy(() => import('./pages/VenuePage'))
const ExplorePage    = lazy(() => import('./pages/ExplorePage'))
const ContactPage    = lazy(() => import('./pages/ContactPage'))
const ImpressumPage  = lazy(() => import('./pages/ImpressumPage'))
const PaymentSuccess  = lazy(() => import('./pages/PaymentSuccess'))
const PaymentCancel   = lazy(() => import('./pages/PaymentCancel'))
const DataPrivacyPage = lazy(() => import('./pages/DataPrivacyPage'))
const AdminLogin     = lazy(() => import('./pages/admin/AdminLogin'))
const AdminScan      = lazy(() => import('./pages/admin/AdminScan'))

function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress size={32} sx={{ color: C.purple600 }} />
    </Box>
  )
}

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
      <EventInfoSection />
    </PageShell>
  )
}

// ── 404 ──
function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <PageShell>
      <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 2 }}>
        <Typography sx={{ fontFamily: '"Blue Mirage", serif', fontSize: { xs: '5rem', md: '8rem' }, color: C.lavender200, lineHeight: 1, mb: 1 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ color: C.purple800, mb: 1.5 }}>
          Page not found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 380 }}>
          The page you're looking for doesn't exist. It may have been moved or the link may be incorrect.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </PageShell>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"                element={<LandingPage />} />
        <Route path="/programs"        element={<ProgramsPage />} />
        <Route path="/venue"           element={<VenuePage />} />
        <Route path="/explore"         element={<ExplorePage />} />
        <Route path="/contact"         element={<ContactPage />} />
        <Route path="/impressum"       element={<ImpressumPage />} />
        <Route path="/data-privacy"    element={<DataPrivacyPage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel"  element={<PaymentCancel />} />
        <Route path="/admin/login"     element={<AdminLogin />} />
        <Route path="/admin/scan"      element={<ProtectedRoute><AdminScan /></ProtectedRoute>} />
        <Route path="*"               element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
