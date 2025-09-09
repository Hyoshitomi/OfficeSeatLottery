import { useState, useCallback, Fragment } from 'react';
import { toast } from 'sonner';

/**
 * タイトル: executeLotteryAPI / 抽選実行APIの呼び出し
 * 要約: 選択された社員番号リストをサーバーに送信し、抽選処理を実行します。
 * 補足: この関数はAPI通信ロジックに特化しており、UI関連の処理（状態更新や通知）は行いません。
 * @param {Array<string | number>} employeeNumbers - 抽選対象となる社員番号の配列。
 * @returns {Promise<any>} APIからの成功レスポンスデータ。
 * @throws {Error} APIリクエストが失敗した場合、レスポンスから取得したエラーメッセージを含むエラーをスローします。
 */
const executeLotteryAPI = async (employeeNumbers) => {
  const res = await fetch('/api/lottery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeNumbers }),
  });

  const data = await res.json().catch(() => ({})); // JSONパース失敗時は空オブジェクト

  if (!res.ok) {
    throw new Error(data.error || '抽選処理中にサーバーエラーが発生しました');
  }

  return data;
};

/**
 * タイトル: LotterySuccessMessage / 抽選成功時メッセージ
 * 要約: 抽選が成功した際に表示するJSX要素を定義したコンポーネントです。
 * @returns {import('react').ReactElement} 成功メッセージのJSX。
 */
const LotterySuccessMessage = () => (
  <Fragment>
    抽選が終了しました。
    <br />
    座席表タブから結果を確認してください。
  </Fragment>
);

/**
 * タイトル: useLottery / 抽選機能管理フック
 * 要約: 抽選の実行と結果の表示状態を管理するカスタムフックです。
 * @returns {{
 *   result: import('react').ReactElement | null,
 *   executeLottery: (selectedEmployees: Array<string | number>) => Promise<boolean>,
 *   resetResult: () => void
 * }} 抽選結果、実行関数、リセット関数を含むオブジェクト。
 */
export function useLottery() {
  const [result, setResult] = useState(null);

  /**
   * タイトル: executeLottery / 抽選の実行
   * 要約: 社員リストのバリデーション後、抽選APIを呼び出し、結果に応じてUIを更新します。
   * @param {Array<string | number>} selectedEmployees - 抽選対象となる社員番号の配列。
   * @returns {Promise<boolean>} 処理が成功した場合はtrue、失敗した場合はfalseを返します。
   */
  const executeLottery = useCallback(async (selectedEmployees) => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      toast.error('社員を選択してください');
      return false;
    }

    try {
      await executeLotteryAPI(selectedEmployees);
      setResult(<LotterySuccessMessage />);
      toast.success('抽選が完了しました！');
      return true;
    } catch (error) {
      toast.error(error.message || '予期せぬエラーが発生しました');
      return false;
    }
  }, []);

  /**
   * タイトル: resetResult / 抽選結果のリセット
   * 要約: 表示されている抽選結果メッセージをクリア（非表示に）します。
   * @returns {void}
   */
  const resetResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    result,
    executeLottery,
    resetResult,
  };
}
