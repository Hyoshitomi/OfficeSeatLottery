import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export function useLottery() {
  const [result, setResult] = useState(null)

  const executeLottery = useCallback(async (selectedEmployees) => {
    if (selectedEmployees.length === 0) {
      toast.error('社員を選択してください')
      return false
    }

    try {
      const res = await fetch('/api/lottery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeNumbers: selectedEmployees }),
      })

      const data = await res.json()

      if (res.ok) {
        setResult(
          <>
            抽選が終了しました。
            <br />
            座席表タブから結果を確認してください。
          </>
        )
        toast.success('抽選が完了しました！')
        return true
      } else {
        toast.error(data.error || '抽選処理中にエラーが発生しました')
        return false
      }
    } catch (error) {
      console.error('抽選処理エラー:', error)
      toast.error('抽選処理中にエラーが発生しました')
      return false
    }
  }, [])

  const resetResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    result,
    executeLottery,
    resetResult
  }
}
