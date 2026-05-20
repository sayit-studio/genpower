import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  radius: number; color: string; alpha: number; life: number
  shape: 'circle' | 'star'
}

interface ParticleExplosionProps {
  active: boolean
  originX?: number
  originY?: number
  fullscreen?: boolean
  onComplete?: () => void
}

const COLORS = ['#FF6B00', '#D4A017', '#CC1200', '#FFFFFF', '#FFD700']

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
    const bAngle = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2
    if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle))
    else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle))
    ctx.lineTo(x + (r * 0.4) * Math.cos(bAngle), y + (r * 0.4) * Math.sin(bAngle))
  }
  ctx.closePath()
}

export default function ParticleExplosion({ active, originX, originY, fullscreen = false, onComplete }: ParticleExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ox = originX ?? canvas.width / 2
    const oy = originY ?? canvas.height * 0.8

    particlesRef.current = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 12
      return {
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (fullscreen ? 6 : 0),
        radius: 3 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        life: 60 + Math.random() * 30,
        shape: Math.random() > 0.5 ? 'circle' : 'star',
      }
    })

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0)
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy
        p.vy += 0.3
        p.vx *= 0.98
        p.alpha -= 1 / p.life
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        if (p.shape === 'star') {
          drawStar(ctx, p.x, p.y, p.radius)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      ctx.globalAlpha = 1
      frame++
      if (particlesRef.current.length > 0 && frame < 180) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, originX, originY, fullscreen, onComplete])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  )
}
