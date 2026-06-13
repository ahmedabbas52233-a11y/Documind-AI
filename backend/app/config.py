from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Primary field names are UPPERCASE to match env var keys and all existing
    router / service code. Lowercase property aliases are provided for the
    small number of files that reference them in lowercase.
    """

    # ── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str = "sqlite+aiosqlite:///./documind.db"

    # ── JWT / Auth ────────────────────────────────────────────────────────────
    SECRET_KEY:                  str = "change-me-to-a-random-string-at-least-32-chars"
    ALGORITHM:                   str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS:   int = 7

    # ── OpenAI ────────────────────────────────────────────────────────────────
    OPENAI_API_KEY: str = ""

    # ── Upload ────────────────────────────────────────────────────────────────
    MAX_FILE_SIZE: int = 5 * 1024 * 1024   # 5 MB (set 4194304 on Vercel free tier)

    # ── CORS ──────────────────────────────────────────────────────────────────
    CORS_ORIGINS: str = "http://localhost:5173"

    # ── Lowercase property aliases ─────────────────────────────────────────────
    @property
    def openai_api_key(self) -> str:        # used by ai_analyzer.py
        return self.OPENAI_API_KEY

    @property
    def database_url(self) -> str:          # used by database.py + alembic/env.py
        return self.DATABASE_URL

    @property
    def cors_origins_list(self) -> List[str]:   # used by main.py CORS middleware
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    # SettingsConfigDict (from pydantic_settings) — not pydantic.ConfigDict
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()