import React, { useEffect, useRef } from 'react';
import { X, Upload, FileText, Trash2, Loader2, Database } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';

interface DocumentManagerModalProps {
  onClose: () => void;
  conversationId?: string; // Optional: If provided, this is a conversation's knowledge base. If not, it's global.
}

export function DocumentManagerModal({ onClose, conversationId }: DocumentManagerModalProps) {
  const { documents, fetchDocuments, uploadDocument, deleteDocument, isUploading, isLoading, error, clearError } = useDocumentStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments(conversationId);
  }, [conversationId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    await uploadDocument(file, conversationId);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-popover rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-border/50 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50 shrink-0 bg-popover/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                <Database className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-lg font-semibold text-primary">
                 {conversationId ? 'Conversation Knowledge Base' : 'Global Knowledge Base'}
               </h2>
               <p className="text-xs text-muted">
                 {conversationId 
                   ? 'Upload documents specific to this conversation.' 
                   : 'Upload documents to use as context for all chats.'}
               </p>
             </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-primary hover:bg-page rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm flex items-start gap-2 border border-red-100">
            <span className="flex-1">{error}</span>
            <button onClick={clearError} className="opacity-70 hover:opacity-100 font-bold">×</button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
           
           {/* Upload Zone */}
           <div 
             className="border-2 border-dashed border-border hover:border-brand-400 bg-page/50 hover:bg-brand-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
             onClick={() => !isUploading && fileInputRef.current?.click()}
           >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.txt,.md,.csv" 
                disabled={isUploading}
              />
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {isUploading ? <Loader2 className="w-6 h-6 text-brand-500 animate-spin" /> : <Upload className="w-6 h-6 text-brand-500" />}
              </div>
              <h3 className="text-sm font-semibold text-primary mb-1">
                {isUploading ? 'Uploading and processing...' : 'Click to upload a document'}
              </h3>
              <p className="text-xs text-muted">Supports .pdf, .txt, .md</p>
           </div>

           {/* Document List */}
           <div>
             <h3 className="text-sm font-medium text-primary mb-3 flex items-center justify-between">
               <span>Uploaded Documents</span>
               <span className="text-xs bg-page px-2 py-1 rounded-full text-faint">{documents.length}</span>
             </h3>
             
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="w-6 h-6 animate-spin text-muted" />
               </div>
             ) : documents.length === 0 ? (
               <div className="text-center py-10 bg-page/50 rounded-xl border border-border/50 border-dashed">
                  <FileText className="w-8 h-8 text-faint mx-auto mb-2" />
                  <p className="text-sm text-faint">No documents uploaded yet.</p>
               </div>
             ) : (
               <div className="space-y-2">
                 {documents.map((doc) => (
                   <div key={doc.id} className="flex items-center gap-3 p-3 bg-page/50 hover:bg-page rounded-xl border border-border/50 group transition-colors">
                     <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                       <FileText className="w-5 h-5 text-brand-500" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-sm font-medium text-primary truncate">{doc.title}</p>
                       <p className="text-xs text-muted">Added {new Date(doc.createdAt).toLocaleDateString()}</p>
                     </div>
                     <button
                       onClick={() => deleteDocument(doc.id)}
                       className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all shrink-0"
                       title="Delete document"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                 ))}
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}
