"use client";

import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from 'next/link';

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
  const pathname = usePathname();

  return (
    <SidebarGroup className={groupClassName} {...props}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent className={contentClassName}>
        {additionalContent}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item[itemKey]}>
                <SidebarMenuButton
                  asChild
                  className={isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear' : 'min-w-8 duration-200 ease-linear'}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item[itemText]}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
