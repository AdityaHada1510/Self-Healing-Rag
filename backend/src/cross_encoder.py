from sentence_transformers import CrossEncoder

print("Loading CrossEncoder...")

model = CrossEncoder(
    "BAAI/bge-reranker-v2-m3"
)


def rerank(question, docs, top_k=3):
    """
    Rerank retrieved documents using Cross Encoder.

    Args:
        question: User question
        docs: List[(Document, score)] OR List[Document]
        top_k: Number of documents to keep

    Returns:
        (
            selected_docs,
            selected_scores
        )
    """

    if not docs:
        return [], []

    pairs = []
    documents = []

    for item in docs:

        # docs can be [(Document, score)] or [Document]
        if isinstance(item, tuple):
            doc = item[0]
        else:
            doc = item

        documents.append(doc)

        pairs.append(
            (
                question,
                doc.page_content
            )
        )

    # Predict relevance scores
    scores = model.predict(pairs)

    # Sort descending by relevance
    ranked = sorted(
        zip(documents, scores),
        key=lambda x: x[1],
        reverse=True
    )

    selected_docs = []
    selected_scores = []

    for doc, score in ranked[:top_k]:
        selected_docs.append(doc)
        selected_scores.append(float(score))

    print("=" * 60)
    print(">> CROSS ENCODER RERANKER")

    for i, score in enumerate(selected_scores):
        print(f"{i + 1}. Score = {score:.4f}")

    print(f"Documents passed: {len(selected_docs)}")

    return selected_docs, selected_scores