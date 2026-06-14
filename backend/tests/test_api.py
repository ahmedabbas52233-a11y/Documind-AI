"""
Core API tests — 8 tests covering health, auth, upload validation, and history.
Run with:  cd backend && pytest tests/ -v
"""
import io
import pytest

pytestmark = pytest.mark.anyio


# ── 1. Health check ───────────────────────────────────────────────────────────
async def test_health(client):
    r = await client.get("/health")
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "healthy"
    assert data["version"] == "2.0.0"


# ── 2. Register new user ──────────────────────────────────────────────────────
async def test_register(client):
    r = await client.post(
        "/api/v1/auth/register",
        json={"email": "test@example.com", "password": "SecurePass1!"},
    )
    assert r.status_code == 201
    data = r.json()
    assert data["email"] == "test@example.com"
    assert "id" in data


# ── 3. Duplicate email rejected ───────────────────────────────────────────────
async def test_register_duplicate(client):
    payload = {"email": "dupe@example.com", "password": "SecurePass1!"}
    await client.post("/api/v1/auth/register", json=payload)
    r = await client.post("/api/v1/auth/register", json=payload)
    assert r.status_code == 400
    assert "already registered" in r.json()["detail"].lower()


# ── 4. Login returns tokens ───────────────────────────────────────────────────
async def test_login(client):
    await client.post(
        "/api/v1/auth/register",
        json={"email": "login@example.com", "password": "SecurePass1!"},
    )
    r = await client.post(
        "/api/v1/auth/login",
        data={"username": "login@example.com", "password": "SecurePass1!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


# ── 5. Wrong password rejected ────────────────────────────────────────────────
async def test_login_wrong_password(client):
    await client.post(
        "/api/v1/auth/register",
        json={"email": "wrong@example.com", "password": "SecurePass1!"},
    )
    r = await client.post(
        "/api/v1/auth/login",
        data={"username": "wrong@example.com", "password": "WrongPassword!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert r.status_code == 401


# ── 6. /me requires authentication ───────────────────────────────────────────
async def test_me_unauthenticated(client):
    r = await client.get("/api/v1/auth/me")
    assert r.status_code == 401


# ── 7. /history requires authentication ──────────────────────────────────────
async def test_history_requires_auth(client):
    r = await client.get("/api/v1/history/")
    assert r.status_code == 401


# ── 8. Upload rejects invalid file type ──────────────────────────────────────
async def test_upload_invalid_type(client):
    fake_file = io.BytesIO(b"this is a text file")
    r = await client.post(
        "/api/v1/upload/",
        files={"file": ("test.txt", fake_file, "text/plain")},
    )
    assert r.status_code == 415
