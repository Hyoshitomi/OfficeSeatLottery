import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
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
