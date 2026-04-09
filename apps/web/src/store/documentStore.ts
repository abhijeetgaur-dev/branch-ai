import { create } from 'zustand';
import { api, type DocumentSummary } from '../lib/api';

interface DocumentStore {
  documents: DocumentSummary[];
  isLoading: boolean;
  isUploading: boolean;
  error: string | null;

  fetchDocuments: (conversationId?: string) => Promise<void>;
  uploadDocument: (file: File, conversationId?: string) => Promise<DocumentSummary | null>;
  deleteDocument: (id: string) => Promise<void>;

  clearError: () => void;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  isLoading: false,
  isUploading: false,
  error: null,

  fetchDocuments: async (conversationId?: string) => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const documents = await api.documents.list(conversationId);
      set({ documents, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isLoading: false });
    }
  },

  uploadDocument: async (file: File, conversationId?: string) => {
    set({ isUploading: true, error: null });
    try {
      const result = await (api.documents.upload as any)(file, conversationId);
      // Refresh the list after successful upload
      const documents = await api.documents.list(conversationId);
      set({ documents, isUploading: false });
      return result.document;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isUploading: false });
      return null;
    }
  },

  deleteDocument: async (id: string) => {
    try {
      await api.documents.delete(id);
      set((state) => ({
        documents: state.documents.filter((d) => d.id !== id),
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  clearError: () => set({ error: null }),
}));
