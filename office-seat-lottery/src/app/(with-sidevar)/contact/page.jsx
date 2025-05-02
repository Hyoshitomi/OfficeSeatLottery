import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  return (
    <>
      <SiteHeader title="問い合わせ"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>問い合わせページ</h1>
          <p>ここは問い合わせページです。</p>
        </div>
      </main>
    </>
  );
}
