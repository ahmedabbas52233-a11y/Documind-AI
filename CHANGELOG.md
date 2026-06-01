# Changelog

All notable changes to DocuMind AI are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2025-06-02

### 🎉 Major release — full production rewrite

---

### Added

**Frontend**
- Central `theme.js` design token file — all colours, gradients, and shadows flow from one source
- `LandingPage` — hero section, stats bar, features grid, how-it-works steps, CTA banner
- `UploadPage` — guest-mode feature hint card, accepted formats info row
- `AnalysisPage` — sentiment stats cards, key points list, recommendations list, export report button
- `HistoryPage` — "+ New Analysis" shortcut button, paginated skeleton loaders
- `FileDropZone` — WEBP support added, keyboard accessible (`role="button"`, `tabIndex`, `Enter`/`Space`)
- `Footer` — multi-column layout: brand description, Product/Account links, social icons, copyright bar
- `Navbar` — responsive hamburger menu with `aria-expanded` and `aria-controls`
- Skip navigation link (first DOM element, targets `#main-content`)
- Global `:focus-visible` ring (2 px indigo, mouse users unaffected)
- Password strength meter on register form (4-bar, per-requirement checklist)
- `role="alert"` on all error messages for screen reader announcement
- `aria-live="polite"` on streaming status, pagination count, document total
- `aria-label` on all icon-only buttons (delete, clear, sign-out, show/hide password)
- `htmlFor` / `id` associations on all form inputs
- `autoComplete` attributes on all auth inputs
- `progressbar` ARIA role on upload progress bar

**Backend**
- SSE protocol guarantees: `event: done` is always the final event (no more infinite loading)
- `event: result` delivers JSON payload — replaces ambiguous `event: data`
- `_mock_analysis()` fallback — returns structured result even when OpenAI is unavailable
- Tesseract auto-detection on Windows (`C:\Program Files\Tesseract-OCR\tesseract.exe`)
- Image OCR graceful fallback — returns image metadata instead of HTTP 500
- RGBA→RGB image normalisation before Tesseract processing
- `bcrypt` + `passlib` deprecation warning suppressed cleanly

---

### Changed

**Frontend**
- Theme: warm near-black `#0c0c10` replaces blue-navy `#080c18`
- Typography: **Inter** replaces DM Sans; **JetBrains Mono** replaces DM Mono
- `AnalysisPage` SSE parser rewritten — tracks `lastEvent` before consuming `data:` lines; handles stream-closed fallback
- `AnalysisPage` responsive layout: single CSS class with media query replaces broken nested grid
- `Footer` tech-stack tags removed; replaced with brand description and copyright
- All pages use semantic HTML (`main`, `section`, `article`, `aside`, `header`, `ul/ol/li`)

**Backend**
- `analyze.py` — switched from `client.chat.completions.stream()` to `create()` with `response_format: json_object`
- `requirements.txt` — all packages pinned to Python 3.11/3.12 compatible versions

---

### Fixed

- **Infinite loading loop** — `event: error` was emitted without `event: done`; stream closed with frontend stuck in loading state forever
- **Image upload crash** — `pytesseract` called without checking Tesseract availability; now detects binary and falls back gracefully
- **Auth failure** — `passlib 1.7.4` + `bcrypt 4.x` incompatibility caused silent `verify_password` crash; fixed by pinning compatible versions
- **Mobile layout overflow** — `AnalysisPage` had a nested CSS grid causing horizontal scroll on viewports < 900 px
- **Memory leak** — `URL.createObjectURL` was never revoked after report download
- **Footer contrast** — `#475569` on `#080b14` was 3.04:1 (fails AA); replaced throughout with `#94a3b8` (7.1:1)
- **Drop zone keyboard** — `<div>` click handler was unreachable by keyboard; added `role="button"` + `tabIndex=0`
- **Form labels** — `<label>` elements had no `htmlFor`; clicking label did not focus input

---

### Security

- Passwords hashed with bcrypt (work factor 12)
- JWT access tokens expire in 15 minutes; refresh tokens in 7 days
- `SECRET_KEY` validated to be set in production settings
- File type validated by MIME type server-side (not just extension)
- File size hard-capped at 5 MB server-side

---

## [1.0.0] — 2025-01-01

### Initial release

- Basic FastAPI backend with upload and mock analysis
- React frontend with file drop zone
- PostgreSQL integration via SQLAlchemy
- JWT authentication scaffold

---

[2.0.0]: https://github.com/YOUR_USERNAME/YOUR_REPO/releases/tag/v2.0.0
[1.0.0]: https://github.com/YOUR_USERNAME/YOUR_REPO/releases/tag/v1.0.0
