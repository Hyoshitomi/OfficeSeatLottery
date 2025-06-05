import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import SidebarRight from '@/components/sidebar/right-sidebar-appoint'

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  )
}))

jest.mock('@/components/ui/sidebar', () => ({
  Sidebar: ({ children, ...props }) => <div data-testid="sidebar" {...props}>{children}</div>,
  SidebarFooter: ({ children }) => <div data-testid="sidebar-footer">{children}</div>,
  SidebarContent: ({ children }) => <div data-testid="sidebar-content">{children}</div>,
  SidebarMenu: ({ children }) => <div data-testid="sidebar-menu">{children}</div>,
  SidebarMenuItem: ({ children }) => <div data-testid="sidebar-menu-item">{children}</div>
}))

describe('SidebarRight', () => {
  const mockOnSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<SidebarRight />)
  
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument()
  })
  
  it('タイトルが正しく表示される', () => {
    render(<SidebarRight onSelect={mockOnSelect} />)
    
    expect(screen.getByText('予約日を選択する')).toBeInTheDocument()
  })

  it('onSelectがnullでもエラーが発生しない', () => {
    expect(() => {
      render(<SidebarRight onSelect={null} />)
    }).not.toThrow()
  })

  it('propsが渡されても正常動作する', () => {
    render(<SidebarRight onSelect={mockOnSelect} />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
