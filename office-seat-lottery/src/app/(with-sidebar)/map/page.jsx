'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { ProgressLoader } from '@/components/common/progress-loader'
import SeatCanvas from '@/components/seat/seat-canvas'
import { SiteHeader } from '@/components/sidebar/site-header'
import SidebarRight from '@/components/sidebar/right-sidebar-lottery'

import { useDate } from '@/hooks/use-date'
import { useImage } from '@/hooks/use-image'
import { useProgress } from '@/hooks/use-progress'
import { useSeats } from '@/hooks/use-seat'
import { useEmployees } from '@/hooks/use-rogin-employees'
import { useLottery } from '@/hooks/use-lottery'
import { useChange } from '@/hooks/use-change-seats'

export default function MapPage() {
  /* 進捗バー */
  const { isLoading, progress, startProgress, completeProgress } = useProgress()

  /* 座席情報 */
  const { boxes, imgSize, fetchSeats, exitSeat, updateBox, handleImgLoad } = useSeats()

  /* 画像プレビュー */
  const { previewImage } = useImage()

  /* 日付文字列 (YYYY-MM-DD) */
  const { getDateString } = useDate()

  /* 認証ユーザー */
  const { data: session } = useSession()
  const user = session?.user

  /* 使用中の座席リスト */
  const [usingSeats, setUsingSeats] = useState([])

  const fetchUsingSeats = async () => {
    try {
      const res = await fetch('/api/seats/change')
      if (!res.ok) throw new Error('Failed to fetch seats')
      const data = await res.json()
      setUsingSeats(data)
    } catch {
      toast.error('リストの取得に失敗しました')
      setUsingSeats([])
    }
  }

  /* 初期ロード */
  useEffect(() => {
    const loadInitialData = async () => {
      const timer = startProgress()
      try {
        await fetchSeats('/api/seats/map', getDateString())
        await fetchUsingSeats()
      } finally {
        completeProgress(timer)
      }
    }
    loadInitialData()
  }, [])

  /* ドラッグ終了時の更新 */
  const handleStop = (id, x, y) => updateBox(id, { x, y })

  /* 抽選・従業員情報 */
  const {
    employeeList,
    selectedEmployees,
    setSelectedEmployees,
    isAdmin,
  } = useEmployees(user)

  const { executeLottery } = useLottery()
  const executeChange = useChange();

  /* 交換対象座席 */
  const [seatIdA, setSeatIdA] = useState([])
  const [seatIdB, setSeatIdB] = useState([])

  const changeButtonDisabled =
    seatIdA.length === 0 ||
    seatIdB.length === 0 ||
    isLoading

  /* 座席交換 */
  const handleChange = async () => {
    const timer = startProgress()
    try {
      await executeChange(seatIdA, seatIdB)
      await fetchSeats('/api/seats/map', getDateString())
      await fetchUsingSeats()
    } finally {
      completeProgress(timer)
    }
  }

  /* 抽選実行 */
  const handleLottery = async () => {
    const timer = startProgress()
    try {
      await executeLottery([...selectedEmployees])
      await fetchSeats('/api/seats/map', getDateString())
      await fetchUsingSeats()
    } finally {
      completeProgress(timer)
    }
  }

  /* 画面描画 */
  return (
    <>
      <SiteHeader title="座席図" />

      <div className="flex flex-row h-[calc(100vh-56px)]">
        {/* 座席キャンバス */}
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

        {/* 管理者用サイドバー */}
        {isAdmin && (
          <SidebarRight
            usingSeats={usingSeats}
            seatIdA={seatIdA}
            seatIdB={seatIdB}
            setSeatIdA={setSeatIdA}
            setSeatIdB={setSeatIdB}
            handleChange={handleChange}
            buttonDisabled={changeButtonDisabled}
            employeeList={employeeList}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            isAdmin={isAdmin}
            handleLottery={handleLottery}
          />
        )}
      </div>
    </>
  )
}
