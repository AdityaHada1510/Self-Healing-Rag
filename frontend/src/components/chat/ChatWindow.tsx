import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlugZap, RefreshCw } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "./EmptyState";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { DocumentViewer } from "./DocumentViewer";
import type { BackendStatus, ChatMessage } from "@/types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  stage: string;
  status: BackendStatus;
  activePage: number | null;
  onSend: (value: string) => void;
  onRegenerate: (id: string) => void;
  onSelectSource: (page: number) => void;
  onRetry: () => void;
}

export function ChatWindow({
  messages,
  isLoading,
  stage,
  status,
  activePage,
  onSend,
  onRegenerate,
  onSelectSource,
  onRetry,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const offlineAndEmpty = status === "offline" && messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {offlineAndEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
          >
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-destructive/12 ring-1 ring-destructive/30">
              <PlugZap className="size-7 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Backend Offline</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Unable to connect to FastAPI server at 127.0.0.1:8000.
            </p>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              <RefreshCw className="size-4" />
              Retry
            </motion.button>
          </motion.div>
        ) : messages.length === 0 && !isLoading ? (
          <EmptyState onPick={onSend} />
        ) : (
          <div className="mx-auto w-full max-w-3xl space-y-7 px-4 py-6 sm:px-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onRegenerate={onRegenerate}
                onSelectSource={onSelectSource}
                disabled={isLoading}
              />
            ))}
            <AnimatePresence>{isLoading && <TypingIndicator stage={stage} />}</AnimatePresence>
            <div ref={bottomRef} />
          </div>
        )}

        {!offlineAndEmpty && <DocumentViewer page={activePage} />}
      </div>

      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}