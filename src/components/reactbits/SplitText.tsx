import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  stagger?: number
  delay?: number
}

export default function SplitText({ text, className = '', stagger = 0.06, delay = 0 }: SplitTextProps) {
  const chars = text.split('')
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * stagger, duration: 0.4, type: 'spring', stiffness: 200 }}
          className={char === ' ' ? 'w-2' : ''}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
