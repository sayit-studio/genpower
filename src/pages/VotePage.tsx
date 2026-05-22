/*
 * VotePage.tsx — 投票頁面
 *
 * ─── Notion DB 欄位建立說明 ─────────────────────────────────────────────────
 *
 * 【選手名單 DB】ID: 366b3ad1d1cd8019bdaec8b1019aca01
 *   選手名稱  → Title（Notion 預設標題欄）
 *   選手編號  → Number（選手序號 1, 2, 3...）
 *   選手照片  → Files & Media（選手頭像）
 *   目前票數  → Number，預設值 0（由 n8n 自動 +1）
 *
 * 【投票紀錄 DB】ID: 365b3ad1d1cd80e9812cd6c84946407a
 *   LINE User ID → Text（唯一識別，防重複投票）
 *   LINE 名稱    → Text
 *   LINE 大頭貼  → URL
 *   投票對象     → Text（選手名稱）
 *   投票時間     → Date（ISO 8601）
 *
 * ─── n8n Workflow（投票送出）────────────────────────────────────────────────
 * Node1 Webhook POST → Node2 Notion Query 投票紀錄 DB（userId filter）
 * → Node3 IF 已投票 → Node4a Respond { success:false, message:"已投票" }
 *                  → Node4b Create 投票紀錄 → Node5b Query 選手名單
 *                    → Node6b Update 目前票數+1 → Node7b Respond { success:true }
 *
 * ─── n8n Workflow（選手查詢）────────────────────────────────────────────────
 * Node1 Webhook POST { action:"getResults", userId? }
 * → Node2 Notion Query All 選手名單 DB（依選手編號 asc）
 * → Node3 IF userId → Node4 Notion Query 投票紀錄 DB
 * → Respond { ok:true, players:[{playerId,playerName,votes}], hasVoted, votedTarget }
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleExplosion from '../components/ui/ParticleExplosion'
import { asset } from '../utils/asset'

// ─── Constants ───────────────────────────────────────────────────────────────

const LIFF_ID = '2009556470-3qckbElp'
const VOTE_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-vote'
const VOTE_RESULTS_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-vote-results'
const VOTE_DEADLINE = new Date('2026-07-19T10:00:00+08:00')
const RANK_EMOJI = ['👑', '🥈', '🥉']

// ─── Types ────────────────────────────────────────────────────────────────────

interface Player {
  id: string
  number: number
  name: string
  photoUrl?: string
  votes: number
}

interface LineUser {
  userId: string
  displayName: string
  pictureUrl?: string
}

type ToastType = 'success' | 'error' | 'info'

interface ToastState {
  id: number
  message: string
  type: ToastType
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ toast, onDone }: { toast: ToastState; onDone: () => void }) {
  const bg: Record<ToastType, string> = {
    success: 'rgba(34,197,94,0.92)',
    error: 'rgba(204,18,0,0.92)',
    info: 'rgba(212,160,23,0.92)',
  }
  const fg: Record<ToastType, string> = {
    success: '#fff',
    error: '#fff',
    info: '#0D0D0D',
  }

  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 300,
        minWidth: 280,
        textAlign: 'center',
        padding: '14px 24px',
        borderRadius: 4,
        background: bg[toast.type],
        color: fg[toast.type],
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: 14,
        letterSpacing: 1,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {toast.message}
    </motion.div>
  )
}

// ─── Rank Icon ────────────────────────────────────────────────────────────────

function RankIcon({ rank }: { rank: number }) {
  const [err, setErr] = useState(false)
  if (err) {
    return (
      <span style={{ fontSize: 24, lineHeight: 1, display: 'block' }}>
        {RANK_EMOJI[rank - 1]}
      </span>
    )
  }
  return (
    <img
      src={asset(`/assets/icons/rank-0${rank}.png`)}
      alt={`rank-${rank}`}
      width={32}
      height={32}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={() => setErr(true)}
    />
  )
}

// ─── Player Card ──────────────────────────────────────────────────────────────

interface PlayerCardProps {
  player: Player
  index: number
  rank?: number
  hasVoted: boolean
  votedTarget: string
  isExpired: boolean
  loading: boolean
  onVote: (player: Player) => void
}

function PlayerCard({ player, index, rank, hasVoted, votedTarget, isExpired, loading, onVote }: PlayerCardProps) {
  const isPlaceholder = !player.name || player.name === '選手募集中'
  const isVotedThis = hasVoted && votedTarget === player.name
  const isVotedOther = hasVoted && !isVotedThis
  const disabled = isExpired || hasVoted || loading || isPlaceholder

  let btnBg: string
  let btnColor: string
  let btnText: string

  if (isVotedThis) {
    btnBg = '#D4A017'
    btnColor = '#0D0D0D'
    btnText = '✓ 已投票'
  } else if (isVotedOther) {
    btnBg = 'rgba(255,255,255,0.08)'
    btnColor = 'rgba(255,255,255,0.3)'
    btnText = '投票已完成'
  } else if (isExpired) {
    btnBg = 'rgba(255,255,255,0.06)'
    btnColor = 'rgba(255,255,255,0.25)'
    btnText = '投票截止'
  } else {
    btnBg = 'linear-gradient(135deg, #CC1200, #8B0000)'
    btnColor = '#FFFFFF'
    btnText = '投　票'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        background: isVotedThis ? 'rgba(212,160,23,0.08)' : 'rgba(255,255,255,0.04)',
        aspectRatio: '3/4',
        transition: 'all 0.3s ease',
        opacity: isVotedOther ? 0.45 : 1,
        pointerEvents: isVotedOther ? 'none' : 'auto',
        ...(isVotedThis ? { border: '2px solid #D4A017' } : {}),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 照片區 70% */}
      <div style={{ position: 'relative', flex: '0 0 70%', overflow: 'hidden' }}>
        {player.photoUrl ? (
          <img
            src={player.photoUrl}
            alt={player.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: "'Noto Serif TC', serif", fontSize: 48, color: 'rgba(204,18,0,0.3)' }}>
              ?
            </span>
          </div>
        )}

        {/* 選手編號（左上） */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          fontFamily: "'Noto Sans TC', sans-serif",
          fontSize: 11, color: 'rgba(212,160,23,0.7)', letterSpacing: 1,
        }}>
          {String(player.number).padStart(2, '0')}
        </div>

        {/* Rank Icon（右上） */}
        {rank && rank <= 3 && (
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <RankIcon rank={rank} />
          </div>
        )}
      </div>

      {/* 資訊區 30% */}
      <div style={{
        flex: '0 0 30%',
        padding: '12px 12px 0',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ marginBottom: 4 }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700, fontSize: 14, letterSpacing: 1,
            color: isPlaceholder ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {isPlaceholder ? '選手募集中' : player.name}
          </div>
          <div style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 12, color: '#D4A017', marginTop: 4,
          }}>
            {player.votes} 票
          </div>
        </div>
      </div>

      {/* 投票按鈕 */}
      <button
        disabled={disabled}
        onClick={() => !disabled && onVote(player)}
        onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.2)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = '' }}
        style={{
          width: '100%', padding: '10px 0',
          border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: "'Noto Serif TC', serif",
          fontWeight: 700, fontSize: 13, letterSpacing: 2,
          transition: 'all 0.2s ease',
          background: btnBg, color: btnColor,
        }}
      >
        {btnText}
      </button>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VotePage() {
  const [lineUser, setLineUser] = useState<LineUser | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [votedTarget, setVotedTarget] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const [toasts, setToasts] = useState<ToastState[]>([])
  const [voteLoading, setVoteLoading] = useState(false)
  const [explosion, setExplosion] = useState(false)
  const toastId = useRef(0)

  const isExpired = new Date() > VOTE_DEADLINE

  // ── Toast ──────────────────────────────────────────────────────────────────

  const pushToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── Fetch players ─────────────────────────────────────────────────────────
  // POST { action:"getResults", userId? }
  // 回傳：[{ playerId, playerName, votes }] または { players:[...], hasVoted, votedTarget }

  const fetchPlayers = useCallback(async (userId?: string) => {
    try {
      const url = new URL(VOTE_RESULTS_WEBHOOK)
      url.searchParams.set('action', 'getResults')
      if (userId) url.searchParams.set('userId', userId)
      const res = await fetch(url.toString())
      if (!res.ok) return

      const data = await res.json() as
        | { playerId: string; playerName: string; votes: number }[]
        | { players?: { playerId: string; playerName: string; votes: number }[]; hasVoted?: boolean; votedTarget?: string }

      const items = Array.isArray(data) ? data : (data.players ?? [])
      const meta = Array.isArray(data) ? {} : data

      if (items.length > 0) {
        setPlayers(
          items
            .map((item, idx) => ({
              id: item.playerId,
              number: parseInt(item.playerId, 10) || idx + 1,
              name: item.playerName || '選手募集中',
              photoUrl: undefined as string | undefined,
              votes: item.votes ?? 0,
            }))
            .sort((a, b) => a.number - b.number)
        )
      }

      if (userId && typeof (meta as { hasVoted?: boolean }).hasVoted === 'boolean') {
        setHasVoted((meta as { hasVoted: boolean }).hasVoted)
        setVotedTarget((meta as { votedTarget?: string }).votedTarget ?? '')
      }
    } catch (e) {
      console.error('fetchPlayers error', e)
    }
  }, [])

  // ── LIFF init ──────────────────────────────────────────────────────────────

  useEffect(() => {
    import('@line/liff').then(({ default: liff }) => {
      liff.init({ liffId: LIFF_ID })
        .then(async () => {
          if (liff.isLoggedIn()) {
            const p = await liff.getProfile()
            setLineUser({ userId: p.userId, displayName: p.displayName, pictureUrl: p.pictureUrl })
            await fetchPlayers(p.userId)
          } else {
            await fetchPlayers()
          }
        })
        .catch(async () => {
          await fetchPlayers()
        })
    })
  }, [fetchPlayers])

  // ── 30s polling ────────────────────────────────────────────────────────────

  useEffect(() => {
    const interval = setInterval(() => fetchPlayers(lineUser?.userId), 30000)
    return () => clearInterval(interval)
  }, [lineUser, fetchPlayers])

  // ── Rank map ───────────────────────────────────────────────────────────────

  const rankMap = new Map<string, number>()
  ;[...players].sort((a, b) => b.votes - a.votes).forEach((p, i) => rankMap.set(p.id, i + 1))

  // ── Vote ───────────────────────────────────────────────────────────────────

  const handleVote = useCallback((player: Player) => {
    if (isExpired) { pushToast('投票已截止', 'error'); return }

    // 未登入 → 直接進入 LIFF 登入
    if (!lineUser) {
      import('@line/liff').then(({ default: liff }) => {
        liff.login({ redirectUri: window.location.href })
      })
      return
    }

    if (hasVoted) { pushToast('每個帳號限投一票', 'error'); return }

    submitVote(player)
  }, [isExpired, lineUser, hasVoted]) // eslint-disable-line

  const submitVote = async (player: Player) => {
    if (!lineUser) return
    setVoteLoading(true)
    try {
      const res = await fetch(VOTE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: lineUser.userId,
          displayName: lineUser.displayName,
          pictureUrl: lineUser.pictureUrl ?? '',
          targetPlayer: player.name,
          targetPlayerId: String(player.number),
          votedAt: new Date().toISOString(),
        }),
      })
      const data = await res.json() as { success: boolean; message?: string }
      if (data.success) {
        setHasVoted(true)
        setVotedTarget(player.name)
        setExplosion(true)
        setTimeout(() => setExplosion(false), 2500)
        pushToast('投票成功！抽獎資格已取得', 'success')
        await fetchPlayers(lineUser.userId)
      } else {
        pushToast(data.message ?? '投票失敗，請重試', 'error')
      }
    } catch (e) {
      pushToast(e instanceof Error ? e.message : '投票失敗，請重試', 'error')
    } finally {
      setVoteLoading(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingTop: 64 }}>

      <ParticleExplosion active={explosion} fullscreen onComplete={() => setExplosion(false)} />

      {/* Toast */}
      <AnimatePresence>
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onDone={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '40vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src={asset('/assets/hero/hero-bg.mp4')}
        />
        {/* 遮罩：整體暗化 */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
        {/* 底部漸層融入頁面底色 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0D0D0D 0%, transparent 50%)',
        }} />

        {/* 文字 */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: 11,
              letterSpacing: 6,
              color: '#CC1200',
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            VOTE &amp; WIN
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: '#FFFFFF',
              letterSpacing: 4,
              margin: 0,
            }}
          >
            投票預測冠軍
          </motion.h1>
        </div>
      </section>

      {/* ── 投票說明 ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 4,
            padding: '48px 40px',
          }}
        >
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700,
            fontSize: 18,
            color: '#D4A017',
            letterSpacing: 3,
            marginBottom: 24,
            marginTop: 0,
          }}>
            投票說明
          </h2>
          <ul style={{
            textAlign: 'left',
            display: 'inline-block',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 2.4,
            listStyle: 'none',
            padding: 0,
            margin: '0 0 32px',
          }}>
            <li>・每位 LINE 帳號限投一票</li>
            <li>・投票截止時間：2026.07.19 10:00</li>
            <li>・投票結果於當日活動後直播抽出</li>
          </ul>

          {/* IG 按鈕 */}
          <div>
            <a
              href="https://www.instagram.com/takoyaki.tw/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                color: '#FFFFFF',
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 2,
                borderRadius: 4,
                textDecoration: 'none',
                transition: 'filter 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.15)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.filter = ''}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              關注 IG 掌握即時得獎資訊
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 選手名單 ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              fontSize: 11,
              letterSpacing: 6,
              color: '#CC1200',
              fontWeight: 700,
              marginBottom: 16,
            }}>
              CHALLENGERS
            </div>
            <h2 style={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: '#FFFFFF',
              letterSpacing: 4,
              margin: 0,
            }}>
              挑戰者名單
            </h2>
          </div>

          {/* 投票截止橫幅 */}
          {isExpired && (
            <div style={{
              background: 'rgba(204,18,0,0.12)',
              padding: 16,
              textAlign: 'center',
              marginBottom: 32,
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 16,
              color: '#CC1200',
              letterSpacing: 3,
            }}>
              投票已截止 Voting Closed
            </div>
          )}

          {/* 選手網格 */}
          <div className="vote-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}>
            {players.map((player, index) => {
              const rank = rankMap.get(player.id)
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  index={index}
                  rank={rank && rank <= 3 ? rank : undefined}
                  hasVoted={hasVoted}
                  votedTarget={votedTarget}
                  isExpired={isExpired}
                  loading={voteLoading}
                  onVote={handleVote}
                />
              )
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .vote-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 768px)  { .vote-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; } }
      `}</style>
    </div>
  )
}
