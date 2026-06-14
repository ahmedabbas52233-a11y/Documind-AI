"""
Test configuration — uses SQLite (aiosqlite) so no Postgres is needed.
Environment is set BEFORE any app module is imported.
"""
import os
os.environ["DATABASE_URL"]   = "sqlite+aiosqlite:///./test_documind.db"
os.environ["SECRET_KEY"]     = "test-secret-key-minimum-32-characters-long"
os.environ["OPENAI_API_KEY"] = ""   # always use mock in tests

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport


@pytest_asyncio.fixture(scope="session")
async def client():
    # Import app AFTER env vars are set
    from app.database import init_db, engine
    from app.main import app

    await init_db()
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c

    await engine.dispose()
    if os.path.exists("./test_documind.db"):
        os.remove("./test_documind.db")


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"
