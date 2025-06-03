import { renderHook, act } from '@testing-library/react'
import { useDate } from '@/hooks/use-date'

describe('useDate', () => {
  beforeEach(() => {
    // 固定の日時でテスト
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-06-03T10:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('初期値なしで現在日時が設定される', () => {
    const { result } = renderHook(() => useDate())
    
    expect(result.current.selectedDate).toEqual(new Date('2025-06-03T10:00:00Z'))
  })

  it('初期値ありで指定した日時が設定される', () => {
    const initialDate = new Date('2025-01-01')
    const { result } = renderHook(() => useDate(initialDate))
    
    expect(result.current.selectedDate).toEqual(initialDate)
  })

  it('setSelectedDateで日付を変更できる', () => {
    const { result } = renderHook(() => useDate())
    const newDate = new Date('2025-12-25')
    
    act(() => {
      result.current.setSelectedDate(newDate)
    })
    
    expect(result.current.selectedDate).toEqual(newDate)
  })

  it('getDateStringで正しい日付文字列が取得できる', () => {
    const testDate = new Date('2025-06-03')
    const { result } = renderHook(() => useDate(testDate))
    
    const dateString = result.current.getDateString()
    
    expect(dateString).toBe('2025-06-03')
  })

  it('getDateStringに引数を渡すと指定した日付の文字列が取得できる', () => {
    const { result } = renderHook(() => useDate())
    const testDate = new Date('2025-12-25')
    
    const dateString = result.current.getDateString(testDate)
    
    expect(dateString).toBe('2025-12-25')
  })

  it('setTodayで今日の日付に設定される', () => {
    const oldDate = new Date('2020-01-01')
    const { result } = renderHook(() => useDate(oldDate))
    
    act(() => {
      result.current.setToday()
    })
    
    // 非同期更新を待機
    expect(result.current.selectedDate).toEqual(new Date('2025-06-03T10:00:00Z'))
  })
  
  it('月が1桁の場合に0埋めされる', () => {
    const testDate = new Date('2025-01-05')
    const { result } = renderHook(() => useDate(testDate))
    
    const dateString = result.current.getDateString()
    
    expect(dateString).toBe('2025-01-05')
  })

  it('日が1桁の場合に0埋めされる', () => {
    const testDate = new Date('2025-06-03')
    const { result } = renderHook(() => useDate(testDate))
    
    const dateString = result.current.getDateString()
    
    expect(dateString).toBe('2025-06-03')
  })

  it('年末年始の日付でも正しく処理される', () => {
    const testDate = new Date('2025-12-31')
    const { result } = renderHook(() => useDate(testDate))
    
    const dateString = result.current.getDateString()
    
    expect(dateString).toBe('2025-12-31')
  })

  it('うるう年の日付でも正しく処理される', () => {
    const testDate = new Date('2024-02-29')
    const { result } = renderHook(() => useDate(testDate))
    
    const dateString = result.current.getDateString()
    
    expect(dateString).toBe('2024-02-29')
  })

  it('不正な日付でもエラーが発生しない', () => {
    const invalidDate = new Date('invalid')
    
    expect(() => {
      renderHook(() => useDate(invalidDate))
    }).not.toThrow()
  })

  it('複数回の日付変更でも正常動作する', () => {
    const { result } = renderHook(() => useDate())
    
    const dates = [
      new Date('2025-01-01'),
      new Date('2025-06-15'),
      new Date('2025-12-31')
    ]
    
    dates.forEach(date => {
      act(() => {
        result.current.setSelectedDate(date)
      })
      expect(result.current.selectedDate).toEqual(date)
    })
  })
})
