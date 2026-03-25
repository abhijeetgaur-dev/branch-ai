// src/components/conversation/NodeRenderer.tsx

import React, { useState, useRef } from 'react';
import {
  Bot, GitBranch, Copy,
  Pencil, Trash2, ChevronDown, ChevronRight,
  GripVertical, Check, X, Loader2,
} from 'lucide-react';
import { cn, formatDate, getDepthAccent, getDepthAccentStyle } from '../../lib/utils';
import type { Node } from '../../types';
import { BlockRenderer } from './BlockRenderer';
import { BranchInput } from './BranchInput';
import { useConversationStore } from '../../store/conversationStore';

interface NodeRendererProps {
  node:             Node;
  conversationId:   string;
  onBranchCreate?:  (parentNodeId: string, blockId: string | null, question: string) => void;
  isRoot?:          boolean;
  hasSiblings?:     boolean;
  forceCollapsed?:  boolean;  // true when an ancestor is collapsed — propagates down
}

// ─────────────────────────────────────────────
// SiblingGroup — drag-reorder wrapper
// Only used when 2+ siblings exist
// ─────────────────────────────────────────────

interface SiblingGroupProps {
  nodes:            Node[];
  conversationId:   string;
  parentNodeId:     string | null;
  onBranchCreate?:  (parentNodeId: string, blockId: string | null, question: string) => void;
  forceCollapsed?:  boolean;
}

