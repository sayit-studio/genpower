import { useRef, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  style?: React.CSSProperties
}

export default function TiltCard({ children, className = '', maxTilt = 12, style }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`)
  }

  const handleMouseLeave = () => setTransform('')

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{ transform, willChange: 'transform', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
