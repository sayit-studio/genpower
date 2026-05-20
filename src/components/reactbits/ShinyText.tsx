interface ShinyTextProps {
  text: string
  className?: string
}

export default function ShinyText({ text, className = '' }: ShinyTextProps) {
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ WebkitBackgroundClip: 'text' }}
    >
      {text}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.6) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shiny-sweep 2s linear infinite',
          mixBlendMode: 'overlay',
        }}
      />
      <style>{`@keyframes shiny-sweep { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </span>
  )
}
