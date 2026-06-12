from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool
from app.config import settings

# Auto-upgrade sync postgres URLs to asyncpg
_url = settings.DATABASE_URL
if _url.startswith("postgresql://") and not _url.startswith("postgresql+asyncpg://"):
    _url = _url.replace("postgresql://", "postgresql+asyncpg://", 1)

# SQLite uses NullPool (no connection pooling); Postgres uses conservative
# pool settings suitable for serverless (Vercel / Railway).
_is_sqlite = _url.startswith("sqlite")
_engine_kwargs = (
    {"poolclass": NullPool}
    if _is_sqlite
    else {"pool_pre_ping": True, "pool_size": 2, "max_overflow": 2}
)

engine = create_async_engine(_url, echo=False, **_engine_kwargs)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()


async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    """Create tables on startup — idempotent, safe for serverless cold starts."""
    __import__("app.models.user")
    __import__("app.models.document")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
