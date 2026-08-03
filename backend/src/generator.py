from langchain_ollama import ChatOllama

from  src.citation_prompt import build_citation_prompt

llm = ChatOllama(
    model="qwen3:8b",
    temperature=0
)


def generate_answer(
    question,
    docs,
    history=""
):

    prompt = build_citation_prompt(
        question,
        docs,
        history
    )

    response = llm.invoke(prompt)

    print("=" * 80)
    print("ANSWER")
    print("=" * 80)
    print(response.content)

    return response.content