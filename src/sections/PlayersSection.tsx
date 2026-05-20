import { Link } from 'react-router-dom'
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

        {/* Vote CTA */}
        <div className="flex flex-col items-center gap-6" style={{ marginTop: '60px' }}>
          <p className="text-white text-base text-center">預測你的章魚燒王，投票即抽大獎</p>
          <Link to="/vote" className="relative inline-block">
            <button
              className="relative z-10 text-white font-serif font-bold transition-all duration-200 hover:text-brand-gold"
              style={{ fontSize: '18px', padding: '18px 60px', boxShadow: 'inset 0 -2px 0 rgba(204,18,0,0.5)' }}
            >
              前往投票預測 →
            </button>
            {[1, 2, 3].map(n => (
              <span
                key={n}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  animation: `ripple-pulse 2s ease-out ${n * 0.5}s infinite`,
                  boxShadow: '0 0 0 2px rgba(204,18,0,0.6)',
                }}
              />
            ))}
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
