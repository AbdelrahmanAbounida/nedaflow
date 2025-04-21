import { FlowSidebar } from "@/components/flow/sidebar/main";
import { FlowSidebarV2 } from "@/components/flow/sidebar2/main";
import { MainAppFooter } from "@/components/layout/footer/main-footer";
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
            className="flex w-full h-full z-1 border pt-[--header-height] mb-[100px]"
          >
            {/* <FlowSidebar /> */}
            <FlowSidebarV2 />
            <div className="w-full overflow-auto">{children}</div>
          </div>
          <div className="absolute bottom-0 border-t left-0 w-full bg-white z-10 ">
            <MainAppFooter className="z-10 z-100" />
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default FlowLayout;
