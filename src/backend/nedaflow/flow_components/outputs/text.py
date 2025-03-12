from nedaflow.flow_components.base.types import MultilineInput
from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base import BaseComponent
from nedaflow.flow_components.types import FieldTypes

class TextOutputComponent(BaseComponent):
    name: str = "Text Output"
    display_name: str = "Text Output" 
    description: str = "Get text outputs to the Playground."
    icon: str = "Text" 
    code: str = ""

    inputs: list = [
        MultilineInput(
            name="input_value",
            display_name="Text",
            info="Text to be passed as input.",
        ),
    ]
    outputs: list = [
        Output(display_name="Text", name="text", method="text_response", output_type=FieldTypes.TEXT),
    ]