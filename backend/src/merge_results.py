from collections import defaultdict


def merge_results(results, top_k=10, rrf_k=60):
    """
    Merge multiple ranked retrieval lists using
    Reciprocal Rank Fusion (RRF).

    Args:
        results:
            List of retrieval lists.
            Each retrieval list contains:
                (Document, score, source)

        top_k:
            Number of documents to return.

        rrf_k:
            RRF constant (typically 60).

    Returns:
        List[(Document, fused_score)]
    """

    fused_scores = defaultdict(float)
    documents = {}

    for retrieval in results:

        # Sort each retrieval independently
        if not retrieval:
            continue

        source = retrieval[0][2]

        if source == "vector":
            retrieval = sorted(
                retrieval,
                key=lambda x: x[1]      # smaller distance is better
            )

        else:
            retrieval = sorted(
                retrieval,
                key=lambda x: x[1],
                reverse=True            # larger BM25 score is better
            )

        # Apply RRF
        for rank, (doc, score, _) in enumerate(retrieval):

            key = (
                doc.metadata.get("source", ""),
                doc.metadata.get("page"),
                doc.page_content
            )

            if key not in documents:
                documents[key] = doc

            fused_scores[key] += 1.0 / (rrf_k + rank + 1)

    # Final ranking
    ranked = sorted(
        fused_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    merged = []

    for key, score in ranked[:top_k]:
        merged.append(
            (
                documents[key],
                score
            )
        )

    print()
    print("=" * 60)
    print("RRF MERGE")
    print("=" * 60)
    print(f"Unique Documents : {len(ranked)}")
    print(f"Returning Top {len(merged)}")

    return merged