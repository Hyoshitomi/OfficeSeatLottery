'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { AdminGuard } from '@/components/common/admin-guard'
import { ProgressLoader } from '@/components/common/progress-loader'
import { DataTable } from '@/components/data-table/data-table'
import { SiteHeader } from '@/components/sidebar/site-header'
import { useProgress } from '@/hooks/use-progress'

export default function Page() {
  const { data: session } = useSession()
  const { progress, startProgress, completeProgress } = useProgress()
  const [data, setData] = useState([])
  const [isLoadingPage, setIsLoadingPage] = useState(true)

  useEffect(() => {
    async function fetchAppointments() {
      const timer = startProgress()
      try {
        const res = await fetch('/api/master/m_seat_appoint')
        if (!res.ok) {
          // HTTP エラー時に中断
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        // JSON 取得（デバッグ時は text() に置き換えて中身を確認すると◎）
        const json = await res.json()
        setData(json)
      } catch (error) {
        // JSON 解析エラーやステータス異常時はこちらへ
        toast.error(error.message)
      } finally {
        setIsLoadingPage(false)
        completeProgress(timer)
      }
    }
    fetchAppointments()
  }, [])

  return (
    <AdminGuard user={session?.user}>
      <SiteHeader title="予約編集" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-row gap-4 py-4 md:gap-6 md:py-6">
            {isLoadingPage ? (
              <ProgressLoader progress={progress} />
            ) : (
              <DataTable data={data} />
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
