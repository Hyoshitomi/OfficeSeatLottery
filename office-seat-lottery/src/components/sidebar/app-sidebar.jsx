"use client"

import * as React from "react"
import {
  IconArmchair,
  IconArmchair2,
  IconDatabase,
  IconEdit,
  IconMail,
  IconUsers,
} from "@tabler/icons-react"

import { NavData } from "@/components/sidebar/nav/nav-data"
import { NavMain } from "@/components/sidebar/nav/nav-main"
import { NavSecondary } from "@/components/sidebar/nav/nav-secondary"
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
      // 「抽選開始」はnav-mainに記載
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
        name: "座席図　編集",
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
        title: "問い合わせ",
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
        <NavMain items={data.navMain} />
        <NavData items={data.dataList} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
