from statistics import mean

from  src.graph import graph

from  src.evaluation.test_dataset import TEST_SET

from  src.evaluation.retrieval_metrics import (
    precision_at_k,
    recall_at_k,
    mrr,
    ndcg,
)

from  src.evaluation.faithfulness import (
    faithfulness_score
)


def evaluate():

    precisions = []
    recalls = []
    mrrs = []
    ndcgs = []
    faithfulness = []

    print("=" * 70)
    print("RUNNING RAG EVALUATION")
    print("=" * 70)

    for sample in TEST_SET:

        state = {

            "question":
                sample["question"],

            "conversation_history": "",

            "queries": [],

            "docs": [],

            "reranked_docs": [],

            "answer": "",

            "sources": [],

            "confidence": 0,

            "rerank_scores": [],

            "context_ok": False,

            "answer_ok": False,

            "retry_count": 0,

            "k": 3
        }

        result = graph.invoke(state)

        retrieved = result["sources"]

        relevant = sample["relevant_pages"]

        precisions.append(
            precision_at_k(
                retrieved,
                relevant,
                3
            )
        )

        recalls.append(
            recall_at_k(
                retrieved,
                relevant,
                3
            )
        )

        mrrs.append(
            mrr(
                retrieved,
                relevant
            )
        )

        ndcgs.append(
            ndcg(
                retrieved,
                relevant,
                3
            )
        )

        faithfulness.append(
            faithfulness_score(
                sample["question"],
                result["reranked_docs"],
                result["answer"]
            )
        )

        print()
        print(sample["question"])
        print("Retrieved :", retrieved)
        print("Relevant  :", relevant)

    print()
    print("=" * 70)
    print("FINAL RESULTS")
    print("=" * 70)

    print(f"Precision@3 : {mean(precisions):.3f}")
    print(f"Recall@3    : {mean(recalls):.3f}")
    print(f"MRR         : {mean(mrrs):.3f}")
    print(f"nDCG@3      : {mean(ndcgs):.3f}")
    print(f"Faithfulness: {mean(faithfulness):.3f}")