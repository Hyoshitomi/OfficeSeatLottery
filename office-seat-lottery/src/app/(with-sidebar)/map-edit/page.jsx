'use client'
import { useRef, useState } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import { Button } from '@/components/ui/button'
import NameBox from '@/components/seat/NameBox'

export default function Home() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize]       = useState({ width: 0, height: 0 })
  const [boxes, setBoxes]           = useState([])

  const fileInputRef = useRef(null)
  const onButtonClick = () => fileInputRef.current.click()
  const onFileChange  = e => {
    const file = e.target.files?.[0]
    file && setPreviewImage(URL.createObjectURL(file))
  }
  const onImgLoad = e => setImgSize({
    width:  e.currentTarget.naturalWidth,
    height: e.currentTarget.naturalHeight,
  })

  const handleStop = (id, x, y) =>
    setBoxes(prev => prev.map(b => b.id===id ? { ...b, x, y } : b))

  const handleUpdate = (id, newName, newFixed) =>
    setBoxes(prev => prev.map(b => b.id===id
      ? { ...b, name: newName, isFixed: newFixed }
      : b
    ))

  const handleAddBox = () => {
    const nextId   = Date.now()
    const offset   = 8     // 画像端＋ボタン余白
    const boxW     = 100
    const boxH     = 40
    const gap      = 8
    const plusSize = 32    // w-8=2rem

    setBoxes(prev => {
      const aCount = prev.filter(b => /^A\d+$/.test(b.name)).length
      const idx    = aCount    // 0-based
      const name   = `A${idx+1}`

      const x = imgSize.width
              - offset
              - plusSize
              - gap
              - boxW

      // プラスボタンの y=offset から下方向にずらす
      const y = offset + boxH

      return [
        ...prev,
        { id: nextId, name, isFixed: false, x, y }
      ]
    })
  }

  return (
    <>
      <SiteHeader title="座席図編集" />
      <main className="flex-1 p-4 flex flex-col items-center space-y-4">
        <div
          className="relative"
          style={{ width: imgSize.width, height: imgSize.height }}
        >
          <img
            src={previewImage}
            alt="プレビュー画像"
            onLoad={onImgLoad}
            className="absolute top-0 left-0"
          />

          {boxes.map(b => (
            <NameBox
              key={b.id}
              id={b.id}
              name={b.name}
              isFixed={b.isFixed}
              position={{ x: b.x, y: b.y }}    // ← controlled prop
              onDragStop={handleStop}
              onUpdate={handleUpdate}
            />
          ))}

          <button
            onClick={handleAddBox}
            className="
              absolute top-2 right-2
              w-8 h-8 leading-none
              bg-[#1AA7FF] text-white
              rounded-full flex items-center justify-center
              text-xl shadow-md hover:bg-blue-500
            "
          >
            +
          </button>
        </div>

        <div className="flex space-x-2">
          <Button onClick={onButtonClick}>画像を変更</Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </main>
    </>
  )
}
