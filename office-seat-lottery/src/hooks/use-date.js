import { useState, useCallback } from 'react';

/**
 * タイトル: formatDateToYYYYMMDD / Dateを 'yyyy-mm-dd' 形式に変換
 * 要約: JavaScriptのDateオブジェクトを受け取り、'yyyy-mm-dd' 形式の文字列にフォーマットします。
 * 補足: この関数は状態に依存しない純粋なユーティリティ関数です。
 * @param {Date} date - フォーマット対象のDateオブジェクト。
 * @returns {string} 'yyyy-mm-dd' 形式の文字列。
 */
const formatDateToYYYYMMDD = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * タイトル: useDate / 日付の状態管理フック
 * 要約: 日付の選択状態とその日付を扱うためのユーティリティ群を提供するカスタムフックです。
 * @param {Date} [initialDate=new Date()] - フックの初期状態として設定する日付。デフォルトは現在日時。
 * @returns {{
 *   selectedDate: Date,
 *   setSelectedDate: import('react').Dispatch<import('react').SetStateAction<Date>>,
 *   getDateString: (date?: Date) => string,
 *   setToday: () => void
 * }} 選択中の日付、そのセッター、日付を文字列に変換する関数、今日にリセットする関数を含むオブジェクト。
 */
export function useDate(initialDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  /**
   * タイトル: getDateString / 日付の文字列変換
   * 要約: 指定されたDateオブジェクトを 'yyyy-mm-dd' 形式の文字列に変換します。引数がなければ選択中の日付を対象とします。
   * @param {Date} [date=selectedDate] - フォーマット対象のDateオブジェクト。デフォルトは現在フックで選択されている日付。
   * @returns {string} 'yyyy-mm-dd' 形式の文字列。
   */
  const getDateString = useCallback(
    (date = selectedDate) => {
      return formatDateToYYYYMMDD(date);
    },
    [selectedDate],
  );

  /**
   * タイトル: setToday / 日付を今日に設定
   * 要約: 選択されている日付を現在のローカル日時にリセットします。
   * @returns {void}
   */
  const setToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    getDateString,
    setToday,
  };
}
