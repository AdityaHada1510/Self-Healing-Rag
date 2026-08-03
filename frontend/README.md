# Insight Weaver

# Build a Modern Frontend for my Self-Healing RAG System

I have already built the complete backend. I only need the frontend.

## Tech Stack

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Lucide Icons

Backend:

* FastAPI
* LangGraph
* ChromaDB
* Ollama (Qwen3:8B)
* Python

Backend runs locally at:

http://127.0.0.1:8000

The main endpoint is:

POST /chat

Request:

```json
{
  "question": "What is Generative AI?"
}
```

Response:

```json
{
  "answer": "Generative AI is ... [Page 24]",
  "sources": [24,36],
  "confidence": 0.96
}
```

Do NOT build any backend.

Everything should communicate with this API.

---

# About the backend

The backend is a production-style Self-Healing Retrieval-Augmented Generation (RAG) system.

Internally it performs:

• Conversation Memory
• Multi Query Generation
• Hybrid Retrieval
- ChromaDB Semantic Search
- BM25 Keyword Search
• Reciprocal Rank Fusion (RRF)
• Cross Encoder Re-ranking
• Reflection-based Retrieval
• Adaptive Retrieval Depth
• Citation-aware Prompting
• Hallucination Reduction
• Answer Validation
• Confidence Score Calculation
• Source Citation Extraction
• Evaluation Framework
- Precision@k
- Recall@k
- MRR
- nDCG
- Faithfulness

The frontend should expose these capabilities visually.

---

# Design Style

Modern AI application.

Think:

* ChatGPT
* Claude
* Perplexity
* Cursor

Minimal.

Clean.

Rounded corners.

Dark Mode by default.

Responsive.

Professional portfolio quality.

---

# Layout

Left Sidebar

Contains:

• Project Logo

"Self-Healing RAG"

Navigation:

* New Chat
* Chat History (placeholder)
* Settings (placeholder)

Bottom:

System Status

Green indicator

"Backend Connected"

---

Main Chat Area

Header

Title:

Self-Healing RAG Assistant

Subtitle:

Hybrid Retrieval + Reflection + Citation-aware Generation

---

Conversation Area

Messages should appear as chat bubbles.

User messages:

Right aligned

Assistant messages:

Left aligned

Assistant messages support Markdown.

Code blocks.

Bullet lists.

Tables.

Bold.

Inline citations.

Example:

ChatGPT was released in November 2022.

📄 Page 7

---

Input Area

Large rounded input.

Placeholder:

Ask anything about the uploaded documents...

Send button.

Press Enter to send.

Shift+Enter for newline.

Disable send while waiting.

---

Loading State

While backend is processing:

Show animated assistant typing indicator.

Examples:

"Retrieving documents..."

"Running Hybrid Search..."

"Ranking Results..."

"Generating Answer..."

Use a subtle animated loader.

---

Response Cards

Each assistant response should include a card underneath.

Card title:

Answer Metadata

Display:

Confidence Score

As a progress bar.

Example:

Confidence

█████████░

94%

Color:

Green

High confidence

Yellow

Medium

Red

Low

---

Sources

Show every source as clickable chips.

Example:

📄 Page 24

📄 Page 36

Clicking a chip should scroll to a placeholder document viewer section.

(No PDF viewer required yet.)

---

Copy Button

Each assistant message has:

Copy Answer

---

Regenerate Button

Below every answer:

↻ Regenerate

(Currently just resend the same question.)

---

Clear Chat

Button at top.

Clears all messages.

---

Error Handling

If API unavailable:

Show centered message.

Backend Offline

Unable to connect to FastAPI server.

Retry button.

---

Empty State

Before first message:

Large AI icon.

Title:

Ask questions about your documents.

Subtitle:

Powered by LangGraph, Hybrid Retrieval, Cross Encoder Re-ranking, Reflection, and Citation-aware Generation.

---

Animations

Use Framer Motion.

Smooth fade in.

Slide up.

Button hover effects.

Loading shimmer.

Professional transitions.

---

API Integration

Create a reusable API service.

Base URL:

http://127.0.0.1:8000

POST /chat

Body:

```json
{
  "question":"..."
}
```

Handle:

Loading

Errors

Timeouts

Response parsing

---

Code Structure

Organize code professionally.

Example:

src/

components/

ChatWindow

ChatInput

MessageBubble

MetadataCard

ConfidenceBar

SourceChip

Sidebar

Header

services/

api.ts

hooks/

useChat.ts

types/

chat.ts

pages/

Home.tsx

App.tsx

---

Nice Extras

Typing animation.

Auto-scroll.

Responsive mobile layout.

Toast notifications.

Copy confirmation.

Keyboard shortcuts.

Skeleton loading.

---

Goal

The final result should look like a polished AI SaaS application suitable for a portfolio project and demonstrate a production-quality frontend connected to my existing FastAPI backend.

Focus on clean architecture, reusable React components, excellent UX, and modern UI design.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fde0d682-34cc-454c-b33b-e7463f22503a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
