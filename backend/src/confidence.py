def calculate_confidence(
    rerank_scores,
    answer_valid,
    context_valid
):
    """
    Computes an overall confidence score between 0 and 1.
    """

    if not rerank_scores:
        return 0.0

    retrieval_score = sum(rerank_scores) / len(rerank_scores)

    # Normalize CrossEncoder score
    retrieval_score = max(
        0.0,
        min(1.0, retrieval_score)
    )

    confidence = retrieval_score

    if answer_valid:
        confidence += 0.10

    if context_valid:
        confidence += 0.10

    confidence = min(confidence, 1.0)

    print("=" * 60)
    print("CONFIDENCE")
    print("=" * 60)
    print(f"Retrieval : {retrieval_score:.3f}")
    print(f"Answer OK : {answer_valid}")
    print(f"Context OK: {context_valid}")
    print(f"Final     : {confidence:.3f}")

    return confidence