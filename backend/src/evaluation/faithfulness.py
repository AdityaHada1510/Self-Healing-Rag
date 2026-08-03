from  src.generator import llm


def faithfulness_score(question, context_docs, answer):

    context = "\n\n".join(
        doc.page_content
        for doc in context_docs
    )

    prompt = f"""
You are evaluating whether an answer is fully supported by the provided context.

Context
--------
{context}

Question
--------
{question}

Answer
--------
{answer}

Return ONLY one number between 0 and 1.

Examples

1.0 = every statement is supported

0.8 = mostly supported

0.5 = partially supported

0 = hallucinated

Output only the number.
"""

    response = llm.invoke(prompt)

    try:
        return float(response.content.strip())
    except Exception:
        return 0