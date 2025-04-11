from fastapi.routing import APIRouter 


router = APIRouter()


@router.post("/")
async def send_chat(self):
    pass 


# Handle Asyncio tests 
"""
Libs To Learn 
-----------------
- asyncio , asyncio.Queue, asyncio.Lock 
- threading , threading.Lock, ..
- concurrent.futures
- inspect 
- path 
- typeing TypeDict, NamedTuple, cast, protocol , NotRequired 
- collections dequeu, defaultdict, callable, generator 
- contextlib 
- textwrap
- traceback 
- importlib 
- itertools , functools
- contextlib 
- orjson 
- aiofile 
- io.BytesIO 
- base64
- shutil 
"""