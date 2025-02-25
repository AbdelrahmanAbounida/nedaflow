import React, { HTMLProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  className?: string; // HTMLProps<HTMLElement["className"]>;
  //   open?: boolean;
  //   setOpen: (val: boolean) => void;
  children: ReactNode;
  //   disable?: boolean;
}

export const BaseModal = ({ className, children }: BaseModalProps) => {
  return (
    <div className={cn("", className)}>
      {/** TODO:: Add Framer Motion */}
      {children}
    </div>
  );
};
