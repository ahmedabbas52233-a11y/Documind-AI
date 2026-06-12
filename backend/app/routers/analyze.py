import json
import logging
from typing import Optional, AsyncGenerator

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.database import get_db
from app.models.document import Document
from app.models.user import User
from app.routers.auth import get_current_active_user
from app.services.limiter import limiter

router = APIRouter(prefix="/analyze", tags=["Analyze"])
logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = """You are DocuMind, an expert document analyst.
Analyze the document text and respond with ONLY a valid JSON object in this schema:
{
  "analysis": "<3-5 paragraph narrative summary>",
  "sentiment": "<positive|neutral|negative>",
  "key_points": ["<point>", "<point>", "<point>"],
  "recommendations": ["<action>", "<action>", "<action>"]
}
Return ONLY valid JSON. No markdown fences. No extra text."""


def _sse(event: str, data: str) -> str:
    return f"event: {event}\ndata: {data}\n\n"


def _mock_result(text: str) -> dict:
    has_text = len(text.strip()) > 20
    return {
        "analysis": (
            "This document was successfully uploaded and processed by DocuMind AI. "
            + ("Readable text content has been extracted. " if has_text else "")
            + "Add OPENAI_API_KEY to your .env to receive real GPT-4o analysis."
        ),
        "sentiment": "neutral",
        "key_points": [
            "Document uploaded and text extracted successfully",
            "File stored securely in the database",
            "Set OPENAI_API_KEY in .env for live AI analysis",
        ],
        "recommendations": [
            "Add OPENAI_API_KEY=sk-proj-... to backend/.env",
            "Restart the server after updating environment variables",
            "Re-upload this document to receive GPT-4o analysis",
        ],
    }


async def _stream(text: str) -> AsyncGenerator[str, None]:
    """
    SSE protocol:
      event: start  → analysis beginning
      event: result → JSON payload (always sent, even on error)
      event: done   → ALWAYS the final event, no exceptions
    """
    yield _sse("start", "")

    payload: dict | None = None

    if not settings.OPENAI_API_KEY:
        payload = _mock_result(text)
    else:
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            response = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": _SYSTEM_PROMPT},
                    {"role": "user",   "content": f"Document text:\n\n{text[:12_000]}"},
                ],
                max_tokens=1024,
                temperature=0.3,
                response_format={"type": "json_object"},
            )
            raw = response.choices[0].message.content or ""
            payload = json.loads(raw)
        except json.JSONDecodeError as exc:
            logger.error("GPT returned invalid JSON: %s", exc)
            payload = _mock_result(text)
        except Exception as exc:
            logger.exception("OpenAI error: %s", exc)
            payload = _mock_result(text)

    # Always yield result then done — the frontend depends on this guarantee
    yield _sse("result", json.dumps(payload))
    yield _sse("done",   "")


@router.post("/stream/{document_id}")
@limiter.limit("20/minute")
async def analyze_stream(
    request: Request,
    document_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user),
):
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalar_one_or_none()

    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    if doc.user_id is not None and (not current_user or doc.user_id != current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    return StreamingResponse(
        _stream(doc.extracted_text),
        media_type="text/event-stream",
        headers={
            "Cache-Control":     "no-cache",
            "X-Accel-Buffering": "no",
            "Connection":        "keep-alive",
        },
    )
