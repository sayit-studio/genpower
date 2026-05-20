import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import GradientText from '../components/reactbits/GradientText'
import { asset } from '../utils/asset'

const STAGES = [
  {
    code: 'STAGE 01',
    name: '極速章魚燒',
    imageDesktop: asset('/assets/stages/stage-01-speed-desktop.png'),
    imageMobile: asset('/assets/stages/stage-01-speed-mobile.png'),
    rules: `挑戰你的極速本能！在滾燙章魚燒出爐的瞬間，\n你必須比所有人更快將12顆送入口中——\n你來得及去注意其他人嗎？\n前18名晉級，慢一秒就出局！`,
  },
  {
    code: 'STAGE 02',
    name: '極樂章魚燒',
    imageDesktop: asset('/assets/stages/stage-02-chaos-desktop.png'),
    imageMobile: asset('/assets/stages/stage-02-chaos-mobile.png'),
    rules: `以為過關就能喘息？錯了。\n趣味障礙卡隨時登場打亂你的節奏，\n讓你在混亂中掙扎求生。\n完成3盒者方可晉級——你的意志力夠強嗎？`,
  },
  {
    code: 'STAGE 03',
    name: '極限章魚燒',
    imageDesktop: asset('/assets/stages/stage-03-limit-desktop.jpg'),
    imageMobile: asset('/assets/stages/stage-03-limit-mobile.png'),
    rules: `沒有終點，只有極限。\n無限補盤持續轟炸，吃得最多者奪冠稱霸。\n這一關考驗的不只是胃，\n而是你敢不敢突破自己以為的極限！`,
  },
]

function StageFlipCard({ stage, delay, isMobile }: { stage: typeof STAGES[0]; delay: number; isMobile: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const imageSrc = isMobile ? stage.imageMobile : stage.imageDesktop

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        perspective: '1000px',
        aspectRatio: isMobile ? '3/4' : '4/3',
      }}
      onClick={() => setIsFlipped(f => !f)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 翻轉體 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 正面 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            overflow: 'hidden',
          }}
        >
          <img
            src={imageSrc}
            alt={stage.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* hover 提示 */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              點擊查看規則
            </span>
          </div>
        </div>

        {/* 背面 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0D0D0D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '32px 24px' : '40px 32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '11px',
              letterSpacing: '6px',
              color: '#CC1200',
              margin: '0 0 20px',
            }}
          >
            {stage.code}
          </p>
          <h3
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: '#FFFFFF',
              letterSpacing: '3px',
              margin: '0 0 24px',
            }}
          >
            {stage.name}
          </h3>
          {/* 裝飾線 */}
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4A017, transparent)',
              margin: '0 auto 24px',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? '13px' : 'clamp(13px, 1.5vw, 15px)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 2,
              letterSpacing: '0.5px',
              whiteSpace: 'pre-line',
              margin: 0,
            }}
          >
            {stage.rules}
          </p>
          <p
            style={{
              marginTop: '32px',
              marginBottom: 0,
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: "'Noto Sans TC', sans-serif",
            }}
          >
            點擊返回
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function StagesSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section id="stages" style={{ padding: '120px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 標題區 */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '11px',
              letterSpacing: '6px',
              color: '#CC1200',
              margin: '0 0 16px',
            }}
          >
            BATTLE STAGES
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '4px',
              margin: 0,
            }}
          >
            <GradientText text="三關極限考驗" />
          </h2>
        </div>

        {/* 卡片區 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: '24px',
          }}
        >
          {STAGES.map((stage, idx) => (
            <StageFlipCard key={stage.code} stage={stage} delay={idx * 0.15} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
