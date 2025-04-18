from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.types import DataInput, TextInput, MultilineInput,EmbeddingInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.nodes.base import BaseNode
from nedaflow.flow.types import FieldTypes


class Pinecone(BaseNode):
    name: str  = "Pinecone"
    display_name: str  = "Pinecone"
    description: str  = "Pinecone Vector Store with search capabilities"
    icon: str  = "Pinecone"
    minimized: bool = False
    code: str  = ""

    inputs: list = [
        TextInput(
            name="index_name",
            display_name="Index Name",
            required=True,
            description="Entter one or more URLs, separated by commas",
            info="Enter one or more URLs, separated by commas."
        ),
        TextInput(
            name="name_space",
            display_name="Namespace",
            description="Pinecone namespace for this index",
            info="Pinecone namespace for this index",
        ),
        TextInput(
            name="pinecone_api_key",
            display_name="Pinecone API Key",
            required=True,
            description="Pinecone API Key",
            is_secret=True,
            info="Pinecone API Key",
        ),
        DataInput(
            name="ingest_data",
            display_name="Ingest Data",
            required=False,
            is_handle=True,
        ),
        MultilineInput(
            name="search_query",
            display_name="Search Query",
            description="Search query",
            is_handle=True
        ),
        EmbeddingInput(
            name="embedding_model",
            display_name="Embedding Model",
            required=False,
            only_handle=True,
        )
    ]

    outputs: list = [
        Output(
            name="search_results",
            display_name="Search Results",
            method="get_search_results",
            output_type=FieldTypes.DATA,
        )
    ]