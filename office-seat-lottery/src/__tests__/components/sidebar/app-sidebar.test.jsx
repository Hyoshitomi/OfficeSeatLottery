import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { AppSidebar } from '@/components/sidebar/app-sidebar'

// 外部ライブラリのモック
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        lastName: '田中',
        employeeNumber: 'EMP001',
        adminFlag: true
      }
    }
  }))
}))

jest.mock('@tabler/icons-react', () => ({
  IconArmchair: () => <svg data-testid="icon-armchair">Armchair</svg>,
  IconArmchair2: () => <svg data-testid="icon-armchair2">Armchair2</svg>,
  IconDatabase: () => <svg data-testid="icon-database">Database</svg>,
  IconDice: () => <svg data-testid="icon-dice">Dice</svg>,
  IconEdit: () => <svg data-testid="icon-edit">Edit</svg>,
  IconFileTypePng: () => <svg data-testid="icon-file-png">FilePng</svg>,
  IconMail: () => <svg data-testid="icon-mail">Mail</svg>,
  IconUsers: () => <svg data-testid="icon-users">Users</svg>
}))

jest.mock('@/components/sidebar/nav/sidebar-nav', () => ({
  SidebarNav: ({ items, label }) => (
    <div data-testid="sidebar-nav" data-label={label}>
      {items.map((item) => (
        <div key={item.name} data-testid={`nav-item-${item.name}`}>
          {item.name}
        </div>
      ))}
    </div>
  )
}))

jest.mock('@/components/sidebar/nav/nav-user', () => ({
  NavUser: ({ user }) => (
    <div data-testid="nav-user">
      {user.lastName} - {user.employeeNumber}
    </div>
  )
}))

jest.mock('@/components/ui/sidebar', () => ({
  Sidebar: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <div data-testid="sidebar" {...domProps}>{children}</div>
  },
  SidebarContent: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <div data-testid="sidebar-content" {...domProps}>{children}</div>
  },
  SidebarFooter: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <div data-testid="sidebar-footer" {...domProps}>{children}</div>
  },
  SidebarHeader: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <div data-testid="sidebar-header" {...domProps}>{children}</div>
  },
  SidebarMenu: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <div data-testid="sidebar-menu" {...domProps}>{children}</div>
  },
  SidebarMenuButton: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <button data-testid="sidebar-menu-button" {...domProps}>{children}</button>
  },
  SidebarMenuItem: ({ children, ...props }) => {
    const { asChild: _asChild, ...domProps } = props
    return <div data-testid="sidebar-menu-item" {...domProps}>{children}</div>
  }
}))

describe('AppSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<AppSidebar />)
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-header')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument()
  })

  it('タイトルが正しく表示される', () => {
    render(<AppSidebar />)
    
    expect(screen.getByText('座席管理システム')).toBeInTheDocument()
  })

  it('メインナビゲーションが表示される', () => {
    render(<AppSidebar />)
    
    expect(screen.getByTestId('nav-item-抽選')).toBeInTheDocument()
    expect(screen.getByTestId('nav-item-座席表')).toBeInTheDocument()
    expect(screen.getByTestId('nav-item-チーム予約')).toBeInTheDocument()
  })

  it('管理者権限がある場合、データリストが表示される', () => {
    render(<AppSidebar />)
    
    expect(screen.getByTestId('nav-item-座席図 編集')).toBeInTheDocument()
    expect(screen.getByTestId('nav-item-座席図 画像')).toBeInTheDocument()
    expect(screen.getByTestId('nav-item-データ管理')).toBeInTheDocument()
  })

  it('管理者権限がない場合、データリストが表示されない', () => {
    const { useSession } = require('next-auth/react')
    useSession.mockReturnValue({
      data: {
        user: {
          lastName: '田中',
          employeeNumber: 'EMP001',
          adminFlag: false
        }
      }
    })

    render(<AppSidebar />)
    
    expect(screen.queryByTestId('nav-item-座席図 編集')).not.toBeInTheDocument()
    expect(screen.queryByTestId('nav-item-座席図 画像')).not.toBeInTheDocument()
    expect(screen.queryByTestId('nav-item-データ管理')).not.toBeInTheDocument()
  })

  it('セカンダリナビゲーションが表示される', () => {
    render(<AppSidebar />)
    
    expect(screen.getByTestId('nav-item-問い合わせ')).toBeInTheDocument()
  })

  it('ユーザー情報が正しく表示される', () => {
    render(<AppSidebar />)
    
    expect(screen.getByTestId('nav-user')).toBeInTheDocument()
    expect(screen.getByText('田中 - EMP001')).toBeInTheDocument()
  })

  it('セッションがない場合でもエラーが発生しない', () => {
    const { useSession } = require('next-auth/react')
    useSession.mockReturnValue({ data: null })

    expect(() => {
      render(<AppSidebar />)
    }).not.toThrow()

    expect(screen.getByText('取得失敗 - 取得失敗')).toBeInTheDocument()
  })

  it('ユーザー情報が不完全でもフォールバック値が表示される', () => {
    const { useSession } = require('next-auth/react')
    useSession.mockReturnValue({
      data: {
        user: {
          lastName: null,
          employeeNumber: undefined
        }
      }
    })

    render(<AppSidebar />)
    
    expect(screen.getByText('取得失敗 - 取得失敗')).toBeInTheDocument()
  })
})
