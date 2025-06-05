import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { PasswordChangeCard } from '@/components/account/password-change-card'

// モックの設定
jest.mock('@/hooks/use-password-validation', () => ({
  usePasswordValidation: jest.fn(() => ({
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    },
    match: false,
    getRequirementColor: jest.fn(() => 'text-gray-500')
  }))
}))

jest.mock('@/components/account/password-input', () => ({
  PasswordInput: ({ id, value, onChange, placeholder }) => (
    <input
      data-testid={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="password"
    />
  )
}))

jest.mock('@/components/account/password-requirements', () => ({
  PasswordRequirements: () => (
    <div data-testid="password-requirements">
      Password Requirements Component
    </div>
  )
}))

jest.mock('@/components/account/password-match-indicator', () => ({
  PasswordMatchIndicator: ({ match, confirmPassword }) => (
    <div data-testid="password-match-indicator">
      {confirmPassword && (match ? 'パスワードが一致します' : 'パスワードが一致しません')}
    </div>
  )
}))

describe('PasswordChangeCard', () => {
  const mockOnChange = jest.fn()
  
  const defaultProps = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    onChange: mockOnChange,
    validationAttempted: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<PasswordChangeCard {...defaultProps} />)
    
    expect(screen.getByText('パスワード変更')).toBeInTheDocument()
    expect(screen.getByText('セキュリティのため定期的にパスワードを変更してください')).toBeInTheDocument()
    expect(screen.getByText('現在のパスワード')).toBeInTheDocument()
    expect(screen.getByText('新しいパスワード')).toBeInTheDocument()
    expect(screen.getByText('確認用パスワード')).toBeInTheDocument()
  })

  it('現在のパスワード入力時にonChangeが呼ばれる', () => {
    render(<PasswordChangeCard {...defaultProps} />)
    
    const currentPasswordInput = screen.getByTestId('currentPassword')
    fireEvent.change(currentPasswordInput, { target: { value: 'oldpassword' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('currentPassword', 'oldpassword')
  })

  it('新しいパスワード入力時にonChangeが呼ばれる', () => {
    render(<PasswordChangeCard {...defaultProps} />)
    
    const newPasswordInput = screen.getByTestId('newPassword')
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('newPassword', 'newpassword123')
  })

  it('確認用パスワード入力時にonChangeが呼ばれる', () => {
    render(<PasswordChangeCard {...defaultProps} />)
    
    const confirmPasswordInput = screen.getByTestId('confirmPassword')
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('confirmPassword', 'newpassword123')
  })

  it('パスワード要件コンポーネントが表示される', () => {
    render(<PasswordChangeCard {...defaultProps} />)
    
    expect(screen.getByTestId('password-requirements')).toBeInTheDocument()
  })

  it('パスワード一致インジケーターが表示される', () => {
    const props = {
      ...defaultProps,
      confirmPassword: 'test123'
    }
    
    render(<PasswordChangeCard {...props} />)
    
    expect(screen.getByTestId('password-match-indicator')).toBeInTheDocument()
  })
})
