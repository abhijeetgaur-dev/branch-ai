// src/components/conversation/NodeRenderer.tsx
import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react';
import {
  Bot, GitBranch, Copy, Pencil, Trash2,
  ChevronDown, GripVertical, Check, X,
  Loader2, FileText, Plus, ArrowRight,
  Minimize2, Maximize2, CornerDownRight,
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import type { Node } from '../../types';
import { BlockRenderer } from './BlockRenderer';
import { BranchInput } from './BranchInput';
import { RelatedPanel } from './RelatedPanel';
import { SuggestionChips } from './SuggestionChips';
import { LoadingShimmer } from './LoadingShimmer';
import { useConversationStore } from '../../store/conversationStore';

/* ─────────────────────────────────────────────────────
   Depth palette
   ───────────────────────────────────────────────────── */
const DEPTH_PALETTE = [
  { dot: '#d4586f', line: 'rgba(212,88,111,0.25)',  glow: 'rgba(212,88,111,0.08)',  badge: 'rgba(212,88,111,0.1)'  },
  { dot: '#7c6f9f', line: 'rgba(124,111,159,0.25)', glow: 'rgba(124,111,159,0.08)', badge: 'rgba(124,111,159,0.1)' },
  { dot: '#4a9f7c', line: 'rgba(74,159,124,0.25)',  glow: 'rgba(74,159,124,0.08)',  badge: 'rgba(74,159,124,0.1)'  },
  { dot: '#c4933f', line: 'rgba(196,147,63,0.25)',  glow: 'rgba(196,147,63,0.08)',  badge: 'rgba(196,147,63,0.1)'  },
  { dot: '#6382c4', line: 'rgba(99,130,196,0.25)',  glow: 'rgba(99,130,196,0.08)',  badge: 'rgba(99,130,196,0.1)'  },
];
const pal = (d: number) => DEPTH_PALETTE[d % DEPTH_PALETTE.length];

/* ─────────────────────────────────────────────────────
   Drag context — shared across the whole tree
   When any node is being dragged, every sibling group
   receives isDraggingGlobal = true and collapses its
   children to show only the question headers.
   ───────────────────────────────────────────────────── */
interface DragCtx {
  draggingId: string | null;
  setDraggingId: (id: string | null) => void;
}
const DragContext = createContext<DragCtx>({ draggingId: null, setDraggingId: () => {} });

export function DragProvider({ children }: { children: React.ReactNode }) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  return (
    <DragContext.Provider value={{ draggingId, setDraggingId }}>
      {children}
    </DragContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────── */
interface NodeRendererProps {
  node:            Node;
  conversationId:  string;
  onBranchCreate?: (parentNodeId: string, blockId: string | null, question: string) => void;
  isRoot?:         boolean;
  hasSiblings?:    boolean;
  forceCollapsed?: boolean;
  depth?:          number;
}

interface SiblingGroupProps {
  nodes:           Node[];
  conversationId:  string;
  parentNodeId:    string | null;
  onBranchCreate?: (parentNodeId: string, blockId: string | null, question: string) => void;
  forceCollapsed?: boolean;
  depth?:          number;
}

/* ─────────────────────────────────────────────────────
   Small utilities
   ───────────────────────────────────────────────────── */

// 1-px vertical thread connector
function Connector({ color, height = 20 }: { color: string; height?: number }) {
  return (
    <div
      style={{
        width: 1,
        height,
        backgroundColor: color,
        marginLeft: 13,
        flexShrink: 0,
      }}
    />
  );
}

// Copy button with ✓ feedback
function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); }}
      className="p-1.5 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95"
      style={{ color: ok ? 'var(--ui-brand-text)' : 'var(--ui-text-faint)' }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      title={ok ? 'Copied!' : 'Copy'}
    >
      {ok
        ? <Check className="w-3.5 h-3.5" style={{ animation: 'nrPop 0.2s ease' }} />
        : <Copy  className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ─────────────────────────────────────────────────────
   Drag-state collapsed card
   Shown in place of a full AnswerNode while any sibling
   is being dragged. Keeps the layout scannable.
   ───────────────────────────────────────────────────── */
function DragCollapsedCard({ node, depth = 0 }: { node: Node; depth?: number }) {
  const p = pal(depth);
  const totalBranches = node.children?.filter(c => c.type === 'question').length ?? 0;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--ui-card-bg)',
        border: '1px solid var(--ui-card-border)',
        opacity: 0.75,
      }}
    >
      {/* Depth stripe */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${p.dot}, transparent)` }} />

      <div className="flex items-center gap-2 pl-4 pr-3 py-2.5">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--ui-bot-from), var(--ui-bot-to))' }}
        >
          <Bot className="w-3 h-3 text-white" />
        </div>
        <span className="text-xs font-semibold flex-1 truncate" style={{ color: 'var(--ui-text-secondary)' }}>
          BranchAI
        </span>
        {totalBranches > 0 && (
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1"
            style={{ backgroundColor: p.badge, color: p.dot }}
          >
            <GitBranch className="w-2.5 h-2.5" />
            {totalBranches}
          </span>
        )}
        <span className="text-[10px]" style={{ color: 'var(--ui-text-faint)' }}>
          {node.blocks?.length ?? 0} sections
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Drag handle pill — shown above a sibling group
   while any node in it is dragging
   ───────────────────────────────────────────────────── */
function DragModeBanner({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
      style={{
        backgroundColor: 'var(--ui-brand-subtle)',
        border: '1px dashed rgba(212,88,111,0.35)',
        animation: 'nrFadeUp 0.15s ease',
      }}
    >
      <GripVertical className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ui-brand-muted)' }} />
      <span className="text-xs font-medium" style={{ color: 'var(--ui-brand-text)' }}>
        Drag to reorder · {count} branch{count !== 1 ? 'es' : ''}
      </span>
      <span className="text-[10px] ml-auto" style={{ color: 'var(--ui-brand-muted)' }}>
        Drop to place
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SiblingGroup
   ───────────────────────────────────────────────────── */
export const SiblingGroup: React.FC<SiblingGroupProps> = ({
  nodes,
  conversationId,
  parentNodeId,
  onBranchCreate,
  forceCollapsed = false,
  depth = 0,
}) => {
  const { reorderNodes }                    = useConversationStore();
  const { draggingId, setDraggingId }       = useContext(DragContext);
  const [localDragOver, setLocalDragOver]   = useState<string | null>(null);
  const [localDragging, setLocalDragging]   = useState<string | null>(null);

  // Is any node in THIS group being dragged?
  const groupIsDragging = localDragging !== null;
  const nodeIds         = new Set(nodes.map(n => n.id));
  // Is the dragging node from THIS group?
  const draggingIsHere  = draggingId !== null && nodeIds.has(draggingId);

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setLocalDragging(id);
    setDraggingId(id);          // tell global context
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (id !== localDragging) setLocalDragOver(id);
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const srcId = e.dataTransfer.getData('text/plain');
    if (!srcId || srcId === targetId) { reset(); return; }

    const ids  = nodes.map(n => n.id);
    const from = ids.indexOf(srcId);
    const to   = ids.indexOf(targetId);
    if (from === -1 || to === -1) { reset(); return; }

    ids.splice(from, 1);
    ids.splice(to, 0, srcId);
    reorderNodes(parentNodeId, ids);
    reset();
  };

  const reset = () => {
    setLocalDragging(null);
    setLocalDragOver(null);
    setDraggingId(null);
  };

  if (nodes.length === 0) return null;

  return (
    <div>
      {/* Drag mode banner */}
      {groupIsDragging && <DragModeBanner count={nodes.length} />}

      <div className={groupIsDragging ? 'space-y-2' : 'space-y-6'}>
        {nodes.map((node, i) => {
          const isThisDragging = localDragging === node.id;
          const isDragTarget   = localDragOver === node.id && !isThisDragging;

          return (
            <div
              key={node.id}
              draggable={nodes.length > 1}
              onDragStart={e  => nodes.length > 1 && onDragStart(e, node.id)}
              onDragOver={e   => nodes.length > 1 && onDragOver(e, node.id)}
              onDrop={e       => nodes.length > 1 && onDrop(e, node.id)}
              onDragEnd={reset}
              className="transition-all duration-200"
              style={{
                opacity:       isThisDragging ? 0.3 : 1,
                transform:     isDragTarget   ? 'translateY(-2px)' : 'translateY(0)',
                outline:       isDragTarget   ? '2px solid var(--ui-brand)' : 'none',
                outlineOffset: isDragTarget   ? 4 : 0,
                borderRadius:  12,
                animation:     groupIsDragging ? undefined : `nrFadeUp 0.3s ease ${i * 0.05}s both`,
                cursor:        nodes.length > 1 ? (isThisDragging ? 'grabbing' : 'grab') : 'default',
              }}
            >
              {/*
                While dragging: show every OTHER node as a collapsed
                card — just the header, no content. The dragging node
                itself is at 0.3 opacity (ghost).
              */}
              {groupIsDragging && !isThisDragging ? (
                <div>
                  {/* Question header — always show */}
                  <CollapsedQuestionHeader node={node} depth={depth} />
                  {/* Collapsed answer card */}
                  {node.children?.filter(c => c.type === 'answer').map(ans => (
                    <div key={ans.id}>
                      <Connector color={pal(depth).line} height={12} />
                      <DragCollapsedCard node={ans} depth={depth} />
                    </div>
                  ))}
                </div>
              ) : (
                <NodeRenderer
                  node={node}
                  conversationId={conversationId}
                  onBranchCreate={onBranchCreate}
                  hasSiblings={nodes.length > 1}
                  forceCollapsed={forceCollapsed || (groupIsDragging && !isThisDragging)}
                  depth={depth}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   CollapsedQuestionHeader
   Shown for non-dragging siblings during drag mode.
   ───────────────────────────────────────────────────── */
function CollapsedQuestionHeader({ node, depth }: { node: Node; depth: number }) {
  const p = pal(depth);
  const label = (node.content ?? '').length > 60
    ? (node.content ?? '').slice(0, 60) + '…'
    : (node.content ?? '');

  return (
    <div className="flex items-center gap-2.5 py-1">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
        style={{ backgroundColor: p.dot, opacity: 0.7 }}
      >
        Q
      </div>
      <p
        className="text-sm font-medium truncate flex-1"
        style={{ color: 'var(--ui-text-muted)' }}
      >
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   QuestionNode
   ───────────────────────────────────────────────────── */
function QuestionNode({
  node,
  conversationId,
  onBranchCreate,
  isRoot,
  hasSiblings,
  forceCollapsed,
  depth = 0,
}: NodeRendererProps) {
  const { deleteNode, editQuestion, isRegenerating } = useConversationStore();
  const { draggingId }    = useContext(DragContext);
  const anyDragging       = draggingId !== null;

  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing]     = useState(false);
  const [editValue, setEditValue]     = useState(node.content ?? '');
  const [mounted, setMounted]         = useState(false);
  const textareaRef                   = useRef<HTMLTextAreaElement>(null);
  const p                             = pal(depth);

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [isEditing, editValue]);

  const handleSave = () => {
    const t = editValue.trim();
    if (!t || t === node.content) { setIsEditing(false); return; }
    const ans = node.children?.[0];
    if (ans) editQuestion(node.id, ans.id, t);
    setIsEditing(false);
  };

  const renderContent = (text: string) =>
    text.split(/(📝 \[Attached: [^\]]+\]\([^)]+\))/g).map((part, i) => {
      const m = part.match(/📝 \[Attached: ([^\]]+)\]\(([^)]+)\)/);
      if (m) {
        let url = m[2];
        if (url.startsWith('/')) url = `${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}${url}`;
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium mx-0.5 align-middle"
            style={{ backgroundColor: 'var(--ui-brand-subtle)', color: 'var(--ui-brand-text)', border: '1px solid rgba(212,88,111,0.2)' }}
          >
            <FileText className="w-3 h-3" />
            <span className="truncate max-w-[140px]">{m[1]}</span>
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });

  return (
    <div
      id={`node-${node.id}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(5px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div
        className="flex items-start gap-3"
        onMouseEnter={() => !anyDragging && setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Drag grip */}
        {hasSiblings && (
          <div
            className="mt-2.5 flex-shrink-0 transition-opacity duration-150"
            style={{
              opacity: showActions || anyDragging ? 0.5 : 0.12,
              cursor: anyDragging ? 'grabbing' : 'grab',
            }}
          >
            <GripVertical className="w-3.5 h-3.5" style={{ color: 'var(--ui-text-faint)' }} />
          </div>
        )}

        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mt-0.5 transition-all duration-200"
          style={{
            backgroundColor: p.dot,
            boxShadow: showActions ? `0 0 0 4px ${p.glow}` : '0 0 0 0 transparent',
          }}
        >
          Q
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1">
          {isEditing ? (
            <div className="flex items-start gap-2">
              <textarea
                ref={textareaRef}
                autoFocus
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
                  if (e.key === 'Escape') { setIsEditing(false); setEditValue(node.content ?? ''); }
                }}
                rows={1}
                className="flex-1 text-sm rounded-xl px-3 py-2 resize-none focus:outline-none"
                style={{
                  backgroundColor: 'var(--ui-bg-input)',
                  border: '1.5px solid var(--ui-brand)',
                  color: 'var(--ui-text-primary)',
                  boxShadow: '0 0 0 3px rgba(181,56,79,0.08)',
                }}
              />
              <button onClick={handleSave} className="p-2 rounded-xl text-white transition-all hover:scale-105" style={{ backgroundColor: 'var(--ui-brand)' }}>
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => { setIsEditing(false); setEditValue(node.content ?? ''); }} className="p-2 rounded-xl transition-all hover:scale-105" style={{ backgroundColor: 'var(--ui-bg-subtle)', color: 'var(--ui-text-muted)' }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--ui-text-primary)' }}>
                {renderContent(node.content ?? '')}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px]" style={{ color: 'var(--ui-text-faint)' }}>
                  {formatDate(node.createdAt)}
                </span>
                {depth > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: p.badge, color: p.dot }}>
                    depth {depth}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div
            className="flex items-center gap-0.5 flex-shrink-0 pt-1 transition-all duration-150"
            style={{ opacity: showActions ? 1 : 0, transform: showActions ? 'translateX(0)' : 'translateX(4px)' }}
          >
            <button
              onClick={() => { setIsEditing(true); setEditValue(node.content ?? ''); }}
              className="p-1.5 rounded-lg transition-all hover:scale-105"
              style={{ color: 'var(--ui-text-faint)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)'; e.currentTarget.style.color = 'var(--ui-brand-text)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--ui-text-faint)'; }}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            {!isRoot && (
              <button
                onClick={() => { if (window.confirm('Delete this branch?')) deleteNode(node.id); }}
                className="p-1.5 rounded-lg transition-all hover:scale-105"
                style={{ color: 'var(--ui-text-faint)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--ui-callout-err-bg)'; e.currentTarget.style.color = 'var(--ui-callout-err-text)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--ui-text-faint)'; }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {isRegenerating && (
        <div className="flex items-center gap-2 mt-2 ml-10 text-xs" style={{ color: 'var(--ui-brand-muted)', animation: 'nrFadeUp 0.3s ease' }}>
          <Loader2 className="w-3 h-3 animate-spin" /> Regenerating…
        </div>
      )}

      {/* Children */}
      {node.children?.map(child => (
        <div key={child.id}>
          {child.type === 'answer' && (
            <>
              <Connector color={p.line} height={16} />
              <NodeRenderer
                node={child}
                conversationId={conversationId}
                onBranchCreate={onBranchCreate}
                forceCollapsed={forceCollapsed}
                depth={depth}
              />
            </>
          )}
          {child.type !== 'answer' && (
            <div className="mt-5 relative pl-5">
              <div className="absolute left-3 top-0 bottom-0 w-px" style={{ backgroundColor: p.line }} />
              <NodeRenderer
                node={child}
                conversationId={conversationId}
                onBranchCreate={onBranchCreate}
                forceCollapsed={forceCollapsed}
                depth={depth + 1}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   AnswerNode
   ───────────────────────────────────────────────────── */
function AnswerNode({
  node,
  conversationId,
  onBranchCreate,
  forceCollapsed,
  depth = 0,
}: NodeRendererProps) {
  const {
    collapsedNodeIds, toggleNodeCollapse, isBranching,
    processingNodeId, selectConversation, nodeSuggestions,
    summarizeNode, summarizingNodeIds,
  } = useConversationStore();
  const { draggingId } = useContext(DragContext);
  const anyDragging    = draggingId !== null;

  const isCollapsed   = collapsedNodeIds.has(node.id) || !!forceCollapsed;
  const isSummarizing = summarizingNodeIds.has(node.id);
  const p             = pal(depth);

  const [showBranchInput, setShowBranchInput] = useState(false);
  const [showActions, setShowActions]         = useState(false);
  const [mounted, setMounted]                 = useState(false);

  const getBranchesForBlock = (blockId: string): Node[] =>
    node.children?.filter(c => c.type === 'question' && c.parentBlockId === blockId) ?? [];

  const generalFollowups = node.children?.filter(
    c => c.type === 'question' && !c.parentBlockId
  ) ?? [];

  const totalBranches = node.children?.filter(c => c.type === 'question').length ?? 0;
  const copyText      = node.blocks?.map(b => b.content).join('\n\n') ?? '';

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  useEffect(() => {
    if (isCollapsed && !node.summarySnapshot && !isSummarizing && node.type === 'answer') {
      void summarizeNode(node.id);
    }
  }, [isCollapsed, node.summarySnapshot, node.id, isSummarizing, summarizeNode, node.type]);

  return (
    <div
      id={`node-${node.id}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* ── Card ── */}
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: 'var(--ui-card-bg)',
          border: '1px solid',
          borderColor: showActions && !anyDragging
            ? 'var(--ui-border-strong)'
            : 'var(--ui-card-border)',
          boxShadow: showActions && !anyDragging
            ? '0 8px 32px var(--ui-card-shadow)'
            : '0 1px 6px var(--ui-card-shadow)',
        }}
        onMouseEnter={() => !anyDragging && setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Left depth accent */}
        <div
          className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full transition-all duration-300"
          style={{ backgroundColor: p.dot, opacity: showActions && !anyDragging ? 0.65 : 0.2 }}
        />

        {/* Header */}
        <div className="flex items-center justify-between pl-5 pr-3 py-3">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--ui-bot-from), var(--ui-bot-to))' }}
            >
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--ui-text-secondary)' }}>BranchAI</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ backgroundColor: 'var(--ui-bg-subtle)', color: 'var(--ui-text-faint)' }}>
              {formatDate(node.createdAt)}
            </span>
            {totalBranches > 0 && (
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md font-semibold" style={{ backgroundColor: p.badge, color: p.dot }}>
                <GitBranch className="w-2.5 h-2.5" />
                {totalBranches}
              </span>
            )}
          </div>

          <div
            className="flex items-center gap-0.5 transition-all duration-150"
            style={{ opacity: showActions && !anyDragging ? 1 : 0 }}
          >
            <CopyBtn text={copyText} />
            <button
              onClick={() => toggleNodeCollapse(node.id)}
              className="p-1.5 rounded-lg transition-all hover:scale-105"
              style={{ color: 'var(--ui-text-faint)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="h-px ml-5 mr-4" style={{ backgroundColor: 'var(--ui-border-faint)' }} />

        {/* Body */}
        <div
          style={{
            maxHeight: isCollapsed ? 58 : 9999,
            overflow: 'hidden',
            transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Collapsed */}
          {isCollapsed ? (
            <div className="pl-5 pr-4 py-3" style={{ animation: 'nrFadeUp 0.2s ease' }}>
              {node.summarySnapshot ? (
                <p className="text-xs leading-relaxed italic line-clamp-2"
                  style={{ color: 'var(--ui-text-muted)', borderLeft: `2px solid ${p.dot}`, paddingLeft: 10 }}>
                  {node.summarySnapshot}
                </p>
              ) : isSummarizing ? (
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ui-brand-muted)' }}>
                  <Loader2 className="w-3 h-3 animate-spin" /> Summarizing…
                </div>
              ) : (
                <p className="text-xs italic" style={{ color: 'var(--ui-text-faint)' }}>
                  {node.blocks?.length ?? 0} sections{totalBranches > 0 ? ` · ${totalBranches} branches` : ''} · click ↑ to expand
                </p>
              )}
            </div>
          ) : (
            /* Expanded */
            <>
              <div className="pl-5 pr-4 pt-4 pb-2 space-y-5">
                {node.blocks?.map(block => {
                  const blockBranches = getBranchesForBlock(block.id);
                  return (
                    <div key={block.id}>
                      <BlockRenderer
                        block={block}
                        depth={depth}
                        conversationId={conversationId}
                        childBranches={blockBranches}
                        onAskFollowup={(bId, q) => onBranchCreate?.(node.id, bId, q)}
                      />
                      {blockBranches.length > 0 && (
                        <div className="mt-5">
                          <Connector color={p.line} height={12} />
                          <SiblingGroup
                            nodes={blockBranches}
                            conversationId={conversationId}
                            parentNodeId={node.id}
                            onBranchCreate={onBranchCreate}
                            forceCollapsed={isCollapsed}
                            depth={depth + 1}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pl-5 pr-4">
                <RelatedPanel nodeId={node.id} onNavigate={cId => selectConversation(cId)} />
              </div>
              <div className="pl-5 pr-4">
                <SuggestionChips
                  suggestions={nodeSuggestions[node.id] ?? []}
                  onSelect={q => onBranchCreate?.(node.id, null, q)}
                />
              </div>

              <div className="pl-5 pr-4 pb-4 pt-3">
                {showBranchInput ? (
                  <div style={{ animation: 'nrFadeUp 0.2s ease' }}>
                    <BranchInput
                      conversationId={conversationId}
                      onSubmit={q => { onBranchCreate?.(node.id, null, q); setShowBranchInput(false); }}
                      onCancel={() => setShowBranchInput(false)}
                      placeholder="Ask anything about this response…"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowBranchInput(true)}
                    className="group flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl w-full sm:w-auto transition-all duration-200"
                    style={{ border: '1.5px dashed var(--ui-border)', color: 'var(--ui-text-faint)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = p.dot;
                      e.currentTarget.style.color = p.dot;
                      e.currentTarget.style.backgroundColor = p.glow;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--ui-border)';
                      e.currentTarget.style.color = 'var(--ui-text-faint)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <CornerDownRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    Branch from here
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Follow-up branches */}
      {!isCollapsed && generalFollowups.length > 0 && (
        <div className="mt-4" style={{ animation: 'nrFadeUp 0.35s ease' }}>
          <Connector color={p.line} height={16} />
          <SiblingGroup
            nodes={generalFollowups}
            conversationId={conversationId}
            parentNodeId={node.id}
            onBranchCreate={onBranchCreate}
            forceCollapsed={false}
            depth={depth + 1}
          />
        </div>
      )}

      {/* Generation shimmer */}
      {!isCollapsed && isBranching && processingNodeId === node.id && (
        <div className="mt-4" style={{ animation: 'nrFadeUp 0.25s ease' }}>
          <Connector color={p.line} height={16} />
          <LoadingShimmer />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   NodeRenderer dispatcher
   ───────────────────────────────────────────────────── */
export const NodeRenderer: React.FC<NodeRendererProps> = (props) => {
  if (props.node.type === 'question') return <QuestionNode {...props} />;
  return <AnswerNode {...props} />;
};

/* ─────────────────────────────────────────────────────
   Keyframes
   ───────────────────────────────────────────────────── */
if (typeof document !== 'undefined' && !document.getElementById('nr-kf')) {
  const s = document.createElement('style');
  s.id = 'nr-kf';
  s.textContent = `
    @keyframes nrFadeUp {
      from { opacity:0; transform:translateY(8px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes nrPop {
      0%  { transform:scale(0.6); }
      70% { transform:scale(1.2); }
      100%{ transform:scale(1); }
    }
  `;
  document.head.appendChild(s);
}