import * as React from "react"

import ImageUploader from '@/components/seat/image-uploader'
import TableNameInput from '@/components/sidebar/nav/nav-tablename'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export default function SidebarRight({
  onFileChange,
  tableName,
  setTableName,
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
          <TableNameInput value={tableName} onChange={e => setTableName(e.target.value)} />
        </div>
      </SidebarContent>
      <SidebarFooter className="flex flex-col flex-1 justify-end">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col items-center gap-4 w-full">
              <ImageUploader onChange={onFileChange} />
              <Button className="w-[90%]" onClick={onSave}>保存</Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}