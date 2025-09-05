/**
 * タイトル: LotteryResult / 抽選結果表示
 * 要約: 抽選結果のメッセージや要素を表示します。結果が無い場合は表示しません。
 * 補足: 表示内容（result）は親から受け取り、そのまま描画します。
 * @param {{ result: import('react').ReactNode | null }} props - 抽選結果の表示要素。
 * @returns {import('react').ReactElement | null} 結果表示またはnull。
 */
export function LotteryResult({ result }) {
  if (!result) return null;
  return <div className="text-sm leading-relaxed">{result}</div>;
}
