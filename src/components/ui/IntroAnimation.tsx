import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { asset } from '../../utils/asset'

interface IntroAnimationProps {
  onComplete?: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [visible, setVisible] = useState(true)

  const handleEnd = () => setVisible(false)

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0D0D0D',
          }}
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleEnd}
            onError={handleEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src={asset('/assets/intro/intro-animation.mp4')} type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
