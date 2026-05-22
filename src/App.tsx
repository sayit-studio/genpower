import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Particles from './components/reactbits/Particles'
import PrivacyBanner from './components/ui/PrivacyBanner'
import HomePage from './pages/HomePage'
import VotePage from './pages/VotePage'
import RegisterPage from './pages/RegisterPage'

const LIFF_ID = '2009556470-3qckbElp'

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
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  // LINE OAuth 完成後會帶 ?liff.state=... 回到 LIFF endpoint（首頁）
  // 這裡呼叫 liff.init() 讓 SDK 處理 token 並跳回原本的 redirectUri（投票頁）
  useEffect(() => {
    if (window.location.search.includes('liff.state')) {
      import('@line/liff').then(({ default: liff }) => {
        liff.init({ liffId: LIFF_ID }).catch(() => {})
      })
    }
  }, [])

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
