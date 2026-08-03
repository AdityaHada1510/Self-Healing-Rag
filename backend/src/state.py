from typing import TypedDict
from langchain_core.documents import Document


class GraphState(TypedDict):
    # User input
    question: str

    # Conversation memory
    conversation_history: str

    # Generated once by Multi Query node
    queries: list[str]

    # Retrieval
    docs: list[tuple[Document, float]]
    reranked_docs: list[Document]
    rerank_scores: list[float]

    # Generation
    answer: str

    sources: list[dict]
    confidence: float

    # Validation
    context_ok: bool
    answer_ok: bool

    # Retry control
    retry_count: int
    k: int