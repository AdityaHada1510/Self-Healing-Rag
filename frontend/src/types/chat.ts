export type ChatRole = "user" | "assistant";

export interface ChatApiResponse {
  answer: string;
  sources: number[];
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  /** Original question that produced this assistant answer (for regenerate) */
  question?: string;
  sources?: number[];
  confidence?: number;
  error?: boolean;
  createdAt: number;
}

export type BackendStatus = "checking" | "online" | "offline";

export interface DocumentItem {
  filename: string;
}