import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number>(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) return
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    const animate = () => {
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${pos.current.x - 24}px, ${pos.current.y - 24}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', onMove) }
  }, [isMobile])

  if (isMobile) return null
  return (
    <div
      ref={blobRef}
      className="fixed z-[9997] pointer-events-none w-12 h-12 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(204,18,0,0.5) 0%, transparent 70%)',
        filter: 'blur(6px)',
        transition: 'transform 0.05s linear',
      }}
    />
  )
}
