
import asyncio 


class Vertex:
    def __init__(self, data):
        self.id = data["id"]
        self.data = data
        self.inputs = []   # Will be populated based on incoming edges
        self.outputs = []  # Will be populated based on outgoing edges
        self.result = None

    async def build(self):
        # Simulate work
        print(f"Building {self.id} ... waiting for inputs: {[v.id for v in self.inputs]}")
        await asyncio.sleep(1)  # Simulate async build
        self.result = f"Result from {self.id}"
        print(f"Finished building {self.id}")

class Edge:
    def __init__(self, source: str, target: str, data=None):
        self.source = source
        self.target = target
        self.data = data or {}

class WorkflowEngine:
    def __init__(self, flow_id: str, vertexes: list[Vertex], edges: list[Edge]):
        self.id = flow_id
        self.vertexes = {v.id: v for v in vertexes}
        self.edges = edges
        self._build_graph()

    @classmethod
    def from_payload(cls,payload: "BuildWorkflow"):
        vertexes = [Vertex(data=vertex) for vertex in payload.vertexes]
        edges = [Edge(**edge) for edge in payload.edges]
        return cls(flow_id="asd",vertexes=vertexes, edges=edges)

    def _build_graph(self):
        # Connect vertexes through edges
        for edge in self.edges:
            src = self.vertexes[edge.source]
            tgt = self.vertexes[edge.target]
            src.outputs.append(tgt)
            tgt.inputs.append(src)

    async def _build_node(self, vertex: Vertex, built_event_map: dict):
        # Wait for all input vertexes to complete
        await asyncio.gather(*(built_event_map[v.id].wait() for v in vertex.inputs))
        await vertex.build()
        built_event_map[vertex.id].set()

    async def execute(self):
        # Create an asyncio.Event for each vertex
        built_event_map = {v.id: asyncio.Event() for v in self.vertexes.values()}
        tasks = []

        for vertex in self.vertexes.values():
            task = asyncio.create_task(self._build_node(vertex, built_event_map))
            tasks.append(task)

        await asyncio.gather(*tasks)
        print("Workflow complete ✅")

class BuildWorkflow:
    def __init__(self, id: str, vertexes: list[dict], edges: list[dict]):
        self.id = id
        self.vertexes = vertexes
        self.edges = edges

# Mock data
payload = BuildWorkflow(
    id="flow1",
    vertexes=[
        {"id": "A"},
        {"id": "B"},
        {"id": "C"},
        {"id": "D"},
    ],
    edges=[
        {"source": "A", "target": "B"},
        {"source": "A", "target": "C"},
        {"source": "B", "target": "D"},
        {"source": "C", "target": "D"},
    ]
)

engine = WorkflowEngine.from_payload(payload)
asyncio.run(engine.execute())
