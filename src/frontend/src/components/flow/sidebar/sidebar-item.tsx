"use client";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronRight,
  LucideIcon,
  PanelLeftClose,
  SlidersHorizontal,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { SidebarItemProps } from "@/constants/flow-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { getLucideIcon, LucidIconFromName } from "@/utils/get-lucid-icon";
import { BundleIcon } from "./bundle-icon";
import { FlowSidebarDraggableItem } from "./sidebar-draggable-item";

export const FlowSidebarItem = ({
  item,
  isBundle = false,
}: {
  item: SidebarItemProps;
  isBundle?: boolean;
}) => {
  const [activeIndex, setactiveIndex] = useState<number | null>();

  const toggleAccordion = (index: number) => {
    setactiveIndex((prev) => (prev === index ? null : index));
  };

  // TODO:: see how to load the data using this categoty
  const Icon = getLucideIcon(item.icon);

  return (
    <div className="w-full">
      <div className="w-full flex items-center flex-col">
        <SidebarMenuButton
          onClick={() => toggleAccordion(0)}
          className="flex items-center justify-between w-full "
        >
          <div className="flex items-center gap-2 w-full ">
            {isBundle ? (
              <BundleIcon icon_name={item.display_name} />
            ) : (
              Icon && <Icon className="size-4" />
            )}
            <p className="text-md">{item.display_name}</p>
          </div>
          <Button variant={"ghost"} size={"icon"} className="">
            <ChevronRight className="size-4 text-gray-400 " />
          </Button>
        </SidebarMenuButton>

        {/** Data accordion */}

        <Accordion
          className=" w-full"
          type="single"
          collapsible
          value={activeIndex?.toString()}
          onValueChange={(value) => setactiveIndex(Number(value))}
        >
          <AccordionItem value="0" className="border-none ">
            <AccordionContent className="flex items-center flex-col gap-5 px-1 ">
              <FlowSidebarDraggableItem
                icon={item.icon}
                display_name={item.display_name}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
