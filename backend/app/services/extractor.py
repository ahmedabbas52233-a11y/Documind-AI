"""
Document text extraction.
  PDF   → pdfplumber (selectable text)
  Image → pytesseract with Windows auto-detect + graceful fallback
"""
import io, logging, shutil
from typing import Dict
import pdfplumber
from PIL import Image

logger = logging.getLogger(__name__)

ALLOWED_TYPES: Dict[str, str] = {
    "application/pdf": ".pdf",
    "image/png":       ".png",
    "image/jpeg":      ".jpg",
    "image/jpg":       ".jpg",
    "image/webp":      ".webp",
}


def get_file_extension(content_type: str) -> str:
    return ALLOWED_TYPES.get(content_type, ".bin")


# ── Tesseract detection (once at import) ──────────────────────────────────────
_TESSERACT_OK = False
try:
    import pytesseract, platform, os
    if platform.system() == "Windows" and not shutil.which("tesseract"):
        for _p in [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
        ]:
            if os.path.isfile(_p):
                pytesseract.pytesseract.tesseract_cmd = _p
                break
    pytesseract.get_tesseract_version()
    _TESSERACT_OK = True
    logger.info("Tesseract OCR ready")
except Exception as _e:
    logger.warning("Tesseract unavailable (%s) — image uploads use metadata fallback", _e)


# ── Public API ────────────────────────────────────────────────────────────────
async def extract_text(file_bytes: bytes, content_type: str) -> str:
    if content_type not in ALLOWED_TYPES:
        raise ValueError(f"Unsupported file type: {content_type}")
    return await _pdf(file_bytes) if content_type == "application/pdf" else await _image(file_bytes)


# ── PDF ───────────────────────────────────────────────────────────────────────
async def _pdf(data: bytes) -> str:
    parts: list[str] = []
    with pdfplumber.open(io.BytesIO(data)) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                parts.append(t.strip())
    result = "\n\n".join(parts).strip()
    if not result:
        raise ValueError(
            "No selectable text found in this PDF. "
            "If it is a scanned document, export its pages as PNG/JPG and upload those."
        )
    return result


# ── Image ─────────────────────────────────────────────────────────────────────
async def _image(data: bytes) -> str:
    img = Image.open(io.BytesIO(data))
    # Normalise to RGB
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    if _TESSERACT_OK:
        import pytesseract
        text = pytesseract.image_to_string(img, config="--psm 6").strip()
        if not text:
            text = pytesseract.image_to_string(img.convert("L"), config="--psm 6").strip()
        if text:
            return text

    # Graceful metadata fallback
    w, h = img.size
    small = img.convert("RGB").resize((50, 50))
    px = list(small.getdata())
    r = sum(p[0] for p in px) // len(px)
    g = sum(p[1] for p in px) // len(px)
    b = sum(p[2] for p in px) // len(px)
    brightness = (r + g + b) // 3
    tone = "bright/light" if brightness > 180 else "dark" if brightness < 80 else "medium contrast"

    return (
        "[Image document — OCR not available on this server]\n\n"
        f"Dimensions: {w} × {h} px\n"
        f"Brightness: {brightness}/255 ({tone})\n"
        f"Dominant colour: RGB({r},{g},{b})\n\n"
        "To enable OCR: install Tesseract 5.x and restart the server.\n"
        "  Windows: https://github.com/UB-Mannheim/tesseract/wiki\n"
        "  macOS: brew install tesseract\n"
        "  Linux: sudo apt install tesseract-ocr"
    )
