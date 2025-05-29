import * as React from "react"
import ImageUploader from '@/components/seat/ImageUploader'
import { Button } from '@/components/ui/button'
import TableNameInput from '@/components/sidebar/nav/nav-tablename'

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export default function SidebarRight({
  onMakeImg,
  onReDateSelect, 
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
              <Button variant="default" className="w-[90%]" onClick={onMakeImg}>
                画像を作成する
              </Button>
              <Button variant="outline" className="w-[90%]" onClick={onReDateSelect}>
                日付選択に戻る
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}