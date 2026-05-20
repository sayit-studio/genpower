export default function Beams({ className = '' }: { className?: string }) {
  const beams = Array.from({ length: 8 }, (_, i) => i)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-radial from-red-950/40 via-transparent to-transparent" />
      {beams.map(i => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 origin-left h-px"
          style={{
            width: '120vmax',
            background: `linear-gradient(90deg, rgba(204,18,0,0.4) 0%, transparent 70%)`,
            transform: `rotate(${i * 45}deg) translateY(-50%)`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}
