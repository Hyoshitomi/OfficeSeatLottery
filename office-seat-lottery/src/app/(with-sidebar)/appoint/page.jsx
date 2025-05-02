import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  return (
    <>
      <SiteHeader title="予約"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>予約ページ</h1>
          <p>ここは予約ページです。</p>
        </div>
      </main>
    </>
  );
}
