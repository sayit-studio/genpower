import { motion } from 'framer-motion'

const steps = [
  {
    label: 'STEP 01',
    number: '01',
    title: '前往官方 IG',
    desc: '找到活動指定貼文，準備留下參與留言',
  },
  {
    label: 'STEP 02',
    number: '02',
    title: '留言 +1',
    desc: '在指定貼文下方留言 +1，完成參與動作',
  },
  {
    label: 'STEP 03',
    number: '03',
    title: 'TAG 2 名好友',
    desc: '可重複留言，但每次須標記不同好友',
  },
]

const stepDelays = [0.5, 0.65, 0.8]

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="gift-section"
      style={{ position: 'relative', overflow: 'hidden', padding: '120px 24px' }}
    >
      <div className="gift-spotlight" aria-hidden="true" />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0 }}
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '11px',
            letterSpacing: '6px',
            color: '#FF6B00',
            marginBottom: '16px',
          }}
        >
          IG GIVEAWAY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(26px, 4vw, 48px)',
            color: '#FFFFFF',
            letterSpacing: '4px',
            lineHeight: 1.5,
            marginBottom: 0,
          }}
        >
          留言 +1 TAG 好友
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(26px, 4vw, 48px)',
            color: '#FFFFFF',
            letterSpacing: '4px',
            lineHeight: 1.5,
            marginBottom: '32px',
          }}
        >
          賽後直播抽周邊好禮
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 700,
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: '#D4A017',
              letterSpacing: '2px',
              marginBottom: '8px',
            }}
          >
            3 位得獎者｜周邊商品一組 + 章魚燒兌換券
          </p>
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '1px',
              marginBottom: '64px',
            }}
          >
            2026.07.19 活動賽後直播抽出
          </p>
        </motion.div>

        <div className="gift-steps-grid" style={{ marginBottom: '48px' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="gift-step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stepDelays[i] }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '4px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Noto Sans TC', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '4px',
                  color: '#FF6B00',
                }}
              >
                {step.label}
              </span>
              <span
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 900,
                  fontSize: '48px',
                  color: 'rgba(255,107,0,0.15)',
                  lineHeight: 1,
                  margin: '-8px 0',
                }}
              >
                {step.number}
              </span>
              <span
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#FFFFFF',
                  letterSpacing: '2px',
                }}
              >
                {step.title}
              </span>
              <span
                style={{
                  fontFamily: "'Noto Sans TC', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                }}
              >
                {step.desc}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '1px',
            lineHeight: 2,
            marginBottom: '48px',
          }}
        >
          於官方 IG 指定貼文下方留言 +1 並 TAG 2 名好友，即可取得抽獎資格；可重複留言，但每次需標記不同好友。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button type="button" className="gift-cta">
            指定貼文上架後開放
          </button>
        </motion.div>
      </div>

      <style>{`
        .gift-spotlight {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 900px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255,107,0,0.10) 0%,
            rgba(204,18,0,0.05) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          animation: orangeSpotlight 4s ease-in-out infinite;
        }

        @keyframes orangeSpotlight {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        .gift-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .gift-cta {
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, #FF6B00 0%, #CC1200 60%, #8B0000 100%);
          color: #FFFFFF;
          font-family: 'Noto Serif TC', serif;
          font-weight: 700;
          font-size: 18px;
          padding: 18px 64px;
          border-radius: 4px;
          border: none;
          text-decoration: none;
          box-shadow: 0 2px 24px rgba(255,107,0,0.4);
          overflow: hidden;
          transition: filter 0.25s ease;
          z-index: 0;
          cursor: default;
        }

        .gift-cta::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF6B00 0%, #CC1200 60%, #8B0000 100%);
          filter: blur(14px);
          opacity: 0.5;
          z-index: -1;
          animation: burnPulse 2s ease-in-out infinite;
        }

        @keyframes burnPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        @media (max-width: 768px) {
          .gift-section {
            padding: 80px 24px !important;
          }

          .gift-steps-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .gift-cta {
            width: 100%;
            max-width: 320px;
            font-size: 16px !important;
            padding: 18px 0 !important;
            text-align: center;
            box-sizing: border-box;
          }
        }
      `}</style>
    </section>
  )
}
