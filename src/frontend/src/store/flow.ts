import { FlowComponentSchema } from "@/types/flow";
import { Flow, GenericNode } from "@/types/flow/flow";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import { create } from "zustand";

export type FlowStoreType = {
  // 1- flow components (sidebar )
  componentTypes: FlowComponentSchema; // TODO:: create custom schema for this
  setComponentTypes: (val: FlowComponentSchema) => void;
  loadingComponentsTypes: boolean;
  setLoadingComponentTypes: (va: boolean) => void;

  // 2- main flow
  loadingFlow: boolean;
  setLoadingFlow: (val: boolean) => void;

  currentFLow?: Flow | null;
  setCurrentFlow: (val: Flow) => void;

  flowNodes: GenericNode[];
  setFlowNodes: (val: GenericNode[]) => void;
  addFlowNode: (node: GenericNode) => void;

  flowEdges: Edge[];
  setFlowEdges: (val: Edge[]) => void;

  onNodesChange: OnNodesChange<GenericNode>;
  onEdgesChange: OnEdgesChange<Edge>;

  currentSelectedNodeId: string;
  setCurrentSelectedNodeId: (id: string) => void;
};

export const useFlowStore = create<FlowStoreType>((set, get) => ({
  // components
  componentTypes: {},
  setComponentTypes: (val) => {
    set(() => ({ componentTypes: val }));
  },
  loadingComponentsTypes: false,
  setLoadingComponentTypes: (val) => {
    set(() => ({ loadingComponentsTypes: val }));
  },

  // main flow
  loadingFlow: false,
  setLoadingFlow: (val) => {
    set(() => ({ loadingFlow: val }));
  },

  currentFLow: null,
  setCurrentFlow: (val) => {
    set(() => ({ currentFLow: val }));
  },

  flowNodes: [],
  setFlowNodes: (nodes) => {
    set(() => ({ flowNodes: nodes }));
  },
  addFlowNode: (node: GenericNode) => {
    set({
      flowNodes: [...get().flowNodes, node],
    });
  },

  flowEdges: [],
  setFlowEdges: (val: Edge[]) => {
    set(() => ({ flowEdges: val }));
  },

  onNodesChange: (changes: NodeChange<GenericNode>[]) => {
    set({
      flowNodes: applyNodeChanges(changes, get().flowNodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      flowEdges: applyEdgeChanges(changes, get().flowEdges),
    });
  },

  // Others
  currentSelectedNodeId: "",
  setCurrentSelectedNodeId: (id) => {
    set(() => ({ currentSelectedNodeId: id }));
  },
}));
