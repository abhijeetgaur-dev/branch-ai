// src/components/conversation/ConversationView.tsx
import React, { useState } from 'react';
import {
  Send, Loader2, Sparkles, GitBranch,
  Layers, Clock, Star, StarOff, MoreHorizontal,
} from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import type { Conversation, Node } from '../../types';
import { NodeRenderer, SiblingGroup } from './NodeRenderer';
import { useConversationStore } from '../../store/conversationStore';

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

function maxDepthAcross(nodes: Node[]): number {
  if (!nodes.length) return 0;
  return Math.max(...nodes.map((n) => {
    if (!n.children?.length) return n.depth;
    return maxDepthAcross(n.children);
  }));
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  isBranching = false,
  onBranchCreate,
  onBottomBarSubmit,
  onToggleFavorite,
}) => {
  const [newQuestion, setNewQuestion] = useState('');
  const { isRegenerating }            = useConversationStore();

  const rootNodes  = conversation.rootNodes ?? [];
  const totalNodes = countAllNodes(rootNodes);
  const maxDepth   = maxDepthAcross(rootNodes);
  const isDisabled = isBranching || isRegenerating;

  const handleSubmit = () => {
    const q = newQuestion.trim();
    if (!q || isDisabled) return;
    onBottomBarSubmit?.(q);
    setNewQuestion('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-50">

      {/* Header */}
      <div className="bg-white border-b border-surface-200 px-6 py-4">
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
        <div className="max-w-3xl mx-auto px-6 py-8">

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
              parentNodeId={null}
              onBranchCreate={onBranchCreate}
            />
          )}

          {/* Branching / regenerating skeleton */}
          {(isBranching || isRegenerating) && (
            <div className="mt-8 animate-fade-in">
              <div className="flex items-start gap-3 py-1 mb-4">
                <div className="w-5 h-5 rounded-full bg-brand-100 border-2 border-brand-200 flex-shrink-0" />
                <div className="h-4 bg-surface-200 rounded animate-pulse" style={{ width: '55%' }} />
              </div>
              <div className="bg-white rounded-xl border border-surface-200 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 animate-pulse flex-shrink-0" />
                  <div className="h-3 w-16 bg-surface-100 rounded animate-pulse" />
                </div>
                <div className="border-t border-surface-100" />
                <div className="space-y-2.5 pt-1">
                  <div className="h-3 bg-surface-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-surface-100 rounded animate-pulse w-full" />
                  <div className="h-3 bg-surface-100 rounded animate-pulse w-4/5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar — always creates a NEW ROOT THREAD (depth 0) */}
      <div className="bg-white border-t border-surface-200 px-6 py-3">
        <div className="max-w-3xl mx-auto">
          <div className={cn(
            'flex items-center gap-3 bg-surface-50 border rounded-xl px-4 py-2.5 transition-all',
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
            <button
              onClick={handleSubmit}
              disabled={!newQuestion.trim() || isDisabled}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-150 flex-shrink-0',
                newQuestion.trim() && !isDisabled
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