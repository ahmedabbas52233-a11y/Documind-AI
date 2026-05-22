# DocuMind AI v2.0

AI-powered document analysis platform. Upload PDFs or images and receive instant AI-generated summaries, sentiment analysis, key insights, and recommendations.

---

## Project Structure

```
documind/
├── backend/           # FastAPI Python backend
│   ├── app/
│   │   ├── config.py          # Pydantic Settings
│   │   ├── database.py        # Async SQLAlchemy engine + session
│   │   ├── main.py            # FastAPI app, CORS, routers
│   │   ├── models/            # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   └── document.py
│   │   ├── schemas/           # Pydantic request/response schemas
│   │   │   ├── user.py
│   │   │   └── document.py
│   │   ├── routers/           # Route handlers
│   │   │   ├── auth.py        # Register / Login / Refresh / Me
│   │   │   ├── upload.py      # File upload + OCR extraction
│   │   │   ├── analyze.py     # SSE streaming AI analysis
│   │   │   └── history.py     # Paginated history + delete
│   │   └── services/
│   │       ├── security.py    # JWT + bcrypt helpers
│   │       └── extractor.py   # PDF + image text extraction
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/          # React + Vite + Tailwind frontend
    ├── src/
    │   ├── api/client.js          # Axios instance + interceptors
    │   ├── contexts/              # AuthContext, AnalysisContext
    │   ├── hooks/                 # useAuth, useSSE
    │   ├── components/            # Navbar, Footer, FileDropZone,
    │   │                          # StreamingText, AnalysisCard
    │   └── pages/                 # Landing, Auth, Upload,
    │                              # Analysis, History
    ├── tailwind.config.js         # 3D design tokens
    ├── index.html
    └── package.json
```

---

## Bug Fixes Applied

### Backend
| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 1 | `main.py` | `CORSMiddleware` registered **after** routers → preflight 405 | Moved middleware registration **before** `include_router` |
| 2 | `database.py` | Models defined in `database.py` causing circular imports | Moved models to `app/models/` package; `init_db` uses `__import__` to ensure metadata is populated |
| 3 | `config.py` | Settings mixed into `database.py` | Extracted into standalone `app/config.py`; `DATABASE_URL` without `+asyncpg` auto-upgraded |
| 4 | `services/security.py` | Used deprecated `datetime.utcnow()` | Replaced with `datetime.now(timezone.utc)` |
| 5 | `routers/auth.py` | `get_current_user` typed `Optional[str]` token, which FastAPI doesn't handle with `oauth2_scheme` | Kept `Optional[str]` annotation, added explicit `if not token: return None` guard |
| 6 | `routers/auth.py` | Password validated only client-side | Added `@field_validator` in `schemas/user.py` for 8–72 char enforcement |
| 7 | `routers/analyze.py` | Stub only — returned `{}` with no real analysis | Implemented full SSE streaming with OpenAI GPT-4o-mini; falls back to mock when no API key set |
| 8 | `routers/history.py` | Returned raw SQLAlchemy objects (not serializable) | Returns dicts with `.isoformat()` dates; added pagination and `DELETE /{id}` endpoint |
| 9 | `routers/upload.py` | Status code was 200 for creation | Changed to `201 Created` |
| 10 | `services/extractor.py` | Image mode not normalised → RGBA crash in Tesseract | Added `image.convert("RGB")` guard |

### Frontend
| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 1 | `App.jsx` | `checkAuth()` never called on mount → session lost on refresh | Added `useEffect(() => checkAuth(), [])` in `AppInner` |
| 2 | `api/client.js` | Refresh endpoint called with `null` body + query param not encoded | Fixed to POST with `?refresh_token=<encoded>` |
| 3 | `useSSE.js` | Used `EventSource` which cannot send `Authorization` header | Re-implemented with `fetch()` + `ReadableStream` to support JWT |
| 4 | `AnalysisPage.jsx` | Used mock simulated text; never called backend | Replaced with real `fetch()` SSE loop; parses JSON from stream; retry button |
| 5 | `HistoryPage.jsx` | Never fetched real data; used `<a href>` instead of `<Link>` | Calls `/history/` API on mount; supports pagination and delete |
| 6 | `AuthPage.jsx` | `setError` not available from context | Added `setError` to `AuthContext` value |
| 7 | `StreamingText.jsx` | Used `<ul>` outside list items causing invalid HTML | Wrapped lines in a `<div>` container; `<li>` items rendered correctly |
| 8 | `FileDropZone.jsx` | Upload error only passed upward, not shown locally | Added `localError` state for inline feedback |

---

## Setup

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env: set DATABASE_URL and OPENAI_API_KEY

uvicorn app.main:app --reload
# → http://localhost:8000
# → http://localhost:8000/docs  (Swagger UI)
```

> **Database**: PostgreSQL required. Create the `documind` database first.
> The app auto-runs `CREATE TABLE IF NOT EXISTS` on startup.

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql+asyncpg://...` | Async PostgreSQL URL |
| `OPENAI_API_KEY` | `""` | GPT-4o-mini key (mock output if empty) |
| `SECRET_KEY` | `change-me` | JWT signing secret (min 32 chars) |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `15` | Access token TTL |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Refresh token TTL |
| `MAX_FILE_SIZE` | `5242880` | Max upload bytes (5 MB) |
| `CORS_ORIGINS` | `http://localhost:5173,...` | Comma-separated allowed origins |

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/auth/register` | None | Create account |
| POST | `/api/v1/auth/login` | None | OAuth2 form login |
| POST | `/api/v1/auth/refresh` | None | Refresh tokens |
| GET  | `/api/v1/auth/me` | Bearer | Current user |
| POST | `/api/v1/upload/` | Optional | Upload & extract |
| POST | `/api/v1/analyze/stream/{id}` | Optional | SSE analysis |
| GET  | `/api/v1/history/` | Required | Paginated history |
| DELETE | `/api/v1/history/{id}` | Required | Delete document |
| GET  | `/health` | None | Health check |
