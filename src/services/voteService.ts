const VOTE_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-vote'
const VOTE_RESULTS_WEBHOOK = 'https://drwu.zeabur.app/webhook/takoyaki-vote-results'

export interface VotePayload {
  userId: string
  displayName?: string
  pictureUrl?: string
  targetPlayer: string
  targetPlayerId: string
  votedAt: string
}

export interface VoteResultItem {
  playerId: string
  playerName: string
  votes: number
}

export async function submitVote(payload: VotePayload): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(VOTE_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`投票送出失敗 (${res.status})`)
    return await res.json() as { success: boolean; message?: string }
  } catch (e) {
    console.error('submitVote error', e)
    throw e
  }
}

export async function fetchVoteResults(userId?: string): Promise<VoteResultItem[]> {
  try {
    const res = await fetch(VOTE_RESULTS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getResults', ...(userId ? { userId } : {}) }),
    })
    if (!res.ok) throw new Error(`投票結果讀取失敗 (${res.status})`)
    return await res.json() as VoteResultItem[]
  } catch (e) {
    console.error('fetchVoteResults error', e)
    throw e
  }
}
