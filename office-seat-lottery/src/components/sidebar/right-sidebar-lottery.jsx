'use client'

import * as React from 'react'
import { useEffect } from 'react'
import {
  Sidebar, SidebarFooter, SidebarMenu, SidebarMenuItem,
} from '@/components/ui/sidebar'
import { CardContent } from '@/components/ui/card'
import { EmployeeSelector } from '@/components/lottery/employee-selector'
import { LotteryButton } from '@/components/lottery/lottery-button'
import { LotteryResult } from '@/components/lottery/lottery-result'

export default function SidebarRight({
  employeeList,
  selectedEmployees,
  setSelectedEmployees,
  isAdmin,
  handleLottery,
  ...props                       // 高さやクラス指定など Sidebar 用
}) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-[var(--header-height)] h-[calc(98vh-var(--header-height))] border-l"
      {...props}
    >
      <SidebarFooter className="flex flex-col flex-1 justify-end">
        <SidebarMenu>
          <SidebarMenuItem>
            <CardContent className="space-y-6">
              <EmployeeSelector
                employeeList={employeeList}
                selectedEmployees={selectedEmployees}
                onSelectionChange={setSelectedEmployees}
                isAdmin={isAdmin}
              />

              <LotteryButton
                onLottery={handleLottery}
                disabled={selectedEmployees.length === 0}
              />
            </CardContent>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
