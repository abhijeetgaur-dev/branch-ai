// src/components/conversation/ConversationView.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Loader2, Sparkles, GitBranch,
  Layers, Clock, Star, StarOff, MoreHorizontal,
  Paperclip, FileText,
} from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import type { Conversation, Node } from '../../types';
import { SiblingGroup } from './NodeRenderer';
import { LoadingShimmer } from './LoadingShimmer';

import { useConversationStore } from '../../store/conversationStore';

import { useDocumentStore } from '../../store/documentStore';
import type { DocumentSummary } from '../../lib/api';


interface ConversationViewProps {
  conversation:       Conversation;
  isBranching?:       boolean;
  // Called by inline branch buttons on answer cards
  onBranchCreate?:    (parentNodeId: string, blockId: string | null, question: string) => void;
  // Called by the bottom bar — always creates a new root thread
  onBottomBarSubmit?: (question: string) => void;
  onToggleFavorite?:  (conversationId: string) => void;
}

function countAllNodes(nodes: Node[]): number {
  return nodes.reduce((sum, n) => {
    let count = 1;
    n.children?.forEach((c) => { count += countAllNodes([c]); });
    return sum + count;
  }, 0);
}


export const ConversationView: React.FC<ConversationViewProps> = ({

  conversation,
  isBranching = false,
  onBranchCreate,
  onBottomBarSubmit,
  onToggleFavorite,
}) => {
  const [newQuestion, setNewQuestion] = useState('');
  const fileInputRef                  = useRef<HTMLInputElement>(null);
  const [stagedDocs, setStagedDocs] = useState<DocumentSummary[]>([]);
  const { isRegenerating, processingNodeId } = useConversationStore();


  const { fetchDocuments, uploadDocument, isUploading } = useDocumentStore();


  useEffect(() => {
    fetchDocuments(conversation.id);
  }, [conversation.id]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = '';
    const uploaded = await uploadDocument(file, conversation.id);
    if (uploaded) {
      setStagedDocs(prev => [...prev, uploaded]);
    }
  };


  const rootNodes  = conversation.rootNodes ?? [];
  const totalNodes = countAllNodes(rootNodes);
  const isDisabled = isBranching || isRegenerating;


  const handleSubmit = () => {
    let q = newQuestion.trim();
    if (!q && stagedDocs.length === 0) return;
    if (isDisabled) return;
    
    if (stagedDocs.length > 0) {
      if (q) q += '\n\n';
      stagedDocs.forEach(doc => {
         q += `📝 [Attached: ${doc.title}](${doc.url || '#'})\n`;
      });
    }

    onBottomBarSubmit?.(q);
    setNewQuestion('');
    setStagedDocs([]);
  };


  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-surface-50">

      {/* Header */}
      <div className="bg-white border-b border-surface-200 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-base font-semibold text-surface-900 truncate">
                {conversation.title}
              </h1>
              <button
                onClick={() => onToggleFavorite?.(conversation.id)}
                className="p-1 rounded hover:bg-surface-100 transition-colors flex-shrink-0"
              >
                {conversation.isFavorite
                  ? <Star    className="w-4 h-4 text-amber-400 fill-amber-400" />
                  : <StarOff className="w-4 h-4 text-surface-300" />}
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs text-surface-400">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3" />{totalNodes} nodes
              </span>
              <span className="text-surface-200">·</span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />{rootNodes.length} threads
              </span>
              <span className="text-surface-200">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />{formatDate(conversation.updatedAt)}
              </span>
            </div>
          </div>
          <button className="p-1.5 rounded hover:bg-surface-100 text-surface-400 transition-colors ml-4">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8">

          {rootNodes.length === 0 && !isBranching ? (
            // Empty state — no threads yet
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-brand-400" />
              </div>
              <p className="text-sm font-medium text-surface-700 mb-1">No threads yet</p>
              <p className="text-xs text-surface-400">Ask your first question below to get started</p>
            </div>
          ) : (
            // Root threads — wrapped in SiblingGroup for drag reorder
            <SiblingGroup
              nodes={rootNodes}
              conversationId={conversation.id}
              parentNodeId={null}
              onBranchCreate={onBranchCreate}
            />
          )}

          {/* Global shimmer (new root threads only) */}
          {(isBranching || isRegenerating) && !processingNodeId && (
            <LoadingShimmer />
          )}

        </div>
      </div>

      {/* Bottom bar — always creates a NEW ROOT THREAD (depth 0) */}
      <div className="bg-white border-t border-surface-200 px-3 md:px-6 py-2 md:py-3 bottom-bar-safe flex flex-col items-center">
        <div className="max-w-4xl w-full">
          
          {stagedDocs.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 px-1">
              {stagedDocs.map(doc => (
                <div key={doc.id} className="flex items-center gap-1.5 px-2 py-1 bg-surface-50 border border-surface-200 rounded-md text-xs text-surface-700 shadow-sm animate-fade-in tooltip-trigger" title="Document attached to next message">
                  <FileText className="w-3 h-3 text-brand-500" />
                  <span className="truncate max-w-[200px]">{doc.title}</span>
                </div>
              ))}
            </div>
          )}


          <div className={cn(
            'flex items-center gap-3 bg-surface-50 border rounded-xl px-3 md:px-4 py-3 md:py-2.5 transition-all',
            isDisabled
              ? 'border-surface-200 opacity-60'
              : 'border-surface-200 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/20'
          )}>
            <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
              }}
              disabled={isDisabled}
              placeholder={
                isRegenerating ? 'Regenerating answer...' :
                isBranching    ? 'Generating...' :
                'Start a new thread...'
              }
              className="flex-1 bg-transparent text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none disabled:cursor-not-allowed"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.txt,.md,.csv"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors disabled:opacity-50 flex-shrink-0"
              title="Attach a document"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-brand-500" /> : <Paperclip className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSubmit}
              disabled={(!newQuestion.trim() && stagedDocs.length === 0) || isDisabled}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-150 flex-shrink-0',
                (newQuestion.trim() || stagedDocs.length > 0) && !isDisabled

                  ? 'bg-brand-600 text-white hover:bg-brand-700'
                  : 'text-surface-300 cursor-not-allowed'
              )}
            >
              {isDisabled
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send    className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-surface-400 text-center mt-2">
            Creates a new thread · Use inline buttons to branch within a thread
          </p>
        </div>
      </div>
    </div>
  );
};