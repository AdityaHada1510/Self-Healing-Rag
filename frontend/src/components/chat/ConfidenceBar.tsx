import { motion } from "framer-motion";

function tone(value: number) {
  if (value >= 0.75) return { bar: "bg-success", text: "text-success", label: "High confidence" };
  if (value >= 0.45) return { bar: "bg-warning", text: "text-warning", label: "Medium confidence" };
  return { bar: "bg-danger", text: "text-danger", label: "Low confidence" };
}

export function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const { bar, text, label } = tone(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Confidence</span>
        <span className={`font-mono font-semibold ${text}`}>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={`h-full rounded-full ${bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className={`text-[11px] ${text}`}>{label}</p>
    </div>
  );
}