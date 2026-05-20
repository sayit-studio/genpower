import { useState } from 'react'
import { submitVote, type VotePayload } from '../services/voteService'

interface UseVoteReturn {
  voted: boolean
  votedId: string | null
  loading: boolean
  error: string | null
  vote: (payload: VotePayload) => Promise<void>
}

export function useVote(): UseVoteReturn {
  const [voted, setVoted] = useState(() => Boolean(localStorage.getItem('takoyaki_vote_target_id')))
  const [votedId, setVotedId] = useState<string | null>(() => localStorage.getItem('takoyaki_vote_target_id'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const vote = async (payload: VotePayload) => {
    setLoading(true)
    setError(null)
    try {
      const result = await submitVote(payload)
      if (result.success) {
        localStorage.setItem('takoyaki_vote_target_id', payload.targetPlayerId)
        setVoted(true)
        setVotedId(payload.targetPlayerId)
      } else {
        setError(result.message ?? '投票失敗，請重試')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '投票失敗，請重試')
    } finally {
      setLoading(false)
    }
  }

  return { voted, votedId, loading, error, vote }
}
