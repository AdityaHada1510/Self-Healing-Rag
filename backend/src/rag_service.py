from  src.graph import graph


def ask_question(question: str):

    state = {

        "question": question,

        "conversation_history": "",

        "queries": [],

        "docs": [],

        "reranked_docs": [],

        "rerank_scores": [],

        "answer": "",

        "sources": [],

        "confidence": 0.0,

        "context_ok": False,

        "answer_ok": False,

        "retry_count": 0,

        "k": 3,
    }

    result = graph.invoke(state)

    return {

        "answer": result["answer"],

        "sources": result["sources"],

        "confidence": round(result["confidence"], 3)

    }