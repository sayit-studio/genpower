import { useEffect, useState } from 'react'

interface RotatingTextProps {
  texts: string[]
  className?: string
  interval?: number
  typewriter?: boolean
}

export default function RotatingText({ texts, className = '', interval = 3000, typewriter = false }: RotatingTextProps) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (!typewriter) {
      const t = setInterval(() => setIndex(i => (i + 1) % texts.length), interval)
      return () => clearInterval(t)
    }
  }, [texts.length, interval, typewriter])

  useEffect(() => {
    if (!typewriter) { setDisplayed(texts[index]); return }
    setDisplayed('')
    setCharIndex(0)
  }, [index, typewriter, texts])

  useEffect(() => {
    if (!typewriter) return
    if (charIndex >= texts[index].length) {
      const t = setTimeout(() => setIndex(i => (i + 1) % texts.length), interval)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed(texts[index].slice(0, charIndex + 1))
      setCharIndex(c => c + 1)
    }, 80)
    return () => clearTimeout(t)
  }, [charIndex, index, texts, interval, typewriter])

  return (
    <span className={className}>
      {typewriter ? displayed : texts[index]}
      {typewriter && charIndex < texts[index].length && <span className="animate-pulse">|</span>}
    </span>
  )
}