export const SiblingGroup: React.FC<SiblingGroupProps> = ({
  nodes, conversationId, parentNodeId, onBranchCreate, forceCollapsed = false,
}) => {
  const { reorderNodes }                = useConversationStore();
  const [dragOverId, setDragOverId]    = useState<string | null>(null);
  const [draggingId, setDraggingId]    = useState<string | null>(null);
  const hasSiblings = nodes.length > 1;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== draggingId) setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId === targetId) { setDragOverId(null); setDraggingId(null); return; }

    const ids = nodes.map((n) => n.id);
    const from = ids.indexOf(sourceId);
    const to   = ids.indexOf(targetId);
    if (from === -1 || to === -1) return;

    ids.splice(from, 1);
    ids.splice(to, 0, sourceId);
    reorderNodes(parentNodeId, ids);
    setDragOverId(null);
    setDraggingId(null);
  };

  return (
    <div className="space-y-6">
      {nodes.map((node) => (
        <div
          key={node.id}
          draggable={hasSiblings}
          onDragStart={(e) => hasSiblings && handleDragStart(e, node.id)}
          onDragOver={(e)  => hasSiblings && handleDragOver(e, node.id)}
          onDrop={(e)      => hasSiblings && handleDrop(e, node.id)}
          onDragEnd={() => { setDraggingId(null); setDragOverId(null); }}
          className={cn(
            'transition-all duration-150 rounded-xl',
            draggingId === node.id  && 'opacity-40',
            dragOverId === node.id  && 'ring-2 ring-brand-400 ring-offset-2'
          )}
        >
          <NodeRenderer
            node={node}
            conversationId={conversationId}
            onBranchCreate={onBranchCreate}
            hasSiblings={hasSiblings}
            forceCollapsed={forceCollapsed}
          />
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// NodeRenderer
// ─────────────────────────────────────────────

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  conversationId,
  onBranchCreate,
  isRoot          = false,
  hasSiblings     = false,
  forceCollapsed  = false,
}) => {
  const [localCollapsed, setLocalCollapsed]    = useState(false);
  const isCollapsed = localCollapsed || forceCollapsed;
  const [showBranchInput, setShowBranchInput] = useState(false);
  const [isEditing, setIsEditing]             = useState(false);
  const [editValue, setEditValue]             = useState(node.content ?? '');
  const [showActions, setShowActions]         = useState(false);
  const nodeRef                               = useRef<HTMLDivElement>(null);

  const { deleteNode, editQuestion, isRegenerating } = useConversationStore();

  const getBranchesForBlock = (blockId: string): Node[] =>
    node.children?.filter((c) => c.type === 'question' && c.parentBlockId === blockId) ?? [];

  const generalFollowups =
    node.children?.filter((c) => c.type === 'question' && !c.parentBlockId) ?? [];

  const totalBranches = node.children?.filter((c) => c.type === 'question').length ?? 0;

  const handleDelete = () => {
    if (window.confirm('Delete this branch and all its sub-branches? This cannot be undone.')) {
      deleteNode(node.id);
    }
  };

  const handleEditSave = () => {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === node.content) { setIsEditing(false); return; }
    const answerChild = node.children?.[0];
    if (answerChild) editQuestion(node.id, answerChild.id, trimmed);
    setIsEditing(false);
  };

  // ── Question node ─────────────────────────────
  if (node.type === 'question') {
    return (
      <div id={`node-${node.id}`} ref={nodeRef} className="animate-fade-in">
        <div
          className="group flex items-start gap-2 py-1"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {/* Drag grip — always visible at low opacity when siblings exist, full on hover */}
          {hasSiblings && (
            <div
              className="mt-1 cursor-grab active:cursor-grabbing flex-shrink-0 transition-opacity"
              style={{ opacity: showActions ? 0.6 : 0.2 }}
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4 text-surface-400" />
            </div>
          )}

          {/* User dot */}
          <div className="w-5 h-5 rounded-full bg-brand-100 border-2 border-brand-300 flex-shrink-0 mt-0.5" />

          {/* Question text / edit input */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-start gap-2">
                <textarea
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSave(); }
                    if (e.key === 'Escape') { setIsEditing(false); setEditValue(node.content ?? ''); }
                  }}
                  rows={2}
                  className="flex-1 text-sm bg-white border border-brand-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
                />
                <button onClick={handleEditSave} className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditValue(node.content ?? ''); }}
                  className="p-1.5 rounded-lg bg-surface-100 text-surface-500 hover:bg-surface-200 flex-shrink-0 mt-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-sm font-medium text-surface-800 leading-relaxed">{node.content}</p>
            )}
            <span className="text-xs text-surface-400 mt-0.5 block">
              {formatDate(node.createdAt)}
              {node.depth > 0 && <span className="ml-2 text-brand-400/70">· depth {node.depth}</span>}
            </span>
          </div>

          {/* Edit / delete buttons */}
          {!isEditing && (
            <div className={cn(
              'flex items-center gap-0.5 flex-shrink-0 transition-opacity duration-150',
              showActions ? 'opacity-100' : 'opacity-0'
            )}>
              <button
                onClick={() => { setIsEditing(true); setEditValue(node.content ?? ''); }}
                className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-brand-600 transition-colors"
                title="Edit question"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              {!isRoot && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-500 transition-colors"
                  title="Delete branch"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Regenerating indicator */}
        {isRegenerating && (
          <div className="ml-7 mt-2 flex items-center gap-2 text-xs text-brand-500">
            <Loader2 className="w-3 h-3 animate-spin" />
            Regenerating answer...
          </div>
        )}

        {/* Answer children */}
        {node.children && node.children.length > 0 && (
          <div className="mt-3 ml-3 pl-4 border-l border-surface-200">
            {node.children.map((child) => (
              <NodeRenderer
                key={child.id}
                node={child}
                conversationId={conversationId}
                onBranchCreate={onBranchCreate}
                forceCollapsed={forceCollapsed}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Answer node ───────────────────────────────
  // FIX 3: isCollapsed now hides blocks AND children — the entire card body collapses.
  // Only the header remains visible when collapsed.
  return (
    <div id={`node-${node.id}`} ref={nodeRef} className="animate-fade-in">
      <div
        className={cn(
          'relative rounded-xl bg-white border border-surface-200 transition-shadow duration-200 hover:shadow-sm',
          node.depth > 0 && 'border-t-2',
        )}
        style={node.depth > 0 ? getDepthAccentStyle(node.depth) : undefined}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Header — always visible */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-surface-600">BranchAI</span>
            <span className="text-surface-300 text-xs">·</span>
            <span className="text-xs text-surface-400">{formatDate(node.createdAt)}</span>
            {node.blocks?.length > 0 && (
              <>
                <span className="text-surface-300 text-xs">·</span>
                <span className="text-xs text-surface-400">{node.blocks.length} sections</span>
              </>
            )}
            {totalBranches > 0 && !isCollapsed && (
              <>
                <span className="text-surface-300 text-xs">·</span>
                <span className="text-xs text-brand-500">
                  {totalBranches} {totalBranches === 1 ? 'branch' : 'branches'}
                </span>
              </>
            )}
          </div>

          {/* Actions — visible on hover */}
          <div className={cn(
            'flex items-center gap-0.5 flex-shrink-0 transition-opacity duration-150',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            {/* Collapse toggle — always available, collapses the whole card body */}
            <button
              onClick={() => setLocalCollapsed(!localCollapsed)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-surface-500 hover:text-surface-700 hover:bg-surface-50 rounded-lg transition-colors"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed
                ? <><ChevronRight className="w-3 h-3" /><span>Show</span></>
                : <><ChevronDown  className="w-3 h-3" /><span>Hide</span></>}
            </button>
            <button
              className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors"
              onClick={() => navigator.clipboard.writeText(node.blocks?.map((b) => b.content).join('\n\n') ?? '')}
              title="Copy content"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FIX 3: entire body — blocks + follow-up button — hidden when collapsed */}
        {!isCollapsed && (
          <>
            <div className="mx-4 border-t border-surface-100" />

            {/* Blocks + inline branches */}
            <div className="px-4 py-4 space-y-5">
              {node.blocks?.map((block) => {
                const blockBranches = getBranchesForBlock(block.id);
                return (
                  <div key={block.id}>
                    <BlockRenderer
                      block={block}
                      depth={node.depth}
                      conversationId={conversationId}
                      childBranches={blockBranches}
                      onAskFollowup={(blockId, question) => onBranchCreate?.(node.id, blockId, question)}
                    />
                    {blockBranches.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-brand-200 space-y-5">
                        <SiblingGroup
                          nodes={blockBranches}
                          conversationId={conversationId}
                          parentNodeId={node.id}
                          onBranchCreate={onBranchCreate}
                          forceCollapsed={isCollapsed}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Follow-up button */}
            <div className="px-4 pb-4">
              {!showBranchInput ? (
                <button
                  onClick={() => setShowBranchInput(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-surface-200 rounded-lg text-xs text-surface-400 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50/40 transition-all duration-200"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  Ask a follow-up
                </button>
              ) : (
                <BranchInput
                  conversationId={conversationId}
                  onSubmit={(q) => { onBranchCreate?.(node.parentNodeId ?? node.id, null, q); setShowBranchInput(false); }}
                  onCancel={() => setShowBranchInput(false)}
                  placeholder="Ask anything about this response..."
                />
              )}
            </div>
          </>
        )}

        {/* Collapsed summary */}
        {isCollapsed && (
          <div className="px-4 pb-3">
            <p className="text-xs text-surface-400 italic">
              {node.blocks?.length ?? 0} sections · {totalBranches > 0 ? `${totalBranches} branch${totalBranches !== 1 ? 'es' : ''}` : 'no branches'} · click Show to expand
            </p>
          </div>
        )}
      </div>

      {/* General follow-up branches — also hidden when collapsed */}
      {!localCollapsed && !forceCollapsed && generalFollowups.length > 0 && (
        <div className="mt-5 pl-4 border-l border-surface-200 space-y-5">
          <SiblingGroup
            nodes={generalFollowups}
            conversationId={conversationId}
            parentNodeId={node.id}
            onBranchCreate={onBranchCreate}
            forceCollapsed={false}
          />
        </div>
      )}
    </div>
  );
};