from typing import List

from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    document: str
    page: int


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]
    confidence: float


class UploadResponse(BaseModel):
    filename: str
    message: str

class DocumentInfo(BaseModel):
    name: str
    chunks: int
    size: float


class DocumentsResponse(BaseModel):
    documents: List[DocumentInfo]


class DeleteResponse(BaseModel):
    message: str