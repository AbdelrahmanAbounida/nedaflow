"""
    Main Router for different API Versions
"""

from fastapi import APIRouter
from nedaflow.api.v1 import component_router
from nedaflow.core.config import settings

from nedaflow.api.health_check import router as health_check_router

# *****************
# Version1 Routes
# *****************

router = APIRouter(
    prefix=f"/api/{settings.CURRENT_VERSION}"
)

# TODO >> register more routers here 
router.include_router(component_router)
router.include_router(health_check_router)