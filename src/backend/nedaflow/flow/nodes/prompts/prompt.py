from nedaflow.flow.types import FieldTypes
from nedaflow.flow.types import MultilineInput, TextInput
from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum


class Prompt(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.PROMPT
    display_name: str = "Prompt"
    name: str = "Prompt" 
    description: str = "Create a prompt template with dynamic variables."
    icon: str = "TerminalSquare"
    minimized: bool = False
    code: str = ""
    inputs: list[Input]= [
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
