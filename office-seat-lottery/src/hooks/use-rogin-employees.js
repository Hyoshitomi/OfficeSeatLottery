import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * タイトル: fetchEmployeesAPI / 社員リスト取得APIの呼び出し
 * 要約: APIエンドポイントから全社員のリストを取得します。
 * 補足: この関数はAPI通信ロジックのみに責務を限定しており、UIの更新やエラー通知は行いません。
 * @returns {Promise<Array<object>>} 成功時は社員データの配列、失敗時はエラーをスローします。
 * @throws {Error} APIリクエストが失敗した場合にスローされます。
 */
const fetchEmployeesAPI = async () => {
  const res = await fetch('/api/user/login'); // APIエンドポイントは元のコードを維持
  if (!res.ok) {
    throw new Error('Failed to fetch employees');
  }
  return res.json();
};

/**
 * タイトル: useEmployees / 社員データと選択状態の管理フック
 * 要約: ログインユーザーの権限に基づき、社員リストの取得、または自身の社員番号の選択状態を管理します。
 * @param {object | null} user - 現在のログインユーザー情報。adminFlagとemployeeNumberプロパティを含むことを期待します。
 * @returns {{
 *   employeeList: Array<object>,
 *   selectedEmployees: Array<string | number>,
 *   setSelectedEmployees: import('react').Dispatch<import('react').SetStateAction<Array<any>>>,
 *   isAdmin: boolean
 * }} 社員リスト、選択中の社員、そのセッター、管理者フラグを含むオブジェクト。
 */
export function useEmployees(user) {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const isAdmin = !!user?.adminFlag;

  /**
   * タイトル: loadEmployees / 社員リストの読み込みと状態更新
   * 要約: 社員取得APIを呼び出し、成功時はリストを更新、失敗時はエラー通知と共にリストを空にします。
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
    // ユーザー情報がない場合は何もしない
    if (!user) {
      return;
    }

    // 管理者の場合、全社員リストを取得
    if (isAdmin) {
      loadEmployees();
    }
    // 一般ユーザーの場合、自分の社員番号を選択状態に設定
    else if (user.employeeNumber) {
      setSelectedEmployees([user.employeeNumber]);
    }
  }, [user, isAdmin, loadEmployees]);

  return {
    employeeList,
    selectedEmployees,
    setSelectedEmployees,
    isAdmin,
  };
}
