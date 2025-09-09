'use client';

import { useMemo } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';

// 定数として選択上限を定義
const SELECTION_LIMIT = 1;

/**
 * タイトル: SeatSelect / 座席選択コンポーネント
 * 要約: 利用可能な座席リストから、指定された上限数まで座席を選択するためのUIを提供します。
 * @param {{
 *   usingSeatslist:   Array<{id: string | number, name: string}>,
 *   selectedSeat:     Array<string | number>,
 *   setEmployeesSeat: (selected: Array<string | number>) => void
 * }} props
 * @param {Array<{id: string | number, name: string}>} [props.usingSeatslist=[]] - 選択肢となる座席のリスト。
 * @param {Array<string | number>} [props.selectedSeat=[]] - 現在選択されている座席のIDの配列。
 * @param {(selected: Array<string | number>) => void} props.setEmployeesSeat - 選択が変更されたときに呼び出されるセッター関数。
 * @returns {import('react').ReactElement} 座席選択用のMultiSelectコンポーネント。
 */
export function SeatSelect({
  usingSeatslist = [],
  selectedSeat = [],
  setEmployeesSeat,
}) {
  // 選択数が上限に達したかどうかを判定
  const isLimitReached = selectedSeat.length >= SELECTION_LIMIT;

  /**
   * MultiSelectコンポーネントに渡すための選択肢リストをメモ化。
   * 上限に達した場合、選択中の項目以外は無効化（disabled）する。
   */
  const seatOptions = useMemo(
    () =>
      usingSeatslist.map((option) => ({
        ...option,
        value: option.id, // MultiSelectが要求するvalueプロパティ
        disabled: isLimitReached && !selectedSeat.includes(option.id),
      })),
    [usingSeatslist, isLimitReached, selectedSeat],
  );

  return (
    <MultiSelect
      options={seatOptions}
      value={selectedSeat}
      onValueChange={setEmployeesSeat}
      maxCount={SELECTION_LIMIT}
      maxSelections={SELECTION_LIMIT}
      placeholder={`席を${SELECTION_LIMIT}つ選択してください`}
      variant="inverted"
      className="w-full"
    />
  );
}
