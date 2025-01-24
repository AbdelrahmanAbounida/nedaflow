"""
    - used for reading the files from a folder 
    - building schema from code base dynamically instead of having fixed registery
"""

from typing import Optional
from nedaflow.flow_components.base import BaseComponent
from nedaflow.core.config import settings
from pathlib import Path 
from loguru import logger 
import importlib.util
from types import ModuleType
import inspect
import os 

def get_folder_files(folder_path:str) -> list[str]:
    """Walk through the directory path and return a list of all .py files."""

    logger.debug(f"folder_path:{folder_path}")
    if not os.path.exists(folder_path):
        logger.warning(f"Folder path does not exist: {folder_path}")
        return []

    file_list = []
    path = Path(folder_path) 
    safe_path_obj = path if Path.is_absolute(path) else Path.resolve(path)

    for file_path in safe_path_obj.rglob("*.py"):
        if "deactivated" in file_path.parent.name:
            continue
        if file_path.is_file() and file_path.parent.parent == safe_path_obj and not file_path.name.startswith("__"):
            file_list.append(str(file_path))
    return file_list



def get_file_content(file_path:str) -> str:
    """get the file content >> mainly for component code"""

    if not os.path.exists(file_path):
        logger.warning(f"get_file_content > {file_path} not exist")
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except UnicodeDecodeError:
        logger.warning(f"UnicodeDecodeError in reading: {file_path}")
        with open(file_path, "rb") as f:
            return f.read().decode("utf-8")
    except Exception as e:
        logger.error(f"Failed loading file: {file_path} > {e}")


def import_module_from_filepath(file_path:str) -> ModuleType | None :
    """Dynamically import a module from a file path."""
    if not os.path.exists(file_path):
        return None 
    
    module_name = Path(file_path).stem
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)  # type: ignore
    return module

def fetch_native_langflow_components(components_path:Optional[list[str]]=[]) -> list[BaseComponent]: 
    # TODO:: use asyncio to read that 
    """get all current components to export to the ui to be used in the flow builder
    
    will walk through this folder files list and check any class inherits from BaseComponent
    and get its json version to be exported to the ui 
    """
    # components_paths or settings.components_paths
    paths = components_path or settings.components_path 
    logger.debug(f"Reading nedflow components form paths: {paths}")

    components_files_list = []
    for path in paths:
        path_files = get_folder_files(path)
        components_files_list.extend(path_files)
    
    # TODO:: add classes categories by module name s
    components = []
    for file_path in components_files_list:
        try:
            module = import_module_from_filepath(file_path)
            if not module:
                continue
            for name, obj in inspect.getmembers(module, inspect.isclass):
                logger.debug(f"calss: {name}")
                if issubclass(obj, BaseComponent) and obj is not BaseComponent:
                    instance = obj()  # Attempt to create an instance
                    print(f"obj: {instance}")
                    components.append(instance.to_dict() | {"code": get_file_content(file_path)})
                    
        except Exception as e:
            logger.error(f"Error processing file {file_path}: {e}")
    return components