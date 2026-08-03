import { Menu, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  onClear: () => void;
  onOpenSidebar: () => void;
  canClear: boolean;
}

export function Header({ onClear, onOpenSidebar, canClear }: HeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3.5 backdrop-blur-md sm:px-6">
      <button onClick={onOpenSidebar} aria-label="Open sidebar" className="lg:hidden">
        <Menu className="size-5 text-muted-foreground" />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold tracking-tight sm:text-base">
          Self-Healing RAG Assistant
        </h1>
        <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
          Hybrid Retrieval + Reflection + Citation-aware Generation
        </p>
      </div>
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClear}
        disabled={!canClear}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
      >
        <Trash2 className="size-3.5" />
        <span className="hidden sm:inline">Clear Chat</span>
      </motion.button>
    </header>
  );
}