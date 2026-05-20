import { useCountdown } from '../../hooks/useCountdown'
import { AnimatePresence, motion } from 'framer-motion'

interface FlipUnitProps {
  value: number
  label: string
}

function FlipUnit({ value, label }: FlipUnitProps) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-black/60 rounded-sm w-16 md:w-20 h-16 md:h-20 flex items-center justify-center overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(204,18,0,0.4), 0 4px 20px rgba(204,18,0,0.15)' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="font-serif text-3xl md:text-4xl font-black text-white absolute"
          >
            {display}
          </motion.span>
        </AnimatePresence>
        {/* Fire border effect */}
        <div className="absolute inset-0 rounded-sm pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,107,0,0.25)' }} />
      </div>
      <span className="mt-1 text-xs text-white/60 uppercase tracking-wider">{label}</span>
    </div>
  )
}

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown()
  return (
    <div className="flex items-end gap-2 md:gap-4">
      <FlipUnit value={days} label="天" />
      <span className="text-brand-red text-3xl font-black mb-4">:</span>
      <FlipUnit value={hours} label="時" />
      <span className="text-brand-red text-3xl font-black mb-4">:</span>
      <FlipUnit value={minutes} label="分" />
      <span className="text-brand-red text-3xl font-black mb-4">:</span>
      <FlipUnit value={seconds} label="秒" />
    </div>
  )
}
