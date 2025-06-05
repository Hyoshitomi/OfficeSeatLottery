'use client'

import { useRef, useState } from 'react'
import Draggable from 'react-draggable'

import NameBoxPopOver from '@/components/seat/name-box-pop-over'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

const statusStyle = {
  movable: 'border-[#1AA7FF] bg-[#FFFFFF] text-black',
  fixed: 'border-black bg-[#FFFFFF] text-black',
  unused: 'border-gray-400 bg-gray-200 text-gray-500',
  reserved: 'border-green-500 bg-green-100 text-green-600',
}

export default function NameBox({
  id,
  name,
  status,
  position = { x: 0, y: 0 }, // デフォルト値を設定
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

  // 安全な位置取得
  const safePosition = {
    x: position?.x || 0,
    y: position?.y || 0
  }

  // moveに関係なく右クリックでPopoverを開く
  const handleContextMenu = e => {
    e.preventDefault()
    if (!appoint) { // 予約画面ではPopoverを表示しない
      setOpen(true)
    }
  }

  // クリック時の処理
  const handleClick = (e) => {
    e.preventDefault()
    if (appoint && onSeatClick) {
      onSeatClick(id) // 予約画面では座席選択処理（複数選択対応）
    } else if (!appoint) {
      setOpen(true) // 通常画面ではPopover表示
    }
  }

  // 予約画面で選択中の場合は赤枠、それ以外は通常のスタイル
  const borderStyle = appoint && isSelected 
    ? 'border-red-500 bg-red-50 text-black border-4' // 選択時は少し背景色も変更し、枠を太く
    : statusStyle[status]

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: 0, y: 0 }}
      onStop={(_, data) => onDragStop && onDragStop(id, safePosition.x + data.x, safePosition.y + data.y)}
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
