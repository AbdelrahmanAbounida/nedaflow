import { Button } from "@/components/ui/button";
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PanelLeftClose, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const FlowSidebarHeader = ({ className }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SidebarHeader className={cn("", className)}>
      <div className="flex items-center justify-between mt-4 mb-2 ">
        <div className="flex items-center gap-2">
          <SidebarTrigger variant={"ghost"} size={"icon"}>
            <PanelLeftClose className="text-gray-300 size-4" />
          </SidebarTrigger>
          <p className="font-bold text-[14px]">Components</p>
        </div>
        <Button
          onClick={() => toggleAccordion(0)}
          variant={"ghost"}
          size={"icon"}
          className=""
        >
          <SlidersHorizontal className="size-4 text-gray-400 " />
        </Button>
      </div>

      <Accordion
        type="single"
        collapsible
        value={activeIndex?.toString()}
        onValueChange={(value) => setActiveIndex(Number(value))}
      >
        <AccordionItem value="0" className="border-none">
          <AccordionContent className="flex items-center flex-col gap-5 w-full px-2">
            <div className="flex items-center justify-between w-full">
              <p className="font-medium flex items-center gap-1">
                Show{" "}
                <Badge
                  className="bg-pink-50 ml-2 border-none text-pink-500 px-2 "
                  variant="outline"
                >
                  Beta
                </Badge>
              </p>

              <Switch className="" />
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="font-medium flex items-center gap-1">
                Show{" "}
                <Badge
                  variant="outline"
                  className="border-none bg-accent ml-1 text-gray-500"
                >
                  Legacy
                </Badge>
              </p>
              <Switch className="" />
            </div>

            <Separator className="mt-2" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SidebarHeader>
  );
};
