import { motion, AnimatePresence } from 'framer-motion'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
  onAgree?: () => void
}

const sections = [
  {
    title: '一、資料蒐集目的',
    zh: '本活動蒐集您的個人資料，用於活動報名審核、抽獎資格確認及得獎通知。',
    en: 'We collect your personal data for event registration review, giveaway eligibility, and prize notifications.',
  },
  {
    title: '二、資料使用範圍',
    zh: '所蒐集之資料僅供本次活動使用，不對外提供予任何第三方。',
    en: 'Collected data is used solely for this event and will not be shared with any third parties.',
  },
  {
    title: '三、資料保管',
    zh: '活動結束後，個人資料將依法定期限保存後予以銷毀。',
    en: 'Personal data will be retained for the legally required period after the event and then destroyed.',
  },
  {
    title: '四、您的權利',
    zh: '您可隨時要求查詢、更正或刪除您的個人資料，請聯繫主辦單位。',
    en: 'You may request access, correction, or deletion of your data at any time by contacting the organizer.',
  },
  {
    title: '五、主辦單位',
    zh: '本活動由明仁二代目主辦，最終解釋權歸主辦單位所有。',
    en: 'This event is hosted by Meijin Nidaime. The organizer reserves the right of final interpretation.',
  },
]

export default function PrivacyModal({ isOpen, onClose, onAgree }: PrivacyModalProps) {
  const handleAgree = () => {
    localStorage.setItem('privacy_accepted', 'true')
    onAgree?.()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#111111',
              borderRadius: '4px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '48px 40px',
              position: 'relative',
            }}
          >
            <button
              onClick={onClose}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)')}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '20px',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '4px 8px',
                transition: 'color 0.2s',
              }}
            >
              ✕
            </button>

            <h2
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 900,
                fontSize: '22px',
                color: '#FFFFFF',
                marginBottom: '32px',
                letterSpacing: '2px',
              }}
            >
              隱私權聲明 Privacy Policy
            </h2>

            {sections.map((s) => (
              <div key={s.title}>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#CC1200',
                    letterSpacing: '2px',
                    marginBottom: '8px',
                    fontWeight: 700,
                  }}
                >
                  {s.title}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.9,
                    marginBottom: '4px',
                  }}
                >
                  {s.zh}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.8,
                    marginBottom: '24px',
                  }}
                >
                  {s.en}
                </p>
              </div>
            ))}

            <button
              onClick={handleAgree}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.15)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)')}
              style={{
                marginTop: '32px',
                width: '100%',
                background: '#CC1200',
                color: '#FFFFFF',
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: '15px',
                padding: '14px',
                borderRadius: '2px',
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 0.2s',
              }}
            >
              我已閱讀並同意 / I Agree
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
