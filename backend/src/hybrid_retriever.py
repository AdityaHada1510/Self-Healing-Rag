from src.vectordb import (
    load_vector_store,
    load_all_documents
)

from src.retriever import retrieve
from src.bm25 import BM25Retriever


def hybrid_retrieve(query, k=5):

    # Always load the latest vector database
    db = load_vector_store()

    # Always load the latest documents
    all_docs = load_all_documents(db)

    if len(all_docs) == 0:
        return [[], []]

    # Build BM25 from the latest documents
    bm25 = BM25Retriever(all_docs)

    # Vector search
    vector_docs = retrieve(
        db,
        query,
        k
    )

    # BM25 search
    bm25_docs = bm25.search(
        query,
        k
    )

    vector_results = []

    bm25_results = []

    for doc, score in vector_docs:

        vector_results.append(
            (
                doc,
                score,
                "vector"
            )
        )

    for doc, score in bm25_docs:

        bm25_results.append(
            (
                doc,
                score,
                "bm25"
            )
        )

    return [
        vector_results,
        bm25_results
    ]