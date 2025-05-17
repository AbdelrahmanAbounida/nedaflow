from nedaflow.flow.types import FieldTypes
from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.nodes.triggers.base import BaseTriggerNode

class ManualTriggerComponent(BaseTriggerNode):
    display_name: str = "Manual Trigger"
    name: str = "Manual Trigger" # nonesense name  for now 
    description: str = "Triggers a workflow manually by pressing a Test button"
    icon: str = "Play"
    minimized: bool = True
    code: str = ""

    inputs: list = [
        
    ]
    outputs: list = [
        Output(display_name="Message", name="message", method="message_response", output_type=FieldTypes.TRIGGER), # see how to have fixed output schema
    ] 


    def trigger(self):
        """ Trigger on getting a chat message"""

        