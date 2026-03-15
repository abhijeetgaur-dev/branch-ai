// src/components/conversation/NodeRenderer.tsx
import React, { useState } from 'react';
import {
  User, Bot, ChevronDown, ChevronRight,
  GitBranch, MoreHorizontal, Copy, Bookmark,
} from 'lucide-react';
import { cn, formatDate, getDepthAccent } from '../../lib/utils';
import type { Node } from '../../types';
import { BlockRenderer } from './BlockRenderer';
import { BranchInput } from './BranchInput';

interface NodeRendererProps {
  node: Node;
  onBranchCreate?: (parentNodeId: string, blockId: string | null, question: string) => void;
  isRoot?: boolean;
}

// Depth → subtle left-border accent color
const DEPTH_ACCENTS = [
  'border-l-brand-400',
  'border-l-violet-400',
  'border-l-emerald-400',
  'border-l-amber-400',
  'border-l-rose-400',
  'border-l-cyan-400',
];

export function getDepthAccentClass(depth: number) {
  return DEPTH_ACCENTS[depth % DEPTH_ACCENTS.length];
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  onBranchCreate,
  isRoot = false,
}) => {
  const [isCollapsed, setIsCollapsed]             = useState(false);
  const [showActions, setShowActions]             = useState(false);
  const [showMainBranchInput, setShowMainBranchInput] = useState(false);

  const getBranchesForBlock = (blockId: string): Node[] =>
    node.children?.filter(
      (c) => c.type === 'question' && c.parentBlockId === blockId
    ) ?? [];

  const generalFollowups =
    node.children?.filter((c) => c.type === 'question' && !c.parentBlockId) ?? [];

  const totalBranches =
    node.children?.filter((c) => c.type === 'question').length ?? 0;

  const handleAskFollowup = (blockId: string, question: string) => {
    onBranchCreate?.(node.id, blockId, question);
  };

  // ── Question node — compact chip ─────────────
  if (node.type === 'question') {
    return (
      <div className="animate-fade-in">
        {/* Compact question chip */}
        <div className="flex items-start gap-3 py-1">
          {/* User dot */}
          <div className="w-6 h-6 rounded-full bg-brand-100 border-2 border-brand-300 flex items-center justify-center flex-shrink-0 mt-0.5">
            <User className="w-3 h-3 text-brand-600" />
          </div>

          {/* Question text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-800 leading-relaxed">
              {node.content}
            </p>
            <span className="text-xs text-surface-400 mt-0.5 block">
              {formatDate(node.createdAt)}
              {node.depth > 0 && (
                <span className="ml-2 text-brand-400">
                  · depth {node.depth}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Children (answer nodes) */}
        {node.children && node.children.length > 0 && (
          <div className="mt-3 ml-4 pl-5 border-l border-surface-200">
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

  // ── Answer node — clean content card ─────────
  return (
    <div className="animate-fade-in">
      <div
        className={cn(
          'relative bg-white rounded-xl border border-surface-200',
          'shadow-sm hover:shadow-md transition-all duration-200',
          // Depth accent: thin left border in depth color
          node.depth > 0 && 'border-l-2',
          node.depth > 0 && getDepthAccentClass(node.depth)
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* ── Compact header ────────────────────── */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-surface-600">BranchAI</span>
            <span className="text-surface-300 text-xs">·</span>
            <span className="text-xs text-surface-400">{formatDate(node.createdAt)}</span>
            {node.blocks && (
              <>
                <span className="text-surface-300 text-xs">·</span>
                <span className="text-xs text-surface-400">
                  {node.blocks.length} sections
                </span>
              </>
            )}
          </div>

          {/* Action row — fades in on hover */}
          <div className={cn(
            'flex items-center gap-0.5 transition-opacity duration-150',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            {totalBranches > 0 && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-surface-500 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors"
              >
                {isCollapsed
                  ? <ChevronRight className="w-3 h-3" />
                  : <ChevronDown  className="w-3 h-3" />}
                {totalBranches} branch{totalBranches !== 1 ? 'es' : ''}
              </button>
            )}
            <button className="p-1.5 rounded-md hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <Bookmark className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-surface-100" />

        {/* ── Blocks + inline branches ─────────── */}
        <div className="px-4 py-3 space-y-4">
          {node.blocks?.map((block) => {
            const blockBranches = getBranchesForBlock(block.id);

            return (
              <div key={block.id}>
                <BlockRenderer
                  block={block}
                  depth={node.depth}
                  childBranches={blockBranches}
                  onAskFollowup={handleAskFollowup}
                />

                {/* Inline branches from this block */}
                {!isCollapsed && blockBranches.length > 0 && (
                  <div className="mt-3 space-y-3">
                    {blockBranches.map((branchQ) => (
                      <InlineBranch
                        key={branchQ.id}
                        node={branchQ}
                        onBranchCreate={onBranchCreate}
                        accentClass={getDepthAccentClass(branchQ.depth)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── General follow-up button ──────────── */}
        <div className="px-4 pb-4">
          {!showMainBranchInput ? (
            <button
              onClick={() => setShowMainBranchInput(true)}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-2.5',
                'border border-dashed border-surface-200 rounded-lg',
                'text-xs text-surface-400',
                'hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50/50',
                'transition-all duration-200'
              )}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Ask a follow-up question
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

      {/* ── General follow-up branches ────────── */}
      {!isCollapsed && generalFollowups.length > 0 && (
        <div className="mt-3 space-y-3">
          {generalFollowups.map((child) => (
            <InlineBranch
              key={child.id}
              node={child}
              onBranchCreate={onBranchCreate}
              accentClass={getDepthAccentClass(child.depth)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// InlineBranch — the visual treatment for a
// nested question+answer pair.
// Uses a left connector line + indent.
// ─────────────────────────────────────────────

interface InlineBranchProps {
  node:            Node;
  onBranchCreate?: NodeRendererProps['onBranchCreate'];
  accentClass:     string;
}

const InlineBranch: React.FC<InlineBranchProps> = ({
  node, onBranchCreate, accentClass,
}) => {
  return (
    <div className="flex gap-3">
      {/* Connector: vertical line + L-tick */}
      <div className="flex flex-col items-center flex-shrink-0 w-5">
        <div className="w-px flex-1 bg-surface-200 ml-2" />
        <div className="w-3 h-px bg-surface-200 mt-0 ml-2" />
      </div>

      {/* Nested node */}
      <div className="flex-1 min-w-0">
        <NodeRenderer
          node={node}
          onBranchCreate={onBranchCreate}
        />
      </div>
    </div>
  );
};