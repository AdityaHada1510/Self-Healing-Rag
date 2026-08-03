import { useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Cog, FileText, Loader2, Network, Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import type { BackendStatus, DocumentItem } from "@/types/chat";

interface SidebarProps {
  status: BackendStatus;
  onNewChat: () => void;
  onClose?: () => void;
  documents: DocumentItem[];
  isLoadingDocuments: boolean;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onDelete: (filename: string) => void;
}

const STATUS_COPY: Record<BackendStatus, { label: string; dot: string; text: string }> = {
  checking: { label: "Checking backend...", dot: "bg-warning", text: "text-warning" },
  online: { label: "Backend Connected", dot: "bg-success", text: "text-success" },
  offline: { label: "Backend Offline", dot: "bg-danger", text: "text-danger" },
};

export function Sidebar({
  status,
  onNewChat,
  onClose,
  documents,
  isLoadingDocuments,
  isUploading,
  onUpload,
  onDelete,
}: SidebarProps) {
  const state = STATUS_COPY[status];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (filename: string) => {
    if (window.confirm(`Delete "${filename}"?`)) onDelete(filename);
  };

  return (
    <aside className="flex h-full w-[264px] flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Network className="size-4.5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-sidebar-foreground">Self-Healing RAG</p>
            <p className="text-[11px] text-muted-foreground">LangGraph · Ollama</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close sidebar" className="lg:hidden">
            <X className="size-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="px-3">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="flex w-full items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
        >
          <Plus className="size-4" />
          New Chat
        </motion.button>
      </div>

      <nav className="mt-6 space-y-1 px-3">
        <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {[
          { icon: Clock, label: "Chat History" },
          { icon: Cog, label: "Settings" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => toast.info(`${label} is coming soon`)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span className="flex items-center gap-2.5">
              <Icon className="size-4" />
              {label}
            </span>
            <span className="rounded-md bg-sidebar-accent px-1.5 py-0.5 text-[10px] text-muted-foreground">
              soon
            </span>
          </button>
        ))}
      </nav>

      <section className="mt-6 px-3">
        <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Uploaded Documents
        </p>

        {isLoadingDocuments ? (
          <p className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            Loading documents...
          </p>
        ) : documents.length === 0 ? (
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
            <p className="text-xs text-muted-foreground">No documents uploaded.</p>
            <p className="mt-1 text-xs text-muted-foreground">Upload your first PDF.</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {documents.map((doc) => (
              <li
                key={doc.filename}
                className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <FileText className="size-4 shrink-0 text-primary" />
                  <span className="truncate" title={doc.filename}>
                    {doc.filename}
                  </span>
                </span>
                <button
                  onClick={() => handleDelete(doc.filename)}
                  aria-label={`Delete ${doc.filename}`}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) return;
            if (file.type !== "application/pdf") {
              toast.error("Only PDF files are supported.");
              return;
            }
            onUpload(file);
          }}
        />

        <motion.button
          whileHover={{ y: isUploading ? 0 : -1 }}
          whileTap={{ scale: isUploading ? 1 : 0.98 }}
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 flex w-full items-center gap-2 rounded-xl border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5 text-sm font-medium text-sidebar-foreground/90 transition-colors hover:bg-sidebar-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="size-4" />
              Upload PDF
            </>
          )}
        </motion.button>
      </section>

      <div className="mt-auto p-3 pt-6">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className={`absolute inline-flex size-2 animate-ping rounded-full ${state.dot} opacity-60`} />
              <span className={`relative inline-flex size-2 rounded-full ${state.dot}`} />
            </span>
            <span className={`text-xs font-medium ${state.text}`}>{state.label}</span>
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">127.0.0.1:8000</p>
        </div>
      </div>
    </aside>
  );
}