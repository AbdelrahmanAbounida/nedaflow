"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Folders, MessageSquare, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
export const SidebarV2Header = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col gap-2 w-full">
        {/** Tabs */}
        <div className="w-full mt-3">
          <SidebarTabs />
        </div>

        {/** Search */}
        <SearchSection />

        {/** Tabs for filters the node catgories */}
      </div>
    </div>
  );
};

function SidebarTabs() {
  const tabs = [
    {
      name: "Nodes",
      value: "Nodes",
      content: "Nodes",
      icon: <Folders className="text-primary w-5 h-5 mr-2" />,
    },
    {
      name: "Chat",
      value: "Chat",
      content: "Chat",
      icon: <MessageSquare className="text-primary w-5 h-5 mr-2" />,
    },
  ];

  return (
    <Tabs defaultValue={tabs[0].value} className="w-full ">
      <TabsList className="w-full p-0 bg-background h-[60px] justify-start border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-background h-[60px] w-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            {tab.icon}
            <p className="">{tab.name}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      {/* {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="h-10 flex items-center justify-between border gap-2 rounded-md pl-3 pr-1.5">
            <code className="text-[13px]">{tab.content}</code>
          </div>
        </TabsContent>
      ))} */}
    </Tabs>
  );
}

const SearchSection = () => {
  return (
    <div className="flex  items-center px-4 py-3 justify-center">
      <div className="relative w-full flex items-center rounded-2xl bg-zinc-100 border focus-within:ring-1 focus-within:ring-ring pl-2">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search For Nodes..."
          className="border-0 focus-visible:ring-0 shadow-none"
        />
      </div>
    </div>
  );
};
