import { useEffect, useState } from 'react'
import { CONFIG } from '../constants/config'

interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
}

interface UseLiffReturn {
  ready: boolean
  loggedIn: boolean
  isFriend: boolean | null
  profile: LiffProfile | null
  login: () => void
  error: string | null
}

export function useLiff(): UseLiffReturn {
  const [ready, setReady] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isFriend, setIsFriend] = useState<boolean | null>(null)
  const [profile, setProfile] = useState<LiffProfile | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!CONFIG.LIFF.id) {
      setReady(true)
      setError('LIFF ID 尚未設定')
      return
    }
    import('@line/liff').then(({ default: liff }) => {
      liff.init({ liffId: CONFIG.LIFF.id })
        .then(async () => {
          if (liff.isLoggedIn()) {
            setLoggedIn(true)
            const p = await liff.getProfile()
            setProfile({ userId: p.userId, displayName: p.displayName, pictureUrl: p.pictureUrl })
            try {
              const friendship = await liff.getFriendship()
              setIsFriend(friendship.friendFlag)
            } catch {
              setIsFriend(null)
            }
          }
          setReady(true)
        })
        .catch((e: Error) => { setReady(true); setError(e.message) })
    })
  }, [])

  const login = () => {
    import('@line/liff').then(({ default: liff }) => liff.login({ redirectUri: window.location.href }))
  }

  return { ready, loggedIn, isFriend, profile, login, error }
}
