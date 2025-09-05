import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// --- 定数とヘルパー関数 ---

/**
 * タイトル: getStatusString / 座席ステータスの文字列変換
 * 要約: 数値で表される座席のステータスを、対応する文字列に変換します。
 * @param {number} status - 座席のステータスを表す数値 (1: movable, 2: fixed, 3: unused, 4: reserved)。
 * @returns {string} 'movable', 'fixed', 'unused', 'reserved' のいずれかの文字列。
 */
const getStatusString = (status) => {
  switch (status) {
    case 1:
      return 'movable';
    case 2:
      return 'fixed';
    case 3:
      return 'unused';
    case 4:
      return 'reserved';
    default:
      return 'movable';
  }
};

/**
 * タイトル: mapApiSeatToBox / APIレスポンスをUI用Boxオブジェクトに変換
 * 要約: APIから取得した単一の座席データを、フロントエンドで扱うBoxオブジェクトの形式にマッピングします。
 * @param {object} seat - APIから返された座席データオブジェクト。
 * @returns {{id: any, name: string, status: string, x: number, y: number}} UIで表示・操作するためのBoxオブジェクト。
 */
const mapApiSeatToBox = (seat) => ({
  id: seat.seatId,
  name: seat.name ?? `${seat.tableId}${seat.seatNumber}` ?? '',
  status: getStatusString(seat.status),
  x: seat.imageX ?? 0,
  y: seat.imageY ?? 0,
});

// --- API通信関数 ---

/**
 * タイトル: fetchSeatsAPI / 座席データ取得API
 * 要約: 指定されたエンドポイントと日付から座席データを取得します。
 * @param {string} endpoint - APIのエンドポイントURL。
 * @param {string | null} dateStr - 'YYYY-MM-DD'形式の日付文字列。
 * @returns {Promise<Array<object>>} APIから取得した座席データの配列。
 * @throws {Error} APIリクエストが失敗した場合にエラーをスローします。
 */
const fetchSeatsAPI = async (endpoint, dateStr = null) => {
  const url = dateStr ? `${endpoint}?date=${dateStr}` : endpoint;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch seats');
  }
  return res.json();
};

/**
 * タイトル: saveSeatsAPI / 座席データ保存API
 * 要約: 編集された座席情報をサーバーに送信して保存します。
 * @param {Array<object>} boxes - 保存対象のBoxオブジェクトの配列。
 * @returns {Promise<void>}
 * @throws {Error} APIリクエストが失敗した場合、APIからのエラーメッセージと共にスローします。
 */
const saveSeatsAPI = async (boxes) => {
  const res = await fetch('/api/seats/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boxes }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || '保存に失敗しました');
  }
};

/**
 * タイトル: exitSeatAPI / 座席解放API
 * 要約: 指定された座席IDをサーバーに送信し、解放処理を依頼します。
 * @param {string | number} seatId - 解放する座席のID。
 * @returns {Promise<void>}
 * @throws {Error} APIリクエストが失敗した場合、APIからのエラーメッセージと共にスローします。
 */
const exitSeatAPI = async (seatId) => {
  const res = await fetch('/api/seats/map', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seatId }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || '解放に失敗しました');
  }
};

// --- カスタムフック本体 ---

/**
 * タイトル: useSeats / 座席管理フック
 * 要約: 座席データの取得、保存、編集、追加、削除など、座席管理に関する一連の機能を提供します。
 * @returns {{
 *   boxes: Array<object>,
 *   setBoxes: import('react').Dispatch<import('react').SetStateAction<Array<object>>>,
 *   imgSize: {width: number, height: number},
 *   fetchSeats: (endpoint: string, dateStr?: string | null) => Promise<Array<object>>,
 *   saveSeats: (boxes: Array<object>) => Promise<boolean>,
 *   exitSeat: (seatId: string | number) => Promise<boolean>,
 *   updateBox: (id: string | number, updates: object) => void,
 *   deleteBox: (id: string | number) => void,
 *   addBox: (tableName: string) => object,
 *   handleImgLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
 * }}
 */
export function useSeats() {
  const [boxes, setBoxes] = useState([]);
  const [imgSize, setImgSize] = useState({ width: 832, height: 757 });

  /**
   * タイトル: fetchSeats / 座席データの取得と状態更新
   * 要約: 座席取得APIを呼び出し、結果をUI用のBox形式に変換して状態を更新します。
   * @param {string} endpoint - APIのエンドポイントURL。
   * @param {string | null} [dateStr=null] - 'YYYY-MM-DD'形式の日付文字列。
   * @returns {Promise<Array<object>>} 取得・変換されたBoxオブジェクトの配列。エラー時は空配列。
   */
  const fetchSeats = useCallback(async (endpoint, dateStr = null) => {
    try {
      const seats = await fetchSeatsAPI(endpoint, dateStr);
      const mappedSeats = seats.map(mapApiSeatToBox);
      setBoxes(mappedSeats);
      return mappedSeats;
    } catch (error) {
      // 元のコードの挙動を維持するため、エラー時はtoastを出さずに空にする
      setBoxes([]);
      return [];
    }
  }, []);

  /**
   * タイトル: saveSeats / 座席データの保存
   * 要約: 現在の座席情報をサーバーに保存します。結果はToastでユーザーに通知されます。
   * @param {Array<object>} currentBoxes - 保存するBoxオブジェクトの配列。
   * @returns {Promise<boolean>} 保存が成功した場合はtrue、失敗した場合はfalse。
   */
  const saveSeats = useCallback(async (currentBoxes) => {
    try {
      await saveSeatsAPI(currentBoxes);
      toast.success('保存しました！');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  }, []);

  /**
   * タイトル: exitSeat / 座席の解放
   * 要約: 指定された座席を解放し、成功すればUIからその座席を削除します。
   * @param {string | number} seatId - 解放する座席のID。
   * @returns {Promise<boolean>} 解放が成功した場合はtrue、失敗した場合はfalse。
   */
  const exitSeat = useCallback(async (seatId) => {
    try {
      await exitSeatAPI(seatId);
      setBoxes((prev) => prev.filter((b) => b.id !== seatId));
      toast.success('席を解放しました');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  }, []);

  /**
   * タイトル: updateBox / 単一Boxの更新
   * 要約: 指定されたIDのBoxオブジェクトを、指定された内容で更新します。
   * @param {string | number} id - 更新対象のBoxのID。
   * @param {object} updates - 更新内容を含むオブジェクト。
   * @returns {void}
   */
  const updateBox = useCallback((id, updates) => {
    setBoxes((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    );
  }, []);

  /**
   * タイトル: deleteBox / 単一Boxの削除
   * 要約: 指定されたIDのBoxオブジェクトをクライアントの状態から削除します。
   * @param {string | number} id - 削除対象のBoxのID。
   * @returns {void}
   */
  const deleteBox = useCallback((id) => {
    setBoxes((prev) => prev.filter((b) => b.id !== id));
  }, []);

  /**
   * タイトル: addBox / 新規Boxの追加
   * 要約: 新しいBoxオブジェクトを生成し、状態に追加します。IDは一時的にタイムスタンプで採番されます。
   * @param {string} tableName - 新規Boxが属するテーブル名（例: 'A'）。名前のプレフィックスとして使用されます。
   * @returns {object} 生成された新しいBoxオブジェクト。
   */
  const addBox = useCallback(
    (tableName) => {
      const nextId = Date.now();
      const offset = 8;
      const boxW = 100;
      const boxH = 40;
      const gap = 8;
      const plusSize = 32;

      const aCount = boxes.filter((b) =>
        new RegExp(`^${tableName}\\d+$`).test(b.name),
      ).length;

      const name = `${tableName}${aCount + 1}`;
      const x = imgSize.width - offset - plusSize - gap - boxW;
      const y = offset + boxH;

      const newBox = { id: nextId, name, status: 'movable', x, y };
      setBoxes((prev) => [...prev, newBox]);
      return newBox;
    },
    [boxes, imgSize.width],
  );

  /**
   * タイトル: handleImgLoad / 画像読み込み完了ハンドラ
   * 要約: 座席表画像の読み込みが完了した際に、その画像の固有サイズを状態に保存します。
   * @param {React.SyntheticEvent<HTMLImageElement, Event>} event - 画像のloadイベントオブジェクト。
   * @returns {void}
   */
  const handleImgLoad = useCallback((event) => {
    setImgSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  }, []);

  return {
    boxes,
    setBoxes,
    imgSize,
    fetchSeats,
    saveSeats,
    exitSeat,
    updateBox,
    deleteBox,
    addBox,
    handleImgLoad,
  };
}
