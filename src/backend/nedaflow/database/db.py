from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from nedaflow.database.models import  Item
from nedaflow.services.settings.config import settings 

async def init_db() -> None:
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    print(client.get_database().name)
    await init_beanie(database=client.db_name, document_models=[Item]) # db_name