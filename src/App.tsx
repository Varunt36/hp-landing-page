import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import VenueSection from './components/sections/VenueSection'
import FaqSection from './components/sections/FaqSection'
import RegisterSection from './components/sections/RegisterSection'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import AdminLogin from './pages/admin/AdminLogin'
import AdminScan from './pages/admin/AdminScan'
import ProtectedRoute from './components/auth/ProtectedRoute'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VenueSection />
        <FaqSection />
        <RegisterSection />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel"  element={<PaymentCancel />} />
      <Route path="/admin/login"     element={<AdminLogin />} />
      <Route path="/admin/scan"      element={<ProtectedRoute><AdminScan /></ProtectedRoute>} />
    </Routes>
  )
}
