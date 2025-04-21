# Mock data
from nedaflow.flow.workflow import WorkflowEngine
from nedaflow.schema import BuildWorkflow, VertexProps, EdgeProps, VertexPosition
import asyncio 


# class VertexPosition(BaseModel):
#     x: int
#     y: int

# class VertexProps(BaseModel):
#     type: Optional[str] = None
#     position: VertexPosition
#     id: str 
#     name: Optional[str] = None


payload = BuildWorkflow(
    flow_id="flow1",
    vertexes=[
        VertexProps(position=VertexPosition(x=10, y=10), id="A", name="A", data={}),
        VertexProps(position=VertexPosition(x=10, y=10), id="B", name="B", data={}),
        VertexProps(position=VertexPosition(x=10, y=10), id="C", name="C", data={}),
        VertexProps(position=VertexPosition(x=10, y=10), id="D", name="D", data={}),
    ],
    edges=[
        EdgeProps(id="123", source_id="A", target_id="B"),
        EdgeProps(id="asd", source_id="A", target_id="C"),
        EdgeProps(id="234", source_id="B", target_id="D"),
        EdgeProps(id="sdfds", source_id="C", target_id="D"),
    ]
)


engine = WorkflowEngine.from_payload(payload)
asyncio.run(engine.execute())
