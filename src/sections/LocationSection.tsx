import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import GradientText from '../components/reactbits/GradientText'

export default function LocationSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section style={{ padding: '120px 24px', background: 'transparent' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '64px',
          alignItems: 'center',
        }}
      >
        {/* 左側：文字區 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0 }}
        >
          {/* 小標籤 */}
          <p
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '11px',
              letterSpacing: '6px',
              color: '#CC1200',
              margin: '0 0 16px',
            }}
          >
            LOCATION
          </p>

          {/* 主標 */}
          <h2
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '4px',
              margin: '0 0 40px',
            }}
          >
            <GradientText text="活動地點" />
          </h2>

          {/* 資訊列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 日期 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: '#CC1200', fontSize: '18px', marginTop: '2px' }}>📅</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                  }}
                >
                  DATE
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  2026.07.19（日）
                </span>
              </div>
            </div>

            {/* 時間 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: '#CC1200', fontSize: '18px', marginTop: '2px' }}>⏰</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                  }}
                >
                  TIME
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  活動時間請關注{' '}
                  <a
                    href="https://www.instagram.com/takoyaki.tw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#D4A017', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    官方 IG
                  </a>
                  {' '}或{' '}
                  <a
                    href="https://lin.ee/V4cEC4g"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#D4A017', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    官方 LINE
                  </a>
                </span>
              </div>
            </div>

            {/* 地址 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: '#CC1200', fontSize: '18px', marginTop: '2px' }}>📍</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                  }}
                >
                  ADDRESS
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  明仁二代目章魚燒一中店旁（搜尋「愛廣場」）
                </span>
              </div>
            </div>
          </div>

          {/* CTA 按鈕群 */}
          <div
            style={{
              marginTop: '48px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '12px',
            }}
          >
            <a
              href="/#/register"
              style={{
                display: 'block',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%)',
                color: '#FFFFFF',
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: '16px',
                padding: '16px 48px',
                borderRadius: '4px',
                border: 'none',
                boxShadow: '0 2px 20px rgba(204,18,0,0.4)',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, filter 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.filter = 'brightness(1.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.filter = 'brightness(1)'
              }}
            >
              立即報名
            </a>
            <a
              href="https://lin.ee/V4cEC4g"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#06C755',
                color: '#FFFFFF',
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: '16px',
                padding: '16px 48px',
                borderRadius: '4px',
                border: 'none',
                boxShadow: '0 2px 20px rgba(6,199,85,0.3)',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, filter 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.filter = 'brightness(1.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.filter = 'brightness(1)'
              }}
            >
              官方 LINE
            </a>
          </div>
        </motion.div>

        {/* 右側：Google Maps */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            width: '100%',
            height: isMobile ? '300px' : '450px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=愛廣場+臺中市北區一中街&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              filter: 'grayscale(30%) contrast(1.1)',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="活動地點地圖"
          />
        </motion.div>
      </div>
    </section>
  )
}
