from nedaflow.middlewares.response_middleware import UnifiedResponseMiddleware
from fastapi.middleware.cors import CORSMiddleware
from nedaflow.api.router import router as main_router
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, Request
from nedaflow.lifespan import lifespan
from dotenv import load_dotenv
from nedaflow.core.config import settings



load_dotenv()



app = FastAPI(
    lifespan=lifespan,
    dependencies=[],  # TODO: Add dependencies for API authentication if required
    middleware=[],
    openapi_url=f"/openapi_{settings.CURRENT_VERSION}.json",
    description="""
        A developer-focused low-code platform that simplifies building advanced AI agents and workflows, enabling seamless 
        integration with various APIs, models, and databases. 🚀.
    """,
)

app.mount("/static", StaticFiles(directory="nedaflow/static"), name="static")



## Middlewares 
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(UnifiedResponseMiddleware,)


# *******************
# Routes
# *******************
templates = Jinja2Templates(directory="nedaflow/static/templates")

@app.get("/",tags=["Home"], response_class=HTMLResponse)
async def root(request:Request):
    return templates.TemplateResponse(request=request, name="home.html", context={})

app.include_router(main_router)