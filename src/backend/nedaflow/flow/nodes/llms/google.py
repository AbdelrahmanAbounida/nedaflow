from nedaflow.flow.nodes.llms.base import BaseLLM


class GoogleLLM(BaseLLM):
    name: str  = "Google Generative AI"
    display_name: str  = "Google Generative AI"
    description: str  = "Make HTTP requests using URLs or cURL commands."
    icon: str  = "Google"
    minimized: bool = False
    code: str  = ""

    