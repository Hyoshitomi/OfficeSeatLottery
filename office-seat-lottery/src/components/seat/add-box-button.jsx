'use client';

/**
 * タイトル: AddBoxButton / 座席ボックス追加ボタン
 * 要約: 座席表に新しいボックスを追加するための汎用ボタンコンポーネントです。
 * 補足: デザイン変更を避けるため、スタイルは親側で制御される前提で最小限の実装としています。
 * @param {{ onClick: () => void, disabled?: boolean, children?: import('react').ReactNode }} props - クリックハンドラ、無効化フラグ、表示テキスト。
 * @returns {import('react').ReactElement} 追加ボタン。
 */

export default function AddBoxButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        absolute top-2 right-2
        w-8 h-8 leading-none
        bg-[#1AA7FF] text-white
        rounded-full flex items-center justify-center
        text-xl shadow-md hover:bg-blue-500
      "
    >
      +
    </button>
  )
}
