import asyncio
from typing import Any, Callable, Dict, List, Set, Coroutine, AsyncGenerator

class Edge:
    def __init__(self, source: 'Node', target: 'Node'):
        self.source = source
        self.target = target

class Node:
    def __init__(self, name: str, func: Callable[[Any], AsyncGenerator[Any, None]]):
        self.name = name
        self.func = func
        self.inputs: List[asyncio.Queue] = []
        self.outputs: List[asyncio.Queue] = []

    async def run(self):
        # Gather all input queues into one async generator
        async def merged_inputs():
            while True:
                # Wait for any input to have data
                coros = [q.get() for q in self.inputs]
                done, _ = await asyncio.wait(coros, return_when=asyncio.FIRST_COMPLETED)
                for task in done:
                    yield task.result()
        # Process inputs and stream outputs
        async for result in self.func(merged_inputs()):
            for outq in self.outputs:
                await outq.put(result)

class Flow:
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
        self.edges: List[Edge] = []

    def add_node(self, node: Node):
        self.nodes[node.name] = node

    def connect(self, source_name: str, target_name: str):
        source = self.nodes[source_name]
        target = self.nodes[target_name]
        q = asyncio.Queue()
        source.outputs.append(q)
        target.inputs.append(q)
        self.edges.append(Edge(source, target))

    async def run(self, input_data: List[Any], input_node: str):
        # Feed input data to the input node
        input_q = asyncio.Queue()
        for item in input_data:
            await input_q.put(item)
        self.nodes[input_node].inputs.append(input_q)
        # Run all nodes concurrently
        await asyncio.gather(*(node.run() for node in self.nodes.values()))

# Example node functions
async def source_node(inputs):
    # Ignore inputs, just yield some data
    for i in range(5):
        yield f"data-{i}"
        await asyncio.sleep(0.1)

async def process_node(inputs):
    async for item in inputs:
        yield item.upper()

async def sink_node(inputs):
    async for item in inputs:
        print("Sink received:", item)

# Build and run the flow
async def main():
    flow = Flow()
    flow.add_node(Node("source", source_node))
    flow.add_node(Node("process", process_node))
    flow.add_node(Node("sink", sink_node))
    flow.connect("source", "process")
    flow.connect("process", "sink")
    await flow.run([], "source")

asyncio.run(main())
