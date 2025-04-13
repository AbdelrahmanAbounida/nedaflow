import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import React from "react";
import { ComponentIcon } from "./comp-icon";
import { IconDisplyName } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ComponentTypeEnum } from "@/types/flow/flow-component";

export const ComponentHeader = ({
  title,
  icon,
  description,
  type,
  className,
}: {
  title: string;
  description: string;
  icon: IconDisplyName;
  className?: string;
  type: ComponentTypeEnum;
}) => {
  return (
    <div className={cn("", className)}>
      <div className={cn("w-full flex items-center justify-between px-3 pb-1")}>
        <div
          className={cn(
            "flex items-center gap-1",
            type === ComponentTypeEnum.LLM && "justify-center flex-col flex"
          )}
        >
          <ComponentIcon type={type} icon={icon} className="" />
          <p
            className={cn(
              "text-sm font-semibold  capitalize",
              type == ComponentTypeEnum.LLM && "text-sm "
            )}
          >
            {title}
          </p>
        </div>

        {/* <Button variant={"ghost"} size={"icon"}>
          <Play className="size-4 text-gray-500" />
        </Button> */}

        {/** TODO:: this should be the type */}
        {type !== ComponentTypeEnum.LLM && (
          <Badge
            variant={"outline"}
            className="text-green-700 font-medium bg-gray-50"
          >
            {type || "Trigger"}
          </Badge>
        )}
      </div>

      {type !== ComponentTypeEnum.LLM && <Separator className="mb-3" />}

      {type !== ComponentTypeEnum.LLM && (
        <p className="text-xs text-muted-foreground pl-4 pb-2">{description}</p>
      )}
    </div>
  );
};
