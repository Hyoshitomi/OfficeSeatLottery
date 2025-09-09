// session-provider.jsx
'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * タイトル: NextAuthSessionProvider / セッションプロバイダ
 * 要約: next-authのSessionProviderで子要素をラップし、認証セッションを提供します。
 * 補足: sessionが未指定の場合はデフォルトのセッションコンテキストが使用されます。
 * @param {{ children: import('react').ReactNode, session?: import('next-auth').Session }} props - 子要素と任意の初期セッション。
 * @returns {import('react').ReactElement} SessionProviderでラップされたコンポーネントツリー。
 */
export default function NextAuthSessionProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
