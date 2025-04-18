


from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.nodes.base import BaseNode
from nedaflow.flow.types import FieldTypes


class Directory(BaseNode):
    name: str  = "Directory"
    display_name: str  = "Directory"
    description: str  = "Make HTTP requests using URLs or cURL commands."
    icon: str  = "Directory"
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
        # TODO:: query paramater >> Tool Mode ,
    JsonInput(
        name="Body",
        display_name="Query Parameters",
        default="",
        info="The body to send with the request as a dictionary for POST,PATCH,PUT",
        show=True
    ),
    NumberInput(
        name="timeout",
        display_name="Timeout",
        default=5,
        info="The timeout for the request in seconds",
        show=True
    ),
    BooleanInput(
        name="follow_redirect",
        display_name="Follow Redirects",
        default=True,
        info="Wether to follow http redirects",
        show=True
    ),
    BooleanInput(
        name="save_to_file",
        display_name="Save to File",
        default=False,
        info="Save the API response to a temporary file",
        show=True
    ),
    BooleanInput(
        name="include_httpx_metadata",
        display_name="Include HTTPX Metadata",
        default=False,
        info="Include properties such as headers, status_code, response_headers, and redirection_history in the output.",
        show=False
    )
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