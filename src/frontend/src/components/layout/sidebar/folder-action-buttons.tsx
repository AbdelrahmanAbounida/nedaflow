"use client";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { UploadIcon, PlusIcon, MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CreateNewFolderButton = () => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="w-7 h-7">
          <UploadIcon className="size-4 text-muted-foreground/50" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Upload Flow</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const UploadFlowButton = () => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="w-7 h-7">
          <PlusIcon className="size-4 text-muted-foreground/50" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create New Folder</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const FolderDropDown = ({
  isActive = false,
}: {
  isActive?: boolean;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="" asChild>
      <SidebarMenuAction
        className={cn("hidden group-hover/item:flex", isActive && "flex")}
      >
        <MoreHorizontal
          className={cn(
            "mt-2 text-muted-foreground group-hover/item:text-black",
            isActive && "text-black"
          )}
        />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="min-w-56 rounded-lg ml-1"
      side="right"
      align="start"
    >
      <DropdownMenuItem>
        <span>Edit Project</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Delete Project</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
