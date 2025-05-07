"use client";

import { useRef, useState } from "react";
import { SiteHeader } from "@/components/sidebar/site-header";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [previewImage, setPreviewImage] = useState("/sheet/座席表.png");
  const fileInputRef = useRef(null);

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <SiteHeader title="座席図編集" />
      <main className="flex-1 p-4 flex flex-col items-center">
        <img
          src={previewImage}
          alt="プレビュー画像"
          className="max-h-[70vh] max-w-full object-contain mb-4"
        />

        {/* ボタン押下で隠し input の click を呼び出す */}
        <Button onClick={onButtonClick}>画像を変更</Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </main>
    </>
  );
}
