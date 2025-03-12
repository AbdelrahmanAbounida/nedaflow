from nedaflow.flow_components.base.io import Output
from nedaflow.flow_components.base.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow_components.base import BaseComponent
from nedaflow.flow_components.types import FieldTypes


class RunFlow(BaseComponent):
    name: str  = "RunFlow"
    display_name: str  = "RunFlow"
    description: str  = "Generate text using AIML LLMs."
    icon: str  = "Save"
    minimized: bool = False
    code: str  = ""

    inputs: list = [
        TextInput(
            name="urls",
            display_name="URLs",
            description="Entter one or more URLs, separated by commas",
            info="Enter one or more URLs, separated by commas."
        ),
        MultilineInput(
            name="cURL",
            display_name="cURL Command",
            value="",
            placeholder="Type Something",
            info="Paste a curl command to populate the fields. This will fill in the dictionary fields for headers and body.",
        ),
        DropdownInput[str](
            name="method",
            display_name="Method",
            default="GET",
            options=["GET", "POST", "PUT", "DELETE"],
            info="Select the HTTP method to use for the request.",
        ),
        BooleanInput(
            name="Use cURL",
            display_name="Use cURL",
            default=True,
            info="Enable cURL mode to populate fields from a curl command",
            show=True 
        ),
    ]

    outputs: list = [
        Output(
            name="data",
            display_name="API Response",
            method="api_response",
            description="The API response as a dictionary",
            info="The API response as a dictionary",
            output_type=FieldTypes.DATA,
        )
    ]