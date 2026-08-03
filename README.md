# 🚀 Self-Healing RAG System

A Self-Healing Retrieval-Augmented Generation (RAG) system built using **LangGraph**, **FastAPI**, **React**, **Ollama**, **ChromaDB**, and **Hybrid Retrieval**.

The system intelligently retrieves relevant information from uploaded PDF documents, validates retrieved context, reflects on retrieval quality, reranks results using a Cross-Encoder, and generates grounded responses with confidence scores and citations.

---

## ✨ Features

- 📄 Upload multiple PDF documents
- 🔍 Hybrid Retrieval
  - Dense Vector Search (ChromaDB)
  - BM25 Sparse Retrieval
- 🔄 Multi-Query Retrieval
- 🧠 Reciprocal Rank Fusion (RRF)
- 🎯 Cross-Encoder Re-ranking
- 🤔 Reflection Node for Context Validation
- ✅ Answer Validation
- 📈 Confidence Scoring
- 📚 Source Citations
- 💬 Conversation Memory
- 🗂 Document Management
  - Upload PDFs
  - List Uploaded Documents
  - Delete Documents
- ⚡ FastAPI Backend
- 🎨 Modern React Frontend

---

# 🏗 Architecture

```
User Question
      │
      ▼
Memory
      │
      ▼
Multi Query Generation
      │
      ▼
Hybrid Retrieval
(Vector Search + BM25)
      │
      ▼
Reciprocal Rank Fusion
      │
      ▼
Cross Encoder Re-ranking
      │
      ▼
Reflection
      │
      ├─────────────┐
      │             │
      ▼             │
Generate Answer     │
      │             │
      ▼             │
Answer Validation   │
      │             │
      └────Retry────┘
      │
      ▼
Confidence Score
      │
      ▼
Final Response
```

---

# 🛠 Tech Stack

## Backend

- Python
- FastAPI
- LangGraph
- LangChain
- ChromaDB
- Ollama
- Sentence Transformers
- BM25
- Cross Encoder

## Frontend

- React
- TypeScript
- Tailwind CSS
- Framer Motion

---

# 📂 Project Structure

```
backend/
│
├── app.py
├── requirements.txt
├── src/
│   ├── graph.py
│   ├── graph_nodes.py
│   ├── retriever.py
│   ├── hybrid_retriever.py
│   ├── cross_encoder.py
│   ├── reflection.py
│   ├── answer_validator.py
│   ├── confidence.py
│   └── ...
│
├── uploads/
└── vectorstore/

frontend/
│
├── src/
├── public/
└── package.json
```

---

# 🚀 Installation

## Clone

```bash
git clone https://github.com/AdityaHada1510/Self-Healing-Rag.git

cd Self-Healing-Rag
```

## Backend

```bash
cd backend

python -m venv venv

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:8080
```

---

# 📖 Usage

1. Upload one or more PDF documents.
2. Ask natural language questions.
3. The system performs:
   - Multi-query generation
   - Hybrid retrieval
   - Reciprocal Rank Fusion
   - Cross-Encoder reranking
   - Reflection
   - Answer validation
4. Receive:
   - Answer
   - Source citations
   - Confidence score

---

# 🌟 Future Improvements

- Streaming responses
- Persistent conversation memory
- Authentication
- PDF highlighting
- Docker deployment
- Kubernetes deployment
- User workspaces
- Cloud vector database support

---

# 📸 Screenshots

_Add screenshots of your UI here._

---

# 📜 License

MIT License
