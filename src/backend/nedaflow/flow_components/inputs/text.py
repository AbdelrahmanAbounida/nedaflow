from nedaflow.flow_components.base.types import MultilineInput
from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base import BaseComponent
from nedaflow.flow_components.types import FieldTypes

class TextInputComponent(BaseComponent):

    # these are general fields for the card 
    name: str = "Text Input"
    display_name: str = "Text Input" 
    description: str = "Get text inputs from the Playground."
    icon: str = "Text" # See how to match this icon from a registery
    code: str = ""

    # these are specific fields for the params 
    inputs: list = [
        MultilineInput(
            name="input_value",
            display_name="TEXTAREA",
            info="Text to be passed as input.",
        ),
    ]
    outputs: list = [
        Output(display_name="Text", name="text", method="text_response", output_type=FieldTypes.TEXT),
    ]