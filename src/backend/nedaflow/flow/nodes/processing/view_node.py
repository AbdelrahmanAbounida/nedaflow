from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.types import TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from nedaflow.flow.types import FieldTypes


class ViewNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.PROCESSING
    name: str  = "View Data"
    display_name: str  = "View Data"
    description: str  = "View Data in a panel"
    icon: str  = "FolderSync"
    minimized: bool = False
    code: str  = ""

    inputs: list = [
        MultilineInput(
            name="data",
            display_name="Data",
            description="Show Data in a panel",
            field_type=FieldTypes.TEXT,
            show=True,
            is_secret=False,
            is_handle=True
        ),
   ]

    outputs: list = [
        Output(
            name="data",
            display_name="Data",
            method="show_data",
            description="The Data as a dictionary",
            info="The Data as a dictionary",
            output_type=FieldTypes.DATA,
        )
    ]