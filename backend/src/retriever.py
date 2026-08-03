def retrieve(db, query, k=5):
    """
    Vector retrieval using Chroma.
    Returns a list of (Document, distance).
    """

    results = db.similarity_search_with_score(
        query=query,
        k=k
    )

    return results