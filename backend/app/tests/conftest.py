"""
Test configuration.
Sets environment variables BEFORE any app module is imported,
then creates all DB tables via init_db() before tests run.
"""
import os

os.environ["DATABASE_URL"]   = "sqlite+aiosqlite:///./test_ci.db"
os.environ["SECRET_KEY"]     = "ci-test-secret-key-minimum-32-characters"
os.environ["OPENAI_API_KEY"] = ""

import pytest_asyncio
from httpx import AsyncClient, ASGITransport


@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_database():
    """Create SQLite tables before any test, dispose engine after."""
    from app.database import init_db, engine
    await init_db()
    yield
    await engine.dispose()
    if os.path.exists("./test_ci.db"):
        os.remove("./test_ci.db")


@pytest_asyncio.fixture(scope="session")
async def client(setup_database):
    """Reusable async HTTP test client."""
    from app.main import app
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac