import { CONFIG } from '../constants/config'
import IconCrown from '../components/icons/IconCrown'
import GradientText from '../components/reactbits/GradientText'

export default function PrizesSection() {
  const champion = CONFIG.PRIZES[0]
  const second = CONFIG.PRIZES[1]
  const third = CONFIG.PRIZES[2]

  return (
    <section id="prizes" style={{ padding: '80px 0' }}>
      {/* 標題 */}
      <div style={{ textAlign: 'center', marginBottom: '64px', padding: '0 24px' }}>
        <h2 style={{
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 4vw, 44px)',
          margin: 0,
        }}>
          <GradientText text="你敢來，就有機會帶走" />
        </h2>
      </div>

      {/* 桌機：橫排 */}
      <div className="prizes-desktop" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 0,
      }}>
        {/* 亞軍（左） */}
        <div style={{ textAlign: 'center', padding: '0 48px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{second.label}</p>
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'rgba(255,255,255,0.8)',
            margin: '4px 0 0',
          }}>
            NT${second.amount.toLocaleString()}
          </p>
        </div>

        {/* 冠軍（中） */}
        <div style={{ textAlign: 'center', padding: '0 48px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#D4A017', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <IconCrown size={14} color="#D4A017" /> {champion.label}
          </p>
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(44px, 5.5vw, 72px)',
            color: '#D4A017',
            textShadow: '0 0 50px rgba(212,160,23,0.7)',
            margin: '4px 0 0',
          }}>
            NT${champion.amount.toLocaleString()}
          </p>
        </div>

        {/* 季軍（右） */}
        <div style={{ textAlign: 'center', padding: '0 48px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{third.label}</p>
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'rgba(255,255,255,0.8)',
            margin: '4px 0 0',
          }}>
            NT${third.amount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 手機：垂直堆疊 */}
      <div className="prizes-mobile" style={{
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '0 24px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#D4A017' }}>
            <IconCrown size={14} color="#D4A017" /> {champion.label}
          </p>
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 10vw, 56px)',
            color: '#D4A017',
            textShadow: '0 0 50px rgba(212,160,23,0.7)',
          }}>
            NT${champion.amount.toLocaleString()}
          </p>
        </div>
        {[second, third].map(p => (
          <div key={p.rank} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{p.label}</p>
            <p style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(24px, 6vw, 36px)',
              color: 'rgba(255,255,255,0.8)',
            }}>
              NT${p.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .prizes-desktop { display: none !important; }
          .prizes-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
