from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.types import MultilineInput, Input
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from pydantic import Field
from loguru import logger 

class ChatInputComponent(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.INPUT
    display_name: str = "Chat Input"
    name: str = "Chat Input" # nonesense name  for now 
    description: str = "Get chat inputs from the Playground."
    icon: str = "MessagesSquare"
    minimized: bool = True
    code: str = ""

    inputs: list[Input] = [
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


    def execute(self, dependencies = {}, *args, **kwargs):
        input = self.inputs[0].value
        logger.debug(f"input: {input}")
        return input