import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * タイトル: useProgress / 時間経過で進行するプログレス状態管理フック
 * 要約: プログレスバーのようなUIの進行度（0～100）とローディング状態を管理します。
 * 補足: 開始、完了、リセットの制御関数を提供し、コンポーネントのアンマウント時にタイマーを自動的にクリーンアップします。
 * @param {{increment?: number, interval?: number}} [options] - オプション。
 * @param {number} [options.increment=1] - 各インターバルで増加させる進行度の値。
 * @param {number} [options.interval=100] - 進行度を更新する間隔（ミリ秒）。
 * @returns {{
 *   isLoading: boolean,
 *   progress: number,
 *   startProgress: () => void,
 *   completeProgress: () => void,
 *   resetProgress: () => void
 * }} ローディング状態、現在の進行度、および制御関数を含むオブジェクト。
 */
export function useProgress({ increment = 1, interval = 100 } = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  /**
   * タイトル: clearTimer / タイマーのクリア
   * 要約: 実行中のsetIntervalタイマーを停止し、タイマーIDの参照をリセットします。
   * @returns {void}
   */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * タイトル: startProgress / プログレスの開始
   * 要約: プログレスを初期値から開始し、指定された間隔で進行させます。
   * 補足: 実行すると、まず既存のタイマーがクリアされ、新しいタイマーが開始されます。
   * @returns {void}
   */
  const startProgress = useCallback(() => {
    setIsLoading(true);
    setProgress((prev) => (prev > 0 ? prev : Math.max(0, increment))); // 進行中ならそのまま、そうでなければ初期化
    clearTimer();

    timerRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearTimer();
          return 100;
        }
        return Math.max(0, newProgress); // 負の値を防ぐ
      });
    }, interval);
  }, [increment, interval, clearTimer]);

  /**
   * タイトル: completeProgress / プログレスの強制完了
   * 要約: 進行状況を即座に100%にし、ローディング状態を終了します。
   * @returns {void}
   */
  const completeProgress = useCallback(() => {
    clearTimer();
    setProgress(100);
    setIsLoading(false);
  }, [clearTimer]);

  /**
   * タイトル: resetProgress / プログレスのリセット
   * 要約: 進行状況を0%に戻し、ローディング状態を終了します。
   * @returns {void}
   */
  const resetProgress = useCallback(() => {
    clearTimer();
    setProgress(0);
    setIsLoading(false);
  }, [clearTimer]);

  // コンポーネントがアンマウントされる際にタイマーを確実にクリアする
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return {
    isLoading,
    progress,
    startProgress,
    completeProgress,
    resetProgress,
  };
}
