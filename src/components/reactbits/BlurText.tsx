import { motion } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export default function BlurText({ text, className = '', delay = 0 }: BlurTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    >
      {text}
    </motion.span>
  )
}
