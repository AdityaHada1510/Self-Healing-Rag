from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma

from src.document_loader import load_pdf
from src.embeddings import embeddings


CHROMA_PATH = "vectorstore"

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150
)


def ingest_pdf(pdf_path: str):

    print("=" * 60)
    print("INGESTING PDF")
    print("=" * 60)

    documents = load_pdf(pdf_path)

    pdf_name = Path(pdf_path).name

    chunks = text_splitter.split_documents(documents)

    for chunk in chunks:

        chunk.metadata["source"] = pdf_name
        chunk.metadata["document"] = pdf_name

    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )

    ids = []

    for i in range(len(chunks)):
        ids.append(f"{pdf_name}_{i}")


    batch_size = 10

    for i in range(0, len(chunks), batch_size):

        batch = chunks[i:i + batch_size]
        batch_ids = ids[i:i + batch_size]

        print(
            f"Embedding batch {i//batch_size + 1}/"
            f"{(len(chunks)+batch_size-1)//batch_size}"
        )

        db.add_documents(
            batch,
            ids=batch_ids
        )

    print(f"Indexed {len(chunks)} chunks from {pdf_name}")