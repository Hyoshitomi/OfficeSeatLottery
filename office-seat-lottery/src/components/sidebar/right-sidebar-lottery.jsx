'use client'

import * as React from 'react'
import {
  Sidebar, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarHeader
} from '@/components/ui/sidebar'
import { CardContent } from '@/components/ui/card'
import { EmployeeSelector } from '@/components/lottery/employee-selector'
import { LotteryButton } from '@/components/lottery/lottery-button'
import { ChangeButton } from '@/components/change/change-button'
import { SeatSelect } from '@/components/change/seat-select'

export default function SidebarRight({
  usingSeats,
  seatIdA,               // ★ 追加
  seatIdB,               // ★ 追加
  setSeatIdA,
  setSeatIdB,
  handleChange,
  employeeList,
  selectedEmployees,
  setSelectedEmployees,
  isAdmin,
  handleLottery,
  buttonDisabled,
  ...props
}) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-[var(--header-height)] h-[calc(98vh-var(--header-height))] border-l"
      {...props}
    >
      <SidebarHeader className="flex flex-col h-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <CardContent className="space-y-6">
              {/* ――― 1 件だけ選択できる SeatSelect を 2 個配置 ――― */}
              <label className="text-lg font-medium">
              　交換　⇔
              </label>
              <SeatSelect
                usingSeatslist={usingSeats}
                selectedSeat={seatIdA}        // ★ 追加
                setEmployeesSeat={setSeatIdA}
              />
              <SeatSelect
                usingSeatslist={usingSeats}
                selectedSeat={seatIdB}        // ★ 追加
                setEmployeesSeat={setSeatIdB}
              />
              <ChangeButton
                onChange={handleChange}
                disabled={buttonDisabled}
              />
            </CardContent>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

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
