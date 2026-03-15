// src/components/conversation/ConversationView.tsx
import React, { useState } from 'react';
import {
  Send,
  Loader2,
  Sparkles,
  GitBranch,
  Layers,
  Clock,
  Star,
  StarOff,
  Share2,
  MoreHorizontal,
} from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import type { Conversation, Node } from '../../types';
import { NodeRenderer } from './NodeRenderer';
import { Badge } from '../ui/Badge';

interface ConversationViewProps {
  conversation:      Conversation;
  isBranching?:      boolean;  // true while AI is generating — from Zustand store
  onBranchCreate?:   (parentNodeId: string, blockId: string | null, question: string) => void;
  onToggleFavorite?: (conversationId: string) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  isBranching = false,
  onBranchCreate,
  onToggleFavorite,
}) => {
  const [newQuestion, setNewQuestion] = useState('');

  // ── Tree stats ──────────────────────────────────
  const countNodes = (node: Node): number => {
    let count = 1;
    node.children?.forEach((child) => { count += countNodes(child); });
    return count;
  };

  const countMaxDepth = (node: Node): number => {
    if (!node.children || node.children.length === 0) return node.depth;
    return Math.max(...node.children.map(countMaxDepth));
  };

  const totalNodes = countNodes(conversation.rootNode);
  const maxDepth   = countMaxDepth(conversation.rootNode);

  // ── Root-level question submission ─────────────
  // This fires a new top-level branch from the conversation root question node.
  // The root node is always a question; we branch from its answer child.
  const handleSubmit = () => {
    const q = newQuestion.trim();
    if (!q || isBranching) return;

    // Find the first answer node (child of root question) to branch from
    const rootAnswerNode = conversation.rootNode.children?.[0] ?? null;
    const parentNodeId   = rootAnswerNode?.id ?? conversation.rootNode.id;

    onBranchCreate?.(parentNodeId, null, q);
    setNewQuestion('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">

      {/* ── Conversation header ─────────────────── */}
      <div className="bg-white border-b border-surface-200 px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-surface-900">
                {conversation.title}
              </h1>
              <button
                onClick={() => onToggleFavorite?.(conversation.id)}
                className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors"
              >
                {conversation.isFavorite ? (
                  <Star    className="w-5 h-5 text-amber-500 fill-amber-500" />
                ) : (
                  <StarOff className="w-5 h-5 text-surface-400" />
                )}
              </button>
            </div>

            {conversation.description && (
              <p className="text-surface-500 mb-3">{conversation.description}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-surface-500">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {totalNodes} nodes
              </span>
              <span className="flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                {maxDepth} levels deep
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDate(conversation.updatedAt)}
              </span>
            </div>

            {conversation.tags?.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                {conversation.tags.map((tag) => (
                  <Badge key={tag} variant="brand" size="sm">#{tag}</Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-surface-700 transition-colors">
              <Share2       className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-surface-700 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Conversation tree ───────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <NodeRenderer
            node={conversation.rootNode}
            onBranchCreate={onBranchCreate}
            isRoot
          />

          {/* Branching indicator inline */}
          {isBranching && (
            <div className="mt-6 flex items-center gap-3 px-5 py-4 bg-white border border-surface-200 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700">BranchAI is thinking...</p>
                <p className="text-xs text-surface-400 mt-0.5">Generating structured response</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Root question input bar ─────────────── */}
      <div className="bg-white border-t border-surface-200 px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBranching}
              placeholder={
                isBranching
                  ? 'Generating response...'
                  : 'Ask a new question or continue exploring...'
              }
              className={cn(
                'w-full bg-surface-50 border border-surface-200 rounded-xl pl-12 pr-24 py-4 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all',
                isBranching && 'opacity-60 cursor-not-allowed'
              )}
            />
            <button
              onClick={handleSubmit}
              disabled={!newQuestion.trim() || isBranching}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                newQuestion.trim() && !isBranching
                  ? 'bg-brand-600 text-white hover:bg-brand-700'
                  : 'bg-surface-200 text-surface-400 cursor-not-allowed'
              )}
            >
              {isBranching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-surface-400 mt-2 text-center">
            Press Enter to ask · Click any section heading to branch deeper
          </p>
        </div>
      </div>
    </div>
  );
};