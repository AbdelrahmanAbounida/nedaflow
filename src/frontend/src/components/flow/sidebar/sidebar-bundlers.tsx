import { SIDEBAR_BUNDLES } from "@/constants/flow-sidebar";
import React, { memo } from "react";
import { FlowSidebarItem } from "./sidebar-item";

export const SidebarBundles = memo(() => {
  return (
    <div>
      <div className="mt-5 w-full">
        <h3 className="text-xs text-gray-500 font-bold mb-2 pl-2">Bundles</h3>

        <div className="flex flex-col gap-2">
          {SIDEBAR_BUNDLES.map((item, index) => (
            <FlowSidebarItem
              isBundle={true}
              key={index}
              item={item}
              subItems={item.subItems!}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
