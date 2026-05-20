interface IconTimerProps {
  size?: number
}

export default function IconTimer({ size = 24 }: IconTimerProps) {
  return (
    <svg width={size} height={(size / 24) * 26} viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 頂部按鈕 */}
      <rect x="10" y="0" width="4" height="3" rx="1" fill="white" opacity="0.8" />
      {/* 錶面 */}
      <circle cx="12" cy="15" r="9" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* 刻度點 */}
      <circle cx="12" cy="7.5" r="0.8" fill="white" opacity="0.5" />
      <circle cx="19.5" cy="15" r="0.8" fill="white" opacity="0.5" />
      <circle cx="12" cy="22.5" r="0.8" fill="white" opacity="0.5" />
      <circle cx="4.5" cy="15" r="0.8" fill="white" opacity="0.5" />
      {/* 指針 */}
      <line x1="12" y1="15" x2="16" y2="11" stroke="#CC1200" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="15" x2="12" y2="10" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}
