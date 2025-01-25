import { FlowComponentSchema } from "@/types/flow";
import { create } from "zustand";

export type FlowStoreType = {
  // 1- flow components
  componentTypes: FlowComponentSchema; // TODO:: create custom schema for this
  setComponentTypes: (val: FlowComponentSchema) => void;
  loadingComponentsTypes: boolean;
  setLoadingComponentTypes: (va: boolean) => void;
  loadingFlow: boolean;
  setLoadingFlow: (val: boolean) => void;
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
}));
