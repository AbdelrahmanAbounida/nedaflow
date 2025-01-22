import { CustomTooltip } from "@/components/global/custom-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getLucideIcon, LucidIconFromName } from "@/utils/get-lucid-icon";
import { Download, GripVertical, Plus, Trash2 } from "lucide-react";
import React from "react";

export const FlowSidebarDraggableItem = ({
  icon,
  display_name,
  beta,
  official = true,
  disabled = false,
  error,
}: {
  icon: string;
  display_name: string;
  disabled?: boolean;
  error?: any;
  beta?: boolean;
  official?: boolean;
}) => {
  const Icon = getLucideIcon(icon);

  const onDragStart = (event: any) => {
    event.dataTransfer.setData("application/reactflow", display_name); // This should be the node type (one usage to fetch node info )
    // event.dataTransfer.setData("nodeId", nodeType);

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className=" rounded-md m-1 outline-none ring-ring focus-visible:ring-1 w-full border">
      <div
        className={cn(
          "group/draggable flex cursor-grab items-center gap-2 rounded-md bg-muted p-[5px] px-3 hover:bg-secondary-hover/75",
          error && "cursor-not-allowed select-none",
          disabled
            ? "pointer-events-none bg-accent text-placeholder-foreground"
            : "text-foreground bg-gray-100/50"
        )}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={() => {
          if (document.getElementsByClassName("cursor-grabbing").length > 0) {
            document.body.removeChild(
              document.getElementsByClassName("cursor-grabbing")[0]
            );
          }
        }}
      >
        {Icon && <Icon className="size-4 text-primary shrink-0" />}

        <div className="flex flex-1 items-center overflow-hidden">
          <CustomTooltip title={display_name} className="z-50">
            <span className="truncate text-sm font-normal">{display_name}</span>
          </CustomTooltip>
          {beta && <Badge className="ml-1.5 shrink-0">Beta</Badge>}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {!disabled && (
            <Button
              variant="ghost"
              size="icon"
              tabIndex={-1}
              className="text-primary"
            >
              <Plus className="h-4 w-4 shrink-0 transition-all group-hover/draggable:opacity-100 group-focus/draggable:opacity-100 sm:opacity-0" />
            </Button>
          )}
          <div>
            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground group-hover/draggable:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
