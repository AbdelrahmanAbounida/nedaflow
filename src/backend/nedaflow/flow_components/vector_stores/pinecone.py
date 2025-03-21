from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base.types import DataInput, TextInput, MultilineInput,EmbeddingInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow_components.base import BaseComponent
from nedaflow.flow_components.types import FieldTypes


class Pinecone(BaseComponent):
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