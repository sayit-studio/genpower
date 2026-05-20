interface IconSteamProps {
  size?: number
  opacity?: number
}

export default function IconSteam({ size = 30, opacity = 0.6 }: IconSteamProps) {
  return (
    <svg width={size} height={(size / 30) * 40} viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 38 Q4 30 8 22 Q12 14 8 6"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ animation: 'steamRise1 2s ease-out infinite' }}
      />
      <path
        d="M15 38 Q11 30 15 22 Q19 14 15 6"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ animation: 'steamRise2 2s ease-out 0.5s infinite' }}
      />
      <path
        d="M22 38 Q18 30 22 22 Q26 14 22 6"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ animation: 'steamRise3 2s ease-out 1s infinite' }}
      />
    </svg>
  )
}
