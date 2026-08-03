import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

const title = "Self-Healing RAG Assistant";
const description =
  "Chat with your documents using a self-healing RAG pipeline: hybrid retrieval, RRF fusion, cross-encoder re-ranking, reflection, and citation-aware answers.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
