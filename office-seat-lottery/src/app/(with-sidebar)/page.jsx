"use client";

import { useState } from 'react';
import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <SiteHeader title="抽選"/>
      <main className="flex-1 overflow-auto p-4">
        <div>
          <h1>抽選ページ</h1>
          <p>ここは抽選ページです。ナビゲーションバーが表示されます。</p>
        </div>
        <div>
          <h1>座席表示例</h1>
        </div>
      </main>
    </>
  );
}
