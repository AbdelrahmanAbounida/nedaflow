"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { FlowSidebarHeader } from "./sidebar-header";
import { FlowSidebarSearchBar } from "./search-bar";
import { FlowSidebarItem } from "./sidebar-item";
import { SIDEBAR_CATEGORIES } from "@/constants/flow-sidebar";
import { SidebarBundles } from "./sidebar-bundlers";
import { useFlowStore } from "@/store/flow";
import { useGetComponentsTypes } from "@/hooks/api/components/query";

export const FlowSidebar = () => {
  // SIDEBAR_CATEGORIES

  // load sidebar types
  const { isFetched } = useGetComponentsTypes();
  const { componentTypes, loadingComponentsTypes } = useFlowStore();

  useEffect(() => {
    if (!loadingComponentsTypes) {
    }
  }, [isFetched, loadingComponentsTypes]);

  const sideBarItemsWithSubItems = SIDEBAR_CATEGORIES.map((cat) => {
    return {
      ...cat,
      subItems: componentTypes
        ? componentTypes[
            Object.keys(componentTypes).find(
              (key) =>
                key.replace("_", "").toLowerCase() === cat.name.toLowerCase()
            )!
          ]
        : [],
    };
  });

  return (
    <Sidebar className=" !bg-white pt-12">
      <FlowSidebarHeader className="!bg-white px-1 pt-2 " />
      <FlowSidebarSearchBar className="mx-1" />
      <SidebarContent className="pl-2 bg-white pt-4 ">
        {sideBarItemsWithSubItems.map((item, index) => (
          <FlowSidebarItem key={index} item={item} subItems={item.subItems} />
        ))}
        <SidebarBundles />
      </SidebarContent>
      <SidebarFooter className="!bg-white">Footer</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
