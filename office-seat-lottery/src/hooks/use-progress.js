import { useState, useCallback } from "react"

export function useProgress() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const startProgress = useCallback(() => {
    setIsLoading(true)
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 95) return Math.min(prev + Math.random() * 5, 95)
        return prev
      })
    }, 100)
    return timer
  }, [])

  const completeProgress = useCallback((timer) => {
    clearInterval(timer)
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }, [])

  const resetProgress = useCallback(() => {
    setIsLoading(false)
    setProgress(0)
  }, [])

  return {
    isLoading,
    progress,
    startProgress,
    completeProgress,
    resetProgress
  }
}
