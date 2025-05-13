'use client'

import { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import NameBoxPopOver from '@/components/seat/NameBoxPopOver'

const statusStyle = {
  movable: 'border-[#1AA7FF] bg-[#FFFFFF] text-black',
  fixed: 'border-black bg-[#FFFFFF] text-black',
  unused: 'border-gray-400 bg-gray-200 text-gray-500',
  reserved: 'border-red-500 bg-red-100 text-red-600',
}

export default function NameBox({
  id,
  name,
  status,
  position,
  onDragStop,
  onUpdate,
  onDelete,
}) {
  const nodeRef = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: 0, y: 0 }}
      onStop={(_, data) => onDragStop(id, position.x + data.x, position.y + data.y)}
      // disabled={status === 'fixed' || status === 'unused' || status === 'reserved'}
    >
      <div
        ref={nodeRef}
        className={`w-[70px] h-[40px] flex items-center justify-center rounded-[7px] border-3 cursor-pointer select-none ${statusStyle[status]}`}
        onContextMenu={e => {
          e.preventDefault()
          setOpen(true)
        }}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div>{name}</div>
          </PopoverTrigger>
          <PopoverContent side="right" align="center" className="p-0 bg-transparent border-0 shadow-none">
            <NameBoxPopOver
              id={id}
              name={name}
              status={status}
              x={position.x}
              y={position.y}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onClose={() => setOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </Draggable>
  )
}
