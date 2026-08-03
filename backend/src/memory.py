history = []

def load_memory():

    if len(history) == 0:
        return ""

    conversation = ""

    for item in history[-3:]:

        conversation += f"""
            User: {item["question"]}
            Assistant: {item["answer"]}

        """

    return conversation


def save_memory(question, answer):

    history.append(
        {
            "question": question,
            "answer": answer
        }
    )