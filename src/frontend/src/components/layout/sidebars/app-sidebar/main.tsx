"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  PlusIcon,
  FolderClosed,
  BookOpen,
} from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProjectsSwitcher from "./projects-switcher";
import {
  CreateNewFolderButton,
  FolderDropDown,
  UploadFlowButton,
} from "./folder-action-buttons";

export const AppSidebar = () => {
  const folders: any[] = ["folder1", "Folder2"]; // TODO:: to be loaded with hoosk

  return (
    <Sidebar variant="sidebar" className="mt-[--sidebar-m-top]">
      <SidebarHeader className="bg-white  pb-0">
        {/* <ProjectsSwitcher /> */}
      </SidebarHeader>
      <SidebarContent className="p-1 bg-white gap-0">
        {/** Custom Actions  */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-1">Actions</div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Library
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="group/item flex pr-0 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderClosed className="mr-2 h-4 w-4" />
                    Components
                  </div>

                  {/** TODO:: This is modal */}
                  <div
                    className={cn(
                      "group-hover/item:flex hover:bg-gray-200/50 items-center justify-center  hidden",
                      buttonVariants({ variant: "ghost", size: "icon" })
                    )}
                  >
                    <PlusIcon />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuButton className="group/item flex pr-0 items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderClosed className="mr-2 h-4 w-4" />
                  Projects
                </div>

                {/** TODO:: This is modal */}
                <div
                  className={cn(
                    "group-hover/item:flex hover:bg-gray-200/50 items-center justify-center  hidden",
                    buttonVariants({ variant: "ghost", size: "icon" })
                  )}
                >
                  <PlusIcon />
                </div>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/** List of Folders */}
        <SidebarGroup className="p-3">
          {/** Folders Label */}
          <SidebarGroupLabel className="flex items-center justify-between p-0  ">
            <div className="flex items-center gap-1">
              {/* <Folders className="size-3 mr-1" /> */}
              Folders
              {/* <p className="font-semibold text-[15px] text-black">Folders</p> */}
            </div>
            <div className="flex items-center ">
              <CreateNewFolderButton />
              <UploadFlowButton />
            </div>
          </SidebarGroupLabel>

          {/** List of Folders */}
          <SidebarGroupContent className="mt-1">
            <SidebarMenu className="gap-1">
              {folders.map((folder, index) => (
                <SidebarMenuItem key={index} className="group/item">
                  <SidebarMenuButton
                    className={cn("h-9 flex items-center")}
                    isActive={index == 0}
                  >
                    <Link href={"/"} className="">
                      asd
                    </Link>
                  </SidebarMenuButton>
                  <FolderDropDown isActive={index == 0} />
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
