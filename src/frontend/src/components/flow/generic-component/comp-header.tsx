import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import React from "react";
import { ComponentIcon } from "./comp-icon";
import { IconDisplyName } from "@/constants/icons";
import { cn } from "@/lib/utils";

export const ComponentHeader = ({
  title,
  icon,
  description,
  className,
}: {
  title: string;
  description: string;
  icon: IconDisplyName;
  className?: string;
}) => {
  return (
    <div className={cn("", className)}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ComponentIcon icon={icon} className="" />
          <p className="text-sm font-medium  capitalize">{title}</p>
        </div>

        <Button variant={"ghost"} size={"icon"}>
          <Play className="size-4 text-gray-500" />
        </Button>
      </div>

      <p className="text-xs text-gray-700 mt-2 pl-1 ">{description}</p>
    </div>
  );
};
