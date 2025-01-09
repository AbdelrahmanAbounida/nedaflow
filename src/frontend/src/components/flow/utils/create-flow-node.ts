import { GenericNode } from "@/types/flow/flow";
import { ComponentTypeEnum } from "@/types/flow/flow-component";
import { XYPosition } from "@xyflow/react";

export const createFlowNode = ({
  componentType,
  position,
}: {
  componentType: ComponentTypeEnum;
  position?: XYPosition;
}): GenericNode => {
  // switch over that type to create custom component

  return {
    id: crypto.randomUUID(),
    type: "geneicNode", // this type should match with the nodeTypes
    data: {
      type: componentType,
      showNode: true,
    },
    position: position ?? { x: 10, y: 10 },
  };
};
