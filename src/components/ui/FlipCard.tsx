import { useState } from 'react'
import { motion } from 'framer-motion'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  autoFlip?: boolean
  autoFlipDelay?: number
}

export default function FlipCard({ front, back, className = '', autoFlip = false, autoFlipDelay = 0 }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => autoFlip && setTimeout(() => setFlipped(true), autoFlipDelay)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0 w-full h-full">
          {front}
        </div>
        {/* Back */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full h-full"
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}
