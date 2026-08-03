import shutil
from pathlib import Path

from src.ingest import ingest_pdf

UPLOAD_DIR = Path("uploads")

UPLOAD_DIR.mkdir(exist_ok=True)


def save_pdf(file):

    filepath = UPLOAD_DIR / file.filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"Saved: {filepath}")

    ingest_pdf(str(filepath))

    return filepath