from nedaflow.flow_components.base.io import Input
from nedaflow.flow_components.base.inputs_mixin import MultilineMixin
from nedaflow.flow_components.types import FieldTypes

class MultilineInput(Input,MultilineMixin):
    multiline: bool = True 
    field_type:FieldTypes = FieldTypes.TEXTAREA