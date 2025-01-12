import { Separator } from "@/components/ui/separator";
import React, { FC, HTMLProps } from "react";
import Logo from "../logo";
import Notifications from "./notifications";
import Store from "./store";
import UserNav from "./user-nav";
import { cn } from "@/lib/utils";
import { HEADER_HEIGHT } from "@/constants/layout";

interface AppHeaderProps {
  className?: HTMLProps<HTMLDivElement["className"]>;
  // variant?: "floating" | "inset";
}

const MainAppHeader: FC<
  React.HTMLAttributes<HTMLDivElement> & AppHeaderProps
> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      style={
        {
          "--header-height": HEADER_HEIGHT,
        } as React.CSSProperties
      }
      className={cn("h-[--header-height] w-full ", className)}
    >
      <div
        className={cn(
          "bg-white shadow-sm h-full flex items-center justify-between px-5"
        )}
      >
        <Logo />

        {/** TODO:: add nav breadcrumb */}
        <div className=""></div>

        <div className="flex items-center gap-7">
          {/** Notifications */}
          <Notifications />

          {/** Store */}
          <Store />

          {/** User nav */}
          <UserNav />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default MainAppHeader;
