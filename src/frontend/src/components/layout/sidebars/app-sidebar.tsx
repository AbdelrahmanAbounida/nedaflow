"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  User2,
  ChevronUp,
  UploadIcon,
  PlusIcon,
  Ellipsis,
  MoreHorizontal,
} from "lucide-react";
import React from "react";
import { SIDEBAR_M_TOP } from "@/constants/layout";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const AppSidebar = () => {
  const folders: any[] = ["folder1", "Folder2"]; // TODO:: to be loaded with hoosk

  return (
    <Sidebar variant="sidebar" className="">
      <SidebarContent className="p-1 bg-white">
        {/** List of Folders */}
        <SidebarGroup className="p-3">
          {/** Folders Label */}
          <SidebarGroupLabel className="flex items-center justify-between p-0  mt-4">
            <p className="font-semibold text-[15px] text-black">Folders</p>
            <div className="flex items-center ">
              <CreateNewFolderButton />
              <UploadFlowButton />
            </div>
          </SidebarGroupLabel>

          {/** List of Folders */}
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="gap-1">
              {folders.map((folder, index) => (
                <SidebarMenuItem className="">
                  <SidebarMenuButton
                    className={cn("h-9 flex items-center")}
                    isActive={index == 0}
                  >
                    <Link href={"/"} className="">
                      asd
                    </Link>
                  </SidebarMenuButton>
                  {/* <SidebarMenuAction className=" my-auto">
                    <Ellipsis className="mt-1 size-3 text-muted-foreground" />
                  </SidebarMenuAction> */}
                  <FolderDropDown />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

// List of required items

const CreateNewFolderButton = () => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="w-7 h-7">
          <UploadIcon className="size-4 text-muted-foreground/50" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create New Folder</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const UploadFlowButton = () => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="w-7 h-7">
          <PlusIcon className="size-4 text-muted-foreground/50" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Upload Flow</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const FolderDropDown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction>
        <MoreHorizontal className="mt-2 text-muted-foreground" />
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
