import { useState, useRef, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import GradientText from '../components/reactbits/GradientText'
import { submitRegistration } from '../services/registerService'

// ── 注意事項資料 ───────────────────────────────────────────
const NOTICES = [
  {
    icon: '💰',
    title: '報名費用',
    content: 'NT$600／人，完成繳費後取得參賽資格',
  },
  {
    icon: '🎁',
    title: '參賽物資',
    content: '報名即享：T-shirt、毛巾、頭巾、扇子',
  },
  {
    icon: '⚠️',
    title: '重要提醒',
    content: '報名成功後請加入官方LINE索取匯款資訊，報名名額有限請至官方LINE完成報名程序。',
  },
  {
    icon: '📋',
    title: '參賽資格',
    content: '・需年滿18歲\n・現場完成簽到及規則認同書簽署\n・活動當天設有醫護人員待命',
  },
  {
    icon: '⚠️',
    title: '注意事項',
    content: '・名額限30人，額滿截止\n・主辦方審核通過後另行通知繳費',
  },
]

// ── 表單初始值 ─────────────────────────────────────────────
const INITIAL_FORM = {
  name: '',
  lineName: '',
  gender: '',
  birthday: '',
  phone: '',
  email: '',
  emergencyName: '',
  emergencyPhone: '',
  agreed: false,
}

type FormData = typeof INITIAL_FORM

// ── 輸入框共用樣式 ─────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  color: '#FFFFFF',
  fontFamily: "'Noto Sans TC', sans-serif",
  fontSize: '15px',
  padding: '10px 0',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  borderRadius: 0,
}

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#FFFFFF',
  letterSpacing: '2px',
  fontFamily: "'Noto Sans TC', sans-serif",
}

// ── 左側：注意事項 ─────────────────────────────────────────
function NoticePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0 }}
    >
      {/* 小標籤 */}
      <p style={{
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: '11px',
        letterSpacing: '6px',
        color: '#CC1200',
        marginBottom: '16px',
        margin: '0 0 16px 0',
      }}>
        HOW TO JOIN
      </p>

      {/* 主標 */}
      <h2 style={{
        fontFamily: "'Noto Serif TC', serif",
        fontWeight: 900,
        fontSize: 'clamp(24px, 3vw, 40px)',
        letterSpacing: '4px',
        marginBottom: '40px',
        margin: '0 0 40px 0',
      }}>
        <GradientText text="報名注意事項" />
      </h2>

      {/* 列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {NOTICES.map((item) => (
          <div key={item.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* 圖示 + 標題 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: '16px',
                color: '#FFFFFF',
                letterSpacing: '1px',
              }}>
                {item.title}
              </span>
            </div>
            {/* 內容 */}
            <p style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.9,
              paddingLeft: '28px',
              margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── 自訂 Checkbox ──────────────────────────────────────────
function CustomCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      aria-checked={checked}
      role="checkbox"
      style={{
        width: '18px',
        height: '18px',
        border: `1px solid ${checked ? '#CC1200' : 'rgba(255,255,255,0.3)'}`,
        borderRadius: '3px',
        background: checked ? '#CC1200' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

// ── 右側：報名表單 ─────────────────────────────────────────
function RegisterForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const btnControls = useAnimation()
  const birthdayRef = useRef<HTMLInputElement>(null)

  const requiredFilled =
    form.name.trim() !== '' &&
    form.lineName.trim() !== '' &&
    form.gender.trim() !== '' &&
    form.birthday.trim() !== '' &&
    form.phone.trim() !== '' &&
    form.email.trim() !== '' &&
    form.emergencyName.trim() !== '' &&
    form.emergencyPhone.trim() !== '' &&
    form.agreed

  const shake = useCallback(async () => {
    await btnControls.start({
      x: [0, -10, 10, -10, 10, -6, 6, 0],
      transition: { duration: 0.4 },
    })
  }, [btnControls])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!requiredFilled) {
      setErrorMsg('請填寫所有必填欄位並勾選同意聲明')
      await shake()
      return
    }

    setLoading(true)
    try {
      await submitRegistration({
        name: form.name,
        line_name: form.lineName,
        gender: form.gender,
        birthday: form.birthday,
        phone: form.phone,
        email: form.email,
        emergency_name: form.emergencyName,
        emergency_phone: form.emergencyPhone,
        agree: form.agreed,
        pageUrl: window.location.href,
        source: 'website-register',
      })
      setSubmitted(true)
    } catch (error) {
      console.warn(error)
      setErrorMsg('送出失敗，請稍後再試')
      await shake()
    } finally {
      setLoading(false)
    }
  }

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '320px', gap: '32px' }}
      >
        <p style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: '20px',
          color: '#4ADE80',
          letterSpacing: '2px',
          textAlign: 'center',
          lineHeight: 1.8,
          margin: 0,
        }}>
          報名成功！<br />我們將盡快與您聯繫
        </p>
        <a
          href="https://lin.ee/V4cEC4g"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#06C755',
            color: '#FFFFFF',
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '2px',
            padding: '14px 36px',
            borderRadius: '4px',
            textDecoration: 'none',
            boxShadow: '0 2px 16px rgba(6,199,85,0.35)',
            transition: 'transform 0.2s ease, filter 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.filter = 'brightness(1.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.filter = 'brightness(1)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
            <path d="M20 2C10.06 2 2 9.16 2 17.96c0 7.86 6.98 14.44 16.42 15.72.64.14 1.51.42 1.73.96.2.49.13 1.26.06 1.76l-.28 1.66c-.08.49-.38 1.93 1.69 1.05 2.07-.88 11.17-6.58 15.24-11.27C38.66 24.6 38 21.38 38 17.96 38 9.16 29.94 2 20 2z"/>
          </svg>
          加入 LINE 等候通知
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {/* 表單標題 */}
      <h3 style={{
        fontFamily: "'Noto Serif TC', serif",
        fontWeight: 900,
        fontSize: 'clamp(22px, 2.5vw, 32px)',
        color: '#FFFFFF',
        letterSpacing: '3px',
        marginBottom: '32px',
        margin: '0 0 32px 0',
      }}>
        立即報名
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* 01 姓名 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>姓名</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={set('name')}
              className="register-input"
              style={inputStyle}
            />
          </div>

          {/* 02 LINE 名稱 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>LINE 名稱</label>
            <input
              type="text"
              required
              value={form.lineName}
              onChange={set('lineName')}
              className="register-input"
              style={inputStyle}
            />
          </div>

          {/* 02 性別 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>性別</label>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['男', '女', '不公開'].map((g) => (
                <label key={g} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer',
                  fontFamily: "'Noto Sans TC', sans-serif",
                  fontSize: '14px',
                  color: form.gender === g ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                }}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={set('gender')}
                    style={{ accentColor: '#CC1200', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* 生日 */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer' }}
            onClick={() => birthdayRef.current?.showPicker?.()}
          >
            <label style={{ ...labelStyle, cursor: 'pointer' }}>生日</label>
            <div style={{ position: 'relative' }}>
              <input
                ref={birthdayRef}
                type="date"
                value={form.birthday}
                onChange={set('birthday')}
                className="register-input"
                style={{ ...inputStyle, colorScheme: 'dark', cursor: 'pointer', paddingRight: '28px' }}
              />
              {/* 日曆圖示 */}
              <svg
                style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.45 }}
                width="18" height="18" viewBox="0 0 24 24" fill="none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                <path d="M3 9h18" stroke="white" strokeWidth="1.5"/>
                <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* 04 電話 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>電話</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={set('phone')}
              className="register-input"
              style={inputStyle}
            />
          </div>

          {/* 05 Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              className="register-input"
              style={inputStyle}
            />
          </div>

          {/* 06 緊急聯絡人姓名 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>緊急聯絡人姓名</label>
            <input
              type="text"
              required
              value={form.emergencyName}
              onChange={set('emergencyName')}
              className="register-input"
              style={inputStyle}
            />
          </div>

          {/* 07 緊急聯絡人電話 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>緊急聯絡人電話</label>
            <input
              type="tel"
              required
              value={form.emergencyPhone}
              onChange={set('emergencyPhone')}
              className="register-input"
              style={inputStyle}
            />
          </div>

          {/* 聲明四條 */}
          <div style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 2,
            borderLeft: '2px solid rgba(255,255,255,0.1)',
            paddingLeft: '12px',
          }}>
            <p style={{ margin: 0 }}>1. 活動現場設有醫護人員待命</p>
            <p style={{ margin: 0 }}>2. 參賽前需完成現場簽到手續</p>
            <p style={{ margin: 0 }}>3. 參賽前需簽署並認同本次比賽規則</p>
            <p style={{ margin: 0 }}>4. 本人自願參加本次飲食挑戰競賽，並了解相關風險</p>
          </div>

          {/* 08 同意聲明 */}
          <div
            style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}
            onClick={() => setForm((prev) => ({ ...prev, agreed: !prev.agreed }))}
          >
            <CustomCheckbox
              checked={form.agreed}
              onChange={() => setForm((prev) => ({ ...prev, agreed: !prev.agreed }))}
            />
            <p style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '13px',
              color: form.agreed ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
              lineHeight: 1.8,
              margin: 0,
              transition: 'color 0.2s ease',
              userSelect: 'none',
            }}>
              本人自願參加本次飲食挑戰競賽，並了解相關風險，
              同意遵守活動規則及主辦方一切決定
            </p>
          </div>

          {/* 錯誤提示 */}
          {errorMsg && (
            <p style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: '13px',
              color: '#FF6B6B',
              margin: '0',
              letterSpacing: '1px',
            }}>
              ⚠ {errorMsg}
            </p>
          )}

          {/* 送出按鈕 */}
          <motion.button
            type="submit"
            animate={btnControls}
            disabled={loading}
            style={{
              marginTop: '8px',
              width: '100%',
              background: loading
                ? 'rgba(255,255,255,0.1)'
                : 'linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%)',
              color: loading ? 'rgba(255,255,255,0.4)' : '#FFFFFF',
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 700,
              fontSize: '16px',
              padding: '16px',
              borderRadius: '4px',
              border: 'none',
              boxShadow: loading ? 'none' : '0 2px 20px rgba(204,18,0,0.4)',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '2px',
              transition: 'all 0.2s ease',
            }}
            whileHover={loading ? {} : { filter: 'brightness(1.15)' }}
          >
            {loading ? '送出中…' : '送出報名'}
          </motion.button>

        </div>
      </form>
    </motion.div>
  )
}

// ── 主元件 ─────────────────────────────────────────────────
export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{ padding: '120px 24px', background: 'transparent' }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* 桌機：左右兩欄 */}
        <div className="process-grid">
          <NoticePanel />
          <RegisterForm />
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: flex-start;
        }

        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* 底線輸入框 focus 樣式 */
        .register-input:focus {
          border-bottom-color: #CC1200 !important;
        }

        /* iOS 防止自動縮放 */
        @media (max-width: 768px) {
          .register-input {
            font-size: 16px !important;
          }
        }

        /* date input 清除預設樣式 */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) opacity(0.4);
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
