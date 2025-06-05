'use client'

import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useState } from 'react'
import { toast } from "sonner"

import { AdminGuard } from '@/components/common/admin-guard'
import { DateSelector } from '@/components/common/date-selector'
import { ProgressLoader } from '@/components/common/progress-loader'
import SeatCanvas from '@/components/seat/seat-canvas'
import SidebarRight from '@/components/sidebar/right-sidebar-img'
import { SiteHeader } from '@/components/sidebar/site-header'
import { useDate } from '@/hooks/use-date'
import { useImage } from '@/hooks/use-image'
import { useProgress } from '@/hooks/use-progress'
import { useSeats } from '@/hooks/use-seat'

export default function MapImgPage() {
  const { data: session } = useSession()
  const { isLoading, progress, startProgress, completeProgress } = useProgress()
  const { 
    boxes, 
    imgSize, 
    fetchSeats, 
    exitSeat, 
    updateBox, 
    handleImgLoad 
  } = useSeats()
  const { previewImage, fileInputRef, getAbsoluteUrl } = useImage()
  const { selectedDate, setSelectedDate, getDateString, setToday } = useDate()
  const [showSeatMap, setShowSeatMap] = useState(false)

  const handleCreateClick = async () => {
    setShowSeatMap(true)
    const timer = startProgress()
    try {
      await fetchSeats('/api/seats/map', getDateString())
    } finally {
      completeProgress(timer)
    }
  }

  const handleStop = (id, x, y) => updateBox(id, { x, y })

  const handleMakeImage = async () => {
    const timer = startProgress()
    try {
      const bgURL = encodeURI(getAbsoluteUrl(previewImage))
      const res = await fetch('/api/seats/imgPng', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bg: bgURL,
          boxes: boxes,
          width: imgSize.width,
          height: imgSize.height  
        })
      })
      
      if (!res.ok) {
        const errorText = await res.text()
        toast.error('画像生成に失敗しました: ' + errorText)
        return
      }
      
      const blob = await res.blob()
      const urlObj = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = urlObj
      a.download = `${format(selectedDate, "yyyy年MM月dd日")}座席図.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(urlObj)
      toast.success('PNG画像をダウンロードしました')
    } catch (e) {
      toast.error('画像生成に失敗しました: ' + e.message)
    } finally {
      completeProgress(timer)
    }
  }

  const handleBackToDateSelection = () => setShowSeatMap(false)

  return (
    <AdminGuard user={session?.user} title="座席図編集">
      <SiteHeader 
        title={selectedDate 
          ? `${format(selectedDate, "yyyy年MM月dd日")}の座席図` 
          : "座席図"
        } 
      />
      <div className="flex flex-row h-[calc(100vh-56px)]">
        {!showSeatMap ? (
          <DateSelector
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onToday={setToday}
            onConfirm={handleCreateClick}
          />
        ) : isLoading ? (
          <ProgressLoader progress={progress} />
        ) : (
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
              <SeatCanvas
                src={previewImage}
                imgSize={imgSize}
                boxes={boxes}
                onImgLoad={handleImgLoad}
                onDragStop={handleStop}
                onExit={exitSeat}
                move={false}
              />
            </div>
            <SidebarRight
              fileInputRef={fileInputRef}
              onMakeImg={handleMakeImage}
              onReDateSelect={handleBackToDateSelection}
            />
          </>
        )}
      </div>
    </AdminGuard>
  )
}
