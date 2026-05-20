import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TakoyakiSVG from './TakoyakiSVG'

const BALLS = [
  { x: -220, y: -180 },
  { x:  220, y: -180 },
  { x: -220, y:  180 },
  { x:  220, y:  180 },
  { x:    0, y: -250 },
]

export default function TakoyakiPageTransition() {
  const [phase, setPhase] = useState<'gather' | 'explode'>('gather')

  useEffect(() => {
    // gather: last ball starts at 4×45ms=180ms, anim 380ms → done ~560ms
    const t = setTimeout(() => setPhase('explode'), 580)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center overflow-hidden"
      style={{ background: 'rgba(10,0,0,0.92)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'explode' ? 0 : 1 }}
      transition={{ delay: phase === 'explode' ? 0.35 : 0, duration: 0.25 }}
    >
      {BALLS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: pos.x, y: pos.y, rotate: 0, scale: 1, opacity: 1 }}
          animate={
            phase === 'gather'
              ? { x: 0, y: 0, rotate: 360, scale: 1.15 }
              : { x: pos.x * 2.2, y: pos.y * 2.2, scale: 0, opacity: 0, rotate: 720 }
          }
          transition={
            phase === 'gather'
              ? { duration: 0.38, delay: i * 0.045, ease: 'easeOut' }
              : { duration: 0.28, delay: i * 0.03, ease: 'easeIn' }
          }
        >
          <TakoyakiSVG size={64} />
        </motion.div>
      ))}
    </motion.div>
  )
}
