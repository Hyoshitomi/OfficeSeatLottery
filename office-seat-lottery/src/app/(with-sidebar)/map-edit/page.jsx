'use client'

import { useState, useRef } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import SeatCanvas from '@/components/seat/SeatCanvas'
import SidebarRight from '@/components/sidebar/right-sidebar'

export default function Page() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
  const [boxes, setBoxes] = useState([])
  const fileInputRef = useRef(null)

  const handleImgLoad = e => {
    setImgSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    })
  }

  const handleFileChange = file => {
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleStop = (id, x, y) =>
    setBoxes(prev => prev.map(b => b.id === id ? { ...b, x, y } : b))

  const handleUpdate = (id, newName, newStatus, newX, newY) =>
    setBoxes(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              name: newName,
              status: newStatus,
              x: newX !== undefined ? newX : b.x,
              y: newY !== undefined ? newY : b.y,
            }
          : b
      )
    )

  const handleDelete = id =>
    setBoxes(prev => prev.filter(b => b.id !== id))

  const handleAddBox = () => {
    const nextId = Date.now()
    const offset = 8
    const boxW = 100
    const boxH = 40
    const gap = 8
    const plusSize = 32
    const aCount = boxes.filter(b => /^A\d+$/.test(b.name)).length
    const name = `A${aCount + 1}`
    const x = imgSize.width - offset - plusSize - gap - boxW
    const y = offset + boxH
    setBoxes(prev => [
      ...prev,
      { id: nextId, name, status: 'movable', x, y }
    ])
  }

  return (
    <>
      <SiteHeader title="座席図編集" />
      <div className="flex flex-row h-[calc(100vh-56px)]">
        <div className="flex-1 flex flex-col items-center justify-center">
          <SeatCanvas
            src={previewImage}
            imgSize={imgSize}
            boxes={boxes}
            onImgLoad={handleImgLoad}
            onDragStop={handleStop}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAddBox={handleAddBox}
          />
        </div>
        <SidebarRight
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
      </div>
    </>
  )
}
