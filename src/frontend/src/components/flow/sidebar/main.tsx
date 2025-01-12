"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import React from "react";
import { FlowSidebarHeader } from "./sidebar-header";
import { FlowSidebarSearchBar } from "./search-bar";
import { FlowSidebarItem } from "./sidebar-item";
import { SIDEBAR_CATEGORIES } from "@/constants/flow-sidebar";
import { SidebarBundles } from "./sidebar-bundlers";

export const FlowSidebar = () => {
  // SIDEBAR_CATEGORIES
  return (
    <Sidebar className=" !bg-white pt-12">
      <FlowSidebarHeader className="!bg-white px-1 pt-2 " />
      <FlowSidebarSearchBar className="mx-1" />
      <SidebarContent className="pl-2 bg-white pt-4">
        {/** Main  */}
        {SIDEBAR_CATEGORIES.map((item, index) => (
          <FlowSidebarItem key={index} item={item} />
        ))}
        {/** Bundles  */}
        <SidebarBundles />
      </SidebarContent>
      <SidebarFooter className="!bg-white">Footer</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
