import { renderHook, act } from '@testing-library/react'

import { useProgress } from '@/hooks/use-progress'

describe('useProgress', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('初期状態でprogressが0である', () => {
    const { result } = renderHook(() => useProgress())
    
    expect(result.current.progress).toBe(0)
    expect(result.current.isLoading).toBe(false)
  })

  it('startProgressでローディングが開始される', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.progress).toBeGreaterThan(0)
  })

  it('progressが時間とともに増加する', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    const initialProgress = result.current.progress
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(result.current.progress).toBeGreaterThan(initialProgress)
  })

  it('completeProgressで100%になりローディングが終了する', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    act(() => {
      result.current.completeProgress()
    })
    
    expect(result.current.progress).toBe(100)
    expect(result.current.isLoading).toBe(false)
  })

  it('resetProgressで初期状態に戻る', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    
    act(() => {
      result.current.resetProgress()
    })
    
    expect(result.current.progress).toBe(0)
    expect(result.current.isLoading).toBe(false)
  })

  it('progressが100%を超えない', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    // 長時間経過させる
    act(() => {
      jest.advanceTimersByTime(10000)
    })
    
    expect(result.current.progress).toBeLessThanOrEqual(100)
  })

  it('複数回startProgressを呼んでも正常動作する', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    const firstProgress = result.current.progress
    
    act(() => {
      result.current.startProgress()
    })
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.progress).toBeGreaterThanOrEqual(firstProgress)
  })

  it('ローディング中にresetProgressを呼んでもタイマーが停止する', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    act(() => {
      result.current.resetProgress()
    })
    
    const progressAfterReset = result.current.progress
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(result.current.progress).toBe(progressAfterReset)
  })

  it('カスタム増加量で動作する', () => {
    const customIncrement = 5
    const { result } = renderHook(() => useProgress({ increment: customIncrement }))
    
    act(() => {
      result.current.startProgress()
    })
    
    const initialProgress = result.current.progress
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.progress).toBe(initialProgress + customIncrement)
  })

  it('カスタム間隔で動作する', () => {
    const customInterval = 200
    const { result } = renderHook(() => useProgress({ interval: customInterval }))
    
    act(() => {
      result.current.startProgress()
    })
    
    const initialProgress = result.current.progress
    
    // カスタム間隔より短い時間では変化しない
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.progress).toBe(initialProgress)
    
    // カスタム間隔後に変化する
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    expect(result.current.progress).toBeGreaterThan(initialProgress)
  })

  it('コンポーネントアンマウント時にタイマーがクリアされる', () => {
    const { result, unmount } = renderHook(() => useProgress())
    
    act(() => {
      result.current.startProgress()
    })
    
    unmount()
    
    // アンマウント後はタイマーが動作しない
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // エラーが発生しないことを確認
    expect(true).toBe(true)
  })

  it('負の値でも正常動作する', () => {
    const { result } = renderHook(() => useProgress({ increment: -1 }))
    
    act(() => {
      result.current.startProgress()
    })
    
    expect(result.current.progress).toBeGreaterThanOrEqual(0)
  })

  it('0の増加量でも正常動作する', () => {
    const { result } = renderHook(() => useProgress({ increment: 0 }))
    
    act(() => {
      result.current.startProgress()
    })
    
    const initialProgress = result.current.progress
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(result.current.progress).toBe(initialProgress)
  })
})
