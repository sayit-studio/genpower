import { motion } from 'framer-motion'
import { asset } from '../utils/asset'

export default function VoteComingSoonPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingTop: 64, display: 'flex', flexDirection: 'column' }}>

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '40vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
      }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src={asset('/assets/hero/hero-bg.mp4')}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0D0D0D 0%, transparent 55%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: 11,
              letterSpacing: 6,
              color: '#CC1200',
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            VOTE &amp; WIN
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: '#FFFFFF',
              letterSpacing: 4,
              margin: 0,
            }}
          >
            投票預測冠軍
          </motion.h1>
        </div>
      </section>

      {/* Coming Soon 主體 */}
      <section style={{
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,160,23,0.2)',
            borderRadius: 4,
            padding: '56px 40px',
          }}
        >
          {/* 圖示 */}
          <div style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'rgba(204,18,0,0.12)',
            border: '1px solid rgba(204,18,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: 28,
          }}>
            🗳️
          </div>

          <div style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 11,
            letterSpacing: 6,
            color: '#CC1200',
            fontWeight: 700,
            marginBottom: 16,
          }}>
            COMING SOON
          </div>

          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 28,
            color: '#D4A017',
            letterSpacing: 4,
            margin: '0 0 16px',
          }}>
            報名募集中
          </h2>

          <p style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 2,
            margin: '0 0 36px',
          }}>
            選手名單確認後即開放投票<br />
            開放時將於 FB、IG 公告通知<br />
            歡迎關注掌握第一手消息
          </p>

          {/* 社群連結 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="https://www.facebook.com/takoyaki.tw"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px',
                background: 'rgba(24,119,242,0.12)',
                border: '1px solid rgba(24,119,242,0.35)',
                borderRadius: 4,
                color: '#90b8f8',
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 2,
                textDecoration: 'none',
                transition: 'filter 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.25)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.filter = ''}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              關注 FB
            </a>
            <a
              href="https://www.instagram.com/meijin2nd.takoyaki/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px',
                background: 'rgba(131,58,180,0.12)',
                border: '1px solid rgba(131,58,180,0.35)',
                borderRadius: 4,
                color: '#d08cf0',
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 2,
                textDecoration: 'none',
                transition: 'filter 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.25)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.filter = ''}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              關注 IG
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
