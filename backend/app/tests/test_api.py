"""Auth endpoint tests."""
import pytest


async def test_health(client):
    """Health check returns 200 and correct body."""
    r = await client.get("/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "healthy"


async def test_register(client):
    """Registering a new user returns 201 with user data."""
    r = await client.post(
        "/api/v1/auth/register",
        json={"email": "test@example.com", "password": "SecurePass1!"},
    )
    assert r.status_code == 201
    data = r.json()
    assert data["email"] == "test@example.com"
    assert "id" in data


async def test_register_duplicate(client):
    """Registering with an existing email returns 400."""
    payload = {"email": "dupe@example.com", "password": "SecurePass1!"}
    await client.post("/api/v1/auth/register", json=payload)
    r = await client.post("/api/v1/auth/register", json=payload)
    assert r.status_code == 400


async def test_login(client):
    """Valid credentials return access_token and refresh_token."""
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
    assert data["token_type"] == "bearer"


async def test_login_wrong_password(client):
    """Wrong password returns 401."""
    await client.post(
        "/api/v1/auth/register",
        json={"email": "wrongpw@example.com", "password": "SecurePass1!"},
    )
    r = await client.post(
        "/api/v1/auth/login",
        data={"username": "wrongpw@example.com", "password": "WrongPassword!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert r.status_code == 401


async def test_me_unauthenticated(client):
    """/me without token returns 401."""
    r = await client.get("/api/v1/auth/me")
    assert r.status_code == 401


async def test_history_requires_auth(client):
    """/history without token returns 401."""
    r = await client.get("/api/v1/history/")
    assert r.status_code == 401
