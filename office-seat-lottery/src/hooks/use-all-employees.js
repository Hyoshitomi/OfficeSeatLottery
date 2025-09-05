import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * タイトル: fetchEmployeesAPI / 社員リスト取得APIの呼び出し
 * 要約: APIエンドポイントから社員リストを取得します。
 * 補足: この関数はAPI通信ロジックのみに責務を限定しており、UIの更新やエラー通知は行いません。
 * @returns {Promise<Array<object>>} 成功時は社員データの配列、失敗時はエラーをスローします。
 * @throws {Error} APIリクエストが失敗した場合にスローされます。
 */
const fetchEmployeesAPI = async () => {
  const res = await fetch('/api/user/appoint');
  if (!res.ok) {
    throw new Error('Failed to fetch employees');
  }
  return res.json();
};

/**
 * タイトル: useEmployees / 社員データ管理フック
 * 要約: 社員リストの取得と選択状態を管理するカスタムフックです。
 * 補足: ログインユーザー情報（user）が変更されると、社員リストを自動的に再取得します。
 * @param {object} user - 現在のログインユーザー情報。adminFlagプロパティを含むことを期待します。
 * @returns {{
 *   employeeList: Array<object>,
 *   selectedEmployees: Array<object>,
 *   setSelectedEmployees: import('react').Dispatch<import('react').SetStateAction<Array<object>>>,
 *   isAdmin: boolean,
 *   loadEmployees: () => Promise<void>
 * }} 社員リスト、選択状態、管理者フラグ、および手動更新関数を含むオブジェクト。
 */
export function useEmployees(user) {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  /**
   * タイトル: loadEmployees / 社員リストの読み込みと状態更新
   * 要約: 社員取得APIを呼び出し、結果をコンポーネントの状態に反映させます。
   * 補足: 取得成功時はリストを更新し、失敗時はエラー通知を表示してリストを空にします。
   * @returns {Promise<void>} 処理が完了すると解決されるPromise。
   */
  const loadEmployees = useCallback(async () => {
    try {
      const data = await fetchEmployeesAPI();
      setEmployeeList(data);
    } catch (error) {
      toast.error('社員リストの取得に失敗しました');
      setEmployeeList([]);
    }
  }, []);

  useEffect(() => {
    // userオブジェクトが存在する場合のみデータを取得
    if (user) {
      loadEmployees();
    }
  }, [user, loadEmployees]);

  return {
    employeeList,
    selectedEmployees,
    setSelectedEmployees,
    isAdmin: !!user?.adminFlag,
    loadEmployees,
  };
}
