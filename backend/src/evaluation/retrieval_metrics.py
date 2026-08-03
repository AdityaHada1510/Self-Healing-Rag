import math


def precision_at_k(retrieved_pages, relevant_pages, k):

    retrieved = retrieved_pages[:k]

    if len(retrieved) == 0:
        return 0

    hits = sum(
        page in relevant_pages
        for page in retrieved
    )

    return hits / len(retrieved)


def recall_at_k(retrieved_pages, relevant_pages, k):

    if len(relevant_pages) == 0:
        return 0

    retrieved = retrieved_pages[:k]

    hits = sum(
        page in relevant_pages
        for page in retrieved
    )

    return hits / len(relevant_pages)


def mrr(retrieved_pages, relevant_pages):

    for rank, page in enumerate(retrieved_pages, start=1):

        if page in relevant_pages:
            return 1 / rank

    return 0


def ndcg(retrieved_pages, relevant_pages, k):

    dcg = 0

    for i, page in enumerate(retrieved_pages[:k]):

        if page in relevant_pages:
            dcg += 1 / math.log2(i + 2)

    ideal_hits = min(len(relevant_pages), k)

    idcg = sum(
        1 / math.log2(i + 2)
        for i in range(ideal_hits)
    )

    if idcg == 0:
        return 0

    return dcg / idcg