import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SplitText from '../components/reactbits/SplitText'
import BlurText from '../components/reactbits/BlurText'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { asset } from '../utils/asset'

export default function HeroSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const videoSrc = isMobile
    ? asset('/assets/hero/hero-bg-mobile.mp4')
    : asset('/assets/hero/hero-bg.mp4')
  const videoSrcWebm = isMobile
    ? asset('/assets/hero/hero-bg-mobile.webm')
    : asset('/assets/hero/hero-bg.webm')
  const posterSrc = asset('/assets/hero/hero-bg.png')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const playHeroVideo = () => {
      const attempt = video.play()
      if (attempt?.catch) attempt.catch(() => undefined)
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      playHeroVideo()
    } else {
      video.addEventListener('loadeddata', playHeroVideo, { once: true })
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) playHeroVideo()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      video.removeEventListener('loadeddata', playHeroVideo)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [videoSrc])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 60% 50%, #1a0800 0%, #0D0D0D 70%)',
    }}>
      {/* 影片背景 */}
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrcWebm} type="video/webm" />
      </video>

      {/* 遮罩一：全域暗化 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(0,0,0,0.35)',
      }} />

      {/* 遮罩二：底部漸層融入 body */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.6) 15%, transparent 50%)',
      }} />

      {/* 主體文字：垂直置中 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}>
        <h1 className="hero-title" style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 900,
          fontSize: 'clamp(48px, 6vw, 88px)',
          color: '#FFFFFF',
          letterSpacing: '4px',
          lineHeight: 1.1,
          textShadow: '0 0 60px rgba(204,18,0,0.6), 0 2px 8px rgba(0,0,0,0.9)',
          margin: 0,
        }}>
          <SplitText text="極限章魚燒王" stagger={0.07} />
        </h1>

        <p className="hero-subtitle" style={{
          fontFamily: "'Noto Sans TC', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(16px, 2vw, 24px)',
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '3px',
          margin: '12px 0 0',
        }}>
          <BlurText text="等你來稱霸" delay={0.6} />
        </p>
      </div>

      {/* 滾動引導：固定在 Hero 底部 */}
      <div style={{
        position: 'absolute',
        bottom: '7vh',
        left: 0,
        right: 0,
        zIndex: 3,
        display: 'flex',
        justifyContent: 'center',
      }}>
      <motion.div
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* 文字標籤 */}
        <motion.span
          whileHover={{ color: '#D4A017' }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '4px',
          }}
        >
          了解詳情
        </motion.span>

        {/* 金色裝飾線 */}
        <div style={{
          width: '48px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #D4A017, transparent)',
          marginBottom: '4px',
        }} />

        {/* 外圈呼吸光暈 */}
        <div style={{ position: 'relative', width: '40px', height: '40px' }}>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(212,160,23,0.6)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            style={{
              position: 'absolute',
              inset: 4,
              borderRadius: '50%',
              border: '1px solid rgba(212,160,23,0.4)',
            }}
          />

          {/* 中央箭頭圖示 */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 6L8 11L13 6" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 錯落跳動 chevron 三連 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', marginTop: '-2px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, 5, 0], opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
            >
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                <path d="M2 2L9 8L16 2" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(36px, 9vw, 52px) !important;
          }
          .hero-subtitle {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  )
}
