// components/seat/NameBox.jsx
'use client'
import { useRef, useState, useEffect } from 'react'
import Draggable from 'react-draggable'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

export default function NameBox({
  id,
  name,
  isFixed,
  position,     // controlled で渡す x,y
  onDragStop,
  onUpdate,
}) {
  const nodeRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [editName, setEditName] = useState(name)
  const [editFixed, setEditFixed] = useState(isFixed)

  useEffect(() => {
    const t = setTimeout(() => onUpdate?.(id, editName, editFixed), 300)
    return () => clearTimeout(t)
  }, [id, editName, editFixed, onUpdate])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Draggable
          nodeRef={nodeRef}
          bounds="parent"
          position={position}                  // ← controlled
          onStop={(_, d) => onDragStop(id, d.x, d.y)}
        >
          <div
            ref={nodeRef}
            onClickCapture={e => e.button===0 && e.stopPropagation()}
            onContextMenu={e => (e.preventDefault(), setOpen(true))}
            className="relative w-[70px] h-[40px] bg-white cursor-grab"
          >
            <div className="absolute inset-0 flex items-center justify-center
                            text-[clamp(14px,2.5vw,20px)] break-words">
              {editName}
            </div>
            <div className={`absolute inset-0 rounded-[7px] border-3 pointer-events-none
                             ${editFixed ? 'border-black' : 'border-[#1AA7FF]'}`}/>
          </div>
        </Draggable>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-40 p-2">
        <label className="block mb-2">
          <span className="text-sm">表示名</span>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1 text-sm"
          />
        </label>
        <div className="mb-2 text-sm">固定／流動</div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center">
            <input
              type="radio" name={`fixed-${id}`}
              checked={editFixed}
              onChange={() => setEditFixed(true)}
            />
            <span className="ml-1">固定</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio" name={`fixed-${id}`}
              checked={!editFixed}
              onChange={() => setEditFixed(false)}
            />
            <span className="ml-1">流動</span>
          </label>
        </div>
      </PopoverContent>
    </Popover>
  )
}
