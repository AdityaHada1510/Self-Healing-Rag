from langchain_chroma import Chroma
from  src.embeddings import embeddings


def create_vector_store(chunks):

    db = Chroma(
        persist_directory="vectorstore",
        embedding_function=embeddings
    )

    batch_size = 10

    for i in range(0, len(chunks), batch_size):

        batch = chunks[i:i + batch_size]

        print(
            f"Embedding batch {i//batch_size + 1}/"
            f"{(len(chunks)+batch_size-1)//batch_size}"
        )

        db.add_documents(batch)

    return db


def load_vector_store():

    db = Chroma(
        persist_directory="vectorstore",
        embedding_function=embeddings
    )

    return db

def load_all_documents(db):

    collection = db._collection.get()

    docs = []

    from langchain_core.documents import Document

    for text, metadata in zip(
        collection["documents"],
        collection["metadatas"]
    ):

        docs.append(
            Document(
                page_content=text,
                metadata=metadata
            )
        )

    return docs