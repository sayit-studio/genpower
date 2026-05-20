import { useEffect, useState } from 'react'
import { CONFIG } from '../constants/config'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

export function useCountdown(): Countdown {
  const target = new Date(`${CONFIG.EVENT.date}T09:00:00+08:00`).getTime()

  const calc = (): Countdown => {
    const diff = target - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return { days, hours, minutes, seconds, expired: false }
  }

  const [countdown, setCountdown] = useState<Countdown>(calc)

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calc()), 1000)
    return () => clearInterval(timer)
  }, [])

  return countdown
}
