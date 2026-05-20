import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  trigger?: boolean
  style?: React.CSSProperties
}

export default function CountUp({ end, duration = 1.5, prefix = '', suffix = '', className = '', trigger = true, style }: CountUpProps) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!trigger || startedRef.current) return
    startedRef.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, end, duration])

  return (
    <span className={className} style={style}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}
