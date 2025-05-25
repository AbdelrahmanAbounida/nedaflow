from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.types import MultilineInput
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.types import FieldTypes

class ChatOutputComponent(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.OUTPUT
    display_name: str = "Chat Output"
    name: str = "Chat Output" # nonesense name  for now 
    description: str = "Get chat inputs from the Playground."
    icon: str = "MessagesSquare"
    minimized: bool = True
    code: str = ""

    inputs: list[Input]= [
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