import { Edge, EdgeTypes, Node, ReactFlowJsonObject } from "@xyflow/react";

// FlowStyleType is the type of the style object that is used to style the

// Flow card with an emoji and a color.
export type FlowStyleType = {
  emoji: string;
  color: string;
  flow_id: string;
};

// right side
export type sourceHandleType = {
  baseClasses?: string[];
  dataType: string;
  id: string;
  output_types: string[];
  conditionalPath?: string | null;
  name: string;
};
//left side
export type targetHandleType = {
  inputTypes?: string[];
  type: string;
  fieldName: string;
  id: string;
  proxy?: { field: string; id: string };
};

export type EdgeDataType = {
  sourceHandle: sourceHandleType;
  targetHandle: targetHandleType;
};
export type EdgeType = Edge<EdgeDataType, "default">;

export type FlowType = {
  name: string;
  id: string;
  data: ReactFlowJsonObject<any, EdgeType> | null; //AllNodeType to store it in db
  description: string;
  endpoint_name?: string | null;
  style?: FlowStyleType;
  is_component?: boolean;
  last_tested_version?: string;
  updated_at?: string;
  date_created?: string;
  parent?: string;
  folder?: string;
  user_id?: string;
  icon?: string;
  gradient?: string;
  tags?: string[];
  icon_bg_color?: string;
  folder_id?: string;
  webhook?: boolean;
  locked?: boolean | null;
};
