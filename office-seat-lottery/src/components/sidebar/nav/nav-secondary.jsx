"use client";

import { SidebarNav } from "@/components/sidebar/nav/SidebarNav";

export function NavSecondary({ items, ...props }) {
  return <SidebarNav items={items} itemText="title" itemKey="title" {...props} />;
}
