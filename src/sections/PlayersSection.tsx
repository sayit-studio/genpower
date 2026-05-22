import SectionWrapper from '../components/ui/SectionWrapper'
import GrainGradient from '../components/reactbits/GrainGradient'
import GradientText from '../components/reactbits/GradientText'
import { CONFIG } from '../constants/config'

function PlayerCard({ index }: { index: number }) {
  const num = `#${String(index + 1).padStart(3, '0')}`
  return (
    <div
      className="relative overflow-hidden group"
      style={{ borderRadius: '4px', aspectRatio: '1/1', background: 'rgba(255,255,255,0.04)' }}
    >
      <GrainGradient className="absolute inset-0" />
      {/* Dark overlay with question mark */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
        <span
          className="font-serif font-black select-none"
          style={{ fontSize: '40px', color: 'rgba(204,18,0,0.7)' }}
        >
          ?
        </span>
      </div>
      {/* Number label */}
      <span
        className="absolute top-2 left-2 font-bold"
        style={{ fontSize: '11px', color: 'rgba(212,160,23,0.7)' }}
      >
        {num}
      </span>
    </div>
  )
}

export default function PlayersSection() {
  return (
    <SectionWrapper id="players" className="py-24">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-brand-red text-sm font-bold tracking-widest uppercase mb-2">CHALLENGERS</p>
          <h2 className="font-serif text-3xl md:text-4xl font-black">
            <GradientText text="挑戰者名單" className="font-serif text-3xl md:text-4xl font-black" />
          </h2>
          <p className="text-white/50 mt-3 text-sm">
            選手照片賽前公布，投票預測誰是王者
          </p>
        </div>

        {/* 5 cols × 6 rows = 30 players */}
        <div className="grid grid-cols-5 md:grid-cols-5 gap-3 mb-16">
          {Array.from({ length: CONFIG.EVENT.totalSlots }, (_, i) => (
            <PlayerCard key={i} index={i} />
          ))}
        </div>

        {/* Vote CTA — 投票尚未開放 */}
        <div className="flex flex-col items-center gap-5" style={{ marginTop: '60px' }}>
          <div style={{
            border: '1px solid rgba(212,160,23,0.3)',
            borderRadius: 4,
            padding: '32px 40px',
            textAlign: 'center',
            background: 'rgba(212,160,23,0.04)',
            maxWidth: 480,
          }}>
            <div style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: 11,
              letterSpacing: 6,
              color: '#CC1200',
              fontWeight: 700,
              marginBottom: 12,
            }}>
              COMING SOON
            </div>
            <p style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 700,
              fontSize: 18,
              color: '#D4A017',
              letterSpacing: 3,
              margin: '0 0 8px',
            }}>
              報名募集中
            </p>
            <p style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
              margin: '0 0 20px',
            }}>
              開放投票時將於 FB、IG 公告通知<br />歡迎關注我們的社群掌握最新消息
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <a
                href="https://www.facebook.com/takoyaki.tw"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  background: 'rgba(24,119,242,0.15)',
                  border: '1px solid rgba(24,119,242,0.4)',
                  borderRadius: 4,
                  color: '#90b8f8',
                  fontFamily: "'Noto Sans TC', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textDecoration: 'none',
                  transition: 'filter 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.2)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.filter = ''}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                FB
              </a>
              <a
                href="https://www.instagram.com/meijin2nd.takoyaki/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  background: 'rgba(131,58,180,0.15)',
                  border: '1px solid rgba(131,58,180,0.4)',
                  borderRadius: 4,
                  color: '#d08cf0',
                  fontFamily: "'Noto Sans TC', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textDecoration: 'none',
                  transition: 'filter 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.2)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.filter = ''}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                IG
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
