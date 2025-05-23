from pydantic import BaseModel, Field
from typing import TypeVar, Generic, Optional
from enum import Enum


# ********************
# Main 
# ********************

class DependencyType(str,Enum):
    """ This is mainly used for dependencies """
    LLM = "LLM"
    CHAIN = "CHAIN"


class DependencyDescriptor(BaseModel):
    """ This define the dependecy per each node """
    name: str = Field(description="Name of the dependency") # TODO:: make sure this name is unique
    type: DependencyType = Field(description="type of the dependency")
    is_required: Optional[bool] = False

class FieldTypes(str,Enum):
    """ This is mainly used for input types """
    TEXT = "TEXT"
    TEXTAREA="TEXTAREA"
    BOOLEAN="BOOLEAN"
    NUMBER="NUMBER"
    JSON="JSON"
    FILE="FILE"
    DATA="DATA"
    EMBEDDING="EMBEDDING"
    DROPDOWN="DROPDOWN"
    LIST_STRING="LIST_STRING"
    LIST_NUMBER="LIST_NUMBER"
    TRIGGER="TRIGGER"



# ********************
# Inputs 
# ********************
from nedaflow.flow.nodes.io.io import Input

# this is the list of input types we gonna use to categorize the components 
class MultilineMixin():
    pass

class MultilineInput(Input,MultilineMixin):
    multiline: bool = True 
    field_type:FieldTypes = FieldTypes.TEXTAREA

class TextInput(Input):
    field_type:FieldTypes = FieldTypes.TEXT
    is_secret: bool = False 

class DataInput(Input):
    field_type: FieldTypes = FieldTypes.DATA
    only_handle:bool = True 

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
class DropdownInput(Input, Generic[T]):
    field_type:FieldTypes = FieldTypes.DROPDOWN # if type(T) == str else FieldTypes.BOOLEAN if type(T) == bool else FieldTypes.NUMBER
    default: T 
    options: list[T]

class JsonInput(Input):
    field_type: FieldTypes = FieldTypes.JSON

class DataInput(Input):
    field_type: FieldTypes = FieldTypes.DATA
    only_handle: bool = True

class EmbeddingInput(Input):
    field_type: FieldTypes = FieldTypes.EMBEDDING
    only_handle:bool = True


# ********************
# Outputs  
# ********************




