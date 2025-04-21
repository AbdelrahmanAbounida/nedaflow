"use client";
import { Sidebar, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { SIDEBAR_CATEGORIES } from "@/constants/flow-sidebar";
import { useFlowStore } from "@/store/flow";
import { useGetComponentsTypes } from "@/controllers/components/query";
import { SidebarV2Header } from "./sidebar-header";
import { SidebarNodes } from "./sidebar-nodes";

export const FlowSidebarV2 = () => {
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
    <Sidebar className=" !bg-white pt-12  ">
      <div className="flex items-center gap-2 w-full ">
        {/** Trigger Close */}
        {/* <div className="relative">
          <SidebarTrigger
            className="absolute top-0 right-2"
            variant={"ghost"}
            size={"icon"}
          >
            <PanelLeftClose className="text-gray-300 size-4" />
          </SidebarTrigger>
        </div> */}
        {/** put it outside the sidebar on the right */}
        <SidebarV2Header />

        {/** Header */}
        {/** Tabs (Nodes, Chat) */}

        {/** Nodes with Categories */}
      </div>
      <SidebarNodes />
      {/* <SidebarFooter className="!bg-white">Footer</SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
};
