import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PrivacyModal from './PrivacyModal'

interface PrivacyBannerProps {
  introComplete: boolean
}

const bannerVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.4 },
  },
}

export default function PrivacyBanner({ introComplete }: PrivacyBannerProps) {
  const [accepted] = useState(() => !!localStorage.getItem('privacy_accepted'))
  const [show, setShow] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (introComplete && !accepted) {
      const timer = setTimeout(() => setShow(true), 500)
      return () => clearTimeout(timer)
    }
  }, [introComplete, accepted])

  if (accepted) return null

  const handleAgree = () => {
    localStorage.setItem('privacy_accepted', 'true')
    setShow(false)
    setModalOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col md:flex-row"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 200,
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '24px 32px',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div
              className="text-center md:text-left"
              style={{ maxWidth: '720px' }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.8,
                  marginBottom: '4px',
                }}
              >
                本網站蒐集您的個人資料用於活動報名、抽獎資格確認及得獎通知，資料不對外提供第三方。繼續使用即表示您同意本活動隱私權條款。
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.8,
                }}
              >
                This site collects your personal data for event registration, giveaway eligibility, and prize notifications only. Data will not be shared with third parties. By continuing, you agree to our Privacy Policy.
              </p>
            </div>

            <div
              className="flex-shrink-0 flex items-center"
              style={{ gap: '16px' }}
            >
              <button
                onClick={() => setModalOpen(true)}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '13px',
                  padding: '0 0 2px',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                隱私權聲明 Privacy Policy
              </button>

              <button
                onClick={handleAgree}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.15)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)')}
                style={{
                  background: '#CC1200',
                  color: '#FFFFFF',
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 28px',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'filter 0.2s',
                }}
              >
                我已了解，繼續 / I Agree
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PrivacyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAgree={() => setShow(false)}
      />
    </>
  )
}
