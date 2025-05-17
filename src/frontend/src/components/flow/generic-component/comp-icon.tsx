import React from "react";
import { LoadIcon } from "@/utils/load-icon-from-name";
import { ImageProps } from "next/image";
import { IconDisplayName } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { ComponentTypeEnum } from "@/types/flow/flow-component";

export const ComponentIcon = ({
  icon,
  className,
  type,
  size,
  ...props
}: {
  icon: IconDisplayName;
  className?: string;
  type: ComponentTypeEnum;
  size?: number;
  props?: Omit<ImageProps, "alt" | "src">;
}) => {
  const iconSize = size || 50; //type == ComponentTypeEnum.LLM ? 30 : 30;
  return (
    <div className={cn("  p-1.5  rounded-full", className)}>
      <LoadIcon
        className={className}
        name={icon}
        {...props}
        width={iconSize}
        height={iconSize}
      />
    </div>
  );
};
