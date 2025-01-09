import { ReactFlowProvider } from "@xyflow/react";
import React, { ReactNode } from "react";

export const FLowProvider = ({ children }: { children: ReactNode }) => {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
};
