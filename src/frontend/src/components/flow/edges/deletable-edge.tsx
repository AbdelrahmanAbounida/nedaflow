"use client";
import { Button } from "@/components/ui/button";
import { NodeData } from "@/types/flow/flow";
import {
  BaseEdge,
  Connection,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useEdges,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import { CircleX, X, XCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

export const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);

  const [isExpiredEdge, setIsExpiredEdge] = useState(false); // if the edge is connected to expired nodes

  const { setEdges, getNode } = useReactFlow();
  const edges = useEdges();
  const nodes = useNodes();

  const handleDeleteEdge = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((edge) => edge.id !== props.id));
    },
    [props.id, setEdges]
  );

  useEffect(() => {
    const sourceNode: any = getNode(props.source);
    const targetNode = getNode(props.target);
    if (sourceNode?.data?.expired || targetNode?.data?.expired) {
      setIsExpiredEdge(true);
    } else {
      setIsExpiredEdge(false);
    }
  }, [edges]);

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={{
          ...props.style,
          stroke: isExpiredEdge ? "#F00" : "#000",
          strokeWidth: 1.5,
          strokeDasharray: "5 5",
        }}
        className="edge-path"
      />

      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className={`absolute `}
        >
          <Button
            onClick={handleDeleteEdge}
            variant={"outline"}
            size={"icon"}
            className="h-7 w-7 cursor-pointer rounded-full text-xs leading-none hover:!shadow-lg hover:!bg-red-200/70  border-none !bg-red-50"
          >
            <X className=" !size-4 text-red-600" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
