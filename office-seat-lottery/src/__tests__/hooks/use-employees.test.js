import { renderHook, waitFor, act } from '@testing-library/react'
import { useEmployees } from '@/hooks/use-employees'

// sonnerのモック
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn()
  }
}))

// fetchのモック
global.fetch = jest.fn()

describe('useEmployees', () => {
  let consoleSpy

  beforeEach(() => {
    jest.clearAllMocks()
    fetch.mockClear()
    // console.errorをモック化
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('管理者でない場合、自分の社員番号が設定される', () => {
    const user = {
      adminFlag: false,
      employeeNumber: 'EMP001'
    }
    
    const { result } = renderHook(() => useEmployees(user))
    
    expect(result.current.selectedEmployees).toEqual(['EMP001'])
    expect(result.current.isAdmin).toBe(false)
  })

  it('管理者の場合、社員リストを取得する', async () => {
    const mockEmployees = [
      { value: 'EMP001', label: '田中太郎' },
      { value: 'EMP002', label: '佐藤花子' }
    ]
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEmployees
    })
    
    const user = {
      adminFlag: true,
      employeeNumber: 'EMP001'
    }
    
    const { result } = renderHook(() => useEmployees(user))
    
    await waitFor(() => {
      expect(result.current.employeeList).toEqual(mockEmployees)
    })
    
    expect(result.current.isAdmin).toBe(true)
    expect(fetch).toHaveBeenCalledWith('/api/user')
  })

  it('社員リスト取得に失敗した場合、エラーハンドリングされる', async () => {
    const { toast } = require('sonner')
    
    fetch.mockResolvedValueOnce({
      ok: false
    })
    
    const user = {
      adminFlag: true,
      employeeNumber: 'EMP001'
    }
    
    const { result } = renderHook(() => useEmployees(user))
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('社員リストの取得に失敗しました')
    })
    
    expect(result.current.employeeList).toEqual([])
  })

  it('ネットワークエラーの場合、エラーハンドリングされる', async () => {
    const { toast } = require('sonner')
    
    fetch.mockRejectedValueOnce(new Error('Network error'))
    
    const user = {
      adminFlag: true,
      employeeNumber: 'EMP001'
    }
    
    const { result } = renderHook(() => useEmployees(user))
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('社員リストの取得に失敗しました')
    })
    
    expect(result.current.employeeList).toEqual([])
  })

  it('userがnullの場合でもエラーが発生しない', () => {
    expect(() => {
      renderHook(() => useEmployees(null))
    }).not.toThrow()
  })

  it('userがundefinedの場合でもエラーが発生しない', () => {
    expect(() => {
      renderHook(() => useEmployees(undefined))
    }).not.toThrow()
  })

  it('selectedEmployeesを変更できる', () => {
    const user = {
      adminFlag: true,
      employeeNumber: 'EMP001'
    }
    
    const { result } = renderHook(() => useEmployees(user))
    
    act(() => {
      result.current.setSelectedEmployees(['EMP002', 'EMP003'])
    })
    
    expect(result.current.selectedEmployees).toEqual(['EMP002', 'EMP003'])
  })

  it('管理者フラグがfalseの場合、社員リスト取得が実行されない', () => {
    const user = {
      adminFlag: false,
      employeeNumber: 'EMP001'
    }
    
    renderHook(() => useEmployees(user))
    
    expect(fetch).not.toHaveBeenCalled()
  })

  it('社員番号がない非管理者の場合、selectedEmployeesが空になる', () => {
    const user = {
      adminFlag: false,
      employeeNumber: null
    }
    
    const { result } = renderHook(() => useEmployees(user))
    
    expect(result.current.selectedEmployees).toEqual([])
  })

  it('userの変更時に適切に再実行される', async () => {
    const initialUser = {
      adminFlag: false,
      employeeNumber: 'EMP001'
    }
    
    const { result, rerender } = renderHook(
      ({ user }) => useEmployees(user),
      { initialProps: { user: initialUser } }
    )
    
    expect(result.current.selectedEmployees).toEqual(['EMP001'])
    
    const newUser = {
      adminFlag: false,
      employeeNumber: 'EMP002'
    }
    
    rerender({ user: newUser })
    
    expect(result.current.selectedEmployees).toEqual(['EMP002'])
  })
})
