import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ApiError, askQuestion, checkHealth } from "@/services/api";
import type { BackendStatus, ChatMessage } from "@/types/chat";

const LOADING_STAGES = [
  "Retrieving documents...",
  "Running Hybrid Search...",
  "Fusing results (RRF)...",
  "Ranking Results...",
  "Reflecting on retrieval...",
  "Generating Answer...",
];

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<string>(LOADING_STAGES[0]!);
  const [status, setStatus] = useState<BackendStatus>("checking");
  const stageTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const probe = useCallback(async () => {
    setStatus("checking");
    const ok = await checkHealth();
    setStatus(ok ? "online" : "offline");
    return ok;
  }, []);

  useEffect(() => {
    void probe();
  }, [probe]);

  const startStages = useCallback(() => {
    let index = 0;
    setStage(LOADING_STAGES[0]!);
    stageTimer.current = setInterval(() => {
      index = Math.min(index + 1, LOADING_STAGES.length - 1);
      setStage(LOADING_STAGES[index]!);
    }, 2200);
  }, []);

  const stopStages = useCallback(() => {
    if (stageTimer.current) clearInterval(stageTimer.current);
    stageTimer.current = null;
  }, []);

  useEffect(() => stopStages, [stopStages]);

  const run = useCallback(
    async (question: string) => {
      setIsLoading(true);
      startStages();
      try {
        const data = await askQuestion(question);
        setStatus("online");
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: data.answer,
            question,
            sources: data.sources,
            confidence: data.confidence,
            createdAt: Date.now(),
          },
        ]);
      } catch (error) {
        const apiError = error instanceof ApiError ? error : new ApiError("Something went wrong.");
        if (apiError.offline) setStatus("offline");
        toast.error(apiError.offline ? "Backend Offline" : "Request failed", {
          description: apiError.message,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: apiError.message,
            question,
            error: true,
            createdAt: Date.now(),
          },
        ]);
      } finally {
        stopStages();
        setIsLoading(false);
      }
    },
    [startStages, stopStages],
  );

  const sendMessage = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isLoading) return;
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "user", content: trimmed, createdAt: Date.now() },
      ]);
      await run(trimmed);
    },
    [isLoading, run],
  );

  const regenerate = useCallback(
    async (messageId: string) => {
      if (isLoading) return;
      const target = messages.find((m) => m.id === messageId);
      if (!target?.question) return;
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
      await run(target.question);
    },
    [isLoading, messages, run],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isLoading, stage, status, sendMessage, regenerate, clearChat, retry: probe };
}