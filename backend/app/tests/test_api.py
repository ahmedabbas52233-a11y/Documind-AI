"""Auth endpoint tests — 7 tests, 0 imports needed beyond client fixture."""


async def test_health(client):
    r = await client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


async def test_register(client):
    r = await client.post(
        "/api/v1/auth/register",
        json={"email": "test@example.com", "password": "SecurePass1!"},
    )
    assert r.status_code == 201
    data = r.json()
    assert data["email"] == "test@example.com"
    assert "id" in data


async def test_register_duplicate(client):
    payload = {"email": "dupe@example.com", "password": "SecurePass1!"}
    await client.post("/api/v1/auth/register", json=payload)
    r = await client.post("/api/v1/auth/register", json=payload)
    assert r.status_code == 400


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
    assert data["token_type"] == "bearer"


async def test_login_wrong_password(client):
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
    r = await client.get("/api/v1/auth/me")
    assert r.status_code == 401


async def test_history_requires_auth(client):
    r = await client.get("/api/v1/history/")
    assert r.status_code == 401
