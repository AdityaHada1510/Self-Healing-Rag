from  src.graph import graph

print("Self-Healing RAG Ready! - (LangGraph/ChromaDB/Ollama)")

while True:

    question = input("\nAsk a question (exit to quit): ").strip()

    if question.lower() == "exit":
        break

    state = {

        "question": question,

        "conversation_history": "",

        "queries": [],

        "docs": [],
        "reranked_docs": [],

        "answer": "",

        "rerank_scores": [],

        "sources": [],

        "confidence": 0.0,

        "context_ok": False,
        "answer_ok": False,

        "retry_count": 0,

        "k": 3,
    }

    result = graph.invoke(state)

    print("\nAnswer:\n")
    print(result["answer"])
    print("\nSources:")
    for source in result["sources"]:
        print(
            f"- {source['document']} (Page {source['page']})"
        )

    print(f"\nConfidence: {result['confidence']:.2%}")

    print("\nConversation Memory:")
    print(result["conversation_history"])