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
  BackgroundVariant,
} from "@xyflow/react";
import { cn } from "@/lib/utils";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "./utils/create-flow-node";
import { Component, ComponentTypeEnum } from "@/types/flow/flow-component";
import { GenericNode } from "@/types/flow/flow";
import { DeletableEdge } from "./edges/deletable-edge";
import ConnectionLineComponent from "./edges/connection-line";
import { useFlowStore } from "@/store/flow";
import { OptionsPanel } from "./options-panel/options-panel";
import { Button } from "../ui/button";
import {
  Loader,
  Loader2,
  MessageCircle,
  Play,
  PlayCircle,
  PlusIcon,
  Share2,
} from "lucide-react";
import { Card } from "../ui/card";
import { FlowPlayground } from "./options-panel/playground";
import {
  buildFlowWithStream,
  useBuildFlow,
} from "@/controllers/flow/mutations";
import { IBuildWorkflow } from "@/types/api";
import { toast } from "sonner";
import { VertexComponent } from "./vertex-ui/vertex";
import NodeParamsModal from "../modals/node-params-modal";
import CodeDialog from "../modals/code-modal";
import { shouldShowChatInterface } from "@/utils/flow";

export interface FlowPageProps {
  params: {
    folderId?: string;
    flowId: string;
  };
}
const initialNodes: GenericNode[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  geneicNode: VertexComponent, // GenericNodeComponent
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
  const {
    setFlowNodes,
    // onNodesChange,
    // onEdgesChange,
    setFlowEdges,
    // flowNodes,
    // flowEdges,
    setCurrentSelectedNodeId,
    // setShowChatInterface,
  } = useFlowStore();
  const { screenToFlowPosition } = useReactFlow();

  const [showNode, setshowNode] = useState(false);
  const [nodeToEdit, setNodeToEdit] = useState<GenericNode | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("Start connection");
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      // setFlowEdges(addEdge({ ...connection, animated: true }, flowEdges));
    },
    [] // setEdges
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
    // setFlowNodes([...flowNodes, newNode]);
  }, []);

  const handleCurrentSelectedNode = useCallback((_: any, node: any) => {
    setCurrentSelectedNodeId(node.id);
  }, []);

  const { mutate: mutateBuildFlow, isPending, isError, error } = useBuildFlow();

  const handleBuildFlow = async () => {
    try {
      const flow: IBuildWorkflow = {
        flow_id: params.flowId,
        vertexes: nodes, // flowNodes, //nodes,
        edges: edges, // flowEdges, // edges
        name: "asd",
      };
      // mutateBuildFlow(flow);
      await buildFlowWithStream(flow);
    } catch (err) {
      console.log({ err });
      toast.error(err + "");
    }
  };

  const onNodeDoubleClick = useCallback((event: any, node: GenericNode) => {
    if (!node || !node.data) return;

    // TODO:: check if it is stricky note node

    setNodeToEdit(node);
    setshowNode(true);
  }, []);

  useEffect(() => {
    if (isError && error) {
      console.log({ error });
      toast.error(error + "");
    }
  }, [isError]);

  // TODO:: think about optimizing this
  // useEffect(() => {
  //   setFlowNodes(nodes);
  //   setFlowEdges(edges);
  // }, [nodes, edges]);

  return (
    <div className="w-full  h-full bg-canvas/10">
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
        onNodeDoubleClick={onNodeDoubleClick}
        // connectionLineComponent={ConnectionLineComponent}
      >
        {/** ************************* */}
        {/** Panels */}
        {/** ************************* */}
        <Panel
          className={cn(
            " group-data-[open=true]/sidebar-wrapper:opacity-0 group-data-[open=true]/sidebar-wrapper:translate-x-full opacity-100",
            "bg-gradient-to-br delay-10 hover:opacity-100 opacity-90 from-primary via-primary/90 to-primary p-3 z-10 rounded-full transition-all delay-10 fill-background stroke-background m-2 w-12 h-12 flex items-center justify-center"
          )}
          position="top-left"
        >
          <SidebarTrigger
            size={"icon"}
            variant={"ghost"}
            className={cn(
              " text-white z-1000 w-full hover:bg-transparent",
              "bg-transparent inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:ring-offset-2 active:scale-95 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-ring cursor-pointer text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50   transition-all  hover:opacity-90 w-12 min-w-12 min-h-12  slide-in-from-left-[200%] fade-in animate-in  text-foreground left-5 z-50 rounded-full border border-primary drop-shadow-sm duration-1000 "
            )}
          >
            <PlusIcon className="text-white !z-1000 w-5 h-5" />
          </SidebarTrigger>
        </Panel>

        <Panel position="top-right" className="flex items-center gap-2">
          <Button className="">
            <Share2 />
            Publish
          </Button>
          {/* <Button className="" variant={"outline"}>
            <Share2 />
            Show Code
          </Button> */}
          <CodeDialog />
        </Panel>

        <Panel
          className={cn(
            " z-10  transition-all   gap-1.5  delay-10 bg-background fill-background stroke-background   m-2 rounded-md flex items-center justify-center  opacity-100"
          )}
          position="bottom-center"
        >
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

        {/** ************************ */}
        {/** Dialogs */}
        {/** ************************ */}
        <NodeParamsModal
          show={showNode}
          node={nodeToEdit!}
          onCancel={() => setshowNode(false)}
        />

        {/** ************************ */}
        {/** Others */}
        {/** ************************ */}
        <Controls />
        <Background
          color="#000"
          variant={BackgroundVariant.Dots}
          className=" "
          gap={51}
          size={1}
        />
      </ReactFlow>
    </div>
  );
};

export default FlowPageView;
