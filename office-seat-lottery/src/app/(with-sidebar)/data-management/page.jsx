'use client'

import { useSession } from "next-auth/react";

import { SiteHeader } from "@/components/sidebar/site-header";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user?.adminFlag) {
    return (
      <>
        <SiteHeader title="データ管理"/>
        <main className="flex-1 overflow-auto p-4">
          <div>
            <p>ここは管理者のみ閲覧可能なページです。</p>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <SiteHeader title="データ管理"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>データ管理ページ</h1>
          <p>ここはデータ管理ページです。</p>
        </div>
      </main>
    </>
  );
}
