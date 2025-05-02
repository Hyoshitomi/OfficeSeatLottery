import { SiteHeader } from "@/components/sidebar/site-header";
import ResizableBox from '@/components/namebox/ResizableNameBox';

export default async function Home() {
  return (
    <>
      <SiteHeader title="抽選"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>抽選ページ</h1>
          <p>ここは抽選ページです。ナビゲーションバーが表示されます。</p>
        </div>

      </main>
    </>
  );
}
