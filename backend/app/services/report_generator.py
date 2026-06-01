from typing import Dict, Any, List
from app.services.ai_analyzer import parse_analysis

def generate_report(raw_analysis: str) -> Dict[str, Any]:
    """Generate a structured report from raw AI analysis."""
    parsed = parse_analysis(raw_analysis)
    return {
        "summary": parsed["summary"],
        "insights": parsed["insights"],
        "action_items": parsed["action_items"],
        "sentiment": parsed["sentiment"],
        "full_text": raw_analysis,
    }

def format_history_report(analysis_result) -> Dict[str, Any]:
    """Format a database analysis result for history display."""
    return {
        "id": analysis_result.id,
        "document_id": analysis_result.document_id,
        "document_name": analysis_result.document.filename if analysis_result.document else "Unknown",
        "summary": analysis_result.summary,
        "insights": analysis_result.insights or [],
        "action_items": analysis_result.action_items or [],
        "sentiment": analysis_result.sentiment,
        "created_at": analysis_result.created_at.isoformat() if analysis_result.created_at else None,
    }
