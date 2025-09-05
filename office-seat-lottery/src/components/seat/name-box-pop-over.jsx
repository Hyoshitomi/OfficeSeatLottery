// name-box-pop-over.jsx
'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

/**
 * ステータス選択肢（既存仕様に合わせる）
 */
const statusOptions = [
  { value: 'movable', label: '使用' },
  { value: 'unused', label: '不使用' },
];

/**
 * タイトル: NameBoxPopOver / ボックス編集・操作ポップオーバー
 * 要約: moveモードでは名称/状態の編集、通常モードでは時間要件を満たす場合に解放操作を提供します。
 * 補足: 予約画面（appoint）ではポップオーバーを表示しません。
 * @param {{
 *  id: string|number,
 *  name: string,
 *  status: string,
 *  x: number, y: number,
 *  move?: boolean,
 *  appoint?: boolean,
 *  onUpdate?: (id:string|number, updates:{name?:string,status?:string,x?:number,y?:number}) => void,
 *  onDelete?: (id:string|number) => void,
 *  onExit?: (id:string|number) => void
 * }} props - プロパティ群。
 * @returns {import('react').ReactElement|null}
 */
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
  appoint = false,
}) {
  const [editName, setEditName] = useState(name);
  const [editStatus, setEditStatus] = useState(status || 'movable');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isAfter, setIsAfter] = useState(false);

  // 9時以降かを判定（マウント時）
  useEffect(() => {
    const now = new Date();
    setIsAfter(now.getHours() >= 9);
  }, []);

  // moveモードでは名称/状態変更をデバウンスして親に反映
  useEffect(() => {
    if (move) {
      const t = setTimeout(() => {
        onUpdate?.(id, {
          name: editName,
          status: editStatus,
          x,
          y
        })
      }, 300)
      return () => clearTimeout(t)
    }
    return undefined
  }, [id, editName, editStatus, x, y, onUpdate, move]);

  // 予約画面では表示しない
  if (appoint) return null;

  // 非move（通常時）
  if (!move) {
    // 使用中かつ9時以降のみ解放UIを表示
    if (status !== 'movable' || !isAfter) return null;

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
                // 解放時にトーストを表示
                onExit?.(id)
                toast.success("席を解放しました")
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


  // move（編集時）
  return (
    <div className="absolute top-0 ml-2 z-50 flex flex-col gap-2 min-w-[180px] bg-white shadow-lg border rounded p-3">
      <label className="text-xs text-gray-500">座席名</label>
      <input
        className="border rounded px-2 py-1"
        value={editName}
        onChange={e => setEditName(e.target.value)}
      />
      
      <label className="text-xs text-gray-500 mt-2">ステータス</label>
      <div className="flex gap-4">
        {statusOptions.map(opt => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value={opt.value}
              checked={editStatus === opt.value}
              onChange={e => setEditStatus(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
      
      <div className="flex justify-between mt-3">
        <div className="mt-2 text-xs text-gray-500">
          座標 :  ({x}, {y})
        </div>
        <Button
          variant="destructive"
          onClick={() => {
            onDelete?.(id)
            toast.success("座席を削除しました")
          }}
        >
          削除
        </Button>
      </div>
    </div>
  )
}
