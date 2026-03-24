import { create } from 'zustand';
import { api, type DocumentSummary } from '../lib/api';

interface DocumentStore {
  documents: DocumentSummary[];
  isLoading: boolean;
  isUploading: boolean;
  error: string | null;

  fetchDocuments: () => Promise<void>;
  uploadDocument: (file: File) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  isLoading: false,
  isUploading: false,
  error: null,

  fetchDocuments: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const documents = await api.documents.list();
      set({ documents, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isLoading: false });
    }
  },

  uploadDocument: async (file: File) => {
    set({ isUploading: true, error: null });
    try {
      await api.documents.upload(file);
      // Refresh the list after successful upload
      const documents = await api.documents.list();
      set({ documents, isUploading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isUploading: false });
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
