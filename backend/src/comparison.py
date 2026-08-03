def compare_retrievals(state):

    print("\n===== Comparing Retrievals =====")

    original_docs = state["original_docs"]
    rewritten_docs = state["rewritten_docs"]

    original_scores = sorted(score for _, score in original_docs)
    rewritten_scores = sorted(score for _, score in rewritten_docs)

    original_avg = sum(original_scores[:3]) / min(3, len(original_scores))
    rewritten_avg = sum(rewritten_scores[:3]) / min(3, len(rewritten_scores))

    print(f"Original Avg Distance : {original_avg:.3f}")
    print(f"Rewritten Avg Distance: {rewritten_avg:.3f}")

    if original_avg <= rewritten_avg:
        print("Keeping ORIGINAL retrieval.")
        state["docs"] = original_docs
    else:
        print("Keeping REWRITTEN retrieval.")
        state["docs"] = rewritten_docs

    print(f"Documents selected : {len(state['docs'])}")

    return state