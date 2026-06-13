from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Document(Base):
    __tablename__ = "documents"

    id:             Mapped[int]           = mapped_column(primary_key=True, index=True)
    user_id:        Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True
    )
    filename:       Mapped[str]           = mapped_column(String(512), nullable=False)
    file_type:      Mapped[str]           = mapped_column(String(64),  nullable=False)
    file_size:      Mapped[int]           = mapped_column(Integer,     nullable=False)
    extracted_text: Mapped[str]           = mapped_column(Text,        nullable=False, default="")
    created_at:     Mapped[datetime]      = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<Document id={self.id} filename={self.filename!r}>"
