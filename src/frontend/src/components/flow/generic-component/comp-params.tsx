import { CustomTooltip } from "@/components/global/custom-tooltip";
import { cn } from "@/lib/utils";
import { ComponentParam } from "@/types/flow/flow-component";
import { LoadIcon } from "@/utils/load-icon-from-name";
import { AlertCircle } from "lucide-react";
import React from "react";
import { ParamComponent } from "../utils/load-param-component";
import { Handle, Position, useNodeId, useReactFlow } from "@xyflow/react";
import CustomHandle from "../utils/custom-handle";

export const ComponentParams = ({
  className,
  params,
  nodeId,
}: {
  className?: string;
  params?: ComponentParam[]; // node inputs
  nodeId?: string;
}) => {
  return (
    <div className={cn("", className)}>
      {/** Loop over all param types and display them accordingly  */}
      {/** TOOD:: create separate elemets like input, text area ,.. acc to param type */}
      {/** TODO:: show this in Modal */}
      <div className="flex flex-col gap-2">
        {params?.map((param, index) => (
          <div className={cn("", !param.show && "hidden")}>
            <div key={index} className="flex  items-center w-full  gap-1">
              <div className="text-sm font-medium">{param.display_name}</div>
              {param.required && <p className="text-red-500">*</p>}
              {param.info && (
                <CustomTooltip title={param.info}>
                  <AlertCircle className="size-3 text-gray-500 cursor-help" />
                </CustomTooltip>
              )}
            </div>
            <ParamComponent
              className="mt-2"
              componentName={param.field_type as any}
              nodeId={nodeId!}
              {...param}
            />
            {param.only_handle && <p className="!h-4 "></p>}
            {param.is_handle && (
              <CustomHandle
                id={param.display_name}
                position={Position.Left}
                handleType={param.field_type}
                type="target"
                style={{
                  top: index * 70 + 140,
                  // background: "orange !important",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
