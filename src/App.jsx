import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
