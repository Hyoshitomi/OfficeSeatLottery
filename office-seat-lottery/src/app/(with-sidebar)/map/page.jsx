'use client'

import { useEffect } from 'react'
import { useSession } from "next-auth/react"


import { ProgressLoader } from '@/components/common/progress-loader'
import SeatCanvas from '@/components/seat/seat-canvas'
import SeatCanvasMobile from '@/components/seat/seat-canvas-mobile'
import { SiteHeader } from '@/components/sidebar/site-header'
import SidebarRight from '@/components/sidebar/right-sidebar-lottery'

import { useDate } from '@/hooks/use-date'
import { useImage } from '@/hooks/use-image'
import { useProgress } from '@/hooks/use-progress'
import { useSeats } from '@/hooks/use-seat'
import { useEmployees } from "@/hooks/use-rogin-employees"
import { useLottery } from "@/hooks/use-lottery"

export default function MapPage() {
  const { isLoading, progress, startProgress, completeProgress } = useProgress()
  const { boxes, imgSize, fetchSeats, exitSeat, updateBox, handleImgLoad } = useSeats()
  const { previewImage } = useImage()
  const { getDateString } = useDate()
  const { data: session } = useSession()
  const user = session?.user

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

  const { 
    employeeList, 
    selectedEmployees, 
    setSelectedEmployees, 
    isAdmin 
  } = useEmployees(user)
  const { executeLottery } = useLottery()

  const handleLottery = async () => {
    const timer = startProgress();
    try {
      //  抽選を実行し、成功可否を受け取る
      await executeLottery([...selectedEmployees]);
  
      //  最新の座席情報を取得して UI を更新
      await fetchSeats('/api/seats/map', getDateString());
    } finally {
      completeProgress(timer);
    }
  };
  

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
        {isAdmin ?(
          <SidebarRight
            employeeList={employeeList}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            isAdmin={isAdmin}
            handleLottery={handleLottery} 
          />
        ): null}
      </div>
    </>
  )
}