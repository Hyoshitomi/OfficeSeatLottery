// SeatSelect.jsx
'use client'

import { useMemo } from 'react'
import { MultiSelect } from '@/components/ui/multi-select'

export function SeatSelect({
  usingSeatslist = [],
  selectedSeat = [],          // 例: ["B3"]
  setEmployeesSeat,           // setter
}) {
  const atLimit = selectedSeat.length >= 1

  // ① value を付与し、上限到達時は残りを disabled
  const seatOptions = useMemo(
    () =>
      usingSeatslist.map((opt) => ({
        ...opt,
        value: opt.id,                          // ← 必須！！
        disabled: atLimit && !selectedSeat.includes(opt.id),
      })),
    [usingSeatslist, atLimit, selectedSeat]
  )

  return (
    <div className="pt-4">
      <MultiSelect
        id="seat-select"
        options={seatOptions}
        value={selectedSeat}                    // ② 完全に制御する
        onValueChange={setEmployeesSeat}
        maxCount={1}
        maxSelections={1}
        placeholder="選択してください"
        variant="inverted"
        className="w-full"
      />
    </div>
  )
}
