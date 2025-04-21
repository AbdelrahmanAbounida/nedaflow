export interface APIResponseBody<T> {
  code: number;
  message: string;
  data: T;
  error: boolean;
}

export interface INode {
  id: string;
  name?: string;
  type?: string;
  position: { x: number; y: number };
  data?: any; // could be like param or settings TODO:: check how to pass this
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
}

export interface IBuildWorkflow {
  flow_id: string;
  name?: string;
  vertexes: INode[];
  edges: IEdge[];
}

// class Node(BaseModel):
//     type: str
//     position: tuple[int,int]
//     id: str
//     name: str

// class Edge(BaseModel):
//     source: str
//     target: str

// class BuildWorkflow(BaseModel):
//     name: str
//     nodes: list[Node]
//     edges: list[Edge]
