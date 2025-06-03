import { useState, useCallback, useEffect, useRef } from "react"

export function useProgress({ increment = 1, interval = 100 } = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)

  const startProgress = useCallback(() => {
    setIsLoading(true)
    setProgress(Math.max(0, increment)) // 負のincrementの場合は0に設定
    
    // 既存のタイマーをクリア
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // 新しいタイマーを開始
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(timerRef.current)
          timerRef.current = null
          return 100
        }
        return Math.max(0, newProgress) // 負の値を防ぐ
      })
    }, interval)
  }, [increment, interval])

  const completeProgress = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setProgress(100)
    setIsLoading(false)
  }, [])

  const resetProgress = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsLoading(false)
    setProgress(0)
  }, [])

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    isLoading,
    progress,
    startProgress,
    completeProgress,
    resetProgress
  }
}
