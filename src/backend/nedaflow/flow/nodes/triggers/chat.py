from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.io.io import Output, Input
from nedaflow.flow.nodes.triggers.base import BaseTriggerNode
from nedaflow.flow.chat import NedaFlowChatMessage
from typing import Any
from loguru import logger

class ChatTriggerComponent(BaseTriggerNode):
    display_name: str = "Chat Trigger"
    name: str = "Chat Trigger" # nonesense name  for now 
    description: str = "Allows you to test your flow using chat Playground"
    icon: str = "MessagesSquare"
    minimized: bool = True
    code: str = ""
    inputs: list[Input]= []
    outputs: list = [
        Output(display_name="Message", name="message", method="message_response", output_type=FieldTypes.TRIGGER), # see how to have fixed output schema
    ]

    # external inputs 
    # chat_messages: list[NedaFlowChatMessage] = []


    def trigger(self):
        """ Trigger on getting a chat message"""
        # TODO:: use chat service with chat session id to load messages 
        messages = self.external_data.get("messages")
        if(not messages):
            messages = []
        try:
            messages = [NedaFlowChatMessage.model_validate(message) for message in messages]
        except Exception as e:
            logger.error(f"Error Validating messages: {e}")
            messages = []
        
        logger.debug(f"messages: {messages}")
        # TODO:: think about auth , call it from api 
        return messages
    
    def execute(self, dependencies: dict[str, Any] = {}, *args, **kwargs):
        logger.success("You are executing chat trigger now ")
        out = self.trigger()
        return out 

        