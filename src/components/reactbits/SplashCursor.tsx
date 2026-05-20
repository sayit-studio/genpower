import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface Splash {
  x: number; y: number; r: number; alpha: number; color: string
}

const COLORS = ['#CC1200', '#FF6B00', '#D4A017']

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const splashes = useRef<Splash[]>([])
  const rafRef = useRef<number>(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.3) return
      splashes.current.push({
        x: e.clientX, y: e.clientY,
        r: 2 + Math.random() * 8,
        alpha: 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
    window.addEventListener('mousemove', onMove)

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      splashes.current = splashes.current.filter(s => s.alpha > 0)
      splashes.current.forEach(s => {
        s.r += 0.5; s.alpha -= 0.04
        ctx.globalAlpha = Math.max(0, s.alpha)
        ctx.fillStyle = s.color
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [isMobile])

  if (isMobile) return null
  return <canvas ref={canvasRef} className="fixed inset-0 z-[9998] pointer-events-none" />
}
