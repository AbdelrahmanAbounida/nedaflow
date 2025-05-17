from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.types import MultilineInput
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from pydantic import Field

class ChatInputComponent(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.INPUT
    display_name: str = "Chat Input"
    name: str = "Chat Input" # nonesense name  for now 
    description: str = "Get chat inputs from the Playground."
    icon: str = "MessagesSquare"
    minimized: bool = True
    code: str = ""

    inputs: list = [
        MultilineInput(
            name="input_value",
            display_name="Text",
            value="",
            info="Message to be passed as input.",
        ),
        
    ]
    outputs: list = [
        Output(display_name="Message", name="message", method="message_response", output_type=FieldTypes.TEXT), # see how to have fixed output schema
    ] 