from nedaflow.flow_nodes.base.io import Output
from nedaflow.flow_nodes.base.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow_nodes.llms.base import BaseLLM
from nedaflow.flow_nodes.base.types import FieldTypes


class GoogleLLM(BaseLLM):
    name: str  = "Google Generative AI"
    display_name: str  = "Google Generative AI"
    description: str  = "Make HTTP requests using URLs or cURL commands."
    icon: str  = "Google"
    minimized: bool = False
    code: str  = ""
    type: str = "LLM"

    