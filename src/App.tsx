import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import VenueSection from './components/sections/VenueSection'
import FaqSection from './components/sections/FaqSection'
import RegisterSection from './components/sections/RegisterSection'

export default function App() {
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
