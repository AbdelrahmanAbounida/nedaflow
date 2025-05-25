from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.embeddings.base import BaseEmbeddingNode


class VertexAIEmbedding (BaseEmbeddingNode):
    name: str  = "VertexAIEmbedding "
    display_name: str  = "VertexAIEmbedding "
    description: str  = "Generate text using AIML LLMs."
    icon: str  = "VertexAI"
    minimized: bool = False
    code: str  = ""

    inputs: list[Input]= [
        TextInput(
            name="urls",
            display_name="URLs",
            description="Entter one or more URLs, separated by commas",
            info="Enter one or more URLs, separated by commas."
        ),
        MultilineInput(
            name="cURL",
            display_name="cURL Command",
            value="",
            placeholder="Type Something",
            info="Paste a curl command to populate the fields. This will fill in the dictionary fields for headers and body.",
        ),
        DropdownInput[str](
            name="method",
            display_name="Method",
            default="GET",
            options=["GET", "POST", "PUT", "DELETE"],
            info="Select the HTTP method to use for the request.",
        ),
        BooleanInput(
            name="Use cURL",
            display_name="Use cURL",
            default=True,
            info="Enable cURL mode to populate fields from a curl command",
            show=True 
        ),
    ]

    outputs: list = [
        Output(
            name="data",
            display_name="API Response",
            method="api_response",
            description="The API response as a dictionary",
            info="The API response as a dictionary",
            output_type=FieldTypes.DATA,
        )
    ]