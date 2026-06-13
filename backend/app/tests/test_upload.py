"""Upload endpoint tests."""
import io


async def test_upload_invalid_file_type(client):
    """
    Uploading a plain-text file must return 415 Unsupported Media Type.
    (HTTP 415 is the correct code for wrong Content-Type, not 400.)
    """
    fake = io.BytesIO(b"this is a plain text file")
    r = await client.post(
        "/api/v1/upload/",
        files={"file": ("test.txt", fake, "text/plain")},
    )
    assert r.status_code == 415


async def test_upload_file_too_large(client):
    """Uploading a file over 5 MB returns 413."""
    big = io.BytesIO(b"x" * (6 * 1024 * 1024))  # 6 MB
    r = await client.post(
        "/api/v1/upload/",
        files={"file": ("big.pdf", big, "application/pdf")},
    )
    assert r.status_code == 413
