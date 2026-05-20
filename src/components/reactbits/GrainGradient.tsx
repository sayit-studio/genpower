interface GrainGradientProps {
  className?: string
  children?: React.ReactNode
}

export default function GrainGradient({ className = '', children }: GrainGradientProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(26,42,108,0.7) 0%, rgba(13,13,13,0.8) 100%)',
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.4" />
      </svg>
    </div>
  )
}
