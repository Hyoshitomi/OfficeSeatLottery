import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  return (
    <>
      <SiteHeader title="座席図"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>座席図ページ</h1>
          <p>ここは座席図ページです。</p>
        </div>
      </main>
    </>
  );
}
