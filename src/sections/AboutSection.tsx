import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from '../components/reactbits/CountUp'
import { asset } from '../utils/asset'

const fadeUp = (delay: number, duration: number, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration, delay, ease: 'easeOut' },
})

export default function AboutSection() {
  const prizeRef = useRef<HTMLDivElement>(null)
  const inView = useInView(prizeRef, { once: true, margin: '-80px' })
  const [countTriggered, setCountTriggered] = useState(false)

  // trigger CountUp once the prize block enters view
  if (inView && !countTriggered) setCountTriggered(true)

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px',
      }}
    >
      {/* 背景影片：縮小置中，不滿版 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        ref={(el) => { if (el) el.playbackRate = 0.75 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxWidth: 480,
          zIndex: 0,
          mixBlendMode: 'screen',
          opacity: 0.5,
        }}
      >
        <source src={asset('/assets/about/about-loop.mp4')} type="video/mp4" />
        <source src={asset('/assets/about/about-loop.webm')} type="video/webm" />
      </video>

      {/* 四邊漸層融入 #0D0D0D */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 30%, #0D0D0D 75%)',
      }} />

      {/* 內容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* ① 小標籤 */}
        <motion.p
          {...fadeUp(0, 0.5, 16)}
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 11,
            letterSpacing: 6,
            color: '#CC1200',
            marginBottom: 24,
            textTransform: 'uppercase',
          }}
        >
          2026 ANNUAL EVENT
        </motion.p>

        {/* ② 主標第一行 */}
        <motion.h2
          {...fadeUp(0.15, 0.6, 24)}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: '#FFFFFF',
            letterSpacing: 4,
            lineHeight: 1.4,
            marginBottom: 0,
          }}
        >
          明仁二代目
        </motion.h2>

        {/* ② 主標第二行 */}
        <motion.h2
          {...fadeUp(0.3, 0.6, 24)}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: '#FFFFFF',
            letterSpacing: 4,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          極限章魚燒王爭霸戰
        </motion.h2>

        {/* ③ 活動宣言 */}
        <motion.p
          {...fadeUp(0.5, 0.7, 20)}
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 2.2,
            letterSpacing: 1,
            whiteSpace: 'pre-line',
          }}
        >
          {`職人之火，點燃競技擂台。\n明仁二代目以職人精神，\n打造極限章魚燒競技舞台——\n30位挑戰者，三個極限考驗關卡，只有一人能稱霸！`}
        </motion.p>

        {/* ─── 下半部：獎金區 ─── */}
        <div ref={prizeRef} style={{ marginTop: 80, width: '100%' }}>

          {/* ④ 獎金主標第一行 */}
          <motion.h3
            {...fadeUp(0.1, 0.6, 24)}
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(20px, 3vw, 36px)',
              color: '#FFFFFF',
              letterSpacing: 3,
              lineHeight: 1.6,
              marginBottom: 0,
            }}
          >
            有自信成為大胃王嗎
          </motion.h3>

          {/* ④ 獎金主標第二行 */}
          <motion.h3
            {...fadeUp(0.25, 0.6, 24)}
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(20px, 3vw, 36px)',
              color: '#FFFFFF',
              letterSpacing: 3,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            豐厚獎金等著你來挑戰極限
          </motion.h3>

          {/* ⑤ 獎金大字 NT$20,000 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(56px, 8vw, 96px)',
              color: '#D4A017',
              letterSpacing: 4,
              lineHeight: 1,
              animation: 'goldPulse 2.5s ease-in-out infinite',
            }}
          >
            NT$<CountUp
              end={20000}
              duration={2}
              trigger={countTriggered}
              style={{ fontFamily: 'inherit', fontWeight: 'inherit', color: 'inherit', letterSpacing: 'inherit' }}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes goldPulse {
          0%, 100% {
            text-shadow:
              0 0 40px rgba(212,160,23,0.9),
              0 0 80px rgba(212,160,23,0.5);
          }
          50% {
            text-shadow:
              0 0 60px rgba(212,160,23,1),
              0 0 120px rgba(212,160,23,0.7),
              0 0 160px rgba(212,160,23,0.4);
          }
        }

        @media (max-width: 768px) {
          #about h2 {
            font-size: clamp(24px, 7vw, 36px) !important;
          }
          #about h3 {
            font-size: clamp(16px, 5vw, 24px) !important;
          }
          #about p {
            font-size: 14px !important;
            line-height: 2 !important;
          }
        }
      `}</style>
    </section>
  )
}
