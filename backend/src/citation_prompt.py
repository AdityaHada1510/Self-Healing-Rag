def build_citation_prompt(
    question,
    docs,
    history=""
):
    context = []

    for doc in docs:

        page = doc.metadata.get("page", "?")

        context.append(
            f"""
[Page {page}]
{doc.page_content}
"""
        )

    context = "\n\n".join(context)

    prompt = f"""
You are an expert Retrieval-Augmented Generation assistant.

Your job is to answer ONLY using the retrieved context.

Conversation History:
{history}

Retrieved Context:

{context}

Question:
{question}

Rules:

1. Every factual statement MUST be supported by the retrieved context.

2. After every sentence include its page citation.

Example:

ChatGPT was released in November 2022. [Page 7]

Generative AI creates new content. [Page 24]

3. Never use outside knowledge.

4. Never guess.

5. If the context is insufficient, reply EXACTLY:

I couldn't find enough information in the uploaded documents.

6. Do NOT invent page numbers.

Return ONLY the answer.
"""

    return prompt