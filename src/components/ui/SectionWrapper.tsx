import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
  stagger?: boolean
}

export default function SectionWrapper({ children, className = '', style, id, stagger = false }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const containerVariants = stagger
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }

  return (
    <div ref={ref} id={id} className={className} style={style}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </div>
  )
}

export const fadeInChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
