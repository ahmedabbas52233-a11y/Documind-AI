<div align="center">

# DocuMind AI

**Intelligent document analysis powered by GPT-4o**

[![CI](https://github.com/ahmedabbas52233-a11y/Documind-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmedabbas52233-a11y/Documind-AI/actions)
[![Deploy with Vercel](https://vercel.com/button)](https://documind-ai-ruby.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776ab)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)

Upload any PDF or image — get a structured AI summary, sentiment score, key insights, and actionable recommendations in seconds.

**[Live Demo](https://documind-ai-ruby.vercel.app)** · [Report Bug](https://github.com/ahmedabbas52233-a11y/Documind-AI/issues) · [Request Feature](https://github.com/ahmedabbas52233-a11y/Documind-AI/issues)

</div>

---

## Screenshots

> Add screenshots to `docs/screenshots/` and update the paths below.

| Upload | Analysis Results | History |
|---|---|---|
| ![Upload page](docs/screenshots/upload.png) | ![Analysis results](docs/screenshots/analysis.png) | ![History page](docs/screenshots/history.png) |

---

## Features

| Feature | Description |
|---|---|
| 📄 **PDF Extraction** | Selectable text via `pdfplumber` |
| 🖼️ **Image OCR** | Tesseract with Windows auto-detect + graceful fallback |
| 🤖 **GPT-4o Analysis** | Structured JSON — summary, sentiment, key points, recommendations |
| 🌊 **SSE Streaming** | Real-time delivery over Server-Sent Events |
| 🔐 **JWT Auth** | Access + refresh token rotation, bcrypt hashing |
| 📜 **History** | Full paginated document history per user |
| 👤 **Guest Mode** | Upload and analyse without an account |
| 🛡️ **Rate Limiting** | Per-IP throttling via `slowapi` |
| ♿ **Accessible** | WCAG 2.1 AA — skip nav, ARIA landmarks, live regions |
| 🐳 **Docker** | `docker-compose up` starts everything |

---

## Project Structure

```
documind/
├── api/
│   └── index.py             # Vercel serverless entry point
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app factory + rate limiting
│   │   ├── config.py        # Pydantic settings
│   │   ├── database.py      # Async SQLAlchemy engine
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── routers/         # auth · upload · analyze · history
│   │   └── services/        # extractor · security · limiter
│   ├── tests/               # pytest suite (8 tests)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── theme.js         # Central design tokens
│   │   ├── components/      # Navbar · Footer · FileDropZone · ErrorBoundary
│   │   └── pages/           # Landing · Auth · Upload · Analysis · History · 404
│   └── package.json
├── .github/workflows/ci.yml # CI — build + test on every push
├── vercel.json              # Full-stack Vercel deployment
└── docker-compose.yml
```

---

## Quick Start

### Prerequisites

| Tool | Version |
|---|---|
| Python | **3.11 or 3.12** (not 3.13/3.14 — pydantic-core wheels missing) |
| Node.js | 18 LTS+ |
| PostgreSQL | 14+ (or use SQLite for local dev) |

### 1 · Clone

```bash
git clone https://github.com/ahmedabbas52233-a11y/Documind-AI.git
cd Documind-AI
```

### 2 · Docker (easiest)

```bash
docker-compose up --build
# Frontend → http://localhost:5173
# Backend  → http://localhost:8000
# Swagger  → http://localhost:8000/api/docs
```

### 3 · Manual setup

**Backend**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # fill in DATABASE_URL + SECRET_KEY
uvicorn app.main:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

**Run tests**
```bash
cd backend && pytest tests/ -v
```
## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET`    | `/health` | — | Health check |
| `POST`   | `/api/v1/auth/register` | — | Create account |
| `POST`   | `/api/v1/auth/login` | — | Login → tokens |
| `GET`    | `/api/v1/auth/me` | Bearer | Current user |
| `POST`   | `/api/v1/upload/` | Optional | Upload + extract |
| `POST`   | `/api/v1/analyze/stream/{id}` | Optional | SSE analysis |
| `GET`    | `/api/v1/history/` | Required | Paginated history |
| `DELETE` | `/api/v1/history/{id}` | Required | Delete document |

**SSE protocol**
```
event: start   → analysis beginning
event: result  → {"analysis":"…","sentiment":"…","key_points":[…],"recommendations":[…]}
event: done    → always the final event
```

---

## Environment Variables

| Variable | Default | Required |
|---|---|---|
| `DATABASE_URL` | `sqlite+aiosqlite:///./documind.db` | ✅ in prod |
| `SECRET_KEY` | `change-me` | ✅ |
| `OPENAI_API_KEY` | `""` | ⚠️ mock if blank |
| `CORS_ORIGINS` | `http://localhost:5173` | ✅ in prod |
| `MAX_FILE_SIZE` | `5242880` | — |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `15` | — |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `7` | — |

---

## Tech Stack

**Backend** — FastAPI · SQLAlchemy 2 async · asyncpg · OpenAI · pdfplumber · pytesseract · python-jose · passlib · slowapi

**Frontend** — React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · Axios · Lucide React · Inter font

---

## License

MIT © 2025 DocuMind AI
