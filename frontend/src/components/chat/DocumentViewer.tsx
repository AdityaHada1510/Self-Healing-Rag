import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export function DocumentViewer({ page }: { page: number | null }) {
  return (
    <section id="document-viewer" className="border-t border-border px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-6">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            <h3 className="text-sm font-semibold tracking-tight">Document Viewer</h3>
          </div>
          {page === null ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Select a source chip on any answer to preview the cited page here.
            </p>
          ) : (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className="text-sm font-medium">Page {page}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF rendering is not wired up yet — this is a placeholder for the cited passage.
              </p>
              <div className="mt-4 space-y-2">
                {[92, 78, 85, 60].map((width, index) => (
                  <div
                    key={index}
                    className="h-3 animate-pulse rounded-full bg-secondary"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}