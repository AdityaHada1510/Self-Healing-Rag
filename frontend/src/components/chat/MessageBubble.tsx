import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Markdown } from "./Markdown";
import { MetadataCard } from "./MetadataCard";
import type { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  onRegenerate: (id: string) => void;
  onSelectSource: (page: number) => void;
  disabled?: boolean;
}

export function MessageBubble({ message, onRegenerate, onSelectSource, disabled }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success("Answer copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] rounded-3xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground sm:max-w-[75%]">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-[95%] sm:max-w-[85%]"
    >
      {message.error ? (
        <div className="flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <span>{message.content}</span>
        </div>
      ) : (
        <Markdown>{message.content}</Markdown>
      )}

      {!message.error && typeof message.confidence === "number" && (
        <MetadataCard
          confidence={message.confidence}
          sources={message.sources ?? []}
          onSelectSource={onSelectSource}
        />
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {!message.error && (
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy Answer"}
          </motion.button>
        )}
        {message.question && (
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            disabled={disabled}
            onClick={() => onRegenerate(message.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
          >
            <RotateCcw className="size-3.5" />
            Regenerate
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}