import React from "react";
import { LoadIcon } from "@/utils/load-icon-from-name";
import { ImageProps } from "next/image";
import { IconDisplyName } from "@/constants/icons";
import { cn } from "@/lib/utils";

export const ComponentIcon = ({
  icon,
  className,
  ...props
}: {
  icon: IconDisplyName;
  className?: string;
  props?: Omit<ImageProps, "alt" | "src">;
}) => {
  const isBundle = icon.includes("bundles-icons");
  const size = isBundle ? 28 : 25;
  return (
    <div
      className={cn(
        "bg-gradient-to-tr  p-1.5 border-primary rounded-lg",
        isBundle && "from-gray-100/80 bg-gray-200 p-1 "
      )}
    >
      <LoadIcon
        className={className}
        name={icon}
        {...props}
        width={size}
        height={size}
      />
    </div>
  );
};
