import { SiteHeader } from '@/components/sidebar/site-header'

export function AdminGuard({ user, title, children }) {
  if (!user?.adminFlag) {
    return (
      <>
        <SiteHeader title={title} />
        <main className="flex-1 overflow-auto p-4">
          <div>
            <p>ここは管理者のみ閲覧可能なページです。</p>
          </div>
        </main>
      </>
    )
  }

  return children
}
