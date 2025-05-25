from nedaflow.flow.types import MultilineInput
from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.types import FieldTypes

class TextOutputComponent(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.OUTPUT
    name: str = "Text Output"
    display_name: str = "Text Output" 
    description: str = "Get text outputs to the Playground."
    icon: str = "Text" 
    code: str = ""

    inputs: list[Input]= [
        MultilineInput(
            name="input_value",
            display_name="Text",
            info="Text to be passed as input.",
        ),
    ]
    outputs: list = [
        Output(display_name="Text", name="text", method="text_response", output_type=FieldTypes.TEXT),
    ]