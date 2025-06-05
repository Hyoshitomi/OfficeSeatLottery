'use client'

import { useEffect } from 'react'

import { ProgressLoader } from '@/components/common/progress-loader'
import SeatCanvas from '@/components/seat/seat-canvas'
import { SiteHeader } from '@/components/sidebar/site-header'
import { useDate } from '@/hooks/use-date'
import { useImage } from '@/hooks/use-image'
import { useProgress } from '@/hooks/use-progress'
import { useSeats } from '@/hooks/use-seat'

export default function MapPage() {
  const { isLoading, progress, startProgress, completeProgress } = useProgress()
  const { boxes, imgSize, fetchSeats, exitSeat, updateBox, handleImgLoad } = useSeats()
  const { previewImage } = useImage()
  const { getDateString } = useDate()

  useEffect(() => {
    const loadSeats = async () => {
      const timer = startProgress()
      try {
        await fetchSeats('/api/seats/map', getDateString())
      } finally {
        completeProgress(timer)
      }
    }
    loadSeats()
  }, [])

  const handleStop = (id, x, y) => updateBox(id, { x, y })

  return (
    <>
      <SiteHeader title="座席図" />
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
              move={false}
            />
          )}
        </div>
      </div>
    </>
  )
}
