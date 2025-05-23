from nedaflow.flow.types import Input, MultilineInput, DependencyDescriptor, DependencyType, FieldTypes
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.nodes.io import Output
from typing import Any
from loguru import logger 
from langchain_core.language_models.llms import LLM


class LLMChainNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.CHAIN
    name: str  = "LLM Chain"
    display_name: str  = "LLM Chain"
    description: str  = "Make sequences of calls to LLM"
    icon: str  = "Route"
    minimized: bool = False
    code: str  = ""

    inputs: list[Input] = [
        MultilineInput(
            name="Prompt",
            display_name="Prompt",
            description="Source for Prompt",
            required=False
        ),
    ]
    # TODO:: see how to pass types of dependecies, inputs and outputs 
    dependencies: list[DependencyDescriptor] = [
        DependencyDescriptor(name="llm", type=DependencyType.LLM)
    ]

    outputs: list[Output] = [
        Output(
            name="data",
            display_name="LLM Response",
            method="llm_chain_response",
            description="The LLM Response",
            output_type=FieldTypes.DATA,
        )
    ]

    def execute(self,dependencies: dict[str, Any], *args, **kwargs):
        """ Run LLM Chain"""
        prompt = self.inputs[0].value

        if not prompt:
            logger.warning("No input provided to the LLM Chain")
            raise ValueError("No input provided to the LLM Chain")
       
        if self.library == "Langchain":

            llm: LLM | None = dependencies.get("llm")

            # 4- return the response
            if prompt:
                if not llm:
                    raise ValueError("No LLM provided")
                llm_output = llm.invoke(prompt)
                self.outputs[0].value = llm_output
            else:
                logger.warning("No input provided to the LLM Chain")

            # TODO:: if this is stream response how to handle it / return it for custom node execution
        else:
            raise NotImplementedError(f"Library {self.library} not implemented yet")
        
        logger.warning(f"LLM Chain out: {self.outputs[0].value}")
        return self.outputs[0].value # TODO:: make common response for all nodes
    


   