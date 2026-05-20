import { motion } from 'framer-motion'
import { CONFIG } from '../constants/config'
import GradientText from '../components/reactbits/GradientText'
import { asset } from '../utils/asset'

function MerchCard({ item, index }: { item: typeof CONFIG.MERCH[0]; index: number }) {
  return (
    <motion.div
      className="merch-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '4px',
        aspectRatio: '3/4',
        cursor: 'default',
      }}
    >
      <img
        src={asset(item.image)}
        alt={item.name}
        className="merch-card-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          padding: 0,
          transition: 'transform 0.5s ease',
        }}
      />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.85))',
      }}>
        <p className="merch-card-name" style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 700,
          fontSize: '15px',
          color: '#FFFFFF',
          letterSpacing: '1px',
          margin: 0,
        }}>
          {item.name}
        </p>
      </div>

      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: '#CC1200',
        color: '#FFFFFF',
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: '11px',
        letterSpacing: '1px',
        padding: '4px 10px',
        borderRadius: '2px',
      }}>
        費用含
      </div>
    </motion.div>
  )
}

export default function MerchSection() {
  return (
    <section style={{ padding: '120px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '11px',
            letterSpacing: '6px',
            color: '#CC1200',
            margin: '0 0 16px 0',
          }}>
            CHALLENGER'S GEAR
          </p>
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '4px',
            margin: '0 0 16px 0',
          }}>
            <GradientText text="挑戰者物資" />
          </h2>
          <p style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '1px',
            margin: '0 0 64px 0',
          }}>
            報名費 NT$600 包含以下五件物資
          </p>
        </div>

        <div className="merch-grid">
          {CONFIG.MERCH.map((item, index) => (
            <MerchCard key={item.name} item={item} index={index} />
          ))}
        </div>

      </div>

      <style>{`
        .merch-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .merch-card:hover .merch-card-img {
          transform: scale(1.08);
        }

        @media (max-width: 768px) {
          .merch-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

.merch-card-name {
            font-size: 13px !important;
          }
        }
      `}</style>
    </section>
  )
}
