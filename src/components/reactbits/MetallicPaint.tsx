interface MetallicPaintProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function MetallicPaint({ className = '', style: extraStyle, children }: MetallicPaintProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        ...extraStyle,
        background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 25%, #1a1a1a 50%, #3a3a3a 75%, #D4A017 100%)',
        backgroundSize: '400% 400%',
        animation: 'metallic-shift 4s ease-in-out infinite',
      }}
    >
      {children}
      <style>{`
        @keyframes metallic-shift {
          0%   { background-position: 0% 50% }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  )
}
