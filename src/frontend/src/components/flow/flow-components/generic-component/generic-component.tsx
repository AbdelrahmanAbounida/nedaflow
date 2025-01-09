import { GenericNode, NodeData } from "@/types/flow/flow";
import { NodeProps } from "@xyflow/react";
import React from "react";

// remember component is just the body of the node >> in other words its the node data
const GenericComponent = ({
  data,
  selected,
  ...props
}: NodeProps & { data: NodeData }) => {
  return <div className="bg-green-50 w-72 h-52">{data.type}</div>;
};

export default GenericComponent;
