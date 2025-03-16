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

export interface FlowPageProps {
  params: {
    folderId?: string;
    flowId: string;
  };
}
const initialNodes: GenericNode[] = [];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

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

  return (
    <div className="w-full  h-full bg-canvas">
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

        <OptionsPanel />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowPageView;
