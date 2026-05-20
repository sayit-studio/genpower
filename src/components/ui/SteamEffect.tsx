interface SteamEffectProps {
  className?: string
}

export default function SteamEffect({ className = '' }: SteamEffectProps) {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      {/* 蒸氣曲線 1 */}
      <path
        d="M10 28 Q8 20 12 14 Q16 8 14 2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
        style={{ animation: 'steamRise1 2s ease-out infinite', transformOrigin: '12px 28px' }}
      />
      {/* 蒸氣曲線 2 */}
      <path
        d="M20 30 Q18 22 22 16 Q26 10 24 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
        style={{ animation: 'steamRise2 2s ease-out 0.6s infinite', transformOrigin: '22px 30px' }}
      />
      {/* 蒸氣曲線 3 */}
      <path
        d="M30 28 Q28 20 32 14 Q36 8 34 2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
        style={{ animation: 'steamRise3 2s ease-out 1.2s infinite', transformOrigin: '32px 28px' }}
      />
    </svg>
  )
}
