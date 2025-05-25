# Define chat Message Schema and think later how to make compatible with all different frameworks 

from pydantic import BaseModel, Field 
from typing import Literal, Optional
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage, BaseMessage as LangchainBaseMessage

class NedaFlowChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    timestamp: Optional[str] = None


def nedaflowmsgs_to_langchain_msgs(msgs: list[NedaFlowChatMessage]) -> list[LangchainBaseMessage]:
    langchain_msgs = []
    for msg in msgs:
        if msg.role == "user":
            langchain_msgs.append(HumanMessage(content=msg.content))
        elif msg.role == "assistant":
            langchain_msgs.append(AIMessage(content=msg.content))
        elif msg.role == "system":
            langchain_msgs.append(SystemMessage(content=msg.content))
    return langchain_msgs