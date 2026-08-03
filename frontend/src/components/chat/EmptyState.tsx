import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

const SUGGESTIONS = [
  "What is Generative AI?",
  "Summarize the key findings with citations",
  "Compare the retrieval strategies described",
];

export function EmptyState({ onPick }: { onPick: (value: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
    >
      <div className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-primary/12 ring-1 ring-primary/25">
        <BrainCircuit className="size-9 text-primary" />
      </div>
      <h2 className="max-w-md text-xl font-semibold tracking-tight sm:text-2xl">
        Ask questions about your documents.
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Powered by LangGraph, Hybrid Retrieval, Cross Encoder Re-ranking, Reflection, and
        Citation-aware Generation.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((item) => (
          <motion.button
            key={item}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPick(item)}
            className="rounded-full border border-border bg-card px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {item}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}