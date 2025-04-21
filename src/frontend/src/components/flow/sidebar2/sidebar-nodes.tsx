"use client";
import { SidebarContent } from "@/components/ui/sidebar";
import { SIDEBAR_CATEGORIES } from "@/constants/flow-sidebar";
import { useGetComponentsTypes } from "@/controllers/components/query";
import { useFlowStore } from "@/store/flow";
import { useEffect } from "react";
import { FlowSidebarItem } from "../sidebar/sidebar-item";

export const SidebarNodes = () => {
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
    <SidebarContent className="pl-2 px-4 bg-white pt-4 ">
      {sideBarItemsWithSubItems.map((item, index) => (
        <FlowSidebarItem key={index} item={item} subItems={item.subItems} />
      ))}
    </SidebarContent>
  );
};
