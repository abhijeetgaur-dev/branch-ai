// src/components/conversation/NodeRenderer.tsx
// THE CORE FIX: block-specific branches now render INLINE after their parent block,
// not piled up at the bottom of the answer. This is the product's signature mechanic.

import React, { useState } from 'react';
import {
  User, Bot, ChevronDown, ChevronRight,
  GitBranch, Clock, MoreHorizontal, Copy, Bookmark,
} from 'lucide-react';
import { cn, formatDate, getDepthColor } from '../../lib/utils';
import type { Node } from '../../types';
import { BlockRenderer } from './BlockRenderer';
import { BranchInput } from './BranchInput';

interface NodeRendererProps {
  node: Node;
  onBranchCreate?: (parentNodeId: string, blockId: string | null, question: string) => void;
  isRoot?: boolean;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  onBranchCreate,
  isRoot = false,
}) => {
  const [isCollapsed, setIsCollapsed]           = useState(false);
  const [showActions, setShowActions]           = useState(false);
  const [showMainBranchInput, setShowMainBranchInput] = useState(false);

  // ── Helpers ─────────────────────────────────────

  // Children that branched from a specific block
  const getBranchesForBlock = (blockId: string): Node[] =>
    node.children?.filter(
      (child) => child.type === 'question' && child.parentBlockId === blockId
    ) ?? [];

  // Children with no block attachment (general follow-ups)
  const generalFollowups: Node[] =
    node.children?.filter(
      (child) => child.type === 'question' && !child.parentBlockId
    ) ?? [];

  // Total branch count for header badge
  const totalBranches = node.children?.filter((c) => c.type === 'question').length ?? 0;

  const handleAskFollowup = (blockId: string, question: string) => {
    onBranchCreate?.(node.id, blockId, question);
  };

  // ── Question node ────────────────────────────────
  if (node.type === 'question') {
    return (
      <div className="relative animate-fade-in">
        <div className={cn(
          'relative rounded-2xl overflow-hidden',
          !isRoot && 'ml-6'
        )}>
          {node.depth > 0 && (
            <div className={cn('depth-indicator', getDepthColor(node.depth))} />
          )}
          <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 text-brand-100 text-sm">
                <span className="font-medium">You</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(node.createdAt)}
                </span>
                {node.depth > 0 && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      Depth {node.depth}
                    </span>
                  </>
                )}
              </div>
              <p className="text-lg font-medium leading-relaxed">{node.content}</p>
            </div>
          </div>
        </div>

        {/* Render the answer child(ren) of this question */}
        {node.children && node.children.length > 0 && (
          <div className="mt-4">
            {node.children.map((child) => (
              <NodeRenderer
                key={child.id}
                node={child}
                onBranchCreate={onBranchCreate}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Answer node ──────────────────────────────────
  return (
    <div className="relative animate-fade-in">
      <div
        className={cn(
          'relative rounded-2xl overflow-hidden bg-white border border-surface-200 shadow-sm',
          'hover:shadow-md transition-shadow duration-300'
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {node.depth > 1 && (
          <div className={cn('depth-indicator', getDepthColor(node.depth))} />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-surface-900">BranchAI</span>
                <span className="text-surface-400">·</span>
                <span className="text-surface-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(node.createdAt)}
                </span>
              </div>
              {node.blocks && (
                <span className="text-xs text-surface-400">
                  {node.blocks.length} sections
                  {totalBranches > 0 && ` · ${totalBranches} branch${totalBranches !== 1 ? 'es' : ''}`}
                </span>
              )}
            </div>
          </div>

          <div className={cn(
            'flex items-center gap-1 transition-opacity duration-200',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            {totalBranches > 0 && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {isCollapsed ? 'Show' : 'Hide'} branches
              </button>
            )}
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Blocks + inline branches ────────────────
            This is THE core rendering fix.
            After each block, we check if any child question
            branched from that block. If yes, render it here
            inline — not at the bottom of the answer.
        ─────────────────────────────────────────────── */}
        <div className="p-5 space-y-5">
          {node.blocks?.map((block) => {
            const blockBranches = getBranchesForBlock(block.id);

            return (
              <div key={block.id}>
                {/* The block itself */}
                <BlockRenderer
                  block={block}
                  depth={node.depth}
                  childBranches={blockBranches}
                  onAskFollowup={handleAskFollowup}
                />

                {/* Inline branches from this block — rendered immediately below it */}
                {!isCollapsed && blockBranches.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {blockBranches.map((branchQuestion) => (
                      <div key={branchQuestion.id} className="relative pl-6">
                        {/* Visual connector: vertical line + horizontal tick */}
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                          <div className="w-px flex-1 bg-gradient-to-b from-brand-300 to-transparent" />
                        </div>
                        <div className="absolute left-0 top-8 w-4 h-px bg-brand-300" />

                        <NodeRenderer
                          node={branchQuestion}
                          onBranchCreate={onBranchCreate}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* General follow-up button (no block attachment) */}
        <div className="px-5 pb-5">
          {!showMainBranchInput ? (
            <button
              onClick={() => setShowMainBranchInput(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-surface-200 rounded-xl text-sm text-surface-500 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-200"
            >
              <GitBranch className="w-4 h-4" />
              Ask a general follow-up question
            </button>
          ) : (
            <BranchInput
              onSubmit={(q) => {
                onBranchCreate?.(node.id, null, q);
                setShowMainBranchInput(false);
              }}
              onCancel={() => setShowMainBranchInput(false)}
              placeholder="Ask anything about this response..."
            />
          )}
        </div>
      </div>

      {/* General follow-up branches (no parentBlockId) — still render below the card */}
      {!isCollapsed && generalFollowups.length > 0 && (
        <div className="mt-4 space-y-4 relative">
          <div className="absolute left-6 top-0 bottom-4 w-px bg-gradient-to-b from-surface-300 to-transparent" />
          {generalFollowups.map((child) => (
            <div key={child.id} className="relative pl-8">
              <div className="absolute left-6 top-8 w-4 h-px bg-surface-300" />
              <NodeRenderer
                node={child}
                onBranchCreate={onBranchCreate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};