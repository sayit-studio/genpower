import { useRef, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface MagnetProps {
  children: React.ReactNode
  strength?: number
}

export default function Magnet({ children, strength = 30 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: ((e.clientX - cx) / (rect.width / 2)) * strength,
      y: ((e.clientY - cy) / (rect.height / 2)) * strength,
    })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  )
}
