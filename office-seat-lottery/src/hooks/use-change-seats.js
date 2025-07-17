import { useCallback } from 'react'
import { toast } from 'sonner'

export function useChange() {
  const executeChange = useCallback(async (seatIdA, seatIdB) => {
    if (!seatIdA || !seatIdB) {
      toast.error('交換する社員を選択してください')
      return false
    }

    try {
      const res = await fetch('/api/seats/change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatA: seatIdA, seatB: seatIdB }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('交換が完了しました！')
        return true
      } 
        toast.error(data.error || '交換処理中にエラーが発生しました')
        return false
      
    } catch (_error) {
      toast.error('抽選処理中にエラーが発生しました')
      return false
    }
  }, [])

  return executeChange
}
