export default function LineWaves({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M0,${80 + i * 40} C360,${60 + i * 40} 720,${100 + i * 40} 1080,${70 + i * 40} S1440,${80 + i * 40} 1440,${80 + i * 40}`}
            fill="none"
            stroke="#1A2A6C"
            strokeWidth="1.5"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-100 0"
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
      <div className="absolute inset-0 bg-brand-blue/10" />
    </div>
  )
}
