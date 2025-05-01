"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarNav({
  items,
  groupClassName = "",
  contentClassName = "",
  label = null,
  additionalContent = null,
  itemKey = "name",
  itemText = "name",
  ...props
}) {
  return (
    <SidebarGroup className={groupClassName} {...props}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent className={contentClassName}>
        {additionalContent}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item[itemKey]}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item[itemText]}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
