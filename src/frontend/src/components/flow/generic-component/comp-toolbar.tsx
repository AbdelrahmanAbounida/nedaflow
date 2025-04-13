"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Download,
  EllipsisIcon,
  LogOut,
  Minimize,
  SlidersHorizontal,
  Sparkles,
  TowerControl,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Edit, Trash, Copy, Trash2, Save, Loader, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useFlowStore } from "@/store/flow";
import { cn } from "@/lib/utils";

interface NodeToolbarProps {
  nodeId: string;
}

export function ComponentToolbar({ nodeId }: NodeToolbarProps) {
  const { getNode, setNodes } = useReactFlow();
  const [updateLoading, setupdateLoading] = useState(false);
  const { currentSelectedNodeId, setCurrentSelectedNodeId } = useFlowStore();

  const handleDuplicate = () => {
    const node = getNode(nodeId);
    if (!node) return;
    const newId = uuidv4();

    const newNode = {
      ...node,
      id: newId,
      position: {
        x: node.position.x + 390,
        y: node.position.y + 20,
      },
      selected: false,
      dragHandle: node.dragHandle,
      width: node.width,
      height: node.height,
      data: { ...node.data },
    };

    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleUpdate = async () => {
    try {
      setupdateLoading(true);
    } catch (err) {
      console.log({ err });
      toast.error("Failed to updated stage");
    } finally {
      setupdateLoading(false);
    }
  };

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
  };

  return (
    // <NodeToolbar
    //   isVisible={currentSelectedNodeId == nodeId}
    //   offset={5}
    //   nodeId={nodeId}
    //   align="start"
    //   position={Position.Top}
    //   className={cn(
    //     " h-10 !top-0 w-auto items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-md"
    //   )}
    // >
    <div
      className={cn(
        "absolute -top-12 left-1/2 z-50 -translate-x-1/2 w-[285px] hidden",
        currentSelectedNodeId == nodeId && "block flex-1 "
      )}
    >
      <div className=" h-10 !top-0 w-auto items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-md">
        <div className="flex gap-1 items-center justify-between  ">
          <Button
            variant="ghost"
            onClick={handleDuplicate}
            className=" px-2"
            title="Duplicate"
          >
            <Code className="h-4 w-4" />
            Code
          </Button>
          {updateLoading ? (
            <Button className="text-sm" variant={"secondary"} disabled>
              saving
              <Loader className="animate-spin w-3 h-3" />
            </Button>
          ) : (
            <Button
              disabled={updateLoading}
              variant="ghost"
              onClick={handleDuplicate}
              //   onClick={handleUpdate}
              title="Update"
              className=" px-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Controls
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleDelete}
            title="Delete"
            className=" px-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>

          {/** TODO:: handle the reach max stack issue here  */}
          {/* <ComponentDropDown /> */}
        </div>
      </div>
    </div>
  );
}

export function ComponentDropDown() {
  const { isMobile } = useSidebar();
  // TODO:: add keyboard shortcuts
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="sm"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-7 flex items-center justify-center "
        >
          <EllipsisIcon className="mx-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg "
        // side={isMobile ? "bottom" : "bottom"}
        side="bottom"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuItem>
          <Code />
          Code
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SlidersHorizontal />
          Controls
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Save />
          Save
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Minimize />
          Minimize
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          Download
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
