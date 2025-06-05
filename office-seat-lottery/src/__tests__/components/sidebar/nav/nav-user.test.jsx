/* eslint-disable @next/next/no-img-element */

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { NavUser } from '@/components/sidebar/nav/nav-user'

// Next.jsとnext-authのモック
jest.mock('next-auth/react', () => ({
  signOut: jest.fn()
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

// アイコンのモック
jest.mock('@tabler/icons-react', () => ({
  IconDotsVertical: () => <svg data-testid="icon-dots">Dots</svg>,
  IconLogout: () => <svg data-testid="icon-logout">Logout</svg>,
  IconUserCircle: () => <svg data-testid="icon-user">User</svg>
}))

// UIコンポーネントのモック
jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }) => <div data-testid="avatar">{children}</div>,
  AvatarFallback: ({ children }) => <div data-testid="avatar-fallback">{children}</div>,
  AvatarImage: ({ src, alt }) => <img data-testid="avatar-image" src={src} alt={alt} />
}))

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children }) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children, onClick }) => (
    <div data-testid="dropdown-item" onClick={onClick}>{children}</div>
  ),
  DropdownMenuLabel: ({ children }) => <div data-testid="dropdown-label">{children}</div>,
  DropdownMenuSeparator: () => <hr data-testid="dropdown-separator" />,
  DropdownMenuTrigger: ({ children }) => <div data-testid="dropdown-trigger">{children}</div>
}))

jest.mock('@/components/ui/sidebar', () => ({
  SidebarMenu: ({ children }) => <div data-testid="sidebar-menu">{children}</div>,
  SidebarMenuButton: ({ children, ...props }) => (
    <button data-testid="sidebar-menu-button" {...props}>{children}</button>
  ),
  SidebarMenuItem: ({ children }) => <div data-testid="sidebar-menu-item">{children}</div>,
  useSidebar: jest.fn(() => ({ isMobile: false }))
}))

describe('NavUser', () => {
  const mockUser = {
    lastName: '田中',
    employeeNumber: 'EMP001',
    avatar: '/avatars/EMP001.png'
  }

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    const { useRouter } = require('next/navigation')
    useRouter.mockReturnValue(mockRouter)
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<NavUser user={mockUser} />)
  
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
    // 修正: 複数の要素がある場合は getAllByTestId を使用
    expect(screen.getAllByTestId('avatar')[0]).toBeInTheDocument()
  })
  
  it('ユーザー情報が正しく表示される', () => {
    render(<NavUser user={mockUser} />)
  
    // 修正: 複数の要素がある場合は getAllByText を使用
    expect(screen.getAllByText('田中')[0]).toBeInTheDocument()
    expect(screen.getAllByText('EMP001')[0]).toBeInTheDocument() // getByText → getAllByText
  })
  
  it('アバター画像が正しく設定される', () => {
    render(<NavUser user={mockUser} />)
  
    // 修正: 複数の要素がある場合は getAllByTestId を使用
    const avatarImages = screen.getAllByTestId('avatar-image')
    expect(avatarImages[0]).toHaveAttribute('src', '/avatars/EMP001.png')
  })
  
  it('フォールバック文字が正しく表示される', () => {
    render(<NavUser user={mockUser} />)
  
    // 修正: 複数の要素がある場合は getAllByText を使用
    expect(screen.getAllByText('U')[0]).toBeInTheDocument()
  })
  
  it('Accountメニュークリック時にルーターが呼ばれる', () => {
    render(<NavUser user={mockUser} />)
    
    const accountItems = screen.getAllByTestId('dropdown-item')
    const accountItem = accountItems.find(item => item.textContent.includes('Account'))
    
    fireEvent.click(accountItem)
    
    expect(mockRouter.push).toHaveBeenCalledWith('/account')
  })

  it('Log outメニュークリック時にsignOutが呼ばれる', () => {
    const { signOut } = require('next-auth/react')
    
    render(<NavUser user={mockUser} />)
    
    const logoutItems = screen.getAllByTestId('dropdown-item')
    const logoutItem = logoutItems.find(item => item.textContent.includes('Log out'))
    
    fireEvent.click(logoutItem)
    
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/login" })
  })

  it('モバイル表示時に適切に動作する', () => {
    const { useSidebar } = require('@/components/ui/sidebar')
    useSidebar.mockReturnValue({ isMobile: true })
    
    render(<NavUser user={mockUser} />)
    
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument()
  })

  it('ユーザー情報が不完全でもエラーが発生しない', () => {
    const incompleteUser = {
      lastName: null,
      employeeNumber: undefined
    }
    
    expect(() => {
      render(<NavUser user={incompleteUser} />)
    }).not.toThrow()
  })

  it('ドロップダウンメニューの構造が正しい', () => {
    render(<NavUser user={mockUser} />)
    
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-label')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-separator')).toBeInTheDocument()
  })
})
