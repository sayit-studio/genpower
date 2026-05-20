import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; alpha: number; color: string
}

interface ParticlesProps {
  count?: number
  color?: string
  className?: string
  upward?: boolean
  size?: number
  speed?: number
}

export default function Particles({ count = 60, color = '#D4A017', className = '', upward = false, size: sizeProp = 1.5, speed = 0.5 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const resize = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: upward ? -(0.3 + Math.random() * 0.8) * speed : (Math.random() - 0.5) * speed,
      size: sizeProp * (0.5 + Math.random()),
      alpha: 0.2 + Math.random() * 0.6,
      color,
    }))

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [count, color, upward])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} />
}
