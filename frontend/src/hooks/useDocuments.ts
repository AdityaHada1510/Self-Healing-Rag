import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteDocument, getDocuments, uploadDocument } from "@/services/api";
import type { DocumentItem } from "@/types/chat";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const refreshDocuments = useCallback(async () => {
    setIsLoadingDocuments(true);
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch {
      toast.error("Could not load documents.");
    } finally {
      setIsLoadingDocuments(false);
    }
  }, []);

  useEffect(() => {
    void refreshDocuments();
  }, [refreshDocuments]);

  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        await uploadDocument(file);
        toast.success(`Uploaded ${file.name}`);
        await refreshDocuments();
      } catch {
        toast.error("Upload failed.");
      } finally {
        setIsUploading(false);
      }
    },
    [refreshDocuments],
  );

  const remove = useCallback(async (filename: string) => {
    try {
        await deleteDocument(filename);
        await refreshDocuments();
    } catch {
      toast.error("Failed to delete document.");
    }
  }, []);

  return { documents, isLoadingDocuments, isUploading, refreshDocuments, upload, remove };
}