import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlurText from '../components/reactbits/BlurText'
import ShinyText from '../components/reactbits/ShinyText'
import SplitText from '../components/reactbits/SplitText'
import ParticleExplosion from '../components/ui/ParticleExplosion'
import { submitRegistration } from '../services/registerService'
import { CONFIG } from '../constants/config'
import { asset } from '../utils/asset'

const GENDERS = ['男', '女', '不公開']
const DECLARATIONS = [
  '活動現場設有醫護人員待命',
  '參賽前需完成現場簽到手續',
  '參賽前需簽署並認同本次比賽規則',
  '本人自願參加本次飲食挑戰競賽，並了解相關風險',
]
const ACCORDIONS = [
  { title: '醫護安全', content: '活動現場全程配置專業醫護人員待命，確保參賽者安全。如感不適，請立即舉手示意。' },
  { title: '報到流程', content: '請於活動當天上午 8:30 前完成現場簽到，並出示報名確認信。逾時視同棄權。' },
  { title: '規則認同', content: '參賽前需於現場簽署規則認同書，同意遵守所有比賽規則與裁判判定。' },
  { title: '風險須知', content: '本活動為飲食挑戰，參賽者需充分了解相關健康風險並自願參加。有相關病史者請謹慎評估。' },
]

const PHONE_RE = /^09\d{8}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizePhone(v: string) {
  return v.replace(/[-\s]/g, '')
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '', line_name: '', gender: '', birthday: '', phone: '', email: '',
    emergency_name: '', emergency_phone: '', agree: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shake, setShake] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = '請輸入姓名'
    if (!form.line_name.trim()) e.line_name = '請輸入 LINE 名稱'
    if (!form.gender) e.gender = '請選擇性別'
    if (!form.birthday) e.birthday = '請選擇生日'

    if (!form.phone.trim()) {
      e.phone = '請輸入聯絡電話'
    } else if (!PHONE_RE.test(normalizePhone(form.phone))) {
      e.phone = '格式不正確，請輸入 09 開頭 10 位數字'
    }

    if (!form.email.trim()) {
      e.email = '請輸入 Email'
    } else if (!EMAIL_RE.test(form.email.trim())) {
      e.email = 'Email 格式不正確'
    }

    if (!form.emergency_name.trim()) e.emergency_name = '請輸入緊急聯絡人姓名'
    if (!form.emergency_phone.trim()) {
      e.emergency_phone = '請輸入緊急聯絡人電話'
    } else if (!PHONE_RE.test(normalizePhone(form.emergency_phone))) {
      e.emergency_phone = '格式不正確，請輸入 09 開頭 10 位數字'
    }

    if (!form.agree) e.agree = '請同意以上事項'
    return e
  }

  const clearError = (field: string) =>
    setErrors(er => { const n = { ...er }; delete n[field]; return n })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setShake(true)
      setTimeout(() => setShake(false), 600)
      // scroll to first error field
      const firstKey = Object.keys(errs)[0]
      const el = formRef.current?.querySelector(`[data-field="${firstKey}"]`) as HTMLElement | null
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitting(true)
    try {
      await submitRegistration({
        ...form,
        pageUrl: window.location.href,
        source: 'website-register',
      })
      setSuccess(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : '送出失敗，請稍後再試'
      setSubmitError(msg)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    } finally {
      setSubmitting(false)
    }
  }

  const hasErr = (field: string) => !!errors[field]
  const inputClass = (field: string) =>
    `w-full px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-white/35 ${
      hasErr(field) ? 'bg-brand-red/8' : 'bg-white/4 focus:bg-white/7'
    }`
  const inputStyle = (field: string): React.CSSProperties => ({
    borderBottom: hasErr(field)
      ? '1px solid #CC1200'
      : '1px solid rgba(255,255,255,0.12)',
  })

  return (
    <div className="min-h-screen bg-brand-dark pt-16">
      {/* Particle explosion on success */}
      <ParticleExplosion active={success} fullscreen onComplete={() => {}} />

      {/* Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-black/90 flex flex-col items-center justify-center gap-6"
          >
            <div className="text-6xl">🎉</div>
            <h2 className="font-serif text-4xl font-black text-brand-gold">
              <SplitText text="報名成功！" stagger={0.12} />
            </h2>
            <p className="text-white/70 text-center max-w-sm">
              感謝您的報名！主辦方將於近期與您聯絡確認資格。
              <br />今天的你，已踏上成為王者的第一步！
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0 })}
              className="text-brand-gold px-6 py-3 font-bold font-serif transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: '0 0 24px rgba(212,160,23,0.25), inset 0 -2px 0 #D4A017' }}
            >
              返回首頁
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner */}
      <section className="relative py-16 bg-black" style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <img
            src={asset('/assets/logo/event-logo-text.svg')}
            alt="TAKOYAKI BATTLE"
            className="h-20 object-contain mx-auto mb-4"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <h1 className="font-serif text-3xl md:text-5xl font-black text-white mb-4">
            <BlurText text="選手報名" delay={0.2} />
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <span>📅 報名期間：2026/06/22 ～ 07/10</span>
            <span>👥 名額：{CONFIG.EVENT.totalSlots} 人（先到先得）</span>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-brand-blue/20 py-3" style={{ boxShadow: '0 1px 0 rgba(26,42,108,0.4)' }}>
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm">
          <span className="text-white/70">📅 {CONFIG.EVENT.dateDisplay}</span>
          <span className="text-white/70">📍 {CONFIG.EVENT.venue}</span>
          <span className="text-brand-gold font-bold">
            <ShinyText text={`💰 報名費 NT$ ${CONFIG.EVENT.fee}`} className="text-brand-gold font-bold" />
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Fee includes */}
        <div className="mb-10 p-6 bg-black" style={{ boxShadow: '0 2px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
          <h3 className="font-bold text-white mb-4">✦ 報名費包含</h3>
          <div className="grid grid-cols-3 gap-4">
            {CONFIG.MERCH.filter(m => m.included).map(m => (
              <div key={m.name} className="text-center">
                <div className="w-16 h-16 bg-white/5 mx-auto mb-2 flex items-center justify-center" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}>
                  <img
                    src={asset(m.image)}
                    alt={m.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <p className="text-white/60 text-xs">{m.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="mb-10">
          <h3 className="font-bold text-white mb-4">✦ 注意事項</h3>
          <div className="flex flex-col gap-2">
            {ACCORDIONS.map((item, i) => (
              <div key={i} style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.3)', background: 'rgba(255,255,255,0.02)' }}>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                >
                  <span>{item.title}</span>
                  <span className={`transition-transform duration-200 ${openAccordion === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <AnimatePresence>
                  {openAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-white/60 text-sm leading-relaxed">{item.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          animate={shake ? { x: [-6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-5"
        >
          <h3 className="font-bold text-white text-xl">✦ 報名表單</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div data-field="name">
              <label className="text-white/60 text-xs mb-1 block">姓名 *</label>
              <input type="text" className={inputClass('name')} style={inputStyle('name')} value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); clearError('name') }}
                placeholder="請輸入真實姓名" />
              {errors.name && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.name}</p>}
            </div>
            <div data-field="line_name">
              <label className="text-white/60 text-xs mb-1 block">LINE 名稱 *</label>
              <input type="text" className={inputClass('line_name')} style={inputStyle('line_name')} value={form.line_name}
                onChange={e => { setForm(f => ({ ...f, line_name: e.target.value })); clearError('line_name') }}
                placeholder="請輸入 LINE 顯示名稱" />
              {errors.line_name && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.line_name}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div data-field="gender">
              <label className="text-white/60 text-xs mb-1 block">性別 *</label>
              <div className="flex gap-3">
                {GENDERS.map(g => (
                  <label key={g}
                    className={`flex-1 text-center py-3 cursor-pointer text-sm transition-all ${form.gender === g ? 'bg-brand-red/15 text-white' : 'text-white/60 hover:text-white/80'}`}
                    style={{ boxShadow: form.gender === g ? 'inset 0 -2px 0 #CC1200' : hasErr('gender') ? 'inset 0 -1px 0 #CC1200' : 'inset 0 -1px 0 rgba(255,255,255,0.1)' }}
                  >
                    <input type="radio" name="gender" value={g} className="sr-only"
                      onChange={() => { setForm(f => ({ ...f, gender: g })); clearError('gender') }} />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.gender}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div data-field="birthday">
              <label className="text-white/60 text-xs mb-1 block">生日 *</label>
              <input type="date" className={inputClass('birthday')} style={inputStyle('birthday')} value={form.birthday}
                onChange={e => { setForm(f => ({ ...f, birthday: e.target.value })); clearError('birthday') }} />
              {errors.birthday && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.birthday}</p>}
            </div>
            <div data-field="phone">
              <label className="text-white/60 text-xs mb-1 block">聯絡電話 *</label>
              <input type="tel" className={inputClass('phone')} style={inputStyle('phone')} value={form.phone}
                onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); clearError('phone') }}
                placeholder="0912345678" />
              {errors.phone && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.phone}</p>}
            </div>
          </div>

          <div data-field="email">
            <label className="text-white/60 text-xs mb-1 block">Email *</label>
            <input type="email" className={inputClass('email')} style={inputStyle('email')} value={form.email}
              onChange={e => { setForm(f => ({ ...f, email: e.target.value })); clearError('email') }}
              placeholder="your@email.com" />
            {errors.email && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.email}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div data-field="emergency_name">
              <label className="text-white/60 text-xs mb-1 block">緊急聯絡人姓名 *</label>
              <input type="text" className={inputClass('emergency_name')} style={inputStyle('emergency_name')} value={form.emergency_name}
                onChange={e => { setForm(f => ({ ...f, emergency_name: e.target.value })); clearError('emergency_name') }}
                placeholder="緊急聯絡人" />
              {errors.emergency_name && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.emergency_name}</p>}
            </div>
            <div data-field="emergency_phone">
              <label className="text-white/60 text-xs mb-1 block">緊急聯絡人電話 *</label>
              <input type="tel" className={inputClass('emergency_phone')} style={inputStyle('emergency_phone')} value={form.emergency_phone}
                onChange={e => { setForm(f => ({ ...f, emergency_phone: e.target.value })); clearError('emergency_phone') }}
                placeholder="0912345678" />
              {errors.emergency_phone && <p className="text-xs mt-1" style={{ color: '#CC1200' }}>{errors.emergency_phone}</p>}
            </div>
          </div>

          {/* Declaration */}
          <div data-field="agree" className="p-5" style={{ boxShadow: hasErr('agree') ? 'inset 0 -2px 0 #CC1200, 0 2px 30px rgba(204,18,0,0.08)' : 'inset 0 -1px 0 rgba(255,255,255,0.08), 0 2px 30px rgba(0,0,0,0.3)', background: 'rgba(255,255,255,0.02)' }}>
            <h4 className="text-white font-bold text-sm mb-4">本人已詳閱並同意以下事項：</h4>
            <ul className="flex flex-col gap-2">
              {DECLARATIONS.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                  <motion.span
                    className="mt-0.5 text-brand-gold flex-shrink-0"
                    animate={form.agree ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ delay: i * 0.1 }}
                  >
                    {form.agree ? '✓' : '○'}
                  </motion.span>
                  {d}
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <div
                className={`w-5 h-5 flex items-center justify-center transition-all cursor-pointer ${form.agree ? 'bg-brand-red' : 'bg-white/8'}`}
                style={{ boxShadow: form.agree ? '0 0 12px rgba(204,18,0,0.4)' : 'inset 0 0 0 1px rgba(255,255,255,0.25)' }}
                onClick={() => { setForm(f => ({ ...f, agree: !f.agree })); clearError('agree') }}
              >
                {form.agree && (
                  <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
                    width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                    <motion.path d="M1.5 6L5 9.5L10.5 2.5" />
                  </motion.svg>
                )}
              </div>
              <input type="checkbox" className="sr-only" checked={form.agree}
                onChange={() => { setForm(f => ({ ...f, agree: !f.agree })); clearError('agree') }} />
              <span className="text-sm text-white/70">我已閱讀並同意以上所有事項</span>
            </label>
            {errors.agree && <p className="text-xs mt-2" style={{ color: '#CC1200' }}>{errors.agree}</p>}
          </div>

          {/* 送出失敗訊息 */}
          {submitError && (
            <div className="px-4 py-3 text-sm text-center" style={{ background: 'rgba(204,18,0,0.1)', border: '1px solid rgba(204,18,0,0.3)', color: '#CC1200' }}>
              {submitError}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full py-4 font-bold font-serif text-lg rounded-sm transition-all duration-200 ${
              submitting
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : 'bg-brand-red text-brand-gold hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]'
            }`}
            style={submitting ? {} : { boxShadow: '0 4px 24px rgba(204,18,0,0.35)' }}
          >
            {submitting ? '送出中...' : '確認送出報名'}
          </motion.button>

          <p className="text-white/30 text-xs text-center">
            送出後請等候主辦方確認通知，報名即代表同意活動規章。
          </p>
        </motion.form>
      </div>
    </div>
  )
}
