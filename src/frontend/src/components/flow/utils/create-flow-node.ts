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
  // u can return different node types and match then in nodetypes

  return {
    id: crypto.randomUUID(),
    type: "geneicNode", // this type should match with the nodeTypes
    data: {
      id: crypto.randomUUID(),
      type: componentType,
      showNode: true,
      component: {
        icon: "star",
        name: "Agent",
        type: componentType,
        descriotion: "This is description",
        inputs: [],
        outputs: [],
      },
    },
    position: position ?? { x: 10, y: 10 },
  };
};
