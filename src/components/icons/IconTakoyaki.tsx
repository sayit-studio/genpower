interface IconTakoyakiProps {
  size?: number
  animate?: boolean
}

export default function IconTakoyaki({ size = 48, animate = false }: IconTakoyakiProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animate ? {
        animation: 'takoyakiFloat 3s ease-in-out infinite',
      } : undefined}
    >
      {/* 底部陰影 */}
      <ellipse cx="24" cy="44" rx="14" ry="3" fill="rgba(0,0,0,0.3)" />
      {/* 章魚燒主體 */}
      <circle cx="24" cy="24" r="18" fill="#C8860A" />
      {/* 醬料弧線 */}
      <path
        d="M10 20 Q24 28 38 20"
        stroke="#5C3317"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 28 Q24 22 36 28"
        stroke="#5C3317"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* 高光點 */}
      <circle cx="18" cy="18" r="3.5" fill="#FFF5D0" opacity="0.7" />
      <circle cx="30" cy="16" r="2" fill="#FFF5D0" opacity="0.5" />
    </svg>
  )
}
