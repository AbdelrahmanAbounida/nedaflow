import { NodeData } from "@/types/flow/flow";
import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import { ComponentIcon } from "./comp-icon";
import { ComponentHeader } from "./comp-header";
import { ComponentParams } from "./comp-params";
import { ComponentOutputs } from "./comp-outputs";

// remember component is just the body of the node >> in other words its the node data
export const NodeComponent = memo((props: NodeProps & { data: NodeData }) => {
  const data = props.data.component;

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md border w-[325px] ">
      {/** Component Header */}
      <ComponentHeader title={data.name} img="" />

      {/** Component List of Params  */}
      <ComponentParams />

      {/** Component List of outputs */}
      <ComponentOutputs />

      {/** Handlers */}
      {/* <div className="mt-2 flex items-center justify-between">
        <ComponentIcon icon={data.component.icon!} />
        <div className="text-sm">{data.component.name}</div>
      </div> */}
    </div>
  );
});
