import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Header } from "@/components/chat/Header";
import { Sidebar } from "@/components/chat/Sidebar";
import { useChat } from "@/hooks/useChat";
import { useDocuments } from "@/hooks/useDocuments";

export default function Home() {
  const { messages, isLoading, stage, status, sendMessage, regenerate, clearChat, retry } = useChat();
  const { documents, isLoadingDocuments, isUploading, upload, remove } = useDocuments();
  const [activePage, setActivePage] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelectSource = useCallback((page: number) => {
    setActivePage(page);
    requestAnimationFrame(() => {
      document.getElementById("document-viewer")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const handleNewChat = useCallback(() => {
    clearChat();
    setActivePage(null);
    setMobileOpen(false);
  }, [clearChat]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden lg:block">
        <Sidebar
          status={status}
          onNewChat={handleNewChat}
          documents={documents}
          isLoadingDocuments={isLoadingDocuments}
          isUploading={isUploading}
          onUpload={upload}
          onDelete={remove}
        />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <Sidebar
                status={status}
                onNewChat={handleNewChat}
                onClose={() => setMobileOpen(false)}
                documents={documents}
                isLoadingDocuments={isLoadingDocuments}
                isUploading={isUploading}
                onUpload={upload}
                onDelete={remove}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex min-w-0 flex-1 flex-col">
        <Header
          onClear={handleNewChat}
          onOpenSidebar={() => setMobileOpen(true)}
          canClear={messages.length > 0}
        />
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          stage={stage}
          status={status}
          activePage={activePage}
          onSend={sendMessage}
          onRegenerate={regenerate}
          onSelectSource={handleSelectSource}
          onRetry={retry}
        />
      </main>
    </div>
  );
}