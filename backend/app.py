from fastapi import FastAPI , File , UploadFile
from fastapi.middleware.cors import CORSMiddleware

from src.schemas import ChatRequest, ChatResponse , UploadResponse
from src.rag_service import ask_question
from src.upload_service import save_pdf

from src.document_service import (
    list_documents,
    delete_document
)

from src.schemas import (
    DocumentsResponse,
    DeleteResponse
)


app = FastAPI(
    title="Self-Healing RAG API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Self-Healing RAG API Running"}

# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    result = ask_question(request.question)

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
        confidence=result["confidence"]
    )

# Upload a PDF file
@app.post("/upload", response_model=UploadResponse)
def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):

        return UploadResponse(
            filename=file.filename,
            message="Only PDF files are allowed."
        )

    save_pdf(file)

    return UploadResponse(
        filename=file.filename,
        message="PDF uploaded successfully."
    )

# Get the list of uploaded documents
@app.get(
    "/documents",
    response_model=DocumentsResponse
)
def get_documents():

    docs = list_documents()

    return {

        "documents": docs

    }


# Delete a document
@app.delete(
    "/documents/{filename}",
    response_model=DeleteResponse
)
def remove_document(filename: str):

    deleted = delete_document(filename)

    if not deleted:

        return {

            "message": "Document not found"

        }

    return {

        "message": f"{filename} deleted successfully"

    }