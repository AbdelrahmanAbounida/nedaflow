


from nedaflow.flow_nodes.base.io import Output
from nedaflow.flow_nodes.base.types import DependencyType, TextInput
from nedaflow.flow_nodes.base import BaseNode
from nedaflow.flow_nodes.base.types import FieldTypes


class LLMChain(BaseNode):
    name: str  = "LLM Chain"
    display_name: str  = "LLM Chain"
    description: str  = "Make sequences of calls to LLM"
    icon: str  = "Route"
    minimized: bool = False
    code: str  = ""
    type: str = "AI"

    inputs: list = [
        TextInput(
            name="text",
            display_name="Text",
            description="Sample text to the LLM Chain",
        ),
    ]
    # TODO:: see how to pass types of dependecies, inputs and outputs 
    dependencies: list[DependencyType] = [
        DependencyType.LLM
    ]

    outputs: list = [
        Output(
            name="data",
            display_name="LLM Response",
            method="llm_chain_response",
            description="The LLM Response",
            output_type=FieldTypes.DATA,
        )
    ]