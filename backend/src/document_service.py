from pathlib import Path

from langchain_chroma import Chroma

from src.embeddings import embeddings


UPLOAD_DIR = Path("uploads")
VECTORSTORE = "vectorstore"


def list_documents():

    db = Chroma(
        persist_directory=VECTORSTORE,
        embedding_function=embeddings
    )

    collection = db._collection.get()

    counts = {}

    for metadata in collection["metadatas"]:

        filename = metadata.get("document")

        counts[filename] = counts.get(filename, 0) + 1

    documents = []

    for pdf in UPLOAD_DIR.glob("*.pdf"):

        documents.append(

            {

                "name": pdf.name,

                "chunks": counts.get(pdf.name, 0),

                "size": round(pdf.stat().st_size / (1024 * 1024), 2)

            }

        )

    documents.sort(key=lambda x: x["name"])

    return documents


def delete_document(filename):

    pdf_path = UPLOAD_DIR / filename

    if not pdf_path.exists():

        return False

    db = Chroma(

        persist_directory=VECTORSTORE,

        embedding_function=embeddings

    )

    collection = db._collection.get()

    ids_to_delete = []

    for id_, metadata in zip(

        collection["ids"],

        collection["metadatas"]

    ):

        if metadata.get("document") == filename:

            ids_to_delete.append(id_)

    if ids_to_delete:

        db.delete(ids=ids_to_delete)

    pdf_path.unlink()

    return True