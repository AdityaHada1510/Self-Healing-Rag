def is_good_retrieval(results, threshold=0.6):

    if not results:
        return False

    scores = [score for _, score in results]

    best_score = min(scores)

    print(f"\nBest Retrieval Distance: {best_score:.3f}")

    return best_score < threshold