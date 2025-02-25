import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

export const CustomTooltip = ({
  children,
  title,
  className,
  ...props
}: {
  children?: ReactNode;
  title: string;
  className?: string;
} & TooltipTriggerProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger {...props} className={cn("", className)}>
          {children}
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
