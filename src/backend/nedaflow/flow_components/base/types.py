from nedaflow.flow_components.base.io import Input
from nedaflow.flow_components.types import FieldTypes
from typing import TypeVar, Generic

# this is the list of input types we gonna use to categorize the components 
class MultilineMixin():
    pass

class MultilineInput(Input,MultilineMixin):
    multiline: bool = True 
    field_type:FieldTypes = FieldTypes.TEXT

class TextInput(Input):
    field_type:FieldTypes = FieldTypes.TEXT
    is_secret: bool = False 

class BooleanInput(Input):
    field_type: FieldTypes = FieldTypes.BOOLEAN

class FileInput(Input):
    field_type: FieldTypes = FieldTypes.FILE

class JSONInput(Input):
    field_type: FieldTypes = FieldTypes.JSON
    
class NumberInput(Input):
    field_type: FieldTypes = FieldTypes.NUMBER
    default: int 

T = TypeVar("T", str, int, float, bool)
class DropdownInput(Generic[T], Input):
    field_type:FieldTypes = FieldTypes.DROPDOWN # if type(T) == str else FieldTypes.BOOLEAN if type(T) == bool else FieldTypes.NUMBER
    default: T 
    options: list[T]

class JsonInput(Input):
    field_type: FieldTypes = FieldTypes.JSON


class DataInput(Input):
    field_type: FieldTypes = FieldTypes.DATA