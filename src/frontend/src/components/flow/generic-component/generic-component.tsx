import { NodeData } from "@/types/flow/flow";
import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import { ComponentHeader } from "./comp-header";
import { ComponentParams } from "./comp-params";
import { ComponentOutputs } from "./comp-outputs";
import { Separator } from "@/components/ui/separator";

// remember component is just the body of the node >> in other words its the node data
export const GenericNodeComponent = memo(
  (props: NodeProps & { data: NodeData }) => {
    const data = props.data.component;

    return (
      <div className="flex flex-col gap-2  bg-white rounded-xl border border-gray-300 w-[325px] ">
        {/** Component Header */}
        <ComponentHeader
          title={data.name}
          icon={data.icon}
          description={data.description}
          className="px-4 pt-3"
        />

        <Separator className="mt-2" />

        {/** Component List of Params  */}
        <ComponentParams params={data.inputs} className="p-4" />

        {/** Component List of outputs */}
        <ComponentOutputs params={data.outputs} className="" />

        {/** Handlers */}
        {/* <div className="mt-2 flex items-center justify-between">
        <ComponentIcon icon={data.component.icon!} />
        <div className="text-sm">{data.component.name}</div>
      </div> */}

        {/** TODO:: Toolset Mode */}
      </div>
    );
  }
);
