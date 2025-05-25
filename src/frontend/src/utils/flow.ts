import { GenericNode } from "@/types/flow/flow";
import { ComponentTypeEnum } from "@/types/flow/flow-component";

const isChatTriggerNode = (node: GenericNode) =>
  node.data.component.type === ComponentTypeEnum.TRIGGER &&
  node.data.component.name.toLowerCase().includes("chat");

export const getChatTriggerNode = (nodes: GenericNode[]) => {
  return nodes?.find(isChatTriggerNode);
};

export const shouldShowChatInterface = (nodes: GenericNode[]) => {
  return nodes?.some(isChatTriggerNode);
};
