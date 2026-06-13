from datetime import datetime
from pydantic import BaseModel, EmailStr


# ── Auth ─────────────────────────────────────────────────────────────────────
class UserRegister(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


# ── Document ─────────────────────────────────────────────────────────────────
class DocumentUploadResponse(BaseModel):
    document_id: int
    filename: str
    extracted_text: str
    message: str


class DocumentHistoryItem(BaseModel):
    id: int
    filename: str
    file_size: int
    created_at: datetime

    model_config = {"from_attributes": True}


class PaginatedHistory(BaseModel):
    items: list[DocumentHistoryItem]
    total: int
    page: int
    pages: int
