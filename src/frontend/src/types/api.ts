export interface APIResponseBody<T> {
  code: number;
  message: string;
  data: T;
  error: boolean;
}

export interface INode {
  id: string;
  // name: string;
  type?: string;
  position: { x: number; y: number };
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
}

export interface IBuildWorkflow {
  name: string;
  nodes: INode[];
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
