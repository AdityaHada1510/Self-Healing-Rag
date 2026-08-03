import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function TypingIndicator({ stage }: { stage: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-[85%] space-y-3"
    >
      <div className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card/60 px-3.5 py-2.5">
        <Loader2 className="size-4 animate-spin text-primary" />
        <span className="shimmer-text text-sm font-medium">{stage}</span>
      </div>

      <div className="flex gap-1.5 pl-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-primary animate-pulse-dot"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>

      <div className="space-y-2 pt-1">
        <div className="h-3 w-[70%] animate-pulse rounded-full bg-secondary" />
        <div className="h-3 w-[85%] animate-pulse rounded-full bg-secondary" />
        <div className="h-3 w-[45%] animate-pulse rounded-full bg-secondary" />
      </div>
    </motion.div>
  );
}