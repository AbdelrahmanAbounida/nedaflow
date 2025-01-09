import { FlowSidebar } from "@/components/flow/sidebar/main";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

// TODO >> Start here with React Flow
// Auto generate schema between frontend and backend
const FlowLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start  w-full h-screen justify-start">
      <SidebarProvider>
        <FlowSidebar />
        <div className="w-full">{children}</div>
      </SidebarProvider>
    </div>
  );
};

export default FlowLayout;
