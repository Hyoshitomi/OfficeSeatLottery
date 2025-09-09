// name-box.jsx
'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import Draggable from 'react-draggable';
import NameBoxPopOver from '@/components/seat/name-box-pop-over';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

/**
 * ステータス別スタイル定義（既存デザイン前提のクラスセット）
 */
const statusStyle = {
  movable: 'border-[#1AA7FF] bg-[#FFFFFF] text-black',
  fixed: 'border-black bg-[#FFFFFF] text-black',
  unused: 'border-gray-400 bg-gray-200 text-gray-500',
  reserved: 'border-green-500 bg-green-100 text-green-600',
};

/**
 * タイトル: getBorderStyle / 枠線スタイルの決定
 * 要約: 指定状態に応じたボックスのボーダー・背景スタイルを返します。
 * 補足: 指定と選択が同時の場合は強調表示します。
 * @param {{ appoint?: boolean, isSelected?: boolean, status: keyof typeof statusStyle }} params - 状態パラメータ。
 * @returns {string} クラス名。
 */
function getBorderStyle({ appoint, isSelected, status }) {
  if (appoint && isSelected) {
    return 'border-red-500 bg-red-50 text-black border-4'
  }
  return statusStyle[status]
}


/**
 * タイトル: createContextMenuHandler / 右クリック時の処理
 * 要約: 予約画面でない場合にポップオーバーを開きます。
 * @param {boolean} appoint - 予約画面かどうか。
 * @param {(open: boolean) => void} setOpen - ポップオーバー開閉Setter。
 * @returns {(e: MouseEvent) => void} イベントハンドラ。
 */
function createContextMenuHandler(appoint, setOpen) {
  return (e) => {
    e.preventDefault()
    if (!appoint) {
      setOpen(true)
    }
  }
}

/**
 * タイトル: createClickHandler / クリック時の処理
 * 要約: 予約画面では座席クリックを親に通知、編集画面ではポップオーバーを開きます。
 * @param {boolean} appoint - 予約画面かどうか。
 * @param {(id: string|number) => void | undefined} onSeatClick - 座席クリックハンドラ。
 * @param {string|number} id - 座席ID。
 * @param {(open: boolean) => void} setOpen - ポップオーバー開閉Setter。
 * @returns {(e: MouseEvent) => void} イベントハンドラ。
 */
function createClickHandler(appoint, onSeatClick, id, setOpen) {
  return (e) => {
    e.preventDefault()
    if (appoint && onSeatClick) {
      onSeatClick(id)
    } else if (!appoint) {
      setOpen(true)
    }
  }
}

/**
 * タイトル: createDragStopHandler / ドラッグ停止時の処理
 * 要約: ドラッグ後の相対位置を安全な基準位置に加算して親に通知します。
 * @param {(id: string|number, x: number, y: number) => void | undefined} onDragStop - 停止時コールバック。
 * @param {string|number} id - 座席ID。
 * @param {{x:number,y:number}} safePosition - 基準位置。
 * @returns {(_: any, data: {x:number, y:number}) => void} ハンドラ。
 */
function createDragStopHandler(onDragStop, id, safePosition) {
  return (_, data) => {
    if (onDragStop) {
      onDragStop(id, safePosition.x + data.x, safePosition.y + data.y)
    }
  }
}

/**
 * タイトル: getSafePosition / 安全な位置の取得
 * 要約: 未定義やNaNを避け、x/yが常に数値となる位置オブジェクトを返します。
 * @param {{x?:number,y?:number}|undefined} position - 元位置。
 * @returns {{x:number,y:number}} 安全な位置。
 */
function getSafePosition(position) {
  return {
    x: position?.x || 0,
    y: position?.y || 0
  }
}

/**
 * タイトル: NameBox / 座席ボックス表示・操作コンポーネント
 * 要約: 座席名、ステータスに応じた見た目を適用し、編集/予約時の操作を提供します。
 * 補足: デザインは既存クラスを使用し、余計な装飾は追加しません。
 * @param {{
 *  id: string|number,
 *  name: string,
 *  status: 'movable'|'fixed'|'unused'|'reserved',
 *  position?: {x:number,y:number},
 *  onDragStop?: (id:string|number, x:number, y:number) => void,
 *  onUpdate?: (id:string|number, updates: {name?:string,status?:string,x?:number,y?:number}) => void,
 *  onDelete?: (id:string|number) => void,
 *  onExit?: (id:string|number) => void,
 *  onSeatClick?: (id:string|number) => void,
 *  isSelected?: boolean,
 *  appoint?: boolean,
 *  move?: boolean
 * }} props - 各種プロパティ。
 * @returns {import('react').ReactElement}
 */
export default function NameBox({
  id,
  name,
  status,
  position = { x: 0, y: 0 },
  onDragStop,
  onUpdate,
  onDelete,
  onExit,
  onSeatClick,
  isSelected = false,
  appoint = false,
  move = false, 
}) {
  const nodeRef = useRef(null)
  const [open, setOpen] = useState(false)

  const safePosition = getSafePosition(position)
  const borderStyle = getBorderStyle({ appoint, isSelected, status })
  const handleContextMenu = createContextMenuHandler(appoint, setOpen)
  const handleClick = createClickHandler(appoint, onSeatClick, id, setOpen)
  const handleDragStop = createDragStopHandler(onDragStop, id, safePosition)

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: 0, y: 0 }}
      onStop={handleDragStop}
      disabled={!move} 
    >
      <div
        ref={nodeRef}
        className={`w-[70px] h-[40px] flex items-center justify-center rounded-[7px] border-3 cursor-pointer select-none ${borderStyle}`}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        style={{ cursor: move ? 'pointer' : 'default' }} 
      >
        <Popover open={open && !appoint} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div>{name}</div>
          </PopoverTrigger>
          <PopoverContent side="right" align="center" className="p-0 bg-transparent border-0 shadow-none">
          <NameBoxPopOver
            id={id}
            name={name}
            status={status}
            x={safePosition.x}
            y={safePosition.y}
            onUpdate={onUpdate}
            onDelete={onDelete}
            move={move}
            onExit={onExit} 
            appoint={appoint}
          />
          </PopoverContent>
        </Popover>
      </div>
    </Draggable>
  )
}
