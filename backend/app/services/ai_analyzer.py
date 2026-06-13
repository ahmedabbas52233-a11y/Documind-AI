"""
AI analysis service — wraps OpenAI GPT-4o-mini.
Imported by routers/analyze.py.
"""
import logging
from typing import AsyncGenerator

from app.config import settings

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = """You are DocuMind, an expert document analyst.
Analyse the provided document text and respond with ONLY a valid JSON object:
{
  "analysis": "<3-5 paragraph narrative summary>",
  "sentiment": "<positive|neutral|negative>",
  "key_points": ["<point>", "<point>", "<point>"],
  "recommendations": ["<action>", "<action>", "<action>"]
}
Return ONLY valid JSON. No markdown fences. No extra text."""


def _mock_result(text: str) -> dict:
    """Fallback used when OPENAI_API_KEY is not set."""
    has_text = len(text.strip()) > 20
    return {
        "analysis": (
            "Document uploaded and processed by DocuMind AI. "
            + ("Readable text has been extracted. " if has_text else "")
            + "Set OPENAI_API_KEY in .env for live GPT-4o analysis."
        ),
        "sentiment": "neutral",
        "key_points": [
            "Document uploaded and text extracted successfully",
            "File stored securely in the database",
            "Add OPENAI_API_KEY to backend/.env for AI analysis",
        ],
        "recommendations": [
            "Add OPENAI_API_KEY=sk-proj-... to backend/.env",
            "Restart the server after updating environment variables",
            "Re-upload this document to receive GPT-4o analysis",
        ],
    }


async def stream_analysis(text: str) -> AsyncGenerator[str, None]:
    """
    Yields SSE-formatted strings.
    Protocol: event:start → event:result (JSON) → event:done (always last)
    """
    def _sse(event: str, data: str) -> str:
        return f"event: {event}\ndata: {data}\n\n"

    yield _sse("start", "")

    payload: dict | None = None

    if not settings.openai_api_key:
        payload = _mock_result(text)
    else:
        try:
            import json
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=settings.openai_api_key)
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
        except Exception as exc:
            logger.exception("OpenAI error: %s", exc)
            payload = _mock_result(text)

    yield _sse("result", __import__("json").dumps(payload))
    yield _sse("done",   "")
