import * as React from "react"
import { Button } from '@/components/ui/button'
import AppointDataInput from '@/components/sidebar/nav/nav-appoint-data'

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export default function SidebarRight({
  onSave, 
  ...props
}) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-[var(--header-height)] h-[calc(98vh-var(--header-height))] border-l"
      {...props}
    >
      <SidebarContent>
        <div className="space-y-6 flex-1">
          <AppointDataInput />
        </div>
      </SidebarContent>
      <SidebarFooter className="flex flex-col flex-1 justify-end">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col items-center gap-4 w-full">
              <Button className="w-[90%]" onClick={onSave}>保存</Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}