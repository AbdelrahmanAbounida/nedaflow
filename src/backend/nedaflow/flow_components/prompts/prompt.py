from nedaflow.flow_components.types import FieldTypes
from nedaflow.flow_components.base.types import MultilineInput, TextInput
from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base import BaseComponent


class Prompt(BaseComponent):
    display_name: str = "Prompt"
    name: str = "Prompt" 
    description: str = "Create a prompt template with dynamic variables."
    icon: str = "TerminalSquare"
    minimized: bool = False
    code: str = ""
    inputs: list = [
        MultilineInput(
            name="prompt",
            display_name="Template",
            value="",
        ),
        TextInput(
            name="Tool Placeholder",
            display_name="Tool Placeholder",
            value="",
            info="",
            show=False
        )
        
    ]
    outputs: list = [
        Output(display_name="Prompt Message", name="prompt", method="message_response", output_type=FieldTypes.TEXT), # see how to have fixed output schema
    ]  
