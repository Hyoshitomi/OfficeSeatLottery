"use client";

import { IconDice } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar/nav/SidebarNav";

export function NavMain({ items }) {
  const additionalContent = (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
        >
          <a href="/">
            <IconDice />
            <span>抽選</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );

  return (
    <SidebarNav
      items={items}
      contentClassName="flex flex-col gap-2"
      additionalContent={additionalContent}
    />
  );
}
