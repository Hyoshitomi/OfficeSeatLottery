import { useState, useRef, useCallback } from 'react';

/**
 * タイトル: getAbsoluteUrl / 相対URLを絶対URLに変換
 * 要約: 指定されたURLが相対パスの場合、現在のオリジンを付与して絶対URLに変換します。
 * 補足: URLが既にhttp/httpsで始まる場合や、サーバーサイドレンダリング時（windowが存在しない場合）は、そのままの値を返します。
 * @param {string} url - 変換対象のURL文字列。
 * @returns {string} 絶対URL文字列。
 */
const getAbsoluteUrl = (url) => {
  if (typeof window === 'undefined' || !url || /^https?:\/\//.test(url)) {
    return url;
  }
  return window.location.origin + url;
};

/**
 * タイトル: useImage / 画像プレビューとファイル入力管理フック
 * 要約: 画像のプレビュー表示状態と、それに関連するファイル入力エレメントの参照を管理します。
 * @param {string} [initialImage='/sheet/座席表.png'] - プレビュー画像の初期URL。
 * @returns {{
 *   previewImage: string,
 *   setPreviewImage: import('react').Dispatch<import('react').SetStateAction<string>>,
 *   fileInputRef: import('react').RefObject<HTMLInputElement>,
 *   handleFileChange: (file: File | null) => void,
 *   getAbsoluteUrl: (url: string) => string
 * }} プレビュー関連のStateとユーティリティ群を含むオブジェクト。
 */
export function useImage(initialImage = '/sheet/座席表.png') {
  const [previewImage, setPreviewImage] = useState(initialImage);
  const fileInputRef = useRef(null);

  /**
   * タイトル: handleFileChange / ファイル選択の処理
   * 要約: 選択されたファイルをBlob URLに変換し、プレビュー画像を更新します。
   * 補足: 生成されたBlob URLはメモリを消費するため、コンポーネントのアンマウント時にURL.revokeObjectURL()で解放することが推奨されます。
   * @param {File | null | undefined} file - input[type=file]から取得したFileオブジェクト。
   * @returns {void}
   */
  const handleFileChange = useCallback((file) => {
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  return {
    previewImage,
    setPreviewImage,
    fileInputRef,
    handleFileChange,
    getAbsoluteUrl,
  };
}
