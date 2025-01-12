import { SIDEBAR_BUNDLES } from "@/constants/flow-sidebar";
import React from "react";
import { FlowSidebarItem } from "./sidebar-item";

export const SidebarBundles = () => {
  return (
    <div>
      <div className="mt-5 w-full">
        <h3 className="text-xs text-gray-500 font-bold mb-2 pl-2">Bundles</h3>

        <div className="">
          {SIDEBAR_BUNDLES.map((item, index) => (
            <FlowSidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
