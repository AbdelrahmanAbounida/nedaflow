import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export const FlowSidebarSearchBar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <div className="relative items-center flex px-3  rounded-lg border bg-white hover:border-primary/70 focus-visible:border-primary ">
        <Search className=" h-4 w-4 shrink-0 opacity-50" />
        <Input
          placeholder="Search"
          className={cn(
            "focus-visible:ring-0 focus:outline-none border-none focus-visible:outline-none flex shadow-none active:ring-0  h-9 w-full  text-sm !outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">/</span>
        </kbd>
      </div>
    </div>
  );
};
