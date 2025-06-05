import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { AdminGuard } from '@/components/common/admin-guard'

// SiteHeaderコンポーネントのモック
jest.mock('@/components/sidebar/site-header', () => ({
  SiteHeader: ({ title }) => (
    <header data-testid="site-header">
      <h1>{title}</h1>
    </header>
  )
}))

describe('AdminGuard', () => {
  const mockChildren = <div data-testid="protected-content">管理者専用コンテンツ</div>

  it('管理者権限がない場合、アクセス拒否メッセージが表示される', () => {
    const user = { adminFlag: false }
    
    render(
      <AdminGuard user={user} title="管理画面">
        {mockChildren}
      </AdminGuard>
    )

    expect(screen.getByText('ここは管理者のみ閲覧可能なページです。')).toBeInTheDocument()
    expect(screen.getByTestId('site-header')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('userがnullの場合、アクセス拒否メッセージが表示される', () => {
    render(
      <AdminGuard user={null} title="管理画面">
        {mockChildren}
      </AdminGuard>
    )

    expect(screen.getByText('ここは管理者のみ閲覧可能なページです。')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('userがundefinedの場合、アクセス拒否メッセージが表示される', () => {
    render(
      <AdminGuard user={undefined} title="管理画面">
        {mockChildren}
      </AdminGuard>
    )

    expect(screen.getByText('ここは管理者のみ閲覧可能なページです。')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('管理者権限がある場合、子コンポーネントが表示される', () => {
    const user = { adminFlag: true }
    
    render(
      <AdminGuard user={user} title="管理画面">
        {mockChildren}
      </AdminGuard>
    )

    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    expect(screen.getByText('管理者専用コンテンツ')).toBeInTheDocument()
    expect(screen.queryByText('ここは管理者のみ閲覧可能なページです。')).not.toBeInTheDocument()
  })

  it('SiteHeaderにtitleが正しく渡される', () => {
    const user = { adminFlag: false }
    
    render(
      <AdminGuard user={user} title="ユーザー管理">
        {mockChildren}
      </AdminGuard>
    )

    expect(screen.getByText('ユーザー管理')).toBeInTheDocument()
  })

  it('複数の子要素が正しく表示される', () => {
    const user = { adminFlag: true }
    const multipleChildren = (
      <>
        <div data-testid="content-1">コンテンツ1</div>
        <div data-testid="content-2">コンテンツ2</div>
      </>
    )
    
    render(
      <AdminGuard user={user} title="管理画面">
        {multipleChildren}
      </AdminGuard>
    )

    expect(screen.getByTestId('content-1')).toBeInTheDocument()
    expect(screen.getByTestId('content-2')).toBeInTheDocument()
  })
})
