"use client"; // クライアントコンポーネントとして指定

import { SiteHeader } from "@/components/sidebar/site-header";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  // プレビュー用の画像パスを管理する状態
  const [previewImage, setPreviewImage] = useState("/sheet/座席表.png");

  // 画像がドロップされた際の処理
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const dataUrl = URL.createObjectURL(file);
      setPreviewImage(dataUrl);
    }
  };

  // react-dropzone の設定（クリックによるダイアログを無効化）
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // 画像ファイルのみ受け入れる
    multiple: false, // 1つのファイルのみ許可
    noClick: true // クリックでのファイル選択を無効化
  });

  return (
    <>
      <SiteHeader title="座席図編集" />
      <main
        {...getRootProps()}
        className={`flex-1 overflow-hidden p-4 flex items-center justify-center transition-all duration-200 relative ${
          isDragActive ? "border-2 border-dashed border-blue-500" : "border-2 border-solid border-transparent"
        }`}
      >
        <input {...getInputProps()} />
        <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
          <img
            src={previewImage}
            alt="プレビュー画像"
            className={`max-h-full max-w-full object-contain relative z-10 transition-all duration-200 ${
              isDragActive ? "blur-md" : ""
            }`}
          />
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center text-blue-500 text-lg font-medium z-20">
              ドラッグ＆ドロップで画像を変更できます
            </div>
          )}
        </div>
      </main>
    </>
  );
}
