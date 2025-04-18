from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import Optional
from dotenv import load_dotenv
from pathlib import Path 
from loguru import logger 
import os 
load_dotenv()


BASE_COMPONENTS_PATH = str(Path(__file__).parent.parent / "flow_nodes")

class Settings(BaseSettings):
    PROJECT_NAME: Optional[str] = Field(default="",description="The project name") 
    DATABASE_URL:  str = os.environ.get("DATABASE_URL","")
    DATABASE_NAME: str = os.environ.get("DATABASE_NAME","")
    CURRENT_VERSION: str = "v1"

    # langflow settigns 
    components_path: list[str] = []

    # general settings 


    model_config = SettingsConfigDict(
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore"
    )

    @field_validator("components_path", mode="before")
    @classmethod
    def set_components_path(cls, value):
        if not value:
            value = [BASE_COMPONENTS_PATH]
            # logger.debug("Setting default components path to components_path")
        elif BASE_COMPONENTS_PATH not in value:
            value.append(BASE_COMPONENTS_PATH)
            # logger.debug("Adding default components path to components_path")
        # logger.debug(f"Components path: {value}")

        # logger.debug(f"value: {value}")
        for index,path in enumerate(value):
            if not os.path.exists(path):
                logger.warning(f"path: {path} not exist")
                value.pop(index)
        return value



settings = Settings() # type: ignore