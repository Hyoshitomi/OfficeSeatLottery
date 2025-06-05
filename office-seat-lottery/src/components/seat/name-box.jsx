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

// スタイル判定を関数化
function getBorderStyle({ appoint, isSelected, status }) {
  if (appoint && isSelected) {
    return 'border-red-500 bg-red-50 text-black border-4'
  }
  return statusStyle[status]
}

// 右クリックハンドラ
function createContextMenuHandler(appoint, setOpen) {
  return (e) => {
    e.preventDefault()
    if (!appoint) {
      setOpen(true)
    }
  }
}

// クリックハンドラ
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

// ドラッグ停止ハンドラ
function createDragStopHandler(onDragStop, id, safePosition) {
  return (_, data) => {
    if (onDragStop) {
      onDragStop(id, safePosition.x + data.x, safePosition.y + data.y)
    }
  }
}

// 安全な位置を取得
function getSafePosition(position) {
  return {
    x: position?.x || 0,
    y: position?.y || 0
  }
}

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
