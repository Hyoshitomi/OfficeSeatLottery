"use client";

import { SidebarNav } from "@/components/sidebar/nav/SidebarNav";

export function NavData({ items }) {
  return (
    <SidebarNav
      items={items}
      groupClassName="group-data-[collapsible=icon]:hidden"
      label="管理者"
    />
  );
}
