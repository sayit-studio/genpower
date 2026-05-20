import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TakoyakiSVG from './TakoyakiSVG'
import SteamEffect from './SteamEffect'
import { CONFIG } from '../../constants/config'

export default function TakoyakiFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-7 right-7 z-[100] flex flex-col items-end gap-3">
      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-60 overflow-hidden flex"
            style={{ background: 'rgba(18, 18, 18, 0.96)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
          >
            {/* Left 3px red accent — the only allowed border in this design */}
            <div className="flex-shrink-0 w-[3px] bg-brand-red" />
            <div className="p-4 flex-1">
              <p className="font-serif font-bold text-white text-sm mb-3">立即聯絡</p>
              <a
                href={CONFIG.SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full text-white text-sm font-bold py-2.5 px-4 transition-all duration-150 hover:brightness-110"
                style={{ background: '#06C755' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.02 2 11c0 3.37 1.88 6.35 4.72 8.15L6 22l3.37-1.67C10.43 20.74 11.2 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2z"/>
                </svg>
                LINE 聯絡我們
              </a>
              {!CONFIG.SOCIAL.lineOA && (
                <p className="text-white/30 text-xs mt-2 text-center">（LINE OA 連結待補）</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Float button */}
      <div className="relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <SteamEffect />
        </div>
        <motion.button
          onClick={() => setOpen(prev => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 38% 32%, #D4A017, #8B4513)',
            boxShadow: '0 4px 28px rgba(204,18,0,0.45)',
          }}
          aria-label="聯絡我們"
        >
          <TakoyakiSVG size={32} animate={!open} />
        </motion.button>
      </div>
    </div>
  )
}
