import { Ticket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * タイトル: LotteryButton / 抽選実行ボタン
 * 要約: 抽選処理を開始するボタン。処理中はスピナー表示し、ボタンを無効化します。
 * 補足: 無効化はisLoadingとdisabledの論理和で制御します。
 * @param {{
 *   onLottery: () => void | Promise<void>,
 *   isLoading: boolean,
 *   disabled: boolean
 * }} props - クリックハンドラ、ローディング状態、外部無効化フラグ。
 * @returns {import('react').ReactElement} 抽選ボタン。
 */
export function LotteryButton({ onLottery, isLoading, disabled }) {
  const isButtonDisabled = isLoading || disabled;

  return (
    <Button onClick={onLottery} disabled={isButtonDisabled} className="w-full">
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Ticket className="mr-2 h-4 w-4" />
      )}
      <span>{isLoading ? '抽選中...' : '抽選する'}</span>
    </Button>
  );
}
