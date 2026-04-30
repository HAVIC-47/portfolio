import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import Chatbot from './components/Chatbot'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import useIsMobile from './hooks/useIsMobile'

export default function App() {
  const isMobile = useIsMobile()
  return (
    <>
      <CursorGlow />
      <Navbar />
      {isMobile && <MobileNav />}
      <main>
        <Home />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
    </>
  )
}
