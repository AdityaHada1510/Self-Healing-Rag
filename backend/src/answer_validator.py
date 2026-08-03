from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="qwen3:8b",
    temperature=0
)


def validate_answer(question, context_docs, answer):
    documents = []

    for item in context_docs:
        if isinstance(item, tuple):
            documents.append(item[0])  # Extract Document
        else:
            documents.append(item)

    context = "\n\n".join(
        [doc.page_content for doc in documents]
    )

    prompt = f"""
        You are verifying whether an answer is supported by retrieved documents.

        Context:
        ----------------
        {context}
        ----------------

        Question:
        {question}

        Answer:
        {answer}

        Determine whether the answer is supported by the retrieved context.

        Guidelines:

        - Reply YES if every important factual statement is supported.
        - Ignore wording differences.
        - Ignore formatting differences.
        - Ignore missing minor details.
        - Reply NO only if the answer contains hallucinated facts or unsupported claims.

        Reply ONLY:

        YES

        or

        NO
        """

    response = llm.invoke(prompt)

    result = str(response.content).strip().upper()

    print("Answer Validation:", result)

    return result.startswith("YES")