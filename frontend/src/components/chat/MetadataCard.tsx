import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { ConfidenceBar } from "./ConfidenceBar";
import { SourceChip } from "./SourceChip";

interface MetadataCardProps {
  confidence: number;
  sources: number[];
  onSelectSource: (page: number) => void;
}

const PIPELINE = [
  "Hybrid Retrieval",
  "RRF Fusion",
  "Cross Encoder Re-rank",
  "Reflection",
  "Answer Validation",
];

export function MetadataCard({ confidence, sources, onSelectSource }: MetadataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mt-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="size-4 text-primary" />
        <h4 className="text-sm font-semibold tracking-tight">Answer Metadata</h4>
      </div>

      <ConfidenceBar value={confidence} />

      <div className="mt-4">
        <p className="mb-2 text-xs text-muted-foreground">Sources</p>
        {sources.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sources.map((page) => (
              <SourceChip key={page} page={page} onSelect={onSelectSource} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/70">No sources returned.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
        {PIPELINE.map((step) => (
          <span
            key={step}
            className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            {step}
          </span>
        ))}
      </div>
    </motion.div>
  );
}