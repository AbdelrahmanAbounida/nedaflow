from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base.inputs_types import MultilineInput
from nedaflow.flow_components.base import BaseComponent
from pydantic import Field

class ChatInputComponent(BaseComponent):
    display_name: str = "Chat Input"
    description: str = "Get chat inputs from the Playground."
    icon: str = "MessagesSquare"
    name: str = "ChatInput"
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
        Output(display_name="Message", name="message", method="message_response"), # see how to have fixed output schema
    ] 