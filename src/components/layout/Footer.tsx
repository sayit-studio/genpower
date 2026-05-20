import { useState } from 'react'
import PrivacyModal from '../ui/PrivacyModal'
import { asset } from '../../utils/asset'

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <footer
        style={{
          background: '#080808',
          padding: '64px 24px 40px',
          textAlign: 'center',
        }}
      >
        <img
          src={asset('/assets/logo/logo-circle.png')}
          alt="明仁二代目"
          style={{ height: '56px', opacity: 0.85, display: 'block', margin: '0 auto 20px' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />

        <p
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700,
            fontSize: '18px',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '3px',
            marginBottom: '4px',
          }}
        >
          今天的我，沒有極限！
        </p>

        <p
          style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '2px',
            marginBottom: '28px',
          }}
        >
          No Limits. Just Takoyaki.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <a
            href="https://www.instagram.com/takoyaki.tw/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A017')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>

          <a
            href="https://lin.ee/V4cEC4g"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A017')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            Official LINE
          </a>
        </div>

        <div
          style={{
            width: '40px',
            height: '1px',
            margin: '0 auto 24px',
            background: 'rgba(255,255,255,0.1)',
          }}
        />

        <p
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '1px',
            marginBottom: '12px',
          }}
        >
          © 2026 明仁二代目 All Rights Reserved
        </p>

        <p
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.15)',
            letterSpacing: '1px',
            marginBottom: '12px',
          }}
        >
          本活動最終解釋權歸主辦單位所有
        </p>

        <button
          onClick={() => setModalOpen(true)}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.2)')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'color 0.2s',
            padding: 0,
          }}
        >
          隱私權聲明 | Privacy Policy
        </button>
      </footer>

      <PrivacyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
