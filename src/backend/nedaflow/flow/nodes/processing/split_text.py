from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.types import FieldTypes


class SplitText(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.PROCESSING
    name: str  = "Split Text"
    display_name: str  = "Split Text"
    description: str  = "Split text into chunks based on specified criteria"
    icon: str  = "Scissors"
    minimized: bool = False
    code: str  = ""

    inputs: list[Input]= [
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