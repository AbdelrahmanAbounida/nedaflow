import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export const ComponentHeader = ({
  title,
  img,
}: {
  title: string;
  img: string;
}) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image src={img} alt="component logo" className="" />
          <p className="text-sm font-medium">{title}</p>
        </div>

        <Button variant={"ghost"} size={"icon"}>
          <Play className="size-4" />
        </Button>
      </div>
    </div>
  );
};
