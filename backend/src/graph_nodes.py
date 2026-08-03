from  src.vectordb import load_vector_store
from  src.multi_query import generate_queries
from  src.merge_results import merge_results


from  src.hybrid_retriever import hybrid_retrieve

from  src.generator import generate_answer

from  src.cross_encoder import rerank

from  src.reflection import reflect

from  src.answer_validator import validate_answer

from  src.memory import load_memory, save_memory

from  src.citations import extract_sources

from  src.confidence import calculate_confidence

db = load_vector_store()


def memory_node(state):

    print("=" * 60)
    print(">> MEMORY NODE")

    state["conversation_history"] = load_memory()

    return state

def save_memory_node(state):

    print("=" * 60)
    print(">> SAVE MEMORY NODE")

    if state["answer_ok"]:

        save_memory(

            state["question"],

            state["answer"]

        )

        print("Conversation saved.")

    else:

        print("Skipping save.")

    state["conversation_history"] = load_memory()

    print()
    print("=" * 60)
    print("FINAL METADATA")
    print("=" * 60)
    print("Sources    :", state["sources"])
    print("Confidence :", round(state["confidence"], 3))

    return state


def multi_query_node(state):

    print("=" * 60)
    print(">> MULTI QUERY NODE")

    if not state["queries"]:

        state["queries"] = generate_queries(
            state["question"]
        )

    return state

def retrieve_node(state):

    print("=" * 60)
    print(">> RETRIEVE NODE")

    retrievals = []

    for query in state["queries"]:

        # Returns:
        # [
        #   vector_results,
        #   bm25_results
        # ]
        hybrid_results = hybrid_retrieve(
            query,
            state["k"]
        )

        # Add both ranked lists separately
        retrievals.extend(hybrid_results)

    state["docs"] = merge_results(
        retrievals,
        top_k=state["k"]
    )

    print("\nRetrieved Documents:\n")

    for doc, score in state["docs"]:
        print(
            f"Score={score:.4f}",
            doc.metadata.get("document"),
            "Page",
            doc.metadata.get("page")
        )

    print(f"Documents after RRF: {len(state['docs'])}")

    return state


def generate_node(state):

    print("=" * 60)
    print(">> GENERATE NODE")

    unique_docs = []
    seen = set()

    for doc in state["reranked_docs"]:

        key = (
            doc.metadata.get("page"),
            doc.page_content
        )

        if key not in seen:
            seen.add(key)
            unique_docs.append(doc)

    state["reranked_docs"] = unique_docs

    state["sources"] = sorted(
        list(
            {
                doc.metadata.get("page")
                for doc in unique_docs
            }
        )
    )
    
    state["answer"] = generate_answer(

        state["question"],

        unique_docs,

        state["conversation_history"]   

    )

    state["sources"] = extract_sources(unique_docs)

    return state

def validate_answer_node(state):

    print("=" * 60)
    print(">> VALIDATE ANSWER NODE")

    state["answer_ok"] = validate_answer(
        state["question"],
        state["reranked_docs"],
        state["answer"]
    )

    state["confidence"] = calculate_confidence(
        state["rerank_scores"],
        state["answer_ok"],
        state["context_ok"]
    )

    return state


def rerank_node(state):

    print("=" * 60)
    print(">> RERANK NODE")

    docs, scores = rerank(
        state["question"],
        state["docs"],
        top_k=3
    )

    state["reranked_docs"] = docs
    state["rerank_scores"] = scores

    print("\nAfter Reranking\n")

    for doc, score in zip(
        state["reranked_docs"],
        state["rerank_scores"]
    ):

        print(
            f"{score:.4f}",
            doc.metadata.get("document"),
            "Page",
            doc.metadata.get("page")
        )

    return state


def reflection_node(state):

    print("=" * 60)
    print(">> REFLECTION NODE")

    state["context_ok"] = reflect(

        state["question"],

        state["reranked_docs"]

    )

    return state

def answer_router(state):

    print("Answer Valid:", state["answer_ok"])

    if state["answer_ok"]:
        return "end"

    if state["k"] >= 12:
        return "end"

    return "adaptive"

    
def reflection_router(state):
    
    print("="*60)
    print("\n----- Reflection Decision -----")
    print("Enough Context:", state["context_ok"])

    if state["context_ok"]:
        print("Decision: GENERATE")
        return "generate"

    if state["k"] >= 12:
        print("Decision: GENERATE (max retrieval)")
        return "generate"

    print("Decision: ADAPTIVE RETRIEVAL")
    return "adaptive"