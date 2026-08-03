import fitz
from langchain_core.documents import Document


def load_pdf(pdf_path):

    pdf = fitz.open(pdf_path)

    documents = []

    for page_number, page in enumerate(pdf):

        text = page.get_text()

        documents.append(
            Document(
                page_content=text,
                metadata={
                    "source": pdf_path,
                    "page": page_number + 1
                }
            )
        )

    return documents