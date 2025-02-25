import React from "react";
import { LoadIcon } from "@/utils/load-icon-from-name";
import { ImageProps } from "next/image";
import { IconDisplyName } from "@/constants/icons";

export const ComponentIcon = ({
  icon,
  className,
  ...props
}: {
  icon: IconDisplyName;
  className?: string;
  props?: Omit<ImageProps, "alt" | "src">;
}) => {
  return (
    <div className="bg-gray-100/80 p-1.5 rounded-md">
      <LoadIcon
        className={className}
        name={icon}
        {...props}
        width={18}
        height={18}
      />
    </div>
  );
};
