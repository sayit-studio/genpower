import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { asset } from '../../utils/asset'

const navLinks = [
  { label: '活動介紹', id: 'about' },
  { label: '如何參賽', id: 'process' },
  { label: '留言抽獎', id: 'gift' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible]   = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Header 本體 ── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background:    scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow:     scrolled ? '0 1px 40px rgba(0,0,0,0.7)' : 'none',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/*
          手機：position relative 容器
            - Logo: absolute left 50% translateX(-50%)  → 真正置中，不受任何元素影響
            - 漢堡: absolute right 16px                 → 固定右上角，完全獨立
          桌機：Logo + Nav flex 置中
        */}
        <div style={{ position: 'relative', height: '64px' }}>

          {/* ── 桌機：Logo + Nav 整組 flex 置中 ── */}
          <div
            className="hdr-desktop"
            style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img
                src={asset('/assets/logo/logo-circle.png')}
                alt="明仁二代目章魚燒"
                style={{ height: '40px', objectFit: 'contain', display: 'block' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: '14px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    padding: '0 2px',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A017' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* ── 手機：Logo 絕對置中（完全獨立，不受漢堡影響） ── */}
          <div
            className="hdr-mobile-logo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src={asset('/assets/logo/logo-circle.png')}
                alt="明仁二代目章魚燒"
                style={{ height: '40px', objectFit: 'contain', display: 'block' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </Link>
          </div>

          {/* ── 手機：漢堡固定右上角（完全獨立，不影響 Logo） ── */}
          <button
            className="hdr-burger"
            onClick={() => setMenuOpen(true)}
            aria-label="開啟選單"
            style={{
              position: 'absolute',
              top: '50%',
              right: '16px',
              transform: 'translateY(-50%)',
              background: 'transparent',
              cursor: 'pointer',
              padding: '10px',
              lineHeight: 0,
            }}
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <rect y="0"   width="24" height="2" rx="1" fill="white" />
              <rect y="8"   width="24" height="2" rx="1" fill="white" />
              <rect y="16"  width="24" height="2" rx="1" fill="white" />
            </svg>
          </button>

        </div>
      </motion.header>

      {/* ── 手機全版選單 ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.96)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '40px',
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="關閉選單"
              style={{
                position: 'absolute', top: '20px', right: '24px',
                background: 'transparent', color: 'white',
                fontSize: '28px', cursor: 'pointer', lineHeight: 1, padding: '4px',
              }}
            >
              ✕
            </button>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: 'easeOut' }}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'transparent', color: '#FFFFFF',
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 700, fontSize: '24px',
                  cursor: 'pointer', letterSpacing: '2px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A017' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
              >
                {link.label}
              </motion.button>
            ))}

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* 桌機預設：桌機列顯示，手機元素隱藏 */
        .hdr-desktop     { display: flex; }
        .hdr-mobile-logo { display: none; }
        .hdr-burger      { display: none; }

        /* 手機：桌機列隱藏，手機 Logo + 漢堡顯示 */
        @media (max-width: 768px) {
          .hdr-desktop     { display: none !important; }
          .hdr-mobile-logo { display: block; }
          .hdr-burger      { display: block; }
        }
      `}</style>
    </>
  )
}
