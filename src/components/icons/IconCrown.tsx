import { motion } from 'framer-motion'

interface IconCrownProps {
  size?: number
  color?: string
  animate?: boolean
}

export default function IconCrown({ size = 32, color = '#D4A017', animate = false }: IconCrownProps) {
  const svg = (
    <svg width={size} height={(size / 32) * 24} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 底座 */}
      <rect x="2" y="16" width="28" height="6" rx="1" fill={color} />
      {/* 三尖王冠 */}
      <path
        d="M2 16 L6 4 L13 12 L16 2 L19 12 L26 4 L30 16 Z"
        fill={color}
      />
    </svg>
  )

  if (animate) {
    return (
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'inline-block' }}
      >
        {svg}
      </motion.div>
    )
  }

  return svg
}
