import { SiteHeader } from '@/components/sidebar/site-header';
import { Button } from '@/components/ui/button';

/**
 * タイトル: UnauthorizedView / 非認証・権限不足時の表示コンポーネント
 * 要約: 権限がないユーザーに対して、アクセスできない旨を伝えるメッセージを表示します。
 * @returns {import('react').ReactElement}
 */
const UnauthorizedView = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
    <h1 className="text-2xl font-bold">アクセス権限がありません</h1>
    <p>このページは管理者のみ閲覧可能です。</p>
    <Button asChild>
      <a href="/">トップページに戻る</a>
    </Button>
  </div>
);

/**
 * タイトル: AdminGuard / 管理者権限ガードコンポーネント
 * 要約: ユーザーが管理者権限を持っているかを確認し、権限がなければアクセス不可画面を、あれば子要素を表示します。
 * @param {{
 *   user:     { adminFlag: boolean } | null,
 *   title:    string,
 *   children: import('react').ReactNode
 * }} props
 * @param {object | null} props.user - ユーザー情報を含むオブジェクト。`adminFlag` プロパティを持つことを期待します。
 * @param {string} props.title - ページのタイトル。`SiteHeader`に渡されます。
 * @param {import('react').ReactNode} props.children - 権限がある場合に表示するコンテンツ。
 * @returns {import('react').ReactElement}
 */
export function AdminGuard({ user, title, children }) {
  if (!user?.adminFlag) {
    return <UnauthorizedView />;
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
