from fastapi.routing import APIRouter 
from nedaflow.schema import BuildWorkflow




router = APIRouter(prefix="/flow", tags=["Flow"])


@router.post("/build")
async def build_flow( body: BuildWorkflow)  :
    """
        TODO::
           1. See How to traverse the flow nodes and edges and build it 
           5. See How to do stream response like redirect to anthor streaming endpoint with job id 
           6. How to implement task queue with redis / celery / pubsub 
           7. when to return in stream and how to verify the flow data 
    """
    # we gonna start with 2 triggers one is chat and one is webhook

    ## Main Steps to build graph 
    """
        1. Load Graph from db or given data (think about this design and check n8n)
        2. Validate Graph , check if nodes are connected properly
        3. Sort Vertexes >> see how we gonna build the vertexes, what in parallel and what in sequence
        also it identifies the first layer with no dependencies
        4. start build each vertex check _build_vertex
        3. It starts with Start node, Builds A, then B, then C — in order, After each node, it checks: “What’s next?”
        Runs the next ones in parallel if possible
    """

    """
    The system first sorts vertices to identify which ones can run first (those with no dependencies)
    It executes these initial vertices in parallel
    When a vertex completes, it determines which "next runnable vertices" can now execute
    This creates a cascading execution model where data flows through the graph

    For each vertex in the execution path:

    It processes inputs from previous vertices
    Executes the component logic
    Captures outputs and any artifacts produced
    Measures execution time
    Sends status events
    Determines which downstream vertices can now run
    """

    """
     # Langflow Functions to check for build 

     ### build_graph_and_get_order
     0. graph = await build_graph_from_data
     1. first_layer = sort_vertices(graph) # graph.sort_vertices(stop_component_id, start_component_id)
     2. for vertex_id in first_layer:
                graph.run_manager.add_to_vertices_being_run(vertex_id)
    
    3. vertices_to_run = list(graph.vertices_to_run.union(get_top_level_vertices(graph, graph.vertices_to_run)))

    ### remember here ids is the first layer which has no dependencies so we can run in parallel
    for vertex_id in ids:
        task = asyncio.create_task(build_vertices(vertex_id, graph, event_manager))
        tasks.append(task)
    try:
        await asyncio.gather(*tasks)


    ### Main implementation of building process 
    1. build_vertices, _build_vertex
    remember we start building process from the first layer which has no dependencies
    and then once each vertex got built it adds its successor to the tasks queue

    but also we have graph.get_next_runnable_vertices(...) to make sure that no task will be added till all of its dependecies 
    are already built 


   ##  build_vertexes and _build_vertex

   >> graph.build_vertex → vertex.build → steps → finalize_build → get_requester_result
    graph.build_vertex(vertex_id)
    Fetches the vertex using get_vertex.
    Checks whether it's frozen or built. If not:
    Checks the cache using get_cache().
    If the cache is hit, it:
    Deserializes the result and calls finalize_build().
    Marks it as used_frozen_result.
    If the cache misses, or it's not frozen:
    It builds from scratch by calling vertex.build(...).

    >> vertex.build(...)
    for step in self.steps:
    if step not in self.steps_ran:
        await step(...)

        Each step is an async function (like loading a model, fetching data, running inference).

    Before running steps:
    It checks if it's inactive → return None.
    Handles lazy loading of components.
    Resets build state.
    Injects special inputs (like session_id, chat input, files).

    
    ## Sample Step 
    async def run_llm(user_id, event_manager, **kwargs):
        self.built_object = llm_call(self.params)
    """
    # 1- Load Graph from db in case of automated execution (webhook) and from payload in case of manual execution
    # 2- Validate Graph , check if nodes are connected properly (check for cyccles and remove nodes with no connections, ..)
    # 3- Sort Vertexes >> get the first nodes to run (trigger nodes or nodes with no dependncies)
    # 4- build nodes in async way and keep adding building job we gonna start with TaskQueue with celery 
    # 5- return result as stream (our final model will be stream/sse or direct response)


    # ToDO:: Build Workflow Class with Nodes and Edges Classes and sync it with the flow in the ui
    # execute or run function and see how each node will have its own run function 
    # how to run the execute function and load its required inputs and how to load further added settings by the user 

    # then keep working on settings modal in the ui and add more triggers and nodes 
    # then add anthor endpoint for chat and test chat 
    # then handle streaming the ui and focus more on zustand docs and read it thoroughly

    # db setup and sync all with the database and by that version1 is done 
    return body 
