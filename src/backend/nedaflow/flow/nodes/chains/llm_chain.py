from nedaflow.flow.types import TextInput, DependencyType,FieldTypes
from nedaflow.flow.nodes.io import Output
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from langchain_openai import OpenAI
from nedaflow.flow.nodes.llms.google import GoogleLLM
from langchain_core.language_models.llms import BaseLLM
from dotenv import load_dotenv
import os 

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

class LLMChainNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.CHAIN
    name: str  = "LLM Chain"
    display_name: str  = "LLM Chain"
    description: str  = "Make sequences of calls to LLM"
    icon: str  = "Route"
    minimized: bool = False
    code: str  = ""

    inputs: list = [
        TextInput(
            name="text",
            display_name="Text",
            description="Sample text to the LLM Chain",
            
        ),
    ]
    # TODO:: see how to pass types of dependecies, inputs and outputs 
    dependencies: list[DependencyType] = [
        DependencyType.LLM
    ]

    outputs: list = [
        Output(
            name="data",
            display_name="LLM Response",
            method="llm_chain_response",
            description="The LLM Response",
            output_type=FieldTypes.DATA,
        )
    ]


    def execute(self):
        """ Run LLM Chain"""
        # 1- Get input data 
        input: str = self.inputs[0].value

        # 2- Get custom Settings defined from the ui 

        if self.library == "Langchain":

            # 3- Check required providers / tools needed to execute the node 
            llm = self._load_langchain_llm()

            # 4- return the response
            self.outputs[0].value = llm.invoke(input)

            # Question:: if this is stream response how to handle it / return it for custom node execution
        else:
            raise NotImplementedError(f"Library {self.library} not implemented yet")
        
        return self.outputs[0].value # TODO:: make common response for all nodes
    


    def _load_langchain_llm(self) -> BaseLLM: # 
        if self.library == 'Langchain':
            # Check the llm type 
            # llm = GoogleLLM()
            llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            return llm 

            # TODO:: complete this 