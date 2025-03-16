"use client";
import { cn } from "@/lib/utils";
import {
  ComponentHandleColors,
  ComponentParamTypeEnum,
} from "@/types/flow/flow-component";
import { Handle, HandleProps } from "@xyflow/react";
import React, { useCallback } from "react";

const CustomHandle = ({
  className,
  handleType,
  ...props
}: {
  className?: string;
  handleType: ComponentParamTypeEnum;
} & HandleProps) => {
  // generate color according to type
  const shadowColors = handleType
    ? ComponentHandleColors[handleType]
    : ComponentHandleColors.TEXT;

  return (
    <div>
      <Handle
        {...props}
        className={cn(
          ` !border-2 !w-3 !h-3
             rounded-full !shadow-4xl
              relative before:absolute before:inset-0 before:m-auto
              before:w-full before:h-full before:rounded-full
              before:opacity-0 hover:!border-white  hover:before:opacity-50
              hover:before:animate-ping`,
          shadowColors,
          // handleType == ComponentParamTypeEnum.DATA && "!bg-orange-500",
          className
        )}
      />
    </div>
  );
};

export default CustomHandle;
