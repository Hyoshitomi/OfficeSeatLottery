'use client'

import { useState, useRef, useEffect } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import SeatCanvas from '@/components/seat/SeatCanvas'

export default function Page() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
  const [boxes, setBoxes] = useState([])
  const [isLoading, setIsLoading] = useState(false) 

  // 初回マウント時にDBから座席データを取得
  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/seats/map')
        if (res.ok) {
          const seats = await res.json()
          setBoxes(
            seats.map(seat => ({
              id: seat.seatId,
              // APIのnameをそのまま使う
              name: seat.name ?? '',
              status:
                seat.status === 1 ? 'movable' :
                seat.status === 2 ? 'fixed' :
                seat.status === 3 ? 'unused' :
                seat.status === 4 ? 'reserved' : 'movable',
              x: seat.imageX ?? 0,
              y: seat.imageY ?? 0,
            }))
          )
        } else {
          // エラー時の処理
          setBoxes([])
        }
      } catch (e) {
        // 通信エラー時の処理
        setBoxes([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchSeats()
  }, [])
  
  const handleImgLoad = e => {
    setImgSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    })
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
    // テーブル名でカウント
    const aCount = boxes.filter(b => new RegExp(`^${tableName}\\d+$`).test(b.name)).length
    const name = `${tableName}${aCount + 1}`
    const x = imgSize.width - offset - plusSize - gap - boxW
    const y = offset + boxH
    setBoxes(prev => [
      ...prev,
      { id: nextId, name, status: 'movable', x, y }
    ])
  }

  return (
    <>
      <SiteHeader title="座席図" />
      <div className="flex flex-row h-[calc(100vh-56px)]">
        <div className="flex-1 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-xl font-bold animate-pulse">Loading...</div>
            </div>
          ) : (
            <SeatCanvas
              src={previewImage}
              imgSize={imgSize}
              boxes={boxes}
              onImgLoad={handleImgLoad}
              onDragStop={handleStop}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onAddBox={handleAddBox}
              move={false}
            />
          )}
        </div>
      </div>
    </>
  )
}