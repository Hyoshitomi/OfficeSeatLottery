import { renderHook } from '@testing-library/react'

import { usePasswordValidation } from '@/hooks/use-password-validation'

describe('usePasswordValidation', () => {
  it('初期状態ですべての要件がfalseである', () => {
    const { result } = renderHook(() => usePasswordValidation('', ''))
    
    expect(result.current.requirements).toEqual({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    })
    expect(result.current.match).toBe(true)
  })

  it('8文字以上の場合、length要件が満たされる', () => {
    const { result } = renderHook(() => usePasswordValidation('12345678', ''))
    
    expect(result.current.requirements.length).toBe(true)
  })

  it('7文字以下の場合、length要件が満たされない', () => {
    const { result } = renderHook(() => usePasswordValidation('1234567', ''))
    
    expect(result.current.requirements.length).toBe(false)
  })

  it('大文字が含まれる場合、uppercase要件が満たされる', () => {
    const { result } = renderHook(() => usePasswordValidation('Password', ''))
    
    expect(result.current.requirements.uppercase).toBe(true)
  })

  it('小文字が含まれる場合、lowercase要件が満たされる', () => {
    const { result } = renderHook(() => usePasswordValidation('password', ''))
    
    expect(result.current.requirements.lowercase).toBe(true)
  })

  it('数字が含まれる場合、number要件が満たされる', () => {
    const { result } = renderHook(() => usePasswordValidation('password123', ''))
    
    expect(result.current.requirements.number).toBe(true)
  })

  it('特殊文字(!?_$#)が含まれる場合、special要件が満たされる', () => {
    const specialChars = ['!', '?', '_', '$', '#']
    
    specialChars.forEach(char => {
      const { result } = renderHook(() => usePasswordValidation(`password${char}`, ''))
      expect(result.current.requirements.special).toBe(true)
    })
  })

  it('許可されていない特殊文字では、special要件が満たされない', () => {
    const invalidChars = ['@', '%', '&', '*', '(', ')']
    
    invalidChars.forEach(char => {
      const { result } = renderHook(() => usePasswordValidation(`password${char}`, ''))
      expect(result.current.requirements.special).toBe(false)
    })
  })

  it('パスワードが一致する場合、matchがtrueになる', () => {
    const password = 'Password123?'
    const { result } = renderHook(() => usePasswordValidation(password, password))
    
    expect(result.current.match).toBe(true)
  })

  it('パスワードが一致しない場合、matchがfalseになる', () => {
    const { result } = renderHook(() => usePasswordValidation('Password123?', 'Different123?'))
    
    expect(result.current.match).toBe(false)
  })

  it('確認パスワードが空の場合、matchがfalseになる', () => {
    const { result } = renderHook(() => usePasswordValidation('Password123?', ''))
    
    expect(result.current.match).toBe(false)
  })

  it('すべての要件を満たすパスワードで正しく動作する', () => {
    const validPassword = 'Password123?'
    const { result } = renderHook(() => usePasswordValidation(validPassword, validPassword))
    
    expect(result.current.requirements).toEqual({
      length: true,
      uppercase: true,
      lowercase: true,
      number: true,
      special: true
    })
    expect(result.current.match).toBe(true)
  })

  it('getRequirementColorが正しい色を返す', () => {
    const { result } = renderHook(() => usePasswordValidation('Password123?', 'Password123?', true))
    
    // 満たされた要件は緑色
    expect(result.current.getRequirementColor(true)).toBe('text-green-500')
    
    // 満たされていない要件は赤色
    expect(result.current.getRequirementColor(false)).toBe('text-red-500')
  })

  it('パスワード変更時に要件が動的に更新される', () => {
    const { result, rerender } = renderHook(
      ({ password, confirmPassword }) => usePasswordValidation(password, confirmPassword),
      { initialProps: { password: '', confirmPassword: '' } }
    )
    
    expect(result.current.requirements.length).toBe(false)
    
    // パスワードを更新
    rerender({ password: 'Password123?', confirmPassword: 'Password123?' })
    
    expect(result.current.requirements.length).toBe(true)
    expect(result.current.requirements.uppercase).toBe(true)
    expect(result.current.requirements.lowercase).toBe(true)
    expect(result.current.requirements.number).toBe(true)
    expect(result.current.requirements.special).toBe(true)
    expect(result.current.match).toBe(true)
  })

  it('空文字列でもエラーが発生しない', () => {
    expect(() => {
      renderHook(() => usePasswordValidation('', ''))
    }).not.toThrow()
  })

  it('nullやundefinedでもエラーが発生しない', () => {
    expect(() => {
      renderHook(() => usePasswordValidation(null, undefined))
    }).not.toThrow()
  })

  it('非常に長いパスワードでも正常動作する', () => {
    const longPassword = 'A'.repeat(1000) + 'a1?'
    const { result } = renderHook(() => usePasswordValidation(longPassword, longPassword))
    
    expect(result.current.requirements.length).toBe(true)
    expect(result.current.match).toBe(true)
  })
})
