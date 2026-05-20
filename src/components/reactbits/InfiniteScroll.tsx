import { useRef } from 'react'

interface InfiniteScrollProps {
  items: React.ReactNode[]
  speed?: number
  className?: string
  itemClassName?: string
}

export default function InfiniteScroll({ items, speed = 30, className = '', itemClassName = '' }: InfiniteScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{ animation: `infinite-scroll ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className={`flex-shrink-0 ${itemClassName}`}>
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes infinite-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
