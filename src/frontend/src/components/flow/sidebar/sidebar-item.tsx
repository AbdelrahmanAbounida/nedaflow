"use client";
import { ChevronRight } from "lucide-react";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { SidebarItemProps } from "@/constants/flow-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LoadIcon } from "@/utils/load-icon-from-name";
import { BundleIcon } from "./bundle-icon";
import { FlowSidebarDraggableItem } from "./sidebar-draggable-item";
import { Component } from "@/types/flow/flow-component";

export const FlowSidebarItem = ({
  item,
  subItems,
  isBundle = false,
}: {
  item: SidebarItemProps;
  subItems: Component[];
  isBundle?: boolean;
}) => {
  const [activeIndex, setactiveIndex] = useState<number | null>();

  const toggleAccordion = (index: number) => {
    setactiveIndex((prev) => (prev === index ? null : index));
  };

  // load sidebar types and then all component types and load data from each types
  // if (subItems) {
  //   console.log({ subItems });
  // }
  return (
    <div className="w-full">
      <div className="w-full flex items-center flex-col">
        <SidebarMenuButton
          onClick={() => toggleAccordion(0)}
          className="flex items-center justify-between w-full  data-[state=open]:font-bold  data-[state=open]:bg-red-50"
        >
          <div className="flex items-center gap-2 w-full ">
            {isBundle ? (
              <BundleIcon icon_name={item.icon} />
            ) : (
              // Icon && <Icon width={10} />
              <LoadIcon name={item.icon} className="size-4" />
            )}
            <p className="text-md">{item.display_name}</p>
          </div>
          <Button variant={"ghost"} size={"icon"} className="">
            <ChevronRight className="size-4 text-gray-400  data-[state=open]:rotate-180" />
          </Button>
        </SidebarMenuButton>

        {/** item content  */}
        <div className="flex flex-col gap-0 w-full">
          {subItems?.map((subitem, index) => (
            <Accordion
              key={index}
              className=" w-full"
              type="single"
              collapsible
              value={activeIndex?.toString()}
              onValueChange={(value) => setactiveIndex(Number(value))}
            >
              <AccordionItem value="0" className="border-none ">
                <AccordionContent className="flex items-center flex-col gap-5 pb-1 px-1 ">
                  <FlowSidebarDraggableItem
                    icon={subitem.icon}
                    data={subitem}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};
