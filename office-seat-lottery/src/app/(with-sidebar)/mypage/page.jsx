import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  return (
    <>
      <SiteHeader title="マイページ" />
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>マイページ</h1>
          <p>ここはマイページです。</p>
        </div>
      </main>
    </>
  );
}