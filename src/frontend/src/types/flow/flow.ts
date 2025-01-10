import { Node, Position } from "@xyflow/react";
import { Component, ComponentTypeEnum } from "./flow-component";

// this is the pipeline

// we have flow > nodes > node.data > node.data.type > get component acc. type > inputs,params,output of that component

export interface Flow {}

export type NodeData = {
  id: string;
  type: ComponentTypeEnum; // this type must match the type in the nodeTypes
  showNode?: boolean;
  component: Component;
};

export type GenericNode = Node<NodeData, "geneicNode">;

export interface AppEdge {}
