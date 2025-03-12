import { CustomTooltip } from "@/components/global/custom-tooltip";
import { cn } from "@/lib/utils";
import { ComponentParam } from "@/types/flow/flow-component";
import { LoadIcon } from "@/utils/load-icon-from-name";
import { AlertCircle } from "lucide-react";
import React from "react";
import { ParamComponent } from "../utils/load-param-component";

export const ComponentParams = ({
  className,
  params,
}: {
  className?: string;
  params?: ComponentParam[];
}) => {
  return (
    <div className={cn("", className)}>
      {/** Loop over all param types and display them accordingly  */}
      {/** TOOD:: create separate elemets like input, text area ,.. acc to param type */}
      <div className="flex flex-col gap-2">
        {params?.map((param, index) => (
          <div className={cn("", !param.show && "hidden")}>
            <div key={index} className="flex  items-center w-full  gap-2">
              <div className="text-sm font-medium">{param.display_name}</div>
              <CustomTooltip title={param.info}>
                <AlertCircle className="size-3 text-gray-500 cursor-help" />
              </CustomTooltip>
            </div>
            <ParamComponent
              className="mt-2"
              componentName={param.field_type as any}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
