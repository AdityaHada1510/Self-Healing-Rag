import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (value: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-3xl border border-border bg-card p-2 pl-4 transition-colors focus-within:border-primary/50">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            placeholder="Ask anything about the uploaded documents..."
            className="max-h-[200px] flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <motion.button
            type="button"
            whileHover={{ scale: disabled ? 1 : 1.06 }}
            whileTap={{ scale: disabled ? 1 : 0.94 }}
            onClick={submit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Enter to send · Shift + Enter for a new line · ⌘K to focus
        </p>
      </div>
    </div>
  );
}