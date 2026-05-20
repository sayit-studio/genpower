/*
 * VotePage.tsx — 投票頁面（改版）
 *
 * ─── Notion DB 欄位建立說明 ─────────────────────────────────────────────────
 *
 * 【選手名單 DB】ID: 366b3ad1d1cd8019bdaec8b1019aca01
 *   欄位名稱    類型              說明
 *   ─────────  ──────────────── ────────────────────────────
 *   選手名稱    Title            Notion 預設標題欄，填選手姓名
 *   選手編號    Number           選手序號（1, 2, 3...）
 *   選手照片    Files & Media    選手頭像，可上傳圖片或貼 URL
 *   目前票數    Number           預設值設為 0，由 n8n workflow 自動 +1
 *
 * 【投票紀錄 DB】ID: 365b3ad1d1cd80e9812cd6c84946407a
 *   欄位名稱      類型   說明
 *   ─────────────  ───── ────────────────────────────
 *   LINE User ID   Text  LINE userId（唯一識別，防重複投票）
 *   LINE 名稱      Text  LINE displayName
 *   LINE 大頭貼    URL   LINE pictureUrl
 *   投票對象       Text  選手名稱字串
 *   投票時間       Date  ISO 8601 時間戳記
 *
 * ─── n8n Workflow 說明（投票送出：POST vote webhook）──────────────────────
 *
 * Node 1 ▸ Webhook（POST）
 *   接收 payload：{ userId, displayName, pictureUrl,
 *                   targetPlayer, targetPlayerId, votedAt }
 *
 * Node 2 ▸ Notion Query（投票紀錄 DB）
 *   Filter: "LINE User ID" equals {{ $json.body.userId }}
 *   確認此 userId 是否已有投票紀錄
 *
 * Node 3 ▸ IF 判斷
 *   Condition: {{ $node["Node2"].json.results.length }} > 0
 *   true（已投票）  → Node 4a
 *   false（未投票） → Node 4b
 *
 * Node 4a ▸ Respond to Webhook
 *   回傳 { success: false, message: "已投票" }
 *
 * Node 4b ▸ Notion Create Page（投票紀錄 DB）
 *   Properties:
 *     LINE User ID = {{ $json.body.userId }}
 *     LINE 名稱    = {{ $json.body.displayName }}
 *     LINE 大頭貼  = {{ $json.body.pictureUrl }}
 *     投票對象     = {{ $json.body.targetPlayer }}
 *     投票時間     = {{ $json.body.votedAt }}
 *
 * Node 5b ▸ Notion Query（選手名單 DB）
 *   Filter: "選手編號" equals {{ $json.body.targetPlayerId }}
 *   取得該選手的 Notion Page ID 與目前票數
 *
 * Node 6b ▸ Notion Update Page（選手名單 DB）
 *   Page ID:  {{ $node["Node5b"].json.results[0].id }}
 *   Property: 目前票數 = {{ $node["Node5b"].json.results[0].properties["目前票數"].number + 1 }}
 *
 * Node 7b ▸ Respond to Webhook
 *   回傳 { success: true, message: "投票成功" }
 *
 * ─── n8n Workflow 說明（選手資料查詢：GET voteResults webhook）────────────
 *
 * Node 1 ▸ Webhook（GET），可選帶入 ?userId=xxx
 *
 * Node 2 ▸ Notion Query All（選手名單 DB）
 *   Sort: 選手編號 ascending
 *   回傳所有選手資料（名稱、編號、照片 URL、目前票數）
 *
 * Node 3 ▸ IF（是否帶入 userId）
 *   若有 → Node 4
 *   若無 → 直接 Respond
 *
 * Node 4 ▸ Notion Query（投票紀錄 DB）
 *   Filter: "LINE User ID" equals {{ $query.userId }}
 *
 * Node 5 ▸ Respond to Webhook
 *   回傳 {
 *     ok: true,
 *     players: [{ id, number, name, photoUrl, votes }],
 *     hasVoted: boolean,
 *     votedTarget: string
 *   }
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleExplosion from '../components/ui/ParticleExplosion'

const VOTE_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-vote'
const VOTE_RESULTS_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-vote-results'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Player {
  id: string        // Notion page ID or 選手編號 string
  number: number    // 選手編號
  name: string      // 選手名稱
  photoUrl?: string // 選手照片 URL（Files & Media first item）
  votes: number     // 目前票數
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

// ─── Constants ──────────────────────────────────────────────────────────────

const LIFF_ID = '2009556470-3qckbElp'

const VOTE_DEADLINE = new Date('2026-07-19T10:00:00+08:00')

const RANK_EMOJI = ['👑', '🥈', '🥉']

// ─── Toast ──────────────────────────────────────────────────────────────────

function Toast({ toast, onDone }: { toast: ToastState; onDone: () => void }) {
  const bgMap: Record<ToastType, string> = {
    success: 'rgba(34,197,94,0.92)',
    error: 'rgba(204,18,0,0.92)',
    info: 'rgba(212,160,23,0.95)',
  }
  const colorMap: Record<ToastType, string> = {
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
        background: bgMap[toast.type],
        color: colorMap[toast.type],
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: 14,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {toast.message}
    </motion.div>
  )
}

// ─── Player Card ─────────────────────────────────────────────────────────────

function RankIcon({ rank }: { rank: number }) {
  const [imgError, setImgError] = useState(false)
  const src = `/assets/icons/rank-0${rank}.png`

  if (imgError) {
    return (
      <span style={{ fontSize: 20, lineHeight: 1 }}>
        {RANK_EMOJI[rank - 1]}
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={`rank-${rank}`}
      width={32}
      height={32}
      style={{ objectFit: 'contain' }}
      onError={() => setImgError(true)}
    />
  )
}

interface PlayerCardProps {
  player: Player
  rank?: number   // 1 | 2 | 3 if top-3
  hasVoted: boolean
  votedTarget: string
  isExpired: boolean
  loading: boolean
  onVote: (player: Player) => void
}

function PlayerCard({ player, rank, hasVoted, votedTarget, isExpired, loading, onVote }: PlayerCardProps) {
  const isPlaceholder = !player.name || player.name === '選手募集中'
  const isVotedThis = hasVoted && votedTarget === player.name
  const isVotedOther = hasVoted && votedTarget !== player.name
  const disabled = isExpired || hasVoted || loading || isPlaceholder

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    background: isVotedThis
      ? 'rgba(212,160,23,0.08)'
      : 'rgba(255,255,255,0.04)',
    aspectRatio: '3/4',
    transition: 'all 0.3s ease',
    opacity: isVotedOther ? 0.5 : 1,
    border: isVotedThis ? '2px solid #D4A017' : '2px solid transparent',
    display: 'flex',
    flexDirection: 'column',
  }

  const btnLabel = isVotedThis
    ? '✓ 已投票'
    : isVotedOther || isExpired
    ? isExpired ? '投票已截止' : '已完成投票'
    : '投 票'

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "'Noto Serif TC', serif",
    fontWeight: 700,
    fontSize: 13,
    transition: 'all 0.2s',
    background: isVotedThis
      ? '#D4A017'
      : isVotedOther || isExpired
      ? 'rgba(255,255,255,0.08)'
      : '#CC1200',
    color: isVotedThis ? '#0D0D0D' : '#FFFFFF',
  }

  return (
    <div style={cardStyle}>
      {/* 選手照片區（70%高度） */}
      <div style={{ position: 'relative', flex: '0 0 70%', overflow: 'hidden' }}>
        {player.photoUrl ? (
          <img
            src={player.photoUrl}
            alt={player.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 48,
              color: 'rgba(204,18,0,0.3)',
            }}>?</span>
          </div>
        )}

        {/* 選手編號（左上） */}
        <div style={{
          position: 'absolute',
          top: 8,
          left: 8,
          fontSize: 11,
          color: 'rgba(212,160,23,0.7)',
          fontFamily: "'Noto Sans TC', sans-serif",
          lineHeight: 1,
        }}>
          {String(player.number).padStart(2, '0')}
        </div>

        {/* 前三名 Icon（右上） */}
        {rank && rank <= 3 && (
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <RankIcon rank={rank} />
          </div>
        )}
      </div>

      {/* 選手資訊區（卡片下方30%） */}
      <div style={{
        flex: '0 0 30%',
        padding: '12px 12px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700,
            fontSize: 13,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: 2,
          }}>
            {isPlaceholder ? '選手募集中' : player.name}
          </div>
          <div style={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 12,
            color: '#D4A017',
          }}>
            {player.votes} 票
          </div>
        </div>
      </div>

      {/* 投票按鈕 */}
      <button
        style={btnStyle}
        disabled={disabled}
        onClick={() => !disabled && onVote(player)}
        onMouseEnter={e => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.2)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.filter = ''
        }}
      >
        {btnLabel}
      </button>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function VotePage() {
  const [lineUser, setLineUser] = useState<LineUser | null>(null)
  const [liffReady, setLiffReady] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [votedTarget, setVotedTarget] = useState('')

  const [players, setPlayers] = useState<Player[]>([])
  const [playersLoading, setPlayersLoading] = useState(true)

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingPlayer, setPendingPlayer] = useState<Player | null>(null)

  const [toasts, setToasts] = useState<ToastState[]>([])
  const toastId = useRef(0)

  const [voteLoading, setVoteLoading] = useState(false)
  const [explosion, setExplosion] = useState(false)

  const isExpired = new Date() > VOTE_DEADLINE

  // ── Toast helpers ────────────────────────────────────────────────────────

  const pushToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── Fetch players from Notion via webhook ────────────────────────────────
  // POST { action: "getResults", userId? }
  // 回傳：[{ playerId, playerName, votes }, ...]

  const fetchPlayers = useCallback(async (userId?: string) => {
    try {
      const res = await fetch(VOTE_RESULTS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getResults', ...(userId ? { userId } : {}) }),
      })
      if (!res.ok) return

      const data = await res.json() as
        | { playerId: string; playerName: string; votes: number; hasVoted?: boolean; votedTarget?: string }[]
        | { players?: { playerId: string; playerName: string; votes: number }[]; hasVoted?: boolean; votedTarget?: string }

      // Normalise: accept both raw array and { players: [...] } envelope
      const items = Array.isArray(data) ? data : (data.players ?? [])
      const meta = Array.isArray(data) ? {} : data

      if (items.length > 0) {
        const sorted = items
          .map((item, idx) => ({
            id: item.playerId,
            number: parseInt(item.playerId, 10) || idx + 1,
            name: item.playerName || '選手募集中',
            photoUrl: undefined as string | undefined,
            votes: item.votes ?? 0,
          }))
          .sort((a, b) => a.number - b.number)
        setPlayers(sorted)
      }

      if (userId && typeof (meta as { hasVoted?: boolean }).hasVoted === 'boolean') {
        setHasVoted((meta as { hasVoted: boolean }).hasVoted)
        setVotedTarget((meta as { votedTarget?: string }).votedTarget ?? '')
      }
    } catch (e) {
      console.error('fetchPlayers error', e)
    }
  }, [])

  // ── LIFF init ────────────────────────────────────────────────────────────

  useEffect(() => {
    import('@line/liff').then(({ default: liff }) => {
      liff.init({ liffId: LIFF_ID })
        .then(async () => {
          if (liff.isLoggedIn()) {
            const p = await liff.getProfile()
            const user: LineUser = {
              userId: p.userId,
              displayName: p.displayName,
              pictureUrl: p.pictureUrl,
            }
            setLineUser(user)
            // Check server-side vote status
            await fetchPlayers(p.userId)
          } else {
            await fetchPlayers()
          }
          setLiffReady(true)
        })
        .catch(async () => {
          // LIFF unavailable (dev / non-LINE browser): fetch players without userId
          await fetchPlayers()
          setLiffReady(true)
        })
    })
  }, [fetchPlayers])

  // ── Initial player load & 30s polling ───────────────────────────────────

  useEffect(() => {
    setPlayersLoading(true)
    // Players are fetched inside LIFF init; mark loading done once liffReady
    if (liffReady) setPlayersLoading(false)
  }, [liffReady])

  useEffect(() => {
    if (!liffReady) return
    const interval = setInterval(() => {
      fetchPlayers(lineUser?.userId)
    }, 30000)
    return () => clearInterval(interval)
  }, [liffReady, lineUser, fetchPlayers])

  // ── Rank calculation ─────────────────────────────────────────────────────

  const rankedPlayers = [...players].sort((a, b) => b.votes - a.votes)
  const rankMap = new Map<string, number>()
  rankedPlayers.forEach((p, i) => rankMap.set(p.id, i + 1))

  // ── Vote flow ────────────────────────────────────────────────────────────

  const handleVote = useCallback((player: Player) => {
    // Step 1: Deadline check
    if (isExpired) {
      pushToast('投票已截止', 'error')
      return
    }

    // Step 2: Login check
    if (!lineUser) {
      setPendingPlayer(player)
      setShowLoginModal(true)
      return
    }

    // Step 3: Duplicate check
    if (hasVoted) {
      pushToast('每個帳號限投一票', 'error')
      return
    }

    submitVote(player)
  }, [isExpired, lineUser, hasVoted]) // eslint-disable-line

  const submitVote = async (player: Player) => {
    if (!lineUser) return
    setVoteLoading(true)

    const payload = {
      userId: lineUser.userId,
      displayName: lineUser.displayName,
      pictureUrl: lineUser.pictureUrl ?? '',
      targetPlayer: player.name,
      targetPlayerId: String(player.number),
      votedAt: new Date().toISOString(),
    }

    try {
      const res = await fetch(VOTE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json() as { success: boolean; message?: string }

      // Step 5: Handle response
      if (data.success) {
        setHasVoted(true)
        setVotedTarget(player.name)
        setExplosion(true)
        setTimeout(() => setExplosion(false), 2500)
        pushToast('投票成功！抽獎資格已取得', 'success')
        // Refresh vote counts
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

  // After login: auto-submit pending vote
  useEffect(() => {
    if (lineUser && pendingPlayer && !hasVoted) {
      const p = pendingPlayer
      setPendingPlayer(null)
      setShowLoginModal(false)
      submitVote(p)
    }
  }, [lineUser]) // eslint-disable-line

  const handleLineLogin = () => {
    import('@line/liff').then(({ default: liff }) => {
      liff.login({ redirectUri: window.location.href })
    })
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', paddingTop: 64 }}>

      {/* Particle Explosion */}
      <ParticleExplosion active={explosion} fullscreen onComplete={() => setExplosion(false)} />

      {/* Toast */}
      <AnimatePresence>
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onDone={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>

      {/* ── LINE Login Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                background: '#111111',
                borderRadius: 4,
                padding: '48px 40px',
                maxWidth: 400,
                width: '90%',
                textAlign: 'center',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowLoginModal(false)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 20,
                  lineHeight: 1,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                ✕
              </button>

              {/* LINE icon */}
              <div style={{ fontSize: 48, marginBottom: 16 }}>
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ display: 'inline-block' }}>
                  <rect width="56" height="56" rx="14" fill="#06C755" />
                  <path
                    d="M47 25.4C47 17.4 39 11 29 11S11 17.4 11 25.4c0 7.2 6.4 13.3 15 14.5.6.1 1.4.4 1.6.9.2.4.1 1.1.1 1.5l-.3 1.6c-.1.4-.4 1.7 1.5.9 1.8-.8 9.9-5.8 13.5-10 2.5-2.7 3.6-5.5 3.6-8.4z"
                    fill="white"
                  />
                  <path
                    d="M40.1 29.5h-4.5a.3.3 0 01-.3-.3v-7a.3.3 0 01.3-.3h4.5a.3.3 0 01.3.3v1.1a.3.3 0 01-.3.3h-3.1v1.1h3.1a.3.3 0 01.3.3v1.1a.3.3 0 01-.3.3h-3.1v1.1h3.1a.3.3 0 01.3.3v1.1a.3.3 0 01-.3.5zM21.2 29.5a.3.3 0 00.3-.3v-1.1a.3.3 0 00-.3-.3h-3.1v-5.6a.3.3 0 00-.3-.3h-1.1a.3.3 0 00-.3.3v7a.3.3 0 00.3.3h4.5zM24.2 21.9h-1.1a.3.3 0 00-.3.3v7a.3.3 0 00.3.3h1.1a.3.3 0 00.3-.3v-7a.3.3 0 00-.3-.3zM33.4 21.9h-1.1a.3.3 0 00-.3.3v4.2l-3.2-4.3-.1-.1h-1.2a.3.3 0 00-.3.3v7a.3.3 0 00.3.3h1.1a.3.3 0 00.3-.3v-4.2l3.2 4.3.1.1h1.2a.3.3 0 00.3-.3v-7a.3.3 0 00-.3-.3z"
                    fill="#06C755"
                  />
                </svg>
              </div>

              <h2 style={{
                fontFamily: "'Noto Serif TC', serif",
                fontWeight: 900,
                fontSize: 22,
                color: '#FFFFFF',
                marginBottom: 12,
              }}>
                登入後即可投票
              </h2>
              <p style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: 14,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 32,
                lineHeight: 1.7,
              }}>
                使用 LINE 帳號登入<br />投票並取得抽獎資格
              </p>

              <button
                onClick={handleLineLogin}
                style={{
                  background: '#06C755',
                  color: '#FFFFFF',
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 48px',
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#05b04b')}
                onMouseLeave={e => (e.currentTarget.style.background = '#06C755')}
              >
                LINE 登入 / Login with LINE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="/assets/hero/hero-bg.mp4"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
        }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '40px 24px' }}>
          <div style={{
            display: 'inline-block',
            background: '#CC1200',
            color: '#FFFFFF',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 4,
            padding: '4px 12px',
            borderRadius: 2,
            marginBottom: 16,
          }}>
            VOTE &amp; WIN
          </div>
          <h1 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#FFFFFF',
            margin: 0,
          }}>
            投票預測冠軍
          </h1>
        </div>
      </section>

      {/* ── 投票說明 ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 4,
          padding: '40px 32px',
        }}>
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 700,
            fontSize: 18,
            color: '#D4A017',
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
            lineHeight: 2.2,
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            <li>・每位 LINE 帳號限投一票，投票後不可更改</li>
            <li>・投票截止時間：2026.07.19 10:00</li>
            <li>・票數即時更新，前三名顯示特殊標示</li>
            <li>・投票即自動取得抽獎資格</li>
            <li>・得獎者於活動當天現場直播抽出</li>
            <li>・得獎通知由官方 LINE 發送</li>
          </ul>
        </div>
      </section>

      {/* ── 投票截止橫幅 ─────────────────────────────────────────────────── */}
      {isExpired && (
        <div style={{
          background: 'rgba(204,18,0,0.15)',
          padding: 16,
          marginBottom: 32,
          textAlign: 'center',
          fontFamily: "'Noto Serif TC', serif",
          color: '#CC1200',
        }}>
          投票已截止 / Voting Closed
        </div>
      )}

      {/* ── 選手名單 ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 80px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block',
            color: '#CC1200',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 6,
            marginBottom: 12,
          }}>
            CHALLENGERS
          </div>
          <h2 style={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: '#FFFFFF',
            margin: 0,
          }}>
            挑戰者名單
          </h2>
        </div>

        {/* Loading state */}
        {playersLoading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🍡</div>
            <p style={{
              fontFamily: "'Noto Sans TC', sans-serif",
              color: 'rgba(255,255,255,0.4)',
              fontSize: 14,
            }}>
              載入中，請稍後…
            </p>
          </div>
        ) : (
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}
            className="vote-grid"
          >
            {players.map(player => {
              const rank = rankMap.get(player.id)
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
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
        )}
      </section>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 1024px) {
          .vote-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .vote-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
