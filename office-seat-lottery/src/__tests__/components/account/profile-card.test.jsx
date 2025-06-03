import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProfileCard } from '@/components/account/profile-card'

describe('ProfileCard', () => {
  const defaultProps = {
    name: '田中太郎',
    employeeId: 'EMP001',
    profileImage: 'https://example.com/avatar.jpg',
    isAdmin: false
  }

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<ProfileCard {...defaultProps} />)

    expect(screen.getByText('プロフィール情報')).toBeInTheDocument()
    expect(screen.getByText('名前')).toBeInTheDocument()
    expect(screen.getByText('社員番号')).toBeInTheDocument()
  })

  it('名前と社員番号が正しく表示される', () => {
    render(<ProfileCard {...defaultProps} />)

    expect(screen.getByDisplayValue('田中太郎')).toBeInTheDocument()
    expect(screen.getByDisplayValue('EMP001')).toBeInTheDocument()
  })

  it('管理者の場合、アバターが表示される', () => {
    const adminProps = { ...defaultProps, isAdmin: true }
    render(<ProfileCard {...adminProps} />)

    // フォールバック文字の確認
    const avatarFallback = screen.getByText('田')
    expect(avatarFallback).toBeInTheDocument()
  })

  it('管理者でない場合、アバターが表示されない', () => {
    render(<ProfileCard {...defaultProps} />)

    const avatarImage = screen.queryByRole('img')
    expect(avatarImage).not.toBeInTheDocument()
  })

  it('入力フィールドが読み取り専用である', () => {
    render(<ProfileCard {...defaultProps} />)

    const nameInput = screen.getByDisplayValue('田中太郎')
    const employeeIdInput = screen.getByDisplayValue('EMP001')

    expect(nameInput).toHaveAttribute('readOnly')
    expect(employeeIdInput).toHaveAttribute('readOnly')
  })

  it('セパレーターが表示される', () => {
    const adminProps = { ...defaultProps, isAdmin: true }
    render(<ProfileCard {...adminProps} />)

    // セパレーターの存在確認（CSSクラスまたはroleで確認）
    const separator = document.querySelector('[data-slot="separator-root"]')
    expect(separator).toBeInTheDocument()
  })
})
