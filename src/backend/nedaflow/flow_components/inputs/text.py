from nedaflow.flow_components.base.inputs_types import MultilineInput
from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base import BaseComponent

class TextInputComponent(BaseComponent):
    name: str = "Text Input"
    description: str = "Get text inputs from the Playground."
    icon: str = "type" # See how to match this icon from a registery
    code: str = ""

    inputs: list = [
        MultilineInput(
            name="input_value",
            display_name="Text",
            info="Text to be passed as input.",
        ),
    ]
    outputs: list = [
        Output(display_name="Text", name="text", method="text_response"),
    ]