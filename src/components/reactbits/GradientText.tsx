interface GradientTextProps {
  text: string
  className?: string
  from?: string
  to?: string
}

export default function GradientText({ text, className = '', from = '#D4A017', to = '#CC1200' }: GradientTextProps) {
  return (
    <span
      className={className}
      style={{ background: `linear-gradient(90deg, ${from}, ${to}, ${from})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradient-flow 3s linear infinite' }}
    >
      {text}
      <style>{`@keyframes gradient-flow { 0%{background-position:0%} 100%{background-position:200%} }`}</style>
    </span>
  )
}
