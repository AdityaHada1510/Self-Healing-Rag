from  src.generator import llm


def generate_queries(question):

    prompt = f"""
You are an expert search query reformulation assistant.

Given the user's question, generate THREE different search queries that
could retrieve relevant information.

Rules:
- Keep each query concise.
- Preserve the original meaning.
- Use different wording.
- Return ONLY the queries.
- One query per line.

Question:

{question}
"""

    response = llm.invoke(prompt)

    queries = []

    for line in response.content.split("\n"):

        line = line.strip()

        if line:
            queries.append(line)

    # Remove duplicates
    queries = list(dict.fromkeys(queries))

    # Ensure original query is always included
    if question not in queries:
        queries.insert(0, question)

    print("=" * 60)
    print(">> MULTI QUERY GENERATION")
    print()

    for i, q in enumerate(queries):
        print(f"{i+1}. {q}")

    return queries