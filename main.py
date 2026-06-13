import warnings  # noqa: E402 — must suppress bcrypt warning before any import
warnings.filterwarnings("ignore", ".*bcrypt.*", category=UserWarning)

from contextlib import asynccontextmanager  # noqa: E402
from fastapi import FastAPI, Request  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402
from fastapi.responses import JSONResponse  # noqa: E402
from slowapi.errors import RateLimitExceeded  # noqa: E402

from app.config import settings  # noqa: E402
from app.database import init_db  # noqa: E402
from app.services.limiter import limiter  # noqa: E402
from app.routers.auth import router as auth_router  # noqa: E402
from app.routers.upload import router as upload_router  # noqa: E402
from app.routers.analyze import router as analyze_router  # noqa: E402
from app.routers.history import router as history_router  # noqa: E402


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="DocuMind AI",
    description="Intelligent Document Analyzer API",
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests — please slow down."},
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router,    prefix="/api/v1/auth")
app.include_router(upload_router,  prefix="/api/v1")
app.include_router(analyze_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy", "service": "documind-ai", "version": "2.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
