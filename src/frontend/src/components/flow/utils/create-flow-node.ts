import { GenericNode } from "@/types/flow/flow";
import { Component, ComponentTypeEnum } from "@/types/flow/flow-component";
import { XYPosition } from "@xyflow/react";

export const createFlowNode = ({
  data,
  position,
}: {
  data: Component;
  position?: XYPosition;
}): GenericNode => {
  // u can return different node types and match then in nodetypes

  return {
    id: crypto.randomUUID(),
    type: "geneicNode", // this type should match with the nodeTypes
    data: {
      id: crypto.randomUUID(),
      showNode: true,
      component: {
        ...data,
      },
    },
    position: position ?? { x: 10, y: 10 },
  };
};
