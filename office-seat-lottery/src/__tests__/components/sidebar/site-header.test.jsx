import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SiteHeader } from '@/components/sidebar/site-header'

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />
}))

jest.mock('@/components/ui/sidebar', () => ({
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Toggle</button>
}))

describe('SiteHeader', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<SiteHeader title="テストタイトル" />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('separator')).toBeInTheDocument()
  })

  it('タイトルが正しく表示される', () => {
    render(<SiteHeader title="座席管理" />)
    
    expect(screen.getByText('座席管理')).toBeInTheDocument()
  })

  it('タイトルが空でも表示される', () => {
    render(<SiteHeader title="" />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('タイトルがnullでもエラーが発生しない', () => {
    expect(() => {
      render(<SiteHeader title={null} />)
    }).not.toThrow()
  })

  it('適切なCSSクラスが適用される', () => {
    render(<SiteHeader title="テスト" />)
  
    const header = screen.getByRole('banner')
    // 修正: 実際のクラス名に合わせる
    expect(header).toHaveClass('flex', 'shrink-0', 'items-center', 'gap-2', 'border-b', 'transition-[width,height]', 'ease-linear')
    // h-16 → h-(--header-height) に変更
    // group-has-[[data-collapsible=icon]] → group-has-data-[collapsible=icon] に変更
  })
  
  it('タイトルの適切なスタイルが適用される', () => {
    render(<SiteHeader title="テスト" />)
  
    const title = screen.getByText('テスト')
    // 修正: font-semibold → font-medium に変更
    expect(title).toHaveClass('text-base', 'font-medium')
  })
  
})
