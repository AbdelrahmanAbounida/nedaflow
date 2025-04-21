"use client";
import React, { useEffect } from "react";
import {
  Panel,
  BackgroundVariant,
  useReactFlow,
  useNodes,
  useEdges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Loader, PlayCircle } from "lucide-react";
import { useBuildFlow } from "@/controllers/flow/mutations";
import { IBuildWorkflow } from "@/types/api";
import { toast } from "sonner";

import { FOOTER_HEIGHT } from "@/constants/layout";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { FlowPlayground } from "@/components/flow/options-panel/playground";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

interface AppFooterProps {
  className?: string;
}

export const MainAppFooter: FC<
  React.HTMLAttributes<HTMLDivElement> & AppFooterProps
> = ({ className, ...props }) => {
  const { mutate: mutateBuildFlow, isPending, isError, error } = useBuildFlow();

  const nodes = useNodes();
  const edges = useEdges();

  const { flowId }: { flowId?: string } = useParams();

  const handleBuildFlow = () => {
    try {
      const flow: IBuildWorkflow = {
        flow_id: flowId!,
        vertexes: nodes,
        edges,
        name: "asd",
      };
      mutateBuildFlow(flow);
    } catch (err) {
      console.log({ err });
      toast.error(err + "");
    }
  };

  useEffect(() => {
    if (isError && error) {
      console.log({ error });
      toast.error(error + "");
    }
  }, [isError]);

  return (
    <div
      {...props}
      style={
        {
          "--footer-height": FOOTER_HEIGHT,
        } as React.CSSProperties
      }
      className={cn("h-[--footer-height] w-full bg-white border-t", className)}
    >
      <Panel
        className={cn(
          " z-10  transition-all   gap-1.5  delay-10 bg-background fill-background stroke-background   m-2 rounded-md flex items-center justify-center  opacity-100"
        )}
        position="bottom-center"
      >
        {/* <Button className="!h-9">
            <MessageCircle className="" />
            Chat
          </Button> */}
        <FlowPlayground />
        {isPending ? (
          <Button disabled className="!h-9">
            <Loader className="animate-spin" /> Building
          </Button>
        ) : (
          <Button
            onClick={handleBuildFlow}
            disabled={isPending}
            className="!h-9"
          >
            <PlayCircle className="" />
            Build Flow
          </Button>
        )}
      </Panel>
    </div>
  );
};
