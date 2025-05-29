'use client'

import { useState, useRef, useEffect } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import SeatCanvas from '@/components/seat/SeatCanvas'
import SidebarRight from '@/components/sidebar/right-sidebar-edit'
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react";
import { toast } from "sonner" // 追加

export default function Page() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
  const [boxes, setBoxes] = useState([])
  const [tableName, setTableName] = useState("A")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)
  const { data: session } = useSession();
  const user = session?.user;

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
        const res = await fetch('/api/seats/edit')
        if (res.ok) {
          const seats = await res.json()
          setBoxes(
            seats.map(seat => ({
              id: seat.seatId,
              name: `${seat.tableId}${seat.seatNumber}`,
              status:
                seat.status === 1 ? 'movable' :
                seat.status === 2 ? 'fixed' :
                seat.status === 3 ? 'unused' :
                seat.status === 4 ? 'reserved' : 'movable',
              x: seat.imageX,
              y: seat.imageY,
            }))
          )
        }
        // ここで100%に
        setProgress(100)
        // 100%を一瞬見せてから画面を表示
        setTimeout(() => {
          setIsLoading(false)
        }, 400) // 0.4秒だけ100%を見せる
      } catch {
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

  // 保存ボタン押下時にAPIへboxesを送信
  const handleSave = async () => {
    const res = await fetch('/api/seats/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boxes }),
    });
    if (res.ok) {
      toast.success('保存しました！'); // 変更
    } else {
      toast.error('保存に失敗しました'); // 変更
    }
  };

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

  if (!user?.adminFlag) {
    return (
      <>
        <SiteHeader title="座席図編集"/>
        <main className="flex-1 overflow-auto p-4">
          <div>
            <p>ここは管理者のみ閲覧可能なページです。</p>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <SiteHeader title="座席図編集" />
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
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onAddBox={handleAddBox}
              move={true}
            />
          )}
        </div>
        <SidebarRight
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          tableName={tableName}
          setTableName={setTableName}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
