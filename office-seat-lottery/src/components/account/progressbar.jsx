import { Progress } from '@/components/ui/progress';

/**
 * タイトル: ProgressBar / プログレスバー表示コンポーネント
 * 要約: ローディング状態にある間だけ、進行状況を示すプログレスバーを表示します。
 * @param {{
 *   isLoading: boolean,
 *   progress:  number
 * }} props
 * @param {boolean} props.isLoading - ローディング中かどうかのフラグ。
 * @param {number} props.progress - プログレスバーの進行度（0～100）。
 * @returns {import('react').ReactElement | null} ローディング中の場合はプログレスバー、それ以外はnull。
 */
export function ProgressBar({ isLoading, progress }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="w-full">
      <Progress value={progress} className="w-full" />
    </div>
  );
}
