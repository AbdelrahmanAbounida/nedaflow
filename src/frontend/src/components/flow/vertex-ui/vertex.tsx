import { NodeData } from "@/types/flow/flow";
import { Handle, NodeProps, Position } from "@xyflow/react";
import React, { memo } from "react";
import { useFlowStore } from "@/store/flow";
import { cn } from "@/lib/utils";
import {
  Component,
  ComponentParamTypeEnum,
  ComponentTypeEnum,
  NodeDependencyTypeEnum,
} from "@/types/flow/flow-component";
import CustomHandle from "../utils/custom-handle";
import { ComponentHeader } from "../generic-component/comp-header";
import { ComponentOutputs } from "../generic-component/comp-outputs";
import { ComponentToolbar } from "../generic-component/comp-toolbar";
import { ComponentIcon } from "../generic-component/comp-icon";
import { IconColors, NodeColors, NodeOuterBorders } from "@/types/flow/styles";
import { ComponentParams } from "../generic-component/comp-params";
import { MessageSquare } from "lucide-react";

// remember component is just the body of the node >> in other words its the node data
export const VertexComponent = memo((props: NodeProps & { data: NodeData }) => {
  const data = props.data.component;

  const { setCurrentSelectedNodeId, currentSelectedNodeId } = useFlowStore();

  const nodeSelected = currentSelectedNodeId == props.id;
  const isNodeWithDependencies = data.dependencies?.length > 0;
  const nodeBorders = NodeOuterBorders[data.type];
  const nodeType = data.type?.toLowerCase()?.replace("_", " ");

  // TODO:: add styling here for each node type
  return (
    <div className="flex flex-col items-center justify-center gap-1 !cursor-pointer">
      <div
        className={cn(
          "flex flex-col gap-2  bg-gradient-to-b rounded-full p-1.5 border  w-[285px] relative",
          data.type === ComponentTypeEnum.TRIGGER && "!rounded-full  ",
          nodeSelected && "border-gray-300",
          isNodeWithDependencies && "rounded-2xl bg-slate-100 p-0",
          !isNodeWithDependencies && "w-[159px] h-[159px]",
          nodeBorders
        )}
      >
        {isNodeWithDependencies ? (
          <NodeWithDependenciesUI data={data} />
        ) : (
          <NodeWithNoDependenciesUI data={data} />
        )}
      </div>

      {!isNodeWithDependencies && (
        <div className="flex flex-col  text-center">
          <h1 className="text-md font-semibold ">{data.name}</h1>
          <h1 className="text-sm text-gray-500 font-light ">{nodeType}</h1>
        </div>
      )}
    </div>
  );
});

const NodeWithDependenciesUI = ({ data }: { data: Component }) => {
  const nodeColors = NodeColors[data.type];
  const iconColors = IconColors[data.type];

  const nodeType = data.type.toLowerCase().replace("_", " ");

  return (
    <div className={cn("flex flex-col !rounded-2xl !bg-white gap-2 ")}>
      {/** ********************* */}
      {/** Inputs */}
      {/** ********************* */}
      {data.inputs.map((input, index) => (
        <CustomHandle
          key={`left-${index}`}
          position={Position.Left}
          handleType={input.type}
          type="target"
          id={`input-handle-${index}`}
          onConnect={(e) => console.log("connect", e)}
        />
      ))}
      <div className="flex items-center gap-4 justify-start p-5">
        <div className={cn("p-4  rounded-lg !bg-white", iconColors)}>
          <ComponentIcon
            type={data.type}
            icon={data.icon}
            className={iconColors}
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">{data.name}</h1>
          <p className="text-muted-foreground text-sm   capitalize">
            {nodeType}
          </p>
        </div>
      </div>

      {/** ********************* */}
      {/** Dependecies >> what nodes needs */}
      {/** ********************* */}
      {data.dependencies?.map((dep, index) => (
        <CustomHandle
          key={`bottom-${index}`}
          id={`dependency-handle-${index}`}
          position={Position.Bottom}
          handleType={dep.type} // TODO:: see how to have custom dependecies type
          type="target"
          onConnect={(e) => console.log("connect", e)}
        />
      ))}
      {/** ********************* */}
      {/** outputs  */}
      {/** ********************* */}
      <ComponentOutputs params={data.outputs} className="" />
    </div>
  );
};

const NodeWithNoDependenciesUI = ({ data }: { data: Component }) => {
  const nodeColors = NodeColors[data.type];
  const iconColors = IconColors[data.type];

  const hasOutput = data.outputs.length > 0;
  const nodeType = data.type?.toLowerCase()?.replace("_", " ");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full rounded-full !bg-white",
        data.type === ComponentTypeEnum.TRIGGER && "rounded-full  "
        // nodeColors
      )}
    >
      {/** ********************* */}
      {/** Inputs */}
      {/** ********************* */}
      {data.inputs.map((input, index) => (
        <CustomHandle
          key={`left-${index}`}
          position={Position.Left}
          handleType={input.type}
          type="target"
          id={`input-handle-${index}`}
          onConnect={(e) => console.log("connect", e)}
        />
      ))}

      {/** ********************* */}
      {/** outputs  */}
      {/** ********************* */}
      <ComponentOutputs params={data.outputs} className="" />

      {/** ********************* */}
      {/** Providers */}
      {/** ********************* */}
      {data.is_dep && (
        <CustomHandle
          key={`top-${data.name}`}
          id={`dependency-handle-${data.name}`}
          position={Position.Top}
          handleType={data.type as any} // TODO:: see how to have custom dependecies type
          type="source"
          //   onConnect={(e) => console.log("connect", e)}
        />
      )}

      <ComponentIcon
        type={data.type}
        icon={data.icon}
        className={IconColors[data.type]}
        size={50}
      />
    </div>
  );
};
