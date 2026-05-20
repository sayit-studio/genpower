import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Particles from './components/reactbits/Particles'
import PrivacyBanner from './components/ui/PrivacyBanner'
import HomePage from './pages/HomePage'
import VotePage from './pages/VotePage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <AnimatedRoutes />
        <Footer />
        <Particles count={50} color="#D4A017" size={1.5} speed={0.5} />
      </HashRouter>
      <PrivacyBanner introComplete={true} />
    </>
  )
}
