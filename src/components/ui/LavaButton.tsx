import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface LavaButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const sizeStyles = {
  lg: { padding: '18px 56px', fontSize: '18px' },
  md: { padding: '14px 40px', fontSize: '16px' },
  sm: { padding: '10px 28px', fontSize: '14px' },
}

const glowStyle = {
  position: 'absolute' as const,
  inset: '-6px',
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%)',
  filter: 'blur(14px)',
  opacity: 0.65,
  zIndex: -1,
}

export default function LavaButton({
  children,
  onClick,
  href,
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: LavaButtonProps) {
  const style = sizeStyles[size]

  const inner = (
    <motion.div
      whileHover={disabled ? {} : { y: -3, filter: 'brightness(1.15)' }}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <motion.div
        style={glowStyle}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span
        style={{
          display: 'block',
          position: 'relative',
          background: 'linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%)',
          color: 'white',
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 700,
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          ...style,
        }}
      >
        {children}
      </span>
    </motion.div>
  )

  if (href) {
    return (
      <Link to={href} className={className} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={{ background: 'none', padding: 0 }}
    >
      {inner}
    </button>
  )
}
