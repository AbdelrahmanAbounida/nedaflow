from nedaflow.middlewares.response_middleware import UnifiedResponseMiddleware
from fastapi.middleware.cors import CORSMiddleware
from nedaflow.api.router import router as main_router
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, Request
from nedaflow.lifespan import lifespan
from dotenv import load_dotenv
from nedaflow.services.settings.config import settings
from pathlib import Path
from scalar_fastapi import get_scalar_api_reference



load_dotenv()

app = FastAPI(
    lifespan=lifespan,
    dependencies=[],  # TODO: Add dependencies for API authentication if required
    middleware=[],
    openapi_url=f"/openapi_{settings.CURRENT_VERSION}.json",
    title="NedaFlow Backend API",
    description="""
        A developer-focused low-code platform that simplifies building advanced AI agents and workflows, enabling seamless 
        integration with various APIs, models, and databases. 🚀.
    """,
)

# static_dir = Path(__file__).resolve().parent / "static"
# app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")



## Middlewares 
# app.add_middleware(UnifiedResponseMiddleware,)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# *******************
# Routes
# *******************
# templates = Jinja2Templates(directory="nedaflow/static/templates")


# @app.get("/",tags=["Home"], response_class=HTMLResponse)
# async def root(request:Request):
#     return templates.TemplateResponse(request=request, name="home.html", context={})


# ******************
# Docs 
# ******************

@app.get("/scalar", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title=app.title,
        show_sidebar=True,
        default_open_all_tags=True,
        dark_mode=False,
        
        scalar_theme="""
            .no-underline {
            display: none !important;
            }
            .open-api-client-button{
            display: none!important;}

            .text-sm text-sidebar-c-2{
            display: none!important;}
            """
    )

app.include_router(main_router)