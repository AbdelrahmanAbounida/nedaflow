from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base.types import MultilineInput
from nedaflow.flow_components.base import BaseComponent
from nedaflow.flow_components.types import FieldTypes

class ChatOutputComponent(BaseComponent):
    display_name: str = "Chat Output"
    name: str = "Chat Output" # nonesense name  for now 
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