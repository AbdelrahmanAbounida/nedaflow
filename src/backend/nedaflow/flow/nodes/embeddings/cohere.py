from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.embeddings.base import BaseEmbeddingNode


class CohereEmbedding(BaseEmbeddingNode):
    name: str  = "CohereEmbedding"
    display_name: str  = "CohereEmbedding"
    description: str  = "Generate text using AIML LLMs."
    icon: str  = "Cohere"
    minimized: bool = False
    code: str  = ""

    inputs: list[Input]= [
        TextInput(
            name="cohere_api_key",
            display_name="Cohere API Key",
            description="Entter one or more URLs, separated by commas",
            required=True,
            is_secret=True
        ),
       DropdownInput[str](
            name="model",
            display_name="Model",
            options=[
                "embed-english-v2.0",
                "embed-multilingual-v2.0",
                "embed-english-light-v2.0",
                "embed-multilingual-light-v2.0",
            ],
            default="embed-english-v2.0",
        ),
    ]

    outputs: list = [
        Output(
            name="Embeddings",
            display_name="Embeddings",
            method="generate_emebddings",
            output_type=FieldTypes.DATA,
        )
    ]