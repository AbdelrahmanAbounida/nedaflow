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
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SidebarItemProps } from "@/constants/flow-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { getLucideIcon, LucidIconFromName } from "@/utils/get-lucid-icon";
import { BundleIcon } from "./bundle-icon";

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
    <div>
      <div className="w-full flex items-center flex-col">
        <SidebarMenuButton
          onClick={() => toggleAccordion(0)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            {/* <LucidIconFromName name={item.icon as any} /> */}
            {isBundle ? (
              <BundleIcon icon_name={item.display_name} />
            ) : (
              Icon && <Icon className="size-4" />
            )}

            <p className="text-sm">{item.display_name}</p>
          </div>
          <Button variant={"ghost"} size={"icon"} className="">
            <ChevronRight className="size-4 text-gray-400 " />
          </Button>
        </SidebarMenuButton>

        {/** Data accordion */}

        <Accordion
          type="single"
          collapsible
          value={activeIndex?.toString()}
          onValueChange={(value) => setactiveIndex(Number(value))}
        >
          <AccordionItem value="0" className="border-none">
            <AccordionContent className="flex items-center flex-col gap-5 w-full px-2">
              <div className="flex items-center justify-between w-full my-5">
                items shown here
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
