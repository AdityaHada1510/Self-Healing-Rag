from  src.generator import llm


def reflect(question, docs):

    context = "\n\n".join(
        doc.page_content
        for doc in docs[:3]
    )

    prompt = f"""
        You are evaluating the retrieved context for a Retrieval-Augmented Generation (RAG) system.

        Question:
        {question}

        Retrieved Context:
        {context}

        Determine whether the retrieved context contains enough evidence to answer the user's question.

        Important rules:

        - Answer YES if the context contains enough information to produce a correct answer, even if some minor details are missing.
        - Answer NO only when important information required to answer the question is missing.
        - Do NOT expect the context to be perfect.
        - Do NOT require every possible detail.
        - If a reasonable human could answer the question from this context, reply YES.

        Reply ONLY with:

        YES

        or

        NO
    """

    response = llm.invoke(prompt)

    result = str(response.content).strip().upper()

    print("Reflection:", result)

    return result.startswith("YES")