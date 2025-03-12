"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export const TextInputParam = ({ className, ...props }: any) => {
  const [hideText, sethideText] = useState(props.is_secret!);
  return (
    <div className={cn("relative flex items-center ", className)} {...props}>
      <Input className="" type={!hideText ? "password" : "text"} />
      {props.is_secret && (
        <Button
          className="absolute right-0 hover:bg-transparent hover:text-gray-600 group"
          variant={"ghost"}
          size={"icon"}
          onClick={() => sethideText(!hideText)}
        >
          {hideText ? (
            <Eye className=" text-gray-300 w-4 z-3 cursor-pointer group-hover:text-gray-500" />
          ) : (
            <EyeOff className=" text-gray-300 w-4 z-3 cursor-pointer group-hover:text-gray-500" />
          )}
        </Button>
      )}
    </div>
  );
};
