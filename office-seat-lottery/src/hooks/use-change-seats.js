import { useCallback } from 'react';
import { toast } from 'sonner';

/**
 * タイトル: changeSeatsAPI / 座席交換APIの呼び出し
 * 要約: 2つの指定された座席IDを交換するためのAPIリクエストをサーバーに送信します。
 * 補足: この関数はAPI通信ロジックに特化しており、UI関連の処理（通知など）は行いません。
 * @param {string | number} seatIdA - 交換元となる座席のID。
 * @param {string | number} seatIdB - 交換先となる座席のID。
 * @returns {Promise<any>} APIからの成功レスポンスデータ。
 * @throws {Error} APIリクエストが失敗した場合、レスポンスから取得したエラーメッセージを含むエラーをスローします。
 */
const changeSeatsAPI = async (seatIdA, seatIdB) => {
  const res = await fetch('/api/seats/change', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ seatA: seatIdA, seatB: seatIdB }),
  });

  const data = await res.json().catch(() => ({})); // JSONパース失敗時は空オブジェクトでフォールバック

  if (!res.ok) {
    // APIが返したエラーメッセージを優先し、なければ汎用メッセージを使用
    throw new Error(data.error || '交換処理中にサーバーエラーが発生しました');
  }

  return data;
};

/**
 * タイトル: useChange / 座席交換実行フック
 * 要約: 2つの座席を交換するロジックとUIフィードバックをカプセル化したカスタムフックです。
 * 補足: このフックが返す関数は、バリデーション、API呼び出し、UIへの結果通知（Toast）までの一連の処理を担います。
 * @returns {function(seatIdA: string | number, seatIdB: string | number): Promise<boolean>} 座席交換を実行する非同期関数。処理の成功時にtrue、失敗時にfalseを返します。
 */
export function useChange() {
  const executeChange = useCallback(async (seatIdA, seatIdB) => {
    if (!seatIdA || !seatIdB) {
      toast.error('交換する社員を選択してください');
      return false;
    }

    try {
      await changeSeatsAPI(seatIdA, seatIdB);
      toast.success('交換が完了しました！');
      return true;
    } catch (error) {
      // changeSeatsAPIからスローされたエラー、またはfetch自体のネットワークエラーを捕捉
      // error.messageにはAPIからの具体的なエラーか、汎用メッセージが入る
      toast.error(error.message || '予期せぬエラーが発生しました');
      return false;
    }
  }, []);

  return executeChange;
}
