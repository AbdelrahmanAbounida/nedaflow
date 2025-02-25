import { cn } from "@/lib/utils";
import { Handle, HandleProps } from "@xyflow/react";
import React from "react";

const CustomHandle = ({
  className,
  ...props
}: { className?: string } & HandleProps) => {
  return (
    <div>
      <Handle
        {...props}
        color="red"
        className={cn(
          `!border-blue-100  !border-2 !w-3 !h-3 
    !bg-blue-500 rounded-full !shadow-4xl !shadow-blue-500 
    relative before:absolute before:inset-0 before:m-auto 
    before:w-full before:h-full before:rounded-full 
    before:bg-blue-500 before:opacity-0 hover:!border-white hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.5)] hover:before:opacity-50 
    hover:before:animate-ping`,
          className
        )}
      />
    </div>
  );
};

export default CustomHandle;
