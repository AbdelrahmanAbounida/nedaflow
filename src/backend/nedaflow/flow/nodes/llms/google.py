from nedaflow.flow.nodes.llms.base import BaseLLM
from langchain_google_genai import ChatGoogleGenerativeAI


class GoogleLLM(BaseLLM):
    name: str  = "Google Generative AI"
    display_name: str  = "Google Generative AI"
    description: str  = "Make HTTP requests using URLs or cURL commands."
    icon: str  = "Google"
    minimized: bool = False
    code: str  = ""

    def supply_data(self,*args, **kwargs):
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro") # TODO:: Load this from other options 
        return llm