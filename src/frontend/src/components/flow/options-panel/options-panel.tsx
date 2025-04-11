import { cn } from "@/lib/utils";
import { Panel } from "@xyflow/react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeXml, Play, PlayCircle, Share, Share2 } from "lucide-react";
import { FlowPlayground } from "./playground";

export const OptionsPanel = () => {
  return (
    <Panel
      className={cn(
        " z-10  transition-all   gap-1.5  delay-10 bg-background fill-background stroke-background   m-2 rounded-md flex items-center justify-center  opacity-100"
      )}
      position="bottom-center"
    >
      <Card className=" h-11 flex items-center justify-center px-1 rounded-md">
        {/* <Button variant={"ghost"}>
          <Play className="" />
          Playground
        </Button> */}
        <Button variant={"ghost"} className="!h-9">
          <PlayCircle className="" />
          Build Flow
        </Button>

        <FlowPlayground />
      </Card>
    </Panel>
  );
};
