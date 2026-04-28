// src/components/tree/TreeSidebar.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GitBranch, Eye, EyeOff, ChevronRight,
  PanelLeftClose, PanelLeftOpen, Search, X,
  Layers, Hash,
} from 'lucide-react';
import { useConversationStore } from '../../store/conversationStore';
import { truncate } from '../../lib/utils';
import type { Node } from '../../types/index';

/* ─────────────────────────────────────────────────────
   Depth palette — matches NodeRenderer exactly
   ───────────────────────────────────────────────────── */
const DEPTH_PALETTE = [
  { dot: '#d4586f', line: 'rgba(212,88,111,0.2)',  glow: 'rgba(212,88,111,0.08)'  },
  { dot: '#7c6f9f', line: 'rgba(124,111,159,0.2)', glow: 'rgba(124,111,159,0.08)' },
  { dot: '#4a9f7c', line: 'rgba(74,159,124,0.2)',  glow: 'rgba(74,159,124,0.08)'  },
  { dot: '#c4933f', line: 'rgba(196,147,63,0.2)',  glow: 'rgba(196,147,63,0.08)'  },
  { dot: '#6382c4', line: 'rgba(99,130,196,0.2)',  glow: 'rgba(99,130,196,0.08)'  },
];
const pal = (d: number) => DEPTH_PALETTE[d % DEPTH_PALETTE.length];

/* ─────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────── */
function getEffectiveChildren(node: Node): Node[] {
  if (node.type !== 'question') return [];
  return node.children?.flatMap(answer => answer.children ?? []) ?? [];
}

function countDescendants(node: Node): number {
  const kids = getEffectiveChildren(node);
  return kids.reduce((sum, k) => sum + 1 + countDescendants(k), 0);
}

function flattenNodes(nodes: Node[], depth = 0): Array<{ node: Node; depth: number }> {
  return nodes.flatMap(n => [
    { node: n, depth },
    ...flattenNodes(getEffectiveChildren(n), depth + 1),
  ]);
}

function nodeMatchesSearch(node: Node, q: string): boolean {
  return (node.content ?? '').toLowerCase().includes(q.toLowerCase());
}

/* ─────────────────────────────────────────────────────
   Scroll + highlight helper
   ───────────────────────────────────────────────────── */
