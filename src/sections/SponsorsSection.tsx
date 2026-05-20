const SPONSORS = Array.from({ length: 10 }, (_, i) => i)

function SponsorPlaceholder() {
  return (
    <div
      style={{
        width: 160,
        height: 80,
        flexShrink: 0,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '2px',
        fontFamily: 'inherit',
        textAlign: 'center',
        lineHeight: 1.6,
      }}
    >
      贊助招商中
    </div>
  )
}

export default function SponsorsSection() {
  return (
    <section
      style={{
        width: '100%',
        minHeight: '50vh',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 跑馬燈外層（霧化遮罩定位基準） */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* 左側霧化遮罩 */}
        <div
          className="sponsor-fade-left"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 200,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, #0D0D0D 0%, transparent 100%)',
          }}
        />

        {/* 右側霧化遮罩 */}
        <div
          className="sponsor-fade-right"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 200,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(to left, #0D0D0D 0%, transparent 100%)',
          }}
        />

        {/* 跑馬燈軌道 */}
        <div className="sponsor-track">
          {/* 原始 10 個 + 複製 10 個 = 無縫循環 */}
          {[...SPONSORS, ...SPONSORS].map((_, idx) => (
            <SponsorPlaceholder key={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
