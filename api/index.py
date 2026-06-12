"""
Vercel Python serverless entry point.
Adds the backend/ directory to sys.path so 'app.*' imports resolve correctly,
then re-exports the FastAPI app object for Vercel's ASGI runner.
"""
import sys
import os

# Make 'app' package importable from the backend/ directory
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.main import app  # noqa: F401 — Vercel looks for 'app'
