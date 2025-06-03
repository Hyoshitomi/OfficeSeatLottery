import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useLottery } from '@/hooks/use-lottery'

// sonnerのモック
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

// fetchのモック
global.fetch = jest.fn()

describe('useLottery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetch.mockClear()
  })

  it('初期状態でresultがnullである', () => {
    const { result } = renderHook(() => useLottery())
    
    expect(result.current.result).toBeNull()
  })

  it('抽選が成功した場合、結果が設定される', async () => {
    const { toast } = require('sonner')
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    const { result } = renderHook(() => useLottery())
    const selectedEmployees = ['EMP001', 'EMP002']
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(selectedEmployees)
    })
    
    expect(executionResult).toBe(true)
    expect(result.current.result).toBeDefined()
    expect(toast.success).toHaveBeenCalledWith('抽選が完了しました！')
    expect(fetch).toHaveBeenCalledWith('/api/lottery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeNumbers: selectedEmployees }),
    })
  })

  it('社員が選択されていない場合、エラーメッセージが表示される', async () => {
    const { toast } = require('sonner')
    const { result } = renderHook(() => useLottery())
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery([])
    })
    
    expect(executionResult).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('社員を選択してください')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('APIエラーレスポンスの場合、エラーハンドリングされる', async () => {
    const { toast } = require('sonner')
    const errorMessage = 'サーバーエラーが発生しました'
    
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: errorMessage })
    })
    
    const { result } = renderHook(() => useLottery())
    const selectedEmployees = ['EMP001']
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(selectedEmployees)
    })
    
    expect(executionResult).toBe(false)
    expect(toast.error).toHaveBeenCalledWith(errorMessage)
  })

  it('APIエラーレスポンスでエラーメッセージがない場合、デフォルトメッセージが表示される', async () => {
    const { toast } = require('sonner')
    
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({})
    })
    
    const { result } = renderHook(() => useLottery())
    const selectedEmployees = ['EMP001']
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(selectedEmployees)
    })
    
    expect(executionResult).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('抽選処理中にエラーが発生しました')
  })

  it('ネットワークエラーの場合、エラーハンドリングされる', async () => {
    const { toast } = require('sonner')
    
    fetch.mockRejectedValueOnce(new Error('Network error'))
    
    const { result } = renderHook(() => useLottery())
    const selectedEmployees = ['EMP001']
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(selectedEmployees)
    })
    
    expect(executionResult).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('抽選処理中にエラーが発生しました')
  })

  it('resetResultで結果がリセットされる', () => {
    const { result } = renderHook(() => useLottery())
    
    // 結果を設定
    act(() => {
      result.current.resetResult()
    })
    
    expect(result.current.result).toBeNull()
  })

  it('複数回の抽選実行でも正常動作する', async () => {
    const { toast } = require('sonner')
    
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    })
    
    const { result } = renderHook(() => useLottery())
    const selectedEmployees = ['EMP001']
    
    // 1回目の抽選
    let firstResult
    await act(async () => {
      firstResult = await result.current.executeLottery(selectedEmployees)
    })
    
    expect(firstResult).toBe(true)
    
    // 結果をリセット
    act(() => {
      result.current.resetResult()
    })
    
    // 2回目の抽選
    let secondResult
    await act(async () => {
      secondResult = await result.current.executeLottery(selectedEmployees)
    })
    
    expect(secondResult).toBe(true)
    expect(toast.success).toHaveBeenCalledTimes(2)
  })

  it('大量の社員選択でも正常動作する', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    const { result } = renderHook(() => useLottery())
    const manyEmployees = Array.from({ length: 100 }, (_, i) => `EMP${String(i).padStart(3, '0')}`)
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(manyEmployees)
    })
    
    expect(executionResult).toBe(true)
    expect(fetch).toHaveBeenCalledWith('/api/lottery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeNumbers: manyEmployees }),
    })
  })

  it('nullの社員配列でもエラーハンドリングされる', async () => {
    const { toast } = require('sonner')
    const { result } = renderHook(() => useLottery())
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(null)
    })
    
    expect(executionResult).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('社員を選択してください')
  })

  it('undefinedの社員配列でもエラーハンドリングされる', async () => {
    const { toast } = require('sonner')
    const { result } = renderHook(() => useLottery())
    
    let executionResult
    await act(async () => {
      executionResult = await result.current.executeLottery(undefined)
    })
    
    expect(executionResult).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('社員を選択してください')
  })

  it('結果のJSX要素が正しく設定される', async () => {
    const mockResult = { winner: 'EMP001', seat: 'A1' }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResult
    })
    
    const { result } = renderHook(() => useLottery())
    
    await act(async () => {
      await result.current.executeLottery(['EMP001', 'EMP002'])
    })
    
    expect(result.current.result).toBeDefined()
    expect(result.current.result.type).toBe(React.Fragment)
    expect(result.current.result.props.children).toContain('抽選が終了しました。')
    expect(result.current.result.props.children).toContain('座席表タブから結果を確認してください。')
  })
  
  
})
