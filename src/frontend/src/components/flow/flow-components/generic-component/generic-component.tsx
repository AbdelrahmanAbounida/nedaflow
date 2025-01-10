import { NodeData } from "@/types/flow/flow";
import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import { ComponentIcon } from "./comp-icon";

// remember component is just the body of the node >> in other words its the node data
export const NodeComponent = memo((props: NodeProps & { data: NodeData }) => {
  const data = props.data;

  return (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-md border w-[200px] h-[100px]">
      <div className="mt-2 flex items-center justify-between">
        <ComponentIcon icon={data.component.icon!} />
        <div className="text-sm">{data.component.name}</div>
      </div>
    </div>
  );
});
