from nedaflow.flow_nodes.base.types import FieldTypes
from nedaflow.flow_nodes.base.io import Output
from nedaflow.flow_nodes.base.types import MultilineInput
from nedaflow.flow_nodes.base import BaseNode
from pydantic import Field

class ChatTriggerComponent(BaseNode):
    display_name: str = "Chat Trigger"
    name: str = "Chat Trigger" # nonesense name  for now 
    description: str = "Allows you to test your flow using chat Playground"
    icon: str = "MessagesSquare"
    minimized: bool = True
    code: str = ""

    inputs: list = [
        
    ]
    outputs: list = [
        Output(display_name="Message", name="message", method="message_response", output_type=FieldTypes.TRIGGER), # see how to have fixed output schema
    ] 