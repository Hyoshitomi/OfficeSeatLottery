import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * タイトル: useIsMobile / モバイルビューポート判定フック
 * 要約: ビューポートの幅がモバイル用のブレークポイント未満であるかを判定し、その結果を返します。
 * 補足: サーバーサイドレンダリング（SSR）環境を考慮し、クライアントサイドでマウントされるまで判定を保留します。画面幅の変更を自動的に検知して状態を更新します。
 * @returns {boolean} ビューポートがモバイルサイズ（768px未満）の場合はtrue、それ以外はfalse。
 */
export function useIsMobile() {
  // SSR時のハイドレーションミスマッチを防ぐため、初期値をundefinedに設定
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    // windowオブジェクトが存在しないサーバー環境では何もしない
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    /**
     * タイトル: handleChange / メディアクエリ状態変更ハンドラ
     * 要約: メディアクエリの評価結果（mql.matches）に基づいてisMobileの状態を更新します。
     * @returns {void}
     */
    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    // 初期状態を設定
    handleChange();

    // イベントリスナーを登録
    mediaQuery.addEventListener('change', handleChange);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []); // 空の依存配列で、マウント時に一度だけ実行

  // SSR時は `undefined` なので `false` を返し、クライアントでは判定結果のbooleanを返す
  return isMobile ?? false;
}
