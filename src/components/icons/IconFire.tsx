interface IconFireProps {
  size?: number
  color?: string
  innerColor?: string
}

export default function IconFire({ size = 18, color = '#CC1200', innerColor = '#D4A017' }: IconFireProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7,1 C7,1 11,5 11,9 C11,11.5 9.5,13.5 7,14 C4.5,13.5 3,11.5 3,9 C3,5 7,1 7,1"
        fill={color}
      />
      <path
        d="M7,5 C7,5 9.5,7.5 9.5,9.5 C9.5,11 8.4,12.2 7,12.5 C5.6,12.2 4.5,11 4.5,9.5 C4.5,7.5 7,5 7,5"
        fill={innerColor}
        opacity="0.6"
      />
      <ellipse cx="7" cy="15.5" rx="3.5" ry="1.2" fill={color} opacity="0.3" />
    </svg>
  )
}
