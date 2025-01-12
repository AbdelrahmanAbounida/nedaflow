import { FlowSidebar } from "@/components/flow/sidebar/main";
import MainAppHeader from "@/components/layout/header/main-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HEADER_HEIGHT } from "@/constants/layout";
import React, { ReactNode } from "react";

// TODO >> Start here with React Flow
// Auto generate schema between frontend and backend
const FlowLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center">
      {/* */}
      <div className="flex items-start w-full h-screen justify-start">
        <SidebarProvider className="h-full w-full relative flex flex-col">
          <div className="absolute top-0 left-0 w-full bg-white z-10 ">
            <MainAppHeader className="z-10 z-100" />
          </div>
          <div
            style={
              {
                "--header-height": HEADER_HEIGHT,
              } as React.CSSProperties
            }
            className="flex w-full h-full z-1 border pt-[--header-height]"
          >
            <FlowSidebar />
            <div className="w-full overflow-auto">{children}</div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default FlowLayout;
