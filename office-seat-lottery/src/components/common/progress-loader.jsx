import { Progress } from '@/components/ui/progress';

/**
 * タイトル: ProgressLoader / プログレスローダー
 * 要約: 処理の進行状況を視覚的に示すためのプログレスバーとテキストを表示します。
 * @param {{
 *   progress?: number
 * }} props
 * @param {number} [props.progress=0] - プログレスバーの進行度（0～100）。未指定、null、undefinedの場合は0として扱われます。
 * @returns {import('react').ReactElement} プログレスバーと進行状況テキストを含むJSX要素。
 */
export function ProgressLoader({ progress }) {
  // progressがnullやundefinedの場合でも安全に0にフォールバックする
  const safeProgress = progress ?? 0;

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <Progress value={safeProgress} className="w-[60%]" />
      <p className="text-sm text-muted-foreground">
        処理を実行中です... ({Math.round(safeProgress)}%)
      </p>
    </div>
  );
}
