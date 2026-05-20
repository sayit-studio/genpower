import { useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../../utils/asset'

export default function VoteSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      id="players"
      className="vote-section"
      style={{ position: 'relative', overflow: 'hidden', padding: '120px 24px' }}
    >
      {/* 聚光燈偽元素以 className 實作 */}
      <div className="vote-spotlight" aria-hidden="true" />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* ① 小標籤 */}
        <motion.p
          className="vote-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0 }}
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '11px',
            letterSpacing: '6px',
            color: '#CC1200',
            marginBottom: '16px',
          }}
        >
          VOTE &amp; WIN
        </motion.p>

        {/* ② 主標 */}
        <motion.h2
          className="vote-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: '#FFFFFF',
            letterSpacing: '4px',
            marginBottom: '32px',
          }}
        >
          預測冠軍，抽走大獎
        </motion.h2>

        {/* ③ 機制說明 */}
        <motion.p
          className="vote-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 2.2,
            letterSpacing: '1px',
            whiteSpace: 'pre-line',
            marginBottom: '56px',
          }}
        >
          {`你覺得誰能稱霸章魚燒王座？\n投下你的一票，就有機會抽中餐券、T-shirt、毛巾大禮包！\n活動結束直播現場抽獎，打卡還能再送章魚燒餐券——\n不投票，你絕對後悔。`}
        </motion.p>

        {/* ④ 獎品圖片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ marginBottom: '56px' }}
        >
          {imgError ? (
            <div
              className="vote-prize-placeholder"
              style={{
                width: '480px',
                height: '280px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.2)' }}>獎品圖片</span>
            </div>
          ) : (
            <img
              src={asset('/assets/vote/vote-prize.png')}
              alt="大獎獎品"
              className="vote-prize-img"
              onError={() => setImgError(true)}
              style={{
                maxWidth: '480px',
                width: '100%',
                margin: '0 auto',
                borderRadius: '4px',
                display: 'block',
                filter: 'drop-shadow(0 0 40px rgba(212,160,23,0.3))',
              }}
            />
          )}
        </motion.div>

        {/* ⑤ 大獎文字標註（已移除） */}

        {/* ⑥ CTA 按鈕 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <a href="/battle/#/vote" className="vote-cta">
            立即投票
          </a>
        </motion.div>

      </div>

      <style>{`
        .vote-spotlight {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(212,160,23,0.12) 0%,
            rgba(204,18,0,0.06) 35%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          animation: spotlightPulse 4s ease-in-out infinite;
        }

        @keyframes spotlightPulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .vote-cta {
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%);
          color: #FFFFFF;
          font-family: 'Noto Serif TC', serif;
          font-weight: 700;
          font-size: 18px;
          padding: 18px 64px;
          border-radius: 4px;
          border: none;
          text-decoration: none;
          box-shadow: 0 2px 20px rgba(204,18,0,0.5);
          transition: transform 0.25s ease, filter 0.25s ease;
          z-index: 0;
        }

        .vote-cta::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%);
          filter: blur(14px);
          opacity: 0.6;
          z-index: -1;
          animation: burnPulse 2s ease-in-out infinite;
        }

        @keyframes burnPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }

        .vote-cta:hover {
          transform: translateY(-3px);
          filter: brightness(1.15);
        }

        .vote-prize-placeholder {
          max-width: 100%;
        }

        @media (max-width: 768px) {
          .vote-section {
            padding: 80px 24px !important;
          }

          .vote-heading {
            font-size: clamp(24px, 7vw, 36px) !important;
          }

          .vote-desc {
            font-size: 14px !important;
          }

          .vote-prize-img {
            max-width: 100% !important;
          }

          .vote-prize-placeholder {
            width: 100% !important;
            max-width: 100% !important;
          }

          .vote-cta {
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
