"use client"

import * as React from "react"
import {
  IconArmchair,
  IconArmchair2,
  IconDatabase,
  IconDice,
  IconEdit,
  IconMail,
  IconUsers,
} from "@tabler/icons-react"
import { SidebarNav } from "@/components/sidebar/nav/SidebarNav";
import { NavUser } from "@/components/sidebar/nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react";

export function AppSidebar({
  ...props
}) {
  // useSessionはコンポーネント内で呼び出す
  const { data: session } = useSession();
  const user = session?.user;

  // データ構造
  const data = {
    navMain: [
      {
        name: "抽選",
        url: "/",
        icon: IconDice,
      },
      {
        name: "座席表",
        url: "/map",
        icon: IconArmchair,
      },
      {
        name: "チーム予約",
        url: "/appoint",
        icon: IconUsers,
      },
    ],
    dataList: [
      {
        name: "座席図 編集",
        url: "/map-edit",
        icon: IconEdit,
      },
      {
        name: "データ管理",
        url: "/data-management",
        icon: IconDatabase,
      },
    ],
    navSecondary: [
      {
        name: "問い合わせ",
        url: "/contact",
        icon: IconMail,
      },
    ],
    user: {
      lastName: user?.lastName ?? "取得失敗",
      employeeNumber: user?.employeeNumber ?? "取得失敗",
      avatar: `/avatars/${user?.employeeNumber}.png`,
    },
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                <IconArmchair2 className="!size-5" />
                <span className="text-base font-semibold">座席管理システム</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav
          items={data.navMain}
          className="flex flex-col gap-2"
        />
        <SidebarNav
          items={data.dataList}
          className="group-data-[collapsible=icon]:hidden"
          label="管理者"
        />
        <SidebarNav 
          items={data.navSecondary} 
          className="mt-auto" 
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
