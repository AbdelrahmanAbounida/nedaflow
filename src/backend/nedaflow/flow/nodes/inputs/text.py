from nedaflow.flow.types import MultilineInput
from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.types import FieldTypes

class TextInputComponent(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.INPUT
    # these are general fields for the card 
    name: str = "Text Input"
    display_name: str = "Text Input" 
    description: str = "Get text inputs from the Playground."
    icon: str = "Text" # See how to match this icon from a registery
    code: str = ""

    # these are specific fields for the params 
    inputs: list[Input]= [
        MultilineInput(
            name="input_value",
            display_name="TEXTAREA",
            info="Text to be passed as input.",
        ),
    ]
    outputs: list = [
        Output(display_name="Text", name="text", method="text_response", output_type=FieldTypes.TEXT),
    ]