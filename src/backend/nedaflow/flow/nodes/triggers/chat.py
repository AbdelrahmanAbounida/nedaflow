from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.nodes.triggers.base import BaseTriggerNode
from typing import Any
from loguru import logger

class ChatTriggerComponent(BaseTriggerNode):
    display_name: str = "Chat Trigger"
    name: str = "Chat Trigger" # nonesense name  for now 
    description: str = "Allows you to test your flow using chat Playground"
    icon: str = "MessagesSquare"
    minimized: bool = True
    code: str = ""

    inputs: list = [
        
    ]
    outputs: list = [
        Output(display_name="Message", name="message", method="message_response", output_type=FieldTypes.TRIGGER), # see how to have fixed output schema
    ] 


    def trigger(self):
        """ Trigger on getting a chat message"""
    
    def execute(self, dependencies: dict[str, Any] = {}, *args, **kwargs):
        logger.success("You are executing chat trigger now ")
        # TODO:: think about auth , call it from api 
        # TODO:: no chat ui should appear / allowed until this trigger is called 
        return True 

        