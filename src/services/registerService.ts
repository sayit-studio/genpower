const REGISTER_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-register'

export interface RegisterPayload {
  name: string
  line_name: string
  gender: string
  birthday: string
  phone: string
  email: string
  emergency_name: string
  emergency_phone: string
  agree: boolean
  pageUrl: string
  source: 'website-register'
  timestamp: string
}

export async function submitRegistration(payload: Omit<RegisterPayload, 'timestamp'>): Promise<void> {
  const data: RegisterPayload = { ...payload, timestamp: new Date().toISOString() }
  try {
    const res = await fetch(REGISTER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`報名送出失敗 (${res.status})`)
  } catch (e) {
    console.error('submitRegistration error', e)
    throw e
  }
}
