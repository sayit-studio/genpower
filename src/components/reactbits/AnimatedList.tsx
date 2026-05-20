import { motion } from 'framer-motion'

interface AnimatedListProps {
  items: React.ReactNode[]
  className?: string
  itemClassName?: string
  stagger?: number
  direction?: 'up' | 'left'
}

const itemVariants = (direction: 'up' | 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -40 : 0, y: direction === 'up' ? 40 : 0 },
  visible: (i: number) => ({
    opacity: 1, x: 0, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
})

export default function AnimatedList({ items, className = '', itemClassName = '', direction = 'up' }: AnimatedListProps) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={itemVariants(direction)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={itemClassName}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}
