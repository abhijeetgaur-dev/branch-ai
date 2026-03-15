// src/components/conversation/ConversationView.tsx
import React, { useState } from 'react';
import {
  Send, Loader2, Sparkles, GitBranch,
  Layers, Clock, Star, StarOff, MoreHorizontal,
} from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import type { Conversation, Node } from '../../types';
import { NodeRenderer } from './NodeRenderer';
import { Badge } from '../ui/Badge';

interface ConversationViewProps {
  conversation:      Conversation;
  isBranching?:      boolean;
  onBranchCreate?:   (parentNodeId: string, blockId: string | null, question: string) => void;
  onToggleFavorite?: (conversationId: string) => void;
}

function countNodes(node: Node): number {
  let n = 1;
  node.children?.forEach((c) => { n += countNodes(c); });
  return n;
}

function countMaxDepth(node: Node): number {
  if (!node.children?.length) return node.depth;
  return Math.max(...node.children.map(countMaxDepth));
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  isBranching = false,
  onBranchCreate,
  onToggleFavorite,
}) => {
  const [newQuestion, setNewQuestion] = useState('');

  const totalNodes = countNodes(conversation.rootNode);
  const maxDepth   = countMaxDepth(conversation.rootNode);

  const handleSubmit = () => {
    const q = newQuestion.trim();
    if (!q || isBranching) return;
    const rootAnswerNode = conversation.rootNode.children?.[0] ?? null;
    const parentNodeId   = rootAnswerNode?.id ?? conversation.rootNode.id;
    onBranchCreate?.(parentNodeId, null, q);
    setNewQuestion('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-50">

      {/* ── Header ────────────────────────────── */}
      <div className="bg-white border-b border-surface-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-lg font-semibold text-surface-900 truncate">
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
                <GitBranch className="w-3 h-3" />{maxDepth} levels
              </span>
              <span className="text-surface-200">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />{formatDate(conversation.updatedAt)}
              </span>
              {conversation.tags?.length > 0 && (
                <>
                  <span className="text-surface-200">·</span>
                  <div className="flex items-center gap-1">
                    {conversation.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-surface-100 text-surface-500 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <button className="p-1.5 rounded hover:bg-surface-100 text-surface-400 transition-colors ml-4">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Conversation tree ──────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-4">
          <NodeRenderer
            node={conversation.rootNode}
            onBranchCreate={onBranchCreate}
            isRoot
          />

          {/* Branching skeleton */}
          {isBranching && (
            <div className="animate-fade-in">
              {/* Question skeleton */}
              <div className="flex items-start gap-3 py-1 mb-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 border-2 border-brand-200 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-brand-300 animate-pulse" />
                </div>
                <div className="flex-1 h-4 bg-surface-200 rounded animate-pulse mt-1" style={{ width: '60%' }} />
              </div>

              {/* Answer skeleton */}
              <div className="ml-4 pl-5 border-l border-surface-200">
                <div className="bg-white rounded-xl border border-surface-200 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 animate-pulse" />
                    <div className="h-3 w-16 bg-surface-100 rounded animate-pulse" />
                  </div>
                  <div className="border-t border-surface-100" />
                  <div className="space-y-2 pt-1">
                    <div className="h-3.5 bg-surface-100 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-surface-100 rounded animate-pulse w-full" />
                    <div className="h-3 bg-surface-100 rounded animate-pulse w-5/6" />
                    <div className="h-3 bg-surface-100 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Input bar ─────────────────────────── */}
      <div className="bg-white border-t border-surface-200 px-6 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-surface-50 border border-surface-200 rounded-xl px-4 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
            <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
              }}
              disabled={isBranching}
              placeholder={isBranching ? 'Generating...' : 'Ask a new question or continue exploring...'}
              className="flex-1 bg-transparent text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSubmit}
              disabled={!newQuestion.trim() || isBranching}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-150 flex-shrink-0',
                newQuestion.trim() && !isBranching
                  ? 'bg-brand-600 text-white hover:bg-brand-700'
                  : 'text-surface-300 cursor-not-allowed'
              )}
            >
              {isBranching
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send    className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-surface-400 text-center mt-2">
            Enter to ask · Click any section heading to branch deeper
          </p>
        </div>
      </div>
    </div>
  );
};