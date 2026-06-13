"""
Report generator — formats parsed AI analysis into a plain-text report.
"""
from datetime import datetime


def generate_text_report(
    document_id: int,
    filename: str,
    analysis: dict,
) -> str:
    """Return a formatted plain-text report string."""
    sep = "─" * 44
    lines = [
        "DocuMind AI — Analysis Report",
        f"File:      {filename}",
        f"Doc ID:    #{document_id}",
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        f"Sentiment: {analysis.get('sentiment', 'unknown').capitalize()}",
        "",
        "SUMMARY",
        sep,
        analysis.get("analysis", ""),
        "",
        "KEY POINTS",
        sep,
        *[f"{i+1}. {p}" for i, p in enumerate(analysis.get("key_points", []))],
        "",
        "RECOMMENDATIONS",
        sep,
        *[f"{i+1}. {r}" for i, r in enumerate(analysis.get("recommendations", []))],
    ]
    return "\n".join(lines)
