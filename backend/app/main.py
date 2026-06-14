import warnings
warnings.filterwarnings("ignore", ".*bcrypt.*", category=UserWarning)
warnings.filterwarnings("ignore", ".*crypt.*", category=DeprecationWarning)

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import init_db
from app.services.limiter import limiter
from app.routers.auth import router as auth_router
from app.routers.upload import router as upload_router
from app.routers.analyze import router as analyze_router
from app.routers.history import router as history_router  # noqa: E402


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="DocuMind AI",
    version="2.0.0",
    description="Intelligent Document Analyzer API",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# ── Rate limiter ──────────────────────────────────────────────────────────────
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def _rate_limit(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Too many requests."})


# ── CORS — MUST be registered BEFORE routers ─────────────────────────────────
# Registering after routers causes preflight OPTIONS to return 405,
# silently blocking all browser API calls.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth_router,    prefix="/api/v1/auth")
app.include_router(upload_router,  prefix="/api/v1")
app.include_router(analyze_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy", "version": "2.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
