import { useRef } from 'react'

interface TakoyakiSVGProps {
  size?: number
  animate?: boolean
  className?: string
}

export default function TakoyakiSVG({ size = 64, animate = false, className = '' }: TakoyakiSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'takoyaki-float' : ''} ${className}`}
      style={animate ? { animation: 'takoyakiFloat 3s ease-in-out infinite' } : undefined}
    >
      {/* 章魚燒麵糰主體 */}
      <circle cx="40" cy="42" r="32" fill="#8B4513" />
      {/* 底部深色陰影 */}
      <ellipse cx="40" cy="62" rx="26" ry="10" fill="#5C2D0A" opacity="0.6" />
      {/* 側面烤色漸層 */}
      <circle cx="40" cy="42" r="32" fill="url(#takoyakiGrad)" />
      {/* 頂部高光 */}
      <ellipse cx="28" cy="28" rx="9" ry="5" fill="white" opacity="0.35" transform="rotate(-25 28 28)" />
      <ellipse cx="24" cy="26" rx="4" ry="2.5" fill="white" opacity="0.5" transform="rotate(-25 24 26)" />
      {/* 醬料線（深棕色） */}
      <path d="M18 50 Q30 44 42 50 Q54 56 62 50" stroke="#3a1a08" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* 柴魚片 */}
      <line x1="32" y1="33" x2="29" y2="25" stroke="#D4A878" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      <line x1="37" y1="30" x2="38" y2="22" stroke="#D4A878" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      <line x1="44" y1="32" x2="48" y2="25" stroke="#D4A878" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
      <line x1="50" y1="36" x2="55" y2="30" stroke="#D4A878" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      {/* 青海苔點 */}
      <circle cx="35" cy="38" r="2" fill="#2D5A1B" opacity="0.7" />
      <circle cx="45" cy="40" r="1.5" fill="#2D5A1B" opacity="0.7" />
      <circle cx="40" cy="35" r="1.5" fill="#2D5A1B" opacity="0.6" />
      {/* SVG 漸層定義 */}
      <defs>
        <radialGradient id="takoyakiGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#C8722A" stopOpacity="0" />
          <stop offset="70%" stopColor="#6B3410" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3D1A05" stopOpacity="0.7" />
        </radialGradient>
      </defs>
    </svg>
  )
}
