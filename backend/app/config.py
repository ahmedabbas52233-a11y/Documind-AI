from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    database_url: str = "sqlite+aiosqlite:///./documind.db"

    # Security
    secret_key: str = "change-me-to-a-random-string-at-least-32-chars"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 7

    # OpenAI — lowercase so settings.openai_api_key works everywhere
    openai_api_key: str = ""

    # Upload
    max_file_size: int = 5 * 1024 * 1024  # 5 MB

    # CORS — comma-separated string
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    # Keep uppercase aliases for backwards compat with any code using them
    @property
    def DATABASE_URL(self) -> str:
        return self.database_url

    @property
    def SECRET_KEY(self) -> str:
        return self.secret_key

    @property
    def OPENAI_API_KEY(self) -> str:
        return self.openai_api_key

    @property
    def MAX_FILE_SIZE(self) -> int:
        return self.max_file_size

    class Config:
        env_file = ".env"
        case_sensitive = False   # reads OPENAI_API_KEY → openai_api_key


settings = Settings()
