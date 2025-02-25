import { Node, Position } from "@xyflow/react";
import { Component, ComponentTypeEnum } from "./flow-component";

// this is the pipeline

// we have flow > nodes > node.data > node.data.type > get component acc. type > inputs,params,output of that component

export interface Flow {}

export type NodeData = {
  id: string;
  // type: ComponentTypeEnum; // will be loaded from copmponent
  showNode?: boolean;
  component: Component;
};

export type GenericNode = Node<NodeData, "geneicNode">;

export interface AppEdge {}
