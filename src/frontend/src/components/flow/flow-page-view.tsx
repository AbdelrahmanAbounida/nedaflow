"use client";
import React, { DragEventHandler, useCallback, useRef, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  useReactFlow,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import { cn } from "@/lib/utils";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "./utils/create-flow-node";
import { ComponentTypeEnum } from "@/types/flow/flow-component";
import { GenericNodeComponent } from "./generic-component/generic-component";

export interface FlowPageProps {
  params: {
    folderId?: string;
    flowId: string;
  };
}
const initialNodes = [
  createFlowNode({ componentType: ComponentTypeEnum.AGENT }),
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = {
  geneicNode: GenericNodeComponent,
};

const FlowPageView = ({ params }: FlowPageProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer?.getData("application/reactflow");

    // TODO:: get node data , measured and accumulate the width and height
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // TODO >> check how to render data here and to pass them on function on dragstart

    const newNode = createFlowNode({
      componentType: ComponentTypeEnum.AGENT,
      position,
    });
    setNodes((es) => es.concat(newNode));
  }, []);

  return (
    <div className="w-full  h-full bg-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Panel
          className={cn(
            " z-10 w-fit transition-all  gap-1.5  delay-10 bg-background fill-background stroke-background   m-2 rounded-md flex items-center justify-center group-data-[open=true]/sidebar-wrapper:opacity-0 group-data-[open=true]/sidebar-wrapper:translate-x-full opacity-100:"
          )}
          position="top-left"
        >
          <SidebarTrigger
            title="Components"
            className="px-3 py-1.5 border w-full"
          >
            Components
          </SidebarTrigger>
        </Panel>
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowPageView;
