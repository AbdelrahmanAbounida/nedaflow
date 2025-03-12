from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow_components.base import BaseComponent
from nedaflow.flow_components.types import FieldTypes


class SplitText(BaseComponent):
    name: str  = "Split Text"
    display_name: str  = "Split Text"
    description: str  = "Split text into chunks based on specified criteria"
    icon: str  = "Scissors"
    minimized: bool = False
    code: str  = ""

    inputs: list = [
        TextInput(
            name="input_text",
            display_name="Input Text",
            is_handle=True,
            description="Entter one or more URLs, separated by commas",
            info="Enter one or more URLs, separated by commas.",
            required=True
        ),
       NumberInput(
           name="chunk_size",
           display_name="Chunk Size",
           description="The maximum number of characters in each chunk",
           info="The maximum number of characters in each chunk",
           default=1000
       )
    ]

    outputs: list = [
        Output(
            name="Chunks",
            display_name="Chunks",
            method="split_text_input",
            description="",
            info="",
            output_type=FieldTypes.LIST_STRING,
        )
    ]