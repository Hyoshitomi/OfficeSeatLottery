import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  return (
    <>
      <SiteHeader title="座席図編集"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>座席図編集ページ</h1>
          <p>ここは座席図編集ページです。</p>
        </div>
      </main>
    </>
  );
}
