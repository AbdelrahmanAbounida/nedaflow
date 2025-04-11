"use client";
import React, {
  DragEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  ConnectionMode,
  ConnectionLineType,
  SelectionMode,
} from "@xyflow/react";
import { cn } from "@/lib/utils";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "./utils/create-flow-node";
import { Component, ComponentTypeEnum } from "@/types/flow/flow-component";
import { GenericNodeComponent } from "./generic-component/generic-component";
import { GenericNode } from "@/types/flow/flow";
import { DeletableEdge } from "./edges/deletable-edge";
import ConnectionLineComponent from "./edges/connection-line";
import { useFlowStore } from "@/store/flow";
import { OptionsPanel } from "./options-panel/options-panel";
import { Button } from "../ui/button";
import { MessageCircle, Play, PlayCircle, Share2 } from "lucide-react";
import { Card } from "../ui/card";
import { FlowPlayground } from "./options-panel/playground";

export interface FlowPageProps {
  params: {
    folderId?: string;
    flowId: string;
  };
}
const initialNodes: GenericNode[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  geneicNode: GenericNodeComponent,
};
const edgeTypes = {
  default: DeletableEdge,
};

const FlowPageView = ({ params }: FlowPageProps) => {
  // TODO:: Load flow data from params.flowId >> dataabse
  const [nodes, setNodes, onNodesChange] =
    useNodesState<GenericNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const [isConnecting, setIsConnecting] = useState(false);
  const { setCurrentSelectedNodeId } = useFlowStore();

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("Start connection");
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback(() => {
    setIsConnecting(true);
  }, []);

  const onConnectEnd = useCallback(() => {
    setIsConnecting(false);
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Here we create the new node on drop event
  const onDrop: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    const nodeName = event.dataTransfer?.getData("application/reactflow");
    const nodeData: Component = JSON.parse(
      event.dataTransfer?.getData("genericNodeData")
    );

    // TODO:: get node data , measured and accumulate the width and height
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // TODO >> check how to render data here and to pass them on function on dragstart
    const newNode = createFlowNode({
      // componentType: ComponentTypeEnum.AGENT,
      data: nodeData,
      position,
    });
    setNodes((es) => es.concat(newNode));
  }, []);

  const handleCurrentSelectedNode = useCallback((_: any, node: any) => {
    setCurrentSelectedNodeId(node.id);
  }, []);

  const buildFlow = async () => {
    const res = await fetch(
      `http://localhost:7000/api/v1/flows/${params.flowId}/build`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      }
    );
    const data = await res.json();
    console.log({ data });
  };

  return (
    <div className="w-full  h-full bg-canvas/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeDrag={handleCurrentSelectedNode}
        onNodeClick={handleCurrentSelectedNode}
        // onNodeMouseEnter={handleCurrentSelectedNode}
        onPaneClick={() => setCurrentSelectedNodeId("")}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        maxZoom={10}
        connectionMode={ConnectionMode.Strict}
        connectionLineType={ConnectionLineType.Bezier}
        connectionLineStyle={{
          stroke: "#747a86",
          strokeWidth: 2,
          strokeDasharray: "5 5",
          animationPlayState: "running",
        }}
        panOnDrag={[1, 2]} // prevent drag with left mouse but allow with scroll wheel
        panOnScroll
        selectionOnDrag
        selectionMode={SelectionMode.Full}
        // connectionLineComponent={ConnectionLineComponent}
      >
        <Panel
          className={cn(
            " z-10 w-fit transition-all text-[#747a86]  gap-1.5  delay-10 bg-background fill-background stroke-background   m-2 rounded-md flex items-center justify-center group-data-[open=true]/sidebar-wrapper:opacity-0 group-data-[open=true]/sidebar-wrapper:translate-x-full opacity-100"
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

        <Panel position="top-right">
          <Button className="">
            <Share2 />
            Publish
          </Button>
        </Panel>

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
          <Button className="!h-9">
            <PlayCircle className="" />
            Build Flow
          </Button>
        </Panel>

        <Controls />
        <Background gap={19} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowPageView;
