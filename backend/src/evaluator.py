from  src.generator import llm


def evaluate_context(question, docs):

    context = "\n\n".join(
        [
            doc.page_content
            for doc, score in docs
        ]
    )

    prompt = f"""
You are evaluating document retrieval.

Question:
{question}

Retrieved Context:
{context}

Can the question be answered accurately using ONLY this context?

Reply with ONLY one word:

YES
or
NO
"""

    response = llm.invoke(prompt)

    answer = response.content.strip().upper()

    return answer == "YES"