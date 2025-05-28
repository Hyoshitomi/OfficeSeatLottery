'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const statusOptions = [
  { value: 'movable', label: '流動' },
  { value: 'fixed', label: '固定' },
  { value: 'unused', label: '不使用' },
  { value: 'reserved', label: '予約' },
]

export default function NameBoxPopOver({
  id,
  name,
  status,
  x,
  y,
  move = false,
  onUpdate, 
  onDelete, 
  onExit,
}) {
  const [editName, setEditName] = useState(name)
  const [editStatus, setEditStatus] = useState(status)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isAfter, setIsAfter] = useState(false)

  useEffect(() => {
    // マウント時に現在時刻が9時以降かどうか判定
    const now = new Date()
    setIsAfter(now.getHours() >= 9)
  }, [])

  useEffect(() => {
    if (move) {
      const t = setTimeout(() => {
        onUpdate?.(id, editName, editStatus, x, y)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [id, editName, editStatus, x, y, onUpdate, move])

  // move=false かつ statusが'movable' かつ 13時以降のみ解放ボタン表示
  if (!move) {
    if (status !== 'movable' || !isAfter) {
      return <></>
    }
    return (
      <div className="absolute top-0 ml-2 z-50 flex flex-col gap-2 min-w-[240px] bg-white shadow-lg border rounded p-3">
        {!showConfirm ? (
          <Button
            variant="destructive"
            onClick={() => setShowConfirm(true)}
          >
            解放
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="text-sm text-red-600">
              席を開放するための機能です。
              <br />
              一度開放すると再度抽選が必要になります。
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                onExit?.(id)
                setShowConfirm(false)
              }}
            >
              OK
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
            >
              キャンセル
            </Button>
          </div>
        )}
      </div>
    )
  }

  // move=trueの場合は従来の編集UI表示
  return (
    <div className="absolute top-0 ml-2 z-50 flex flex-col gap-2 min-w-[180px] bg-white shadow-lg border rounded p-3">
      <label className="text-xs text-gray-500">座席名</label>
      <input
        className="border rounded px-2 py-1"
        value={editName}
        onChange={e => setEditName(e.target.value)}
      />
      <label className="text-xs text-gray-500 mt-2">ステータス</label>
      <select
        className="border rounded px-2 py-1"
        value={editStatus}
        onChange={e => setEditStatus(e.target.value)}
      >
        {statusOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="flex justify-between mt-3">
        <div className="mt-2 text-xs text-gray-500">
          座標 :  ({x}, {y})
        </div>
        <Button
          variant="destructive"
          onClick={() => { onDelete?.(id) }}
        >
          削除
        </Button>
      </div>
    </div>
  )
}
