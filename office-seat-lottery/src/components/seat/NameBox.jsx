'use client'
import { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import NameBoxPopOver from '@/components/seat/NameBoxPopOver'

export default function NameBox({
  id,
  name,
  isFixed,
  position,
  onDragStop,
  onUpdate,
}) {
  const nodeRef = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="both"
      bounds="parent"
      position={position}
      onStop={(_, data) => onDragStop(id, data.x, data.y)}
    >
      <div ref={nodeRef} className="relative w-[70px] h-[40px] cursor-grab">
        <Popover
          open={open}
          onOpenChange={(next) => {
            if (!next) setOpen(false)  // 左クリック等による開を無視
          }}
        >
          <PopoverTrigger asChild>
            <div
              onContextMenu={e => {
                e.preventDefault()     // ブラウザのコンテキストメニュー抑制
                setOpen(true)          // 右クリックでだけ開く
              }}
              className={`
                w-full h-full flex items-center justify-center
                bg-white rounded-[7px] border-3
                ${isFixed ? 'border-black' : 'border-[#1AA7FF]'}
              `}
            >
              <span className="text-[clamp(14px,2.5vw,20px)] break-words">
                {name}
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent side="right" className="w-40 p-2">
            <NameBoxPopOver
              id={id}
              name={name}
              isFixed={isFixed}
              onUpdate={onUpdate}
              onClose={() => setOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Draggable>
  )
}
