import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { PasswordInput } from '@/components/account/password-input'

describe('PasswordInput', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(
      <PasswordInput
        id="test-password"
        value=""
        onChange={mockOnChange}
        placeholder="パスワードを入力"
      />
    )

    expect(screen.getByPlaceholderText('パスワードを入力')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('初期状態ではパスワードが非表示になっている', () => {
    render(
      <PasswordInput
        id="test-password"
        value=""
        onChange={mockOnChange}
        placeholder="パスワードを入力"
      />
    )

    const input = screen.getByPlaceholderText('パスワードを入力')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('表示ボタンをクリックするとパスワードが表示される', () => {
    render(
      <PasswordInput
        id="test-password"
        value=""
        onChange={mockOnChange}
        placeholder="パスワードを入力"
      />
    )

    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)

    const input = screen.getByPlaceholderText('パスワードを入力')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('パスワード入力時にonChangeが呼ばれる', () => {
    render(
      <PasswordInput
        id="test-password"
        value=""
        onChange={mockOnChange}
        placeholder="パスワードを入力"
      />
    )

    const input = screen.getByPlaceholderText('パスワードを入力')
    fireEvent.change(input, { target: { value: 'password123' } })

    expect(mockOnChange).toHaveBeenCalledWith('password123')
  })

  it('restrictChars=trueの場合、無効な文字が入力されない', () => {
    render(
      <PasswordInput
        id="test-password"
        value=""
        onChange={mockOnChange}
        placeholder="パスワードを入力"
        restrictChars={true}
      />
    )

    const input = screen.getByPlaceholderText('パスワードを入力')
    
    // 有効な文字の入力
    fireEvent.change(input, { target: { value: 'abc123!?_$#' } })
    expect(mockOnChange).toHaveBeenCalledWith('abc123!?_$#')

    // 無効な文字の入力（呼ばれない）
    mockOnChange.mockClear()
    fireEvent.change(input, { target: { value: 'abc@%' } })
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('restrictChars=falseの場合、すべての文字が入力される', () => {
    render(
      <PasswordInput
        id="test-password"
        value=""
        onChange={mockOnChange}
        placeholder="パスワードを入力"
        restrictChars={false}
      />
    )

    const input = screen.getByPlaceholderText('パスワードを入力')
    fireEvent.change(input, { target: { value: 'abc@%&*()' } })

    expect(mockOnChange).toHaveBeenCalledWith('abc@%&*()')
  })
})
