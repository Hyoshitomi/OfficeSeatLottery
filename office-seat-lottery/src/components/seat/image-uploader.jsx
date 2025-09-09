// image-uploader.jsx
'use client';

import { useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

/**
 * タイトル: ImageUploader / 画像アップローダー
 * 要約: 非表示のfile入力をボタンからトリガーし、選択された画像Fileを親へコールバックします。
 * 補足: デザインは親側のレイアウトに依存するため、最小限のUIで提供します。
 * @param {{ onChange: (file: File) => void }} props - 画像選択時に呼び出されるコールバック。
 * @returns {import('react').ReactElement} 画像変更ボタンとhiddenのfile入力。
 */
export default function ImageUploader({ onChange }) {
  const fileInputRef = useRef(null);

  /**
   * タイトル: handleButtonClick / ファイル選択ダイアログを開く
   * 要約: 非表示のfile inputをクリックしてファイル選択を促します。
   * @returns {void}
   */
  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * タイトル: handleFileChange / 選択ファイルのハンドリング
   * 要約: 最初の選択ファイルを親コンポーネントに通知します。
   * @param {import('react').ChangeEvent<HTMLInputElement>} e - changeイベント。
   * @returns {void}
   */
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) onChange(file);
    },
    [onChange],
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button type="button" onClick={handleButtonClick}>
        画像を変更
      </Button>
    </>
  );
}
