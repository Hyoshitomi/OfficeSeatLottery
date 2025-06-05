import { renderHook, act } from '@testing-library/react'

import { useSeats } from '@/hooks/use-seat'

// sonnerのモック
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

// fetchのモック
global.fetch = jest.fn()

describe('useSeats', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetch.mockClear()
  })

  it('初期状態で空の座席リストが設定される', () => {
    const { result } = renderHook(() => useSeats())
    
    expect(result.current.boxes).toEqual([])
    expect(result.current.imgSize).toEqual({ width: 0, height: 0 })
  })

  it('座席データを取得できる', async () => {
    const mockSeats = [
      { seatId: 'seat-1', name: '田中太郎', status: 1, imageX: 100, imageY: 200 },
      { seatId: 'seat-2', name: '佐藤花子', status: 2, imageX: 300, imageY: 400 }
    ]
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSeats
    })
    
    const { result } = renderHook(() => useSeats())
    
    await act(async () => {
      await result.current.fetchSeats('/api/seats')
    })
    
    expect(result.current.boxes).toHaveLength(2)
    expect(fetch).toHaveBeenCalledWith('/api/seats')
  })

  it('座席を追加できる', () => {
    const { result } = renderHook(() => useSeats())
    
    act(() => {
      result.current.addBox('テーブル', { width: 800, height: 600 })
    })
    
    expect(result.current.boxes).toHaveLength(1)
    expect(result.current.boxes[0].name).toBe('テーブル1')
  })

  it('座席を更新できる', () => {
    const { result } = renderHook(() => useSeats())
    
    act(() => {
      result.current.addBox('テーブル', { width: 800, height: 600 })
    })
    
    const seatId = result.current.boxes[0].id
    
    act(() => {
      result.current.updateBox(seatId, { name: '佐藤花子', status: 'fixed', x: 300, y: 400 })
    })
    
    const updatedSeat = result.current.boxes.find(box => box.id === seatId)
    expect(updatedSeat.name).toBe('佐藤花子')
    expect(updatedSeat.status).toBe('fixed')
    expect(updatedSeat.x).toBe(300)
    expect(updatedSeat.y).toBe(400)
  })

  it('座席を削除できる', () => {
    const { result } = renderHook(() => useSeats())
    
    act(() => {
      result.current.addBox('テーブル', { width: 800, height: 600 })
    })
    
    expect(result.current.boxes).toHaveLength(1)
    
    const seatId = result.current.boxes[0].id
    
    act(() => {
      result.current.deleteBox(seatId)
    })
    
    expect(result.current.boxes).toHaveLength(0)
  })

  it('座席データを保存できる', async () => {
    const { toast } = require('sonner')
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    const { result } = renderHook(() => useSeats())
    
    act(() => {
      result.current.addBox('テーブル', { width: 800, height: 600 })
    })
    
    await act(async () => {
      await result.current.saveSeats(result.current.boxes)
    })
    
    expect(fetch).toHaveBeenCalledWith('/api/seats/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ boxes: result.current.boxes })
    })
    expect(toast.success).toHaveBeenCalledWith('保存しました！')
  })

  it('座席の解放ができる', async () => {
    const { toast } = require('sonner')
    
    fetch.mockResolvedValueOnce({
      ok: true
    })
    
    const { result } = renderHook(() => useSeats())
    
    act(() => {
      result.current.addBox('テーブル', { width: 800, height: 600 })
    })
    
    const seatId = result.current.boxes[0].id
    
    await act(async () => {
      await result.current.exitSeat(seatId)
    })
    
    expect(result.current.boxes).toHaveLength(0)
    expect(toast.success).toHaveBeenCalledWith('席を解放しました')
  })
})
