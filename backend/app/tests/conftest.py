"""
Test configuration.
Sets environment variables BEFORE any app module is imported,
then creates all DB tables via init_db() before tests run.
"""
import os

# Must be set BEFORE any app import — pydantic-settings reads at class definition time
os.environ["DATABASE_URL"]   = "sqlite+aiosqlite:///./test_ci.db"
os.environ["SECRET_KEY"]     = "ci-test-secret-key-minimum-32-characters"
os.environ["OPENAI_API_KEY"] = ""   # use mock analysis in tests

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport


# ── Session-scoped DB init (runs once before ALL tests) ──────────────────────
@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_database():
    """Create SQLite tables before any test, tear down after."""
    from app.database import init_db, engine
    await init_db()
    yield
    await engine.dispose()
    db_path = "./test_ci.db"
    if os.path.exists(db_path):
        os.remove(db_path)


# ── Session-scoped HTTP client ───────────────────────────────────────────────
@pytest_asyncio.fixture(scope="session")
async def client(setup_database):
    """Reusable async test client for the FastAPI app."""
    from app.main import app
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac
