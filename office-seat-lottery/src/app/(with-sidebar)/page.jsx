"use client";

import { useState } from 'react';
import { SiteHeader } from "@/components/sidebar/site-header";
import ResizableBox from '@/components/namebox/ResizableNameBox';

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
          <ResizableBox
            text="山田 太郎"
            borderColor="red-500"
            width={200}
            height={100}
            borderWidth={4}
            borderRadius="xl"
          />
          <ResizableBox
            text="佐藤 花子"
            borderColor="green-500"
            width={160}
            height={80}
            borderWidth={2}
            borderRadius="md"
          />
        </div>
      </main>
    </>
  );
}
