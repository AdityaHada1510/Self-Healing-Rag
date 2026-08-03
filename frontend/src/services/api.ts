import type { ChatApiResponse, DocumentItem } from "@/types/chat";

export const API_BASE_URL = "http://127.0.0.1:8000";
const REQUEST_TIMEOUT_MS = 120_000;

export class ApiError extends Error {
  offline: boolean;
  constructor(message: string, offline = false) {
    super(message);
    this.name = "ApiError";
    this.offline = offline;
  }
}

async function request<T>(path: string, init?: RequestInit, timeoutMs = REQUEST_TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new ApiError(text?.slice(0, 300) || `Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The backend took too long to respond. Please try again.");
    }
    throw new ApiError("Unable to connect to the FastAPI server.", true);
  } finally {
    clearTimeout(timer);
  }
}

function normalize(raw: Partial<ChatApiResponse> | null | undefined): ChatApiResponse {
  const confidence = Number(raw?.confidence ?? 0);
  return {
    answer: typeof raw?.answer === "string" ? raw.answer : "No answer returned by the backend.",
    sources: Array.isArray(raw?.sources)
      ? raw.sources.map((s) => Number(s)).filter((s) => Number.isFinite(s))
      : [],
    confidence: Number.isFinite(confidence)
      ? Math.max(0, Math.min(1, confidence > 1 ? confidence / 100 : confidence))
      : 0,
  };
}

export async function askQuestion(question: string): Promise<ChatApiResponse> {
  const data = await request<Partial<ChatApiResponse>>("/chat", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
  return normalize(data);
}

/** Lightweight reachability probe. Any HTTP answer means the server is up. */
export async function checkHealth(): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch(`${API_BASE_URL}/docs`, { signal: controller.signal, mode: "no-cors" });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function getDocuments(): Promise<DocumentItem[]> {
  const data = await request<{ documents: any[] }>("/documents", {
    method: "GET",
  });

  if (!Array.isArray(data.documents)) return [];

  return data.documents.map((doc) => ({
    filename: doc.name,
  }));
}

export async function uploadDocument(file: File): Promise<void> {
  const body = new FormData();
  body.append("file", file);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body,
      signal: controller.signal,
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new ApiError(text?.slice(0, 300) || `Upload failed with status ${response.status}`);
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The upload took too long. Please try again.");
    }
    throw new ApiError("Unable to connect to the FastAPI server.", true);
  } finally {
    clearTimeout(timer);
  }
}

export async function deleteDocument(filename: string): Promise<void> {
  await request<{ message?: string }>(`/documents/${encodeURIComponent(filename)}`, {
    method: "DELETE",
  }, 30_000);
}