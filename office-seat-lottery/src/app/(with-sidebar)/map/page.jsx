'use client'

import { useState, useRef, useEffect } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import SeatCanvas from '@/components/seat/SeatCanvas'
import { Progress } from "@/components/ui/progress"

export default function Page() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
  const [boxes, setBoxes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0) 

  // 疑似プログレスバー
  useEffect(() => {
    if (!isLoading) {
      setProgress(100)
      return
    }
    setProgress(0)
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 95) return Math.min(prev + Math.random() * 5, 95)
        return prev
      })
    }, 100)
    return () => clearInterval(timer)
  }, [isLoading])

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
          setBoxes([])
        }
        setProgress(100)
        setTimeout(() => {
          setIsLoading(false)
        }, 400) // 0.4秒ほど100%を見せる
      } catch (e) {
        setBoxes([])
        setProgress(100)
        setTimeout(() => {
          setIsLoading(false)
        }, 400)
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
  
  const handleExit = async (seatId) => {
    setBoxes(prev => prev.filter(b => b.id !== seatId))
    const res = await fetch('/api/seats/map', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId }),
    });
    if (res.ok) {
      alert('席を解放しました');
      // 状態更新など
    } else {
      alert('解放に失敗しました');
    }
  }

  return (
    <>
      <SiteHeader title="座席図" />
      <div className="flex flex-row h-[calc(100vh-56px)]">
        <div className="flex-1 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="w-2/3 max-w-md">
                <Progress value={progress} className="h-4" />
                <div className="text-center mt-2 text-sm text-gray-500">
                  {progress < 100 ? `読み込み中... (${Math.floor(progress)}%)` : "完了"}
                </div>
              </div>
            </div>
          ) : (
            <SeatCanvas
              src={previewImage}
              imgSize={imgSize}
              boxes={boxes}
              onImgLoad={handleImgLoad}
              onDragStop={handleStop}
              onExit={handleExit}
              move={false}
            />
          )}
        </div>
      </div>
    </>
  )
}