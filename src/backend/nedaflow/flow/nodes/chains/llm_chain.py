from nedaflow.flow.types import Input, MultilineInput, DependencyDescriptor, DependencyType, FieldTypes
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.nodes.io import Output
from typing_extensions import Any, Doc, Annotated
from loguru import logger 
from langchain_core.language_models.llms import LLM
from nedaflow.flow.chat import NedaFlowChatMessage, nedaflowmsgs_to_langchain_msgs


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

    def execute(self,
                dependencies: dict[str, Any],
                inputs: Annotated[dict[str, Any], Doc("List of inptus data loaded fron connected edges of other nodes")], *args, **kwargs):
        """ Run LLM Chain"""

        # Load Prompt as inputs 
        logger.debug(f"LLM inputs: {inputs}")
        local_prompt = self.inputs[0].value
        outer_prompt = inputs.get("Prompt")

        # TODO:: Load Messages 
        logger.debug(f"local_prompt: {local_prompt} \n outer_prompt: {outer_prompt}")
        prompt = outer_prompt if outer_prompt else local_prompt # TODO:: according to settings 

        if not prompt:
            logger.warning("No input provided to the LLM Chain")
            raise ValueError("No input provided to the LLM Chain")
       
        if self.library == "Langchain":

            llm: LLM | None = dependencies.get("llm")

            # 4- return the response
            if prompt:
                if not llm:
                    raise ValueError("No LLM provided")
                
                # check typr of prompt
                if isinstance(prompt, str):
                    llm_output = llm.invoke(prompt)
                elif isinstance(prompt, list) and len(prompt) > 0 and isinstance(prompt[0], NedaFlowChatMessage):
                    msgs = nedaflowmsgs_to_langchain_msgs(prompt)
                    llm_output = llm.invoke(msgs)
                else:
                    logger.error(f"Prompt type not supported: {type(prompt)}")
                    raise ValueError(f"Prompt type not supported: {type(prompt)}")
                self.outputs[0].value = llm_output
            else:
                logger.warning("No input provided to the LLM Chain")

            # TODO:: if this is stream response how to handle it / return it for custom node execution
        else:
            raise NotImplementedError(f"Library {self.library} not implemented yet")
        
        logger.warning(f"LLM Chain out: {self.outputs[0].value}")
        return self.outputs[0].value # TODO:: make common response for all nodes
    


   