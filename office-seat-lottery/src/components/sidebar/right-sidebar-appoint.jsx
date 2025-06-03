import * as React from "react"
import { Button } from '@/components/ui/button'

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export default function SidebarRight({
  onSelect, 
  ...props
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
            <div className="flex flex-col items-center gap-4 w-full">
              <Button className="w-[90%]" onClick={onSelect}>予約日を選択する</Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}