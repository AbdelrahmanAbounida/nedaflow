import { Input } from "@/components/ui/input";
import React from "react";

export const TextInputParam = ({ className, ...props }: any) => {
  return (
    <div className={className} {...props}>
      <Input className="" />
    </div>
  );
};
