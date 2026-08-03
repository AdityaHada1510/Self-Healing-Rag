MAX_K = 12


def increase_retrieval_depth(state):

    print("=" * 60)
    print(">> ADAPTIVE RETRIEVAL")

    current = state["k"]

    if current < 5:
        state["k"] = 5

    elif current < 8:
        state["k"] = 8

    elif current < 12:
        state["k"] = 12

    state["retry_count"] += 1

    print(f"k increased: {current} -> {state['k']}")
    print(f"Retry Count: {state['retry_count']}")

    return state