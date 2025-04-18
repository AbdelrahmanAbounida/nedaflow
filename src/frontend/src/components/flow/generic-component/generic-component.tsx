import { NodeData } from "@/types/flow/flow";
import { Handle, NodeProps, Position } from "@xyflow/react";
import React, { memo } from "react";
import { ComponentHeader } from "./comp-header";
import { ComponentParams } from "./comp-params";
import { ComponentOutputs } from "./comp-outputs";
import { Separator } from "@/components/ui/separator";
import { ComponentToolbar } from "./comp-toolbar";
import { useFlowStore } from "@/store/flow";
import { cn } from "@/lib/utils";
import {
  ComponentParamTypeEnum,
  ComponentTypeEnum,
  NodeDependencyTypeEnum,
} from "@/types/flow/flow-component";
import CustomHandle from "../utils/custom-handle";

// remember component is just the body of the node >> in other words its the node data
export const GenericNodeComponent = memo(
  (props: NodeProps & { data: NodeData }) => {
    const data = props.data.component;

    const { setCurrentSelectedNodeId, currentSelectedNodeId } = useFlowStore();

    const nodeSelected = currentSelectedNodeId == props.id;

    return (
      <div
        // onClick={() => {
        //   setCurrentSelectedNodeId(props.id);
        // }}
        className={cn(
          "flex flex-col gap-2  bg-white rounded-xl border border-gray-300 w-[285px] relative",

          nodeSelected && "border-gray-500",
          data.type == ComponentTypeEnum.LLM &&
            "rounded-full  h-[120px] w-[120px] items-center text-center"
        )}
      >
        {/** ********************* */}
        {/** Component Toolbar */}
        {/** ********************* */}

        <ComponentToolbar nodeId={props.id} />

        {/** ********************* */}
        {/** Component Header */}
        {/** ********************* */}

        <ComponentHeader
          title={data.name}
          icon={data.icon}
          description={data.description}
          type={data.type!}
          className=" pt-3"
        />

        {/** ********************* */}
        {/** Inputs */}
        {/** ********************* */}

        {/** TODO:: Loop over all required inputs */}
        {data.inputs.map((input, index) => (
          <CustomHandle
            key={`left-${index}`}
            position={Position.Left}
            handleType={input.type}
            type="target"
            id={`input-handle-${index}`}
            // className="!w-4 !h-4"
            onConnect={(e) => console.log("connect", e)}
          />
        ))}

        {/** ********************* */}
        {/** Dependecies >> what nodes needs */}
        {/** ********************* */}

        {data.dependencies?.map((dep, index) => (
          <CustomHandle
            key={`bottom-${index}`}
            id={`dependency-handle-${index}`}
            position={Position.Bottom}
            handleType={dep} // TODO:: see how to have custom dependecies type
            type="target"
            onConnect={(e) => console.log("connect", e)}
          />
        ))}

        {/** ********************* */}
        {/** dependecies >> what nodes provide ex in case of node like LLM */}
        {/** ********************* */}
        {data.is_dep && (
          <CustomHandle
            position={Position.Top}
            handleType={NodeDependencyTypeEnum.LLM} // TODO:: see how to have custom dependecies type
            type="source"
            // className="!w-4 !h-4"
          />
        )}

        {/* <Separator className="mt-2" /> */}

        {/** ********************* */}
        {/** Params  */}
        {/** ********************* */}

        {/** New:: we gonna hide this for now and keep it only in the modal */}
        {/* <ComponentParams params={data.inputs} className="p-4" /> */}

        {/** Component List of outputs */}
        <ComponentOutputs params={data.outputs} className="" />
      </div>
    );
  }
);
