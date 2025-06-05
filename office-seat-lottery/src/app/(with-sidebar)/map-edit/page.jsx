'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'

import { AdminGuard } from '@/components/common/admin-guard'
import { ProgressLoader } from '@/components/common/progress-loader'
import SeatCanvas from '@/components/seat/seat-canvas'
import SidebarRight from '@/components/sidebar/right-sidebar-edit'
import { SiteHeader } from '@/components/sidebar/site-header'
import { useImage } from '@/hooks/use-image'
import { useProgress } from '@/hooks/use-progress'
import { useSeats } from '@/hooks/use-seat'

export default function MapEditPage() {
  const { data: session } = useSession()
  const { isLoading, progress, startProgress, completeProgress } = useProgress()
  const { 
    boxes, 
    imgSize, 
    fetchSeats, 
    saveSeats, 
    updateBox, 
    deleteBox, 
    addBox, 
    handleImgLoad 
  } = useSeats()
  const { previewImage, fileInputRef, handleFileChange } = useImage()
  const [tableName, setTableName] = useState("A")

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

  const handleUpdate = (id, updateData) => {
    const { name: newName, status: newStatus, x: newX, y: newY } = updateData
    updateBox(id, {
      name: newName,
      status: newStatus,
      ...(newX !== undefined && { x: newX }),
      ...(newY !== undefined && { y: newY }),
    })
  }

  const handleAddBox = () => addBox(tableName, imgSize)

  // handleSave処理でも同じisLoadingを再利用
  const handleSave = async () => {
    if (isLoading) return // 既に処理中の場合は実行しない
    
    const timer = startProgress()
    
    try {
      await saveSeats(boxes)
    } catch (_error) {
      null
    } finally {
      completeProgress(timer)
    }
  }

  return (
    <AdminGuard user={session?.user} title="座席図編集">
      <SiteHeader title="座席図編集" />
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
              onUpdate={handleUpdate}
              onDelete={deleteBox}
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
          isLoading={isLoading} // 統一されたisLoadingを渡す
        />
      </div>
    </AdminGuard>
  )
}
