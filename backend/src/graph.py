from langgraph.graph import StateGraph, END

from  src.state import GraphState

from  src.adaptive import increase_retrieval_depth

from  src.graph_nodes import (

    memory_node,
    multi_query_node,

    retrieve_node,

    rerank_node,

    reflection_node,

    generate_node,

    validate_answer_node,

    save_memory_node,

    reflection_router,

    answer_router


)

workflow = StateGraph(GraphState)

workflow.add_node("memory", memory_node)

workflow.add_node("multi_query", multi_query_node)

workflow.add_node("retrieve", retrieve_node)

workflow.add_node("rerank", rerank_node)

workflow.add_node("reflection", reflection_node)

workflow.add_node("generate", generate_node)

workflow.add_node("validate_answer", validate_answer_node)

workflow.add_node("save_memory", save_memory_node)

workflow.set_entry_point("memory")

workflow.add_edge("memory", "multi_query")

workflow.add_edge("multi_query", "retrieve")

workflow.add_edge("retrieve", "rerank")

workflow.add_edge("rerank", "reflection")

workflow.add_node("adaptive",increase_retrieval_depth)

workflow.add_conditional_edges(
    "reflection",
    reflection_router,
    {
        "generate": "generate",
        "adaptive": "adaptive",
    }
)

workflow.add_edge(
    "adaptive",
    "retrieve"
)

workflow.add_edge(
    "generate",
    "validate_answer"
)

workflow.add_conditional_edges(
    "validate_answer",
    answer_router,
    {
        "adaptive": "adaptive",
        "end": "save_memory",
    }
)

workflow.add_edge(
    "save_memory",
    END
)

graph = workflow.compile()