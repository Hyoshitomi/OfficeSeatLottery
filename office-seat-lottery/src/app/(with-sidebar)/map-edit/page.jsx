'use client'
import { useState, useRef } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import SeatCanvas from '@/components/seat/SeatCanvas'
import SidebarRight from '@/components/sidebar/right-sidebar'

export default function Page() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize]       = useState({ width: 0, height: 0 })
  const [boxes, setBoxes]           = useState([])
  const fileInputRef = useRef(null)

  const handleImgLoad = e => {
    setImgSize({
      width:  e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    })
  }

  const handleFileChange = file => {
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleStop = (id, x, y) =>
    setBoxes(prev => prev.map(b => b.id === id ? { ...b, x, y } : b))

  const handleUpdate = (id, newName, newFixed) =>
    setBoxes(prev => prev.map(b =>
      b.id === id ? { ...b, name: newName, isFixed: newFixed } : b
    ))

  const handleAddBox = () => {
    const nextId   = Date.now()
    const offset   = 8
    const boxW     = 100
    const boxH     = 40
    const gap      = 8
    const plusSize = 32

    setBoxes(prev => {
      const aCount = prev.filter(b => /^A\d+$/.test(b.name)).length
      const name   = `A${aCount + 1}`
      const x = imgSize.width - offset - plusSize - gap - boxW
      const y = offset + boxH
      return [...prev, { id: nextId, name, isFixed: false, x, y }]
    })
  }

  return (
  <>
    <SiteHeader title="座席図編集" />
    <div className="flex flex-row flex-1">
      <main className="flex-1 p-4 flex flex-row justify-center space-x-4">
      <SeatCanvas
        src={previewImage}
        imgSize={imgSize}
        boxes={boxes}
        onImgLoad={handleImgLoad}
        onDragStop={handleStop}
        onUpdate={handleUpdate}
        onAddBox={handleAddBox}
      />
      </main>
      <SidebarRight onFileChange={handleFileChange} />
    </div>
  </>
  )

}
