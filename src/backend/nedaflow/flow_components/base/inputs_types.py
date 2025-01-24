from nedaflow.flow_components.base.io import Input, FieldTypes
from nedaflow.flow_components.base.inputs_mixin import MultilineMixin


class MultilineInput(Input,MultilineMixin):
    multiline: bool = True 
    field_type:FieldTypes = FieldTypes.TEXT