'use client'

import { useEffect, useState } from 'react'

import { ProgressLoader } from '@/components/common/progress-loader'
import ReservationTabs from '@/components/form/reservation-tabs'
import SeatCanvas from '@/components/seat/seat-canvas'
import SidebarRight from '@/components/sidebar/right-sidebar-appoint'
import { SiteHeader } from '@/components/sidebar/site-header'
import { useImage } from '@/hooks/use-image'
import { useProgress } from '@/hooks/use-progress'
import { useSeats } from '@/hooks/use-seat'

export default function MapPage() {
  const { isLoading, progress, startProgress, completeProgress } = useProgress()
  const { boxes, imgSize, fetchSeats, exitSeat, updateBox, handleImgLoad } = useSeats()
  const { previewImage, fileInputRef } = useImage()
  const [selectedSeatIds, setSelectedSeatIds] = useState([]) // 選択中の座席ID配列
  const [showReservation, setShowReservation] = useState(false) // 予約画面表示フラグ

  // 座席番号を表示するため、座席図編集APIを実行
  useEffect(() => {
    const loadSeats = async () => {
      const timer = startProgress()
      try {
        await fetchSeats('/api/seats/edit')
      } finally {
        completeProgress(timer)
      }
    }
    loadSeats()
  }, [])

  const handleStop = (id, x, y) => updateBox(id, { x, y })
  
  // 座席クリック時の処理（複数選択対応）
  const handleSeatClick = (seatId) => {
    setSelectedSeatIds(prev => {
      if (prev.includes(seatId)) {
        // 既に選択されている場合は選択解除
        return prev.filter(id => id !== seatId)
      } 
        // 新しい座席を選択に追加
        return [...prev, seatId]
      
    })
  }

  const handleSelect = () => {
    // 「予約日を選択する」ボタンクリック時の処理
    if (selectedSeatIds.length > 0) {
      setShowReservation(true) // 予約画面を表示
    }
  }

  // 予約画面から戻る処理
  const handleBackToMap = () => {
    setShowReservation(false)
  }

  return (
    <>
      <SiteHeader title={showReservation ? "予約日を選択してください" : "座席を選択してください"} />
      {showReservation ? (
        // 予約設定画面
        <ReservationTabs 
          selectedSeatIds={selectedSeatIds}
          onBack={handleBackToMap}
        />
      ) : (
        // 座席選択画面
        <div className="flex flex-row h-[calc(100vh-56px)]">
          <div className="flex-1 flex flex-col items-center justify-center">
            {isLoading ? (
              <ProgressLoader progress={progress} />
            ) : (
              <SeatCanvas
                src={previewImage}
                imgSize={imgSize}
                boxes={boxes}
                onImgLoad={handleImgLoad}
                onDragStop={handleStop}
                onExit={exitSeat}
                onSeatClick={handleSeatClick}
                selectedSeatIds={selectedSeatIds}
                appoint={true}
              />
            )}
          </div>
          <SidebarRight
            fileInputRef={fileInputRef}
            onSelect={handleSelect}
            selectedSeatIds={selectedSeatIds}
          />
        </div>
      )}
    </>
  )
}
