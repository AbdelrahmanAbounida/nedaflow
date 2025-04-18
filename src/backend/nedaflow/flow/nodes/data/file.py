


from nedaflow.flow.nodes.io.io import Output
from nedaflow.flow.types import FileInput, TextInput, MultilineInput,DropdownInput,BooleanInput,JsonInput,NumberInput
from nedaflow.flow.nodes.base import BaseNode
from nedaflow.flow.types import FieldTypes


class File(BaseNode):
    name: str  = "File"
    display_name: str  = "File"
    description: str  = "Load a file to be used in your project."
    icon: str  = "File"
    minimized: bool = False
    code: str  = ""

    inputs: list = [
        FileInput(
            name="file_path",
            display_name="File Path",
            description="upload a file to your project",
            info="Supported file extensions: txt, md, mdx, csv, json, yaml, yml, xml, html, htm, pdf, docx, py, sh, sql, js, ts, tsx; optionally bundled in file extensions: zip, tar, tgz, bz2, gz"
        ),
    ]

    outputs: list = [
        Output(
            name="file_content",
            display_name="Data",
            method="get_file_content",
            description="outputs file content",
            output_type=FieldTypes.DATA,
        )
    ]