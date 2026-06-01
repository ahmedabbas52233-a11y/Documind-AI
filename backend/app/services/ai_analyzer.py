import openai
import json
import logging
from typing import AsyncGenerator, Optional
from app.config import settings

logger = logging.getLogger(__name__)

openai.api_key = settings.openai_api_key

SYSTEM_PROMPT = """You are DocuMind AI, an expert document analyzer. Analyze the provided document text and respond with a structured analysis in the following format:

## Summary
A concise 2-3 sentence summary of the document.

## Key Insights
- Insight 1
- Insight 2
- Insight 3

## Action Items
- Action item 1
- Action item 2

## Sentiment
Positive | Neutral | Negative | Mixed

Be thorough but concise. Focus on the most important information."""

async def stream_analysis(text: str, document_type: str = "general") -> AsyncGenerator[str, None]:
    """Stream AI analysis using OpenAI GPT-4o-mini."""
    if not settings.openai_api_key:
        yield "Error: OpenAI API key not configured."
        return

    # Truncate text if too long (approx 4000 tokens for mini)
    max_chars = 12000
    if len(text) > max_chars:
        text = text[:max_chars] + "\n...[Content truncated due to length]"

    prompt = f"Document type: {document_type}\n\n{text}"

    try:
        client = openai.AsyncOpenAI(api_key=settings.openai_api_key)
        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            stream=True,
            temperature=0.7,
            max_tokens=2000,
        )

        async for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta

    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        yield f"\n\nError during analysis: {str(e)}"

async def analyze_document(text: str, document_type: str = "general") -> str:
    """Non-streaming analysis for background processing."""
    if not settings.openai_api_key:
        return "Error: OpenAI API key not configured."

    max_chars = 12000
    if len(text) > max_chars:
        text = text[:max_chars] + "\n...[Content truncated due to length]"

    prompt = f"Document type: {document_type}\n\n{text}"

    try:
        client = openai.AsyncOpenAI(api_key=settings.openai_api_key)
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000,
        )
        return response.choices[0].message.content or ""
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return f"Error during analysis: {str(e)}"

def parse_analysis(raw_text: str) -> dict:
    """Parse the structured analysis into components."""
    result = {
        "summary": "",
        "insights": [],
        "action_items": [],
        "sentiment": "Neutral",
        "full_analysis": raw_text
    }

    lines = raw_text.split("\n")
    current_section = None

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("## Summary"):
            current_section = "summary"
            continue
        elif stripped.startswith("## Key Insights"):
            current_section = "insights"
            continue
        elif stripped.startswith("## Action Items"):
            current_section = "action_items"
            continue
        elif stripped.startswith("## Sentiment"):
            current_section = "sentiment"
            continue

        if not stripped:
            continue

        if current_section == "summary":
            result["summary"] += stripped + " "
        elif current_section == "insights" and stripped.startswith("-"):
            result["insights"].append(stripped[1:].strip())
        elif current_section == "action_items" and stripped.startswith("-"):
            result["action_items"].append(stripped[1:].strip())
        elif current_section == "sentiment":
            result["sentiment"] = stripped

    result["summary"] = result["summary"].strip()
    return result