function scrollToNode(nodeId: string, p: ReturnType<typeof pal>) {
  const el = document.getElementById(`node-${nodeId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.style.transition = 'box-shadow 0.2s ease';
  el.style.boxShadow  = `0 0 0 2px ${p.dot}55, 0 0 0 5px ${p.glow}`;
  setTimeout(() => { el.style.boxShadow = ''; }, 1400);
}

/* ─────────────────────────────────────────────────────
   TreeNodeItem
   ───────────────────────────────────────────────────── */
interface TreeNodeItemProps {
  node:         Node;
  activeNodeId: string | null;
  onNodeSelect: (id: string) => void;
  depth:        number;
  searchQuery:  string;
  forceExpand?: boolean;
  onNodeDrop?:  (srcId: string, targetId: string) => void;
  draggable?:   boolean;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node, activeNodeId, onNodeSelect, depth, searchQuery, forceExpand, onNodeDrop, draggable,
}) => {
  const { toggleNodeCollapse, collapsedNodeIds } = useConversationStore();
  const effectiveChildren = getEffectiveChildren(node);
  const hasChildren       = effectiveChildren.length > 0;
  const answerNode        = node.children?.find(c => c.type === 'answer');
  const isAnswerCollapsed = answerNode ? collapsedNodeIds.has(answerNode.id) : false;
  const isActive          = activeNodeId === node.id;
  const p                 = pal(depth);
  const descCount         = countDescendants(node);

  // Auto-expand when searching or when explicitly forced
  const [expanded, setExpanded] = useState(true);
  const isExpanded = forceExpand ? true : expanded;

  // Highlight match in label
  const label = truncate(node.content ?? 'Question', 36);
  const renderLabel = () => {
    if (!searchQuery.trim()) return <span>{label}</span>;
    const idx = label.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (idx === -1) return <span>{label}</span>;
    return (
      <span>
        {label.slice(0, idx)}
        <mark
          className="rounded-sm px-0.5"
          style={{ backgroundColor: `${p.dot}30`, color: p.dot }}
        >
          {label.slice(idx, idx + searchQuery.length)}
        </mark>
        {label.slice(idx + searchQuery.length)}
      </span>
    );
  };

  const [mounted, setMounted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), depth * 30); return () => clearTimeout(t); }, [depth]);

  const handleClick = () => {
    onNodeSelect(node.id);
    scrollToNode(node.id, p);
  };

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0)' : 'translateX(-6px)',
        transition: `opacity 0.25s ease ${depth * 0.03}s, transform 0.25s ease ${depth * 0.03}s`,
      }}
    >
      <div className="relative flex items-stretch">
        {/* Vertical depth lines */}
        {Array.from({ length: depth }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px flex-shrink-0"
            style={{
              left: `${i * 16 + 10}px`,
              backgroundColor: pal(i).line,
            }}
          />
        ))}

        {/* Row button */}
        <button
          onClick={handleClick}
          draggable={draggable}
          onDragStart={(e) => {
            e.stopPropagation();
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', node.id);
          }}
          onDragOver={(e) => {
            if (!draggable) return;
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            if (!draggable) return;
            e.preventDefault();
            e.stopPropagation();
            setIsDragOver(false);
            const srcId = e.dataTransfer.getData('text/plain');
            if (srcId && srcId !== node.id && onNodeDrop) {
              onNodeDrop(srcId, node.id);
            }
          }}
          className="group relative flex items-center gap-2 w-full py-1.5 pr-2 rounded-xl text-left transition-all duration-150"
          style={{
            paddingLeft: `${depth * 16 + 8}px`,
            backgroundColor: isActive ? p.glow : 'transparent',
            outline: isActive ? `1.5px solid ${p.dot}40` : 'none',
            borderTop: isDragOver ? `2px solid ${p.dot}` : '2px solid transparent',
            marginTop: isDragOver ? -2 : 0,
          }}
          onMouseEnter={e => {
            if (!isActive)
              e.currentTarget.style.backgroundColor = 'var(--ui-sidebar-hover)';
          }}
          onMouseLeave={e => {
            if (!isActive)
              e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {/* Expand toggle */}
          <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
            {hasChildren ? (
              <button
                onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
                className="w-4 h-4 rounded-md flex items-center justify-center transition-all hover:scale-110"
                style={{ color: isExpanded ? p.dot : 'var(--ui-text-faint)' }}
              >
                <ChevronRight
                  className="w-3 h-3 transition-transform duration-200"
                  style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  strokeWidth={2.5}
                />
              </button>
            ) : (
              /* Leaf node — small dot */
              <div
                className="w-1.5 h-1.5 rounded-full mx-auto transition-all duration-200"
                style={{
                  backgroundColor: isActive ? p.dot : 'var(--ui-border-strong)',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            )}
          </div>

          {/* Label */}
          <span
            className="flex-1 min-w-0 truncate text-[11.5px] leading-snug transition-colors duration-150"
            style={{
              color: isActive ? p.dot : 'var(--ui-text-secondary)',
              fontWeight: isActive ? 600 : 450,
            }}
          >
            {renderLabel()}
          </span>

          {/* Descendant count badge */}
          {hasChildren && !isExpanded && (
            <span
              className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1"
              style={{ backgroundColor: p.glow, color: p.dot }}
            >
              {descCount}
            </span>
          )}

          {/* Answer collapse toggle — shown on hover or when collapsed */}
          {answerNode && (
            <button
              onClick={e => { e.stopPropagation(); toggleNodeCollapse(answerNode.id); }}
              className="flex-shrink-0 p-1 rounded-lg transition-all duration-150 ml-0.5"
              style={{
                color: isAnswerCollapsed ? p.dot : 'var(--ui-text-faint)',
                opacity: isAnswerCollapsed ? 1 : 0,
              }}
              title={isAnswerCollapsed ? 'Show response' : 'Hide response'}
              // Show on row hover via CSS group
              onFocus={e => (e.currentTarget.style.opacity = '1')}
              onBlur={e => { if (!isAnswerCollapsed) e.currentTarget.style.opacity = '0'; }}
            >
              {isAnswerCollapsed
                ? <EyeOff className="w-3 h-3" />
                : <Eye    className="w-3 h-3" />}
            </button>
          )}
        </button>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div style={{ animation: 'tsSlideIn 0.2s ease' }}>
          {effectiveChildren.map(child => (
            <TreeNodeItem
              key={child.id}
              node={child}
              activeNodeId={activeNodeId}
              onNodeSelect={onNodeSelect}
              depth={depth + 1}
              searchQuery={searchQuery}
              forceExpand={forceExpand}
              draggable={!searchQuery.trim() && effectiveChildren.length > 1}
              onNodeDrop={(srcId, targetId) => {
                const ids = effectiveChildren.map(c => c.id);
                const from = ids.indexOf(srcId);
                const to = ids.indexOf(targetId);
                if (from === -1 || to === -1) return;
                ids.splice(from, 1);
                ids.splice(to, 0, srcId);
                const srcNode = effectiveChildren.find(c => c.id === srcId);
                if (srcNode && srcNode.parentNodeId) {
                  useConversationStore.getState().reorderNodes(srcNode.parentNodeId, ids);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   Stats bar
   ───────────────────────────────────────────────────── */
function StatsBar({ rootNodes }: { rootNodes: Node[] }) {
  const flat      = flattenNodes(rootNodes);
  const total     = flat.length;
  const maxDepth  = flat.reduce((m, { depth }) => Math.max(m, depth), 0);

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 mx-2 mb-2 rounded-xl"
      style={{ backgroundColor: 'var(--ui-bg-subtle)', border: '1px solid var(--ui-border-faint)' }}
    >
      <div className="flex items-center gap-1.5">
        <Hash className="w-3 h-3" style={{ color: 'var(--ui-text-faint)' }} />
        <span className="text-[10px] font-semibold" style={{ color: 'var(--ui-text-muted)' }}>
          {total} node{total !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="w-px h-3" style={{ backgroundColor: 'var(--ui-border)' }} />
      <div className="flex items-center gap-1.5">
        <Layers className="w-3 h-3" style={{ color: 'var(--ui-text-faint)' }} />
        <span className="text-[10px] font-semibold" style={{ color: 'var(--ui-text-muted)' }}>
          {maxDepth + 1} level{maxDepth > 0 ? 's' : ''}
        </span>
      </div>
      {/* Depth color legend */}
      <div className="ml-auto flex items-center gap-1">
        {DEPTH_PALETTE.slice(0, Math.min(maxDepth + 1, 5)).map((p, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{ backgroundColor: p.dot, opacity: 0.7 }}
            title={`Depth ${i}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Collapsed rail
   ───────────────────────────────────────────────────── */
function CollapsedRail({
  rootNodes,
  activeNodeId,
  onNodeSelect,
  onExpand,
}: {
  rootNodes:    Node[];
  activeNodeId: string | null;
  onNodeSelect: (id: string) => void;
  onExpand:     () => void;
}) {
  const flat = flattenNodes(rootNodes).filter(({ node }) => node.type === 'question');

  return (
    <div
      className="flex flex-col items-center py-3 gap-1 flex-shrink-0"
      style={{
        width: 48,
        height: '100%',
        backgroundColor: 'var(--ui-sidebar-bg)',
        borderRight: '1px solid var(--ui-border-faint)',
      }}
    >
      {/* Expand */}
      <button
        onClick={onExpand}
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 mb-1"
        style={{ color: 'var(--ui-text-faint)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        title="Expand navigator"
      >
        <PanelLeftOpen className="w-4 h-4" />
      </button>

      <div className="w-5 h-px mb-1" style={{ backgroundColor: 'var(--ui-border-faint)' }} />

      {/* Mini node dots */}
      <div className="flex-1 flex flex-col items-center gap-0 overflow-hidden w-full px-1.5">
        {flat.slice(0, 12).map(({ node, depth }, i) => {
          const isActive = activeNodeId === node.id;
          const p        = pal(depth);
          const kids     = getEffectiveChildren(node).length;

          return (
            <button
              key={node.id}
              onClick={() => { onNodeSelect(node.id); scrollToNode(node.id, p); }}
              title={truncate(node.content ?? 'Question', 40)}
              className="relative flex items-center justify-center w-full py-1.5 group"
              style={{ animation: `nrFadeUp 0.2s ease ${i * 0.03}s both` }}
            >
              {/* Connecting line */}
              {i < flat.slice(0, 12).length - 1 && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-px"
                  style={{ height: 4, backgroundColor: 'var(--ui-border-faint)' }}
                />
              )}

              <div
                className="transition-all duration-200"
                style={{
                  width:  isActive ? 26 : depth === 0 ? 22 : 16,
                  height: isActive ? 26 : depth === 0 ? 22 : 16,
                  borderRadius: isActive ? 10 : depth === 0 ? 8 : 6,
                  backgroundColor: isActive ? p.dot : 'var(--ui-bg-subtle)',
                  border: `1.5px solid ${isActive ? p.dot : 'var(--ui-border)'}`,
                  boxShadow: isActive ? `0 0 0 3px ${p.glow}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: `${depth * 3}px`,
                }}
              >
                <GitBranch
                  style={{
                    width:  isActive ? 12 : 9,
                    height: isActive ? 12 : 9,
                    color:  isActive ? 'white' : 'var(--ui-text-faint)',
                    strokeWidth: 1.5,
                    transition: 'all 0.2s ease',
                  }}
                />
                {kids > 0 && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: p.dot, fontSize: 6, color: 'white', fontWeight: 700 }}
                  >
                    {kids > 9 ? '9+' : kids}
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {flat.length > 12 && (
          <button
            onClick={onExpand}
            className="mt-1 text-[9px] font-bold transition-all"
            style={{ color: 'var(--ui-text-faint)' }}
          >
            +{flat.length - 12}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   TreeSidebar
   ───────────────────────────────────────────────────── */
interface TreeSidebarProps {
  rootNodes:    Node[];
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

export const TreeSidebar: React.FC<TreeSidebarProps> = ({
  rootNodes, activeNodeId, onNodeSelect,
}) => {
  const [collapsed, setCollapsed]       = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef                       = useRef<HTMLInputElement>(null);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  // Filter nodes by search
  const matchingIds = searchQuery.trim()
    ? new Set(
        flattenNodes(rootNodes)
          .filter(({ node }) => nodeMatchesSearch(node, searchQuery))
          .map(({ node }) => node.id)
      )
    : null;

  const visibleRoots = searchQuery.trim()
    ? rootNodes.filter(root => {
        const flat = flattenNodes([root]);
        return flat.some(({ node }) => nodeMatchesSearch(node, searchQuery));
      })
    : rootNodes;

  const matchCount = matchingIds?.size ?? 0;

  if (collapsed) {
    return (
      <CollapsedRail
        rootNodes={rootNodes}
        activeNodeId={activeNodeId}
        onNodeSelect={onNodeSelect}
        onExpand={() => setCollapsed(false)}
      />
    );
  }

  return (
    <div
      className="flex flex-col flex-shrink-0 h-full"
      style={{
        width: 240,
        backgroundColor: 'var(--ui-sidebar-bg)',
        borderRight: '1px solid var(--ui-border-faint)',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0)' : 'translateX(-8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-3 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--ui-border-faint)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
            }}
          >
            <GitBranch className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-bold" style={{ color: 'var(--ui-text-primary)' }}>
            Navigator
          </span>
        </div>

        <button
          onClick={() => setCollapsed(true)}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105"
          style={{ color: 'var(--ui-text-faint)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          title="Collapse navigator"
        >
          <PanelLeftClose className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Search ── */}
      <div className="px-2 py-2 flex-shrink-0">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: 'var(--ui-bg-input)',
            border: '1.5px solid',
            borderColor: searchFocused ? 'var(--ui-brand)' : 'var(--ui-border-faint)',
            boxShadow: searchFocused ? '0 0 0 3px rgba(181,56,79,0.07)' : 'none',
          }}
        >
          <Search className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--ui-text-faint)' }} />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search nodes…"
            className="flex-1 text-[11px] bg-transparent border-none outline-none min-w-0"
            style={{ color: 'var(--ui-text-primary)' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="flex-shrink-0">
              <X className="w-3 h-3" style={{ color: 'var(--ui-text-faint)' }} />
            </button>
          )}
        </div>

        {/* Search result count */}
        {searchQuery.trim() && (
          <p
            className="text-[10px] mt-1.5 px-1 transition-all"
            style={{
              color: matchCount > 0 ? 'var(--ui-brand-text)' : 'var(--ui-text-faint)',
              animation: 'nrFadeUp 0.15s ease',
            }}
          >
            {matchCount > 0 ? `${matchCount} match${matchCount !== 1 ? 'es' : ''}` : 'No matches'}
          </p>
        )}
      </div>

      {/* ── Stats bar ── */}
      {rootNodes.length > 0 && !searchQuery && (
        <StatsBar rootNodes={rootNodes} />
      )}

      {/* ── Tree ── */}
      <div className="flex-1 overflow-y-auto px-1.5 pb-4" style={{ scrollbarWidth: 'thin' }}>
        {rootNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--ui-bg-subtle)', border: '1px solid var(--ui-border-faint)' }}
            >
              <GitBranch className="w-5 h-5" style={{ color: 'var(--ui-text-faint)' }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--ui-text-secondary)' }}>
                No branches yet
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ui-text-faint)' }}>
                Start a conversation to see your knowledge tree
              </p>
            </div>
          </div>
        ) : visibleRoots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Search className="w-4 h-4" style={{ color: 'var(--ui-text-faint)' }} />
            <p className="text-[11px]" style={{ color: 'var(--ui-text-faint)' }}>
              No nodes match "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="pt-1 space-y-0.5">
            {visibleRoots.map((root, i) => (
              <div
                key={root.id}
                style={{ animation: `nrFadeUp 0.25s ease ${i * 0.04}s both` }}
              >
                {/* Root thread separator */}
                {i > 0 && (
                  <div
                    className="mx-2 my-2 h-px"
                    style={{ backgroundColor: 'var(--ui-border-faint)' }}
                  />
                )}
                <TreeNodeItem
                  node={root}
                  activeNodeId={activeNodeId}
                  onNodeSelect={onNodeSelect}
                  depth={0}
                  searchQuery={searchQuery}
                  forceExpand={!!searchQuery.trim()}
                  draggable={!searchQuery.trim() && visibleRoots.length > 1}
                  onNodeDrop={(srcId, targetId) => {
                    const ids = visibleRoots.map(c => c.id);
                    const from = ids.indexOf(srcId);
                    const to = ids.indexOf(targetId);
                    if (from === -1 || to === -1) return;
                    ids.splice(from, 1);
                    ids.splice(to, 0, srcId);
                    useConversationStore.getState().reorderNodes(null, ids);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes tsSlideIn {
          from { opacity:0; transform:translateX(-4px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes nrFadeUp {
          from { opacity:0; transform:translateY(5px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .group:hover .eye-toggle { opacity: 1 !important; }
      `}</style>
    </div>
  );
};