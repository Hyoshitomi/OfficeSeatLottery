import { Ticket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * タイトル: ChangeButton / 交換実行ボタン
 * 要約: 「交換する」アクションをトリガーするためのボタンです。ローディング状態と無効状態を管理します。
 * @param {{
 *   onChange:  () => void,
 *   isLoading: boolean,
 *   disabled:  boolean
 * }} props
 * @param {() => void} props.onChange - ボタンがクリックされたときに実行されるコールバック関数。
 * @param {boolean} props.isLoading - 処理が実行中であるかを示すフラグ。trueの場合、スピナーを表示しボタンを無効化します。
 * @param {boolean} props.disabled - 外部の条件によってボタンを無効化するかどうかのフラグ。
 * @returns {import('react').ReactElement} 交換実行ボタンのJSX要素。
 */
export function ChangeButton({ onChange, isLoading, disabled }) {
  // isLoadingがtrue、または外部からdisabledがtrueで渡された場合にボタンを無効化
  const isButtonDisabled = isLoading || disabled;

  return (
    <Button onClick={onChange} className="w-full h-12 text-lg font-bold" disabled={isButtonDisabled}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Ticket className="mr-2 h-4 w-4" />
      )}
      <span>{isLoading ? '処理中...' : '交換する'}</span>
    </Button>
  );
}
