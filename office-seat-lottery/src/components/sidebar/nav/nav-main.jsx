"use client";

import { SidebarNav } from "@/components/sidebar/nav/SidebarNav";

export function NavMain({ items }) {
  return (
    <SidebarNav
      items={items}
      contentClassName="flex flex-col gap-2"
    />
  );
}
