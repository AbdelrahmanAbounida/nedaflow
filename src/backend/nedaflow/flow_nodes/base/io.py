from pydantic import BaseModel, ConfigDict, Field, model_serializer
from typing_extensions import Any , Callable
from nedaflow.flow_nodes.base.types import FieldTypes


# TODO:: check both those types and remove what u see not required 
class Input(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    is_handle: bool = False
    """if true input will be handled from anthor component (has reactflow handle)"""

    only_handle: bool = False
    """if true will show only handle for this input """

    field_type: FieldTypes # str | type | None = Field(default=str, serialization_alias="type") # it could be literal but lets keep it like that for flexiablilty 
    """The type of field this is. This is the main type by which we will categorize the input."""

    required: bool = False
    """Specifies if the field is required. Defaults to False."""

    placeholder: str = ""
    """A placeholder string for the field. Default is an empty string."""

    is_list: bool = Field(default=False, serialization_alias="list")
    """Defines if the field is a list. Default is False."""

    show: bool = True
    """Should the field be shown. Defaults to True."""

    multiline: bool = False
    """Defines if the field will allow the user to open a text editor. Default is False."""

    value: Any = None
    """The value of the field. Default is None."""

    # file_types: list[str] = Field(default=[], serialization_alias="fileTypes")
    """List of file types associated with the field . Default is an empty list."""

    file_path: str | None = ""
    """The file path of the field if it is a file. Defaults to None."""

    is_secret: bool | None = Field(alias="is_password", default=False)
    """Specifies if the field is a password. Defaults to None."""

    options: list[str] | Callable | None = None
    """List of options for the field. Only used when is_list=True. Default is an empty list."""

    name: str | None = None
    """Name of the field. Default is an empty string."""

    display_name: str | None = None
    """Display name of the field. Defaults to None."""

    input_types: list[str] | None = None
    """List of input types for the handle when the field has more than one type. Default is an empty list."""

    dynamic: bool = False
    """Specifies if the field is dynamic. Defaults to False."""

    info: str | None = ""
    """Additional information about the field to be shown in the tooltip. Defaults to an empty string."""

    real_time_refresh: bool | None = None
    """Specifies if the field should have real time refresh. `refresh_button` must be False. Defaults to None."""

    refresh_button: bool | None = None
    """Specifies if the field should have a refresh button. Defaults to False."""
    refresh_button_text: str | None = None
    """Specifies the text for the refresh button. Defaults to None."""

    # range_spec: RangeSpec | None = Field(default=None, serialization_alias="rangeSpec")
    """Range specification for the field. Defaults to None."""

    load_from_db: bool = False
    """Specifies if the field should be loaded from the database. Defaults to False."""
    # title_case: bool = False
    # """Specifies if the field should be displayed in title case. Defaults to True."""

    def to_dict(self):
        return self.model_dump(by_alias=True, exclude_none=True)
    
    def to_json(self):
        return self.to_dict()

    @model_serializer(mode="wrap")
    def serialize_model(self, handler):
        result = handler(self)
        if self.field_type in {"str", "Text"} and "input_types" not in result:
            result["input_types"] = ["Text"]
        if self.field_type == FieldTypes.TEXT:
            result["type"] = "str"
        else:
            result["type"] = self.field_type
        return result



class Output(BaseModel):
    # types: list[str] = Field(default=[])
    # """List of output types for the field."""
    output_type: FieldTypes
    """output type """

    selected: str | None = Field(default=None)
    """The selected output type for the field."""

    name: str = Field(description="The name of the field.")
    """The name of the field."""

    hidden: bool | None = Field(default=None)
    """Dictates if the field is hidden."""

    display_name: str | None = Field(default=None)
    """The display name of the field."""

    method: str | None = Field(default=None)
    """The method to use for the output."""

    value: Any | None = Field(default=None)
    """The result of the Output. Dynamically updated as execution occurs."""

    cache: bool = Field(default=True)

    required_inputs: list[str] | None = Field(default=None)
    """List of required inputs for this output."""

    def to_dict(self):
        return self.model_dump(by_alias=True, exclude_none=True)

    def add_types(self, type_: list[Any]) -> None:
        if self.types is None:
            self.types = []
        self.types.extend([t for t in type_ if t not in self.types])

    def set_selected(self) -> None:
        if not self.selected and self.types:
            self.selected = self.types[0]

   
