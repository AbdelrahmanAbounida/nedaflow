import MainAppHeader from "@/components/layout/header/main-header";
import { AppSidebar } from "@/components/layout/sidebars/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="flex flex-col gap-2 ">
      <MainAppHeader className="z-10" />
      <div className="w-full h-full ">
        <div className="flex items-center">
          <AppSidebar />
          <SidebarInset className="w-full h-screen">{children}</SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
