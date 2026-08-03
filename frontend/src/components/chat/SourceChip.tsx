import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface SourceChipProps {
  page: number;
  onSelect: (page: number) => void;
}

export function SourceChip({ page, onSelect }: SourceChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onSelect(page)}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-accent"
    >
      <FileText className="size-3.5 text-primary" />
      Page {page}
    </motion.button>
  );
}