"use client"

import { useSession } from "next-auth/react"

import { ProgressLoader } from "@/components/common/progress-loader"
import { EmployeeSelector } from "@/components/lottery/employee-selector"
import { LotteryButton } from "@/components/lottery/lottery-button"
import { LotteryResult } from "@/components/lottery/lottery-result"
import { SiteHeader } from "@/components/sidebar/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmployees } from "@/hooks/use-employees"
import { useLottery } from "@/hooks/use-lottery"
import { useProgress } from "@/hooks/use-progress"

export default function Home() {
  const { data: session } = useSession()
  const user = session?.user

  const { isLoading, progress, startProgress, completeProgress } = useProgress()
  const { 
    employeeList, 
    selectedEmployees, 
    setSelectedEmployees, 
    isAdmin 
  } = useEmployees(user)
  const { result, executeLottery } = useLottery()

  const handleLottery = async () => {
    const timer = startProgress()
    try {
      await executeLottery(selectedEmployees)
    } finally {
      completeProgress(timer)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader title="オフィス席抽選" />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">席抽選システム</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <EmployeeSelector
              employeeList={employeeList}
              selectedEmployees={selectedEmployees}
              onSelectionChange={setSelectedEmployees}
              isAdmin={isAdmin}
            />

            <LotteryButton
              onLottery={handleLottery}
              isLoading={isLoading}
              disabled={selectedEmployees.length === 0}
            />

            {isLoading && <ProgressLoader progress={progress} />}
            
            <LotteryResult result={result} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
