// src/components/layout/Sidebar.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  GitBranch, Plus, Star, Clock, Archive,
  ChevronRight, MoreHorizontal, Loader2,
  Trash2, Edit3, StarOff, PanelLeftClose, PanelLeftOpen, X,
  Network, Search, MessageSquare, Sparkles,
  Home, Settings, ChevronDown,
} from 'lucide-react';
import { cn, formatDate, truncate } from '../../lib/utils';
import type { ConversationSummary } from '../../types';

interface SidebarProps {
  conversations:         ConversationSummary[];
  activeConversationId:  string | null;
  isLoading?:            boolean;
  onSelectConversation:  (id: string) => void;
  onNewConversation:     () => void;
  onDeleteConversation?: (id: string) => void;
  onRenameConversation?: (id: string, newTitle: string) => void;
  onToggleFavorite?:     (id: string) => void;
  onOpenKnowledgeBase?:  () => void;
  onOpenKnowledgeGraph?: () => void;
  onClose?:              () => void;
}

/* ─────────────────────────────────────────────────────
   Tooltip for collapsed icon buttons
   ───────────────────────────────────────────────────── */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap z-50 pointer-events-none"
          style={{
            backgroundColor: 'var(--ui-bg-elevated)',
            color: 'var(--ui-text-primary)',
            border: '1px solid var(--ui-border)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            animation: 'tooltipIn 0.12s ease',
          }}
        >
          {label}
          {/* Arrow */}
          <div
            className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent"
            style={{ borderRightColor: 'var(--ui-border)' }}
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Collapsed rail icon button
   ───────────────────────────────────────────────────── */
function RailBtn({
  icon: Icon,
  label,
  onClick,
  active = false,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  active?: boolean;
  accent?: boolean;
}) {
  return (
    <Tooltip label={label}>
      <button
        onClick={onClick}
        className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: active
            ? 'var(--ui-brand-subtle)'
            : accent
            ? 'linear-gradient(135deg, var(--ui-brand), var(--ui-bot-to))'
            : 'transparent',
          color: active
            ? 'var(--ui-brand-text)'
            : accent
            ? 'white'
            : 'var(--ui-text-muted)',
        }}
        onMouseEnter={(e) => {
          if (!active && !accent)
            e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)';
        }}
        onMouseLeave={(e) => {
          if (!active && !accent)
            e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {active && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
            style={{ backgroundColor: 'var(--ui-brand)' }}
          />
        )}
        <Icon className="w-4.5 h-4.5" />
      </button>
    </Tooltip>
  );
}

/* ─────────────────────────────────────────────────────
   Storage ring (collapsed)
   ───────────────────────────────────────────────────── */
function StorageRing({ used, total }: { used: number; total: number }) {
  const pct = Math.min(used / total, 1);
  const r = 14;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const color =
    pct > 0.8 ? 'var(--ui-callout-err-border)' :
    pct > 0.6 ? 'var(--ui-callout-warn-border)' :
    'var(--ui-brand-muted)';

  return (
    <Tooltip label={`${used}/${total} threads`}>
      <div className="w-10 h-10 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 36 36">
          {/* Track */}
          <circle
            cx="18" cy="18" r={r}
            fill="none"
            stroke="var(--ui-border)"
            strokeWidth="2.5"
          />
          {/* Progress */}
          <circle
            cx="18" cy="18" r={r}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
              transition: 'stroke-dashoffset 0.6s ease',
            }}
          />
          <text
            x="18" y="22"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--ui-text-muted)"
          >
            {used}/{total}
          </text>
        </svg>
      </div>
    </Tooltip>
  );
}

/* ─────────────────────────────────────────────────────
   Storage bar (expanded)
   ───────────────────────────────────────────────────── */
function StorageBar({ used, total }: { used: number; total: number }) {
  const pct = Math.min((used / total) * 100, 100);
  const color =
    pct > 80 ? 'var(--ui-callout-err-border)' :
    pct > 60 ? 'var(--ui-callout-warn-border)' :
    'var(--ui-brand-muted)';

  return (
    <div
      className="rounded-xl p-3"
      style={{
        backgroundColor: 'var(--ui-bg-subtle)',
        border: '1px solid var(--ui-border-faint)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--ui-text-faint)' }}
        >
          Storage
        </span>
        <span className="text-[10px] font-semibold" style={{ color: 'var(--ui-text-muted)' }}>
          {used}/{total}
        </span>
      </div>
      <div
        className="w-full h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--ui-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-[10px] mt-1.5" style={{ color: 'var(--ui-text-faint)' }}>
        {total - used} thread{total - used !== 1 ? 's' : ''} remaining
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Conversation row
   ───────────────────────────────────────────────────── */
const ConversationItem: React.FC<{
  conversation:          ConversationSummary;
  isActive:              boolean;
  isRenaming:            boolean;
  menuOpenId:            string | null;
  renameValue:           string;
  menuRef:               React.RefObject<HTMLDivElement>;
  onSelect:              () => void;
  onMenuToggle:          () => void;
  onRenameStart:         () => void;
  onRenameChange:        (v: string) => void;
  onRenameSubmit:        () => void;
  onRenameCancel:        () => void;
  onFavorite:            (e: React.MouseEvent) => void;
  onDelete:              (e: React.MouseEvent) => void;
}> = ({
  conversation, isActive, isRenaming, menuOpenId, renameValue,
  menuRef, onSelect, onMenuToggle, onRenameStart, onRenameChange,
  onRenameSubmit, onRenameCancel, onFavorite, onDelete,
}) => {
  const [hovered, setHovered] = useState(false);
  const menuOpen = menuOpenId === conversation.id;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Active bar */}
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full z-10"
          style={{ backgroundColor: 'var(--ui-brand)' }}
        />
      )}

      <button
        onClick={() => !isRenaming && onSelect()}
        className="w-full flex items-start gap-2.5 pl-3 pr-2 py-2.5 rounded-xl text-left transition-all duration-150"
        style={{
          backgroundColor: isActive
            ? 'var(--ui-brand-subtle)'
            : hovered
            ? 'var(--ui-sidebar-hover)'
            : 'transparent',
        }}
      >
        {/* Dot indicator */}
        <div className="mt-1.5 flex-shrink-0">
          <div
            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: isActive
                ? 'var(--ui-brand)'
                : hovered
                ? 'var(--ui-text-faint)'
                : 'var(--ui-border-strong)',
              transform: isActive ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => onRenameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter')  onRenameSubmit();
                if (e.key === 'Escape') onRenameCancel();
              }}
              onBlur={onRenameSubmit}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-sm rounded-lg px-2 py-0.5 focus:outline-none"
              style={{
                backgroundColor: 'var(--ui-bg-base)',
                border: '1.5px solid var(--ui-brand)',
                color: 'var(--ui-text-primary)',
                boxShadow: '0 0 0 3px rgba(181,56,79,0.1)',
              }}
            />
          ) : (
            <p
              className="text-sm font-medium truncate leading-snug"
              style={{
                color: isActive
                  ? 'var(--ui-brand-text)'
                  : 'var(--ui-text-secondary)',
              }}
            >
              {truncate(conversation.title, 26)}
            </p>
          )}
          {!isRenaming && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px]" style={{ color: 'var(--ui-text-faint)' }}>
                {formatDate(conversation.updatedAt)}
              </span>
              {(conversation._count?.nodes ?? 0) > 0 && (
                <>
                  <span style={{ color: 'var(--ui-border-strong)', fontSize: 8 }}>●</span>
                  <span className="text-[11px]" style={{ color: 'var(--ui-text-faint)' }}>
                    {conversation._count.nodes} nodes
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Favorite star */}
        {conversation.isFavorite && !isRenaming && (
          <Star
            className="w-3 h-3 flex-shrink-0 mt-1"
            style={{ color: '#d97706', opacity: hovered || isActive ? 1 : 0.5 }}
          />
        )}
      </button>

      {/* Hover action tray */}
      {!isRenaming && (hovered || menuOpen) && (
        <div
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 z-10"
          style={{ animation: 'fadeIn 0.1s ease' }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onRenameStart(); }}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: 'var(--ui-text-faint)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{
              color: menuOpen ? 'var(--ui-text-primary)' : 'var(--ui-text-faint)',
              backgroundColor: menuOpen ? 'var(--ui-bg-subtle)' : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!menuOpen)
                e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)';
            }}
            onMouseLeave={(e) => {
              if (!menuOpen)
                e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Context menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 top-full mt-1 w-48 rounded-xl border py-1 z-50"
          style={{
            backgroundColor: 'var(--ui-bg-elevated)',
            borderColor: 'var(--ui-border)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
            animation: 'menuIn 0.15s cubic-bezier(0.34,1.2,0.64,1)',
          }}
        >
          <button
            onClick={onFavorite}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ color: 'var(--ui-text-secondary)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            {conversation.isFavorite ? (
              <>
                <StarOff className="w-3.5 h-3.5" style={{ color: 'var(--ui-text-faint)' }} />
                Unfavorite
              </>
            ) : (
              <>
                <Star className="w-3.5 h-3.5" style={{ color: '#d97706' }} />
                Add to favorites
              </>
            )}
          </button>
          <div className="mx-3 my-1 h-px" style={{ backgroundColor: 'var(--ui-border-faint)' }} />
          <button
            onClick={onDelete}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ color: 'var(--ui-callout-err-text)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--ui-callout-err-bg)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete thread
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   Main Sidebar
   ───────────────────────────────────────────────────── */
export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  isLoading = false,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onToggleFavorite,
  onOpenKnowledgeBase,
  onOpenKnowledgeGraph,
  onClose,
}) => {
  const [isCollapsed, setIsCollapsed]   = useState(false);
  const [menuOpenId, setMenuOpenId]     = useState<string | null>(null);
  const [renamingId, setRenamingId]     = useState<string | null>(null);
  const [renameValue, setRenameValue]   = useState('');
  const [searchQuery, setSearchQuery]   = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [favOpen, setFavOpen]           = useState(true);
  const [recentOpen, setRecentOpen]     = useState(true);
  const menuRef                         = useRef<HTMLDivElement>(null);
  const searchRef                       = useRef<HTMLInputElement>(null);

  /* Close menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpenId(null);
    };
    if (menuOpenId) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpenId]);

  /* ⌘K → search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isCollapsed) setIsCollapsed(false);
        setTimeout(() => searchRef.current?.focus(), 50);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isCollapsed]);

  const filtered = searchQuery.trim()
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const favorites = filtered.filter((c) =>  c.isFavorite);
  const recent    = filtered.filter((c) => !c.isFavorite);

  const handleRenameSubmit = useCallback(
    (conv: ConversationSummary) => {
      const trimmed = renameValue.trim();
      if (trimmed && trimmed !== conv.title)
        onRenameConversation?.(conv.id, trimmed);
      setRenamingId(null);
    },
    [renameValue, onRenameConversation]
  );

  /* ── Section header ── */
  const SectionHeader = ({
    label, count, open, onToggle,
  }: { label: string; count: number; open: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-2 px-2 py-1 rounded-lg transition-colors group"
      style={{ color: 'var(--ui-text-faint)' }}
    >
      <ChevronDown
        className="w-3 h-3 transition-transform duration-200 flex-shrink-0"
        style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
      />
      <span className="text-[10px] font-bold uppercase tracking-widest flex-1 text-left">
        {label}
      </span>
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
        style={{
          backgroundColor: 'var(--ui-bg-subtle)',
          color: 'var(--ui-text-faint)',
        }}
      >
        {count}
      </span>
    </button>
  );

  /* ══════════════════════════════════════════════════
     COLLAPSED RAIL
     ══════════════════════════════════════════════════ */
  if (isCollapsed) {
    return (
      <aside
        className="flex-shrink-0 flex flex-col items-center py-3 gap-1 h-full"
        style={{
          width: 64,
          backgroundColor: 'var(--ui-sidebar-bg)',
          borderRight: '1px solid var(--ui-border-faint)',
        }}
      >
        {/* Logo mark */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
          }}
        >
          <GitBranch className="w-4.5 h-4.5 text-white" />
        </div>

        {/* Expand */}
        <Tooltip label="Expand sidebar">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{ color: 'var(--ui-text-faint)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </Tooltip>

        <div className="w-5 h-px my-1" style={{ backgroundColor: 'var(--ui-border-faint)' }} />

        {/* New thread */}
        <Tooltip label="New thread">
          <button
            onClick={onNewConversation}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(181,56,79,0.3)',
            }}
          >
            <Plus className="w-4.5 h-4.5" />
          </button>
        </Tooltip>

        <div className="w-5 h-px my-1" style={{ backgroundColor: 'var(--ui-border-faint)' }} />

        {/* Nav */}
        <RailBtn icon={Network} label="Knowledge Graph" onClick={onOpenKnowledgeGraph} accent />
        <RailBtn icon={Archive} label="Knowledge Base"  onClick={onOpenKnowledgeBase} />

        <div className="w-5 h-px my-1" style={{ backgroundColor: 'var(--ui-border-faint)' }} />
        <RailBtn icon={GitBranch} label="View Branches"  onClick={() => setIsCollapsed(false)} />

        {/* Storage ring */}
        <div className="mt-auto pt-2">
          <StorageRing used={conversations.length} total={5} />
        </div>
      </aside>
    );
  }

  /* ══════════════════════════════════════════════════
     EXPANDED SIDEBAR
     ══════════════════════════════════════════════════ */
  return (
    <aside
      className="flex-shrink-0 flex flex-col"
      style={{
        width: 272,
        height: '100%',
        backgroundColor: 'var(--ui-sidebar-bg)',
        borderRight: '1px solid var(--ui-border-faint)',
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: 56, borderBottom: '1px solid var(--ui-border-faint)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background:
                'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
            }}
          >
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: 'var(--ui-text-primary)' }}
            >
              BranchAI
            </span>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
              style={{
                backgroundColor: 'var(--ui-brand-subtle)',
                color: 'var(--ui-brand-text)',
              }}
            >
              beta
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex w-7 h-7 rounded-lg items-center justify-center transition-colors"
            style={{ color: 'var(--ui-text-faint)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
            title="Collapse"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: 'var(--ui-text-faint)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── New thread ── */}
      <div className="px-3 pt-3 pb-2 flex-shrink-0">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] group"
          style={{
            background:
              'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
            color: 'white',
            boxShadow: '0 4px 14px rgba(181,56,79,0.28)',
          }}
        >
          <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
          New Thread
          <Sparkles className="w-3.5 h-3.5 ml-auto opacity-70" />
        </button>
      </div>

      {/* ── Search ── */}
      <div className="px-3 pb-2 flex-shrink-0">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: 'var(--ui-bg-input)',
            border: '1.5px solid',
            borderColor: searchFocused ? 'var(--ui-brand)' : 'var(--ui-border-faint)',
            boxShadow: searchFocused ? '0 0 0 3px rgba(181,56,79,0.08)' : 'none',
          }}
        >
          <Search
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: 'var(--ui-text-faint)' }}
          />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search threads…"
            className="flex-1 text-xs bg-transparent border-none outline-none min-w-0"
            style={{ color: 'var(--ui-text-primary)' }}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="tap-sm"
              style={{ color: 'var(--ui-text-faint)' }}
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <kbd
              className="hidden sm:flex text-[9px] px-1.5 py-0.5 rounded font-mono"
              style={{
                backgroundColor: 'var(--ui-border)',
                color: 'var(--ui-text-faint)',
              }}
            >
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* ── Nav pills ── */}
      <div className="px-3 pb-3 flex flex-col gap-1 flex-shrink-0">
        {[
          { icon: Network, label: 'Knowledge Graph', action: onOpenKnowledgeGraph, accent: true },
          { icon: Archive, label: 'Knowledge Base',  action: onOpenKnowledgeBase,  accent: false },
        ].map(({ icon: Icon, label, action, accent }) => (
          <button
            key={label}
            onClick={action}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150"
            style={{ color: accent ? 'var(--ui-brand-text)' : 'var(--ui-text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accent
                ? 'var(--ui-brand-subtle)'
                : 'var(--ui-bg-subtle)';
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: accent
                  ? 'rgba(212,88,111,0.15)'
                  : 'var(--ui-bg-subtle)',
              }}
            >
              <Icon
                className="w-3.5 h-3.5"
                style={{ color: accent ? 'var(--ui-brand-text)' : 'var(--ui-text-muted)' }}
              />
            </div>
            {label}
          </button>
        ))}
      </div>

      {/* ── Divider ── */}
      <div
        className="mx-3 mb-2 flex-shrink-0 h-px"
        style={{ backgroundColor: 'var(--ui-border-faint)' }}
      />

      {/* ── Thread list ── */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{ color: 'var(--ui-brand-muted)' }}
            />
            <span className="text-xs" style={{ color: 'var(--ui-text-faint)' }}>
              Loading threads…
            </span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--ui-bg-subtle)' }}
            >
              <MessageSquare className="w-4.5 h-4.5" style={{ color: 'var(--ui-text-faint)' }} />
            </div>
            <div>
              <p
                className="text-sm font-medium mb-0.5"
                style={{ color: 'var(--ui-text-secondary)' }}
              >
                No threads yet
              </p>
              <p className="text-xs" style={{ color: 'var(--ui-text-faint)' }}>
                Start a new thread to explore ideas
              </p>
            </div>
          </div>
        )}

        {/* No search results */}
        {!isLoading && searchQuery && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Search className="w-4 h-4" style={{ color: 'var(--ui-text-faint)' }} />
            <p className="text-xs" style={{ color: 'var(--ui-text-faint)' }}>
              No matches for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Favorites */}
        {!isLoading && favorites.length > 0 && (
          <div className="mb-3">
            <div className="px-1 mb-1">
              <SectionHeader
                label="Favorites"
                count={favorites.length}
                open={favOpen}
                onToggle={() => setFavOpen((v) => !v)}
              />
            </div>
            {favOpen && (
              <div className="space-y-0.5" style={{ animation: 'fadeIn 0.15s ease' }}>
                {favorites.map((c) => (
                  <ConversationItem
                    key={c.id}
                    conversation={c}
                    isActive={activeConversationId === c.id}
                    isRenaming={renamingId === c.id}
                    menuOpenId={menuOpenId}
                    renameValue={renameValue}
                    menuRef={menuRef}
                    onSelect={() => onSelectConversation(c.id)}
                    onMenuToggle={() =>
                      setMenuOpenId(menuOpenId === c.id ? null : c.id)
                    }
                    onRenameStart={() => {
                      setRenamingId(c.id);
                      setRenameValue(c.title);
                    }}
                    onRenameChange={setRenameValue}
                    onRenameSubmit={() => handleRenameSubmit(c)}
                    onRenameCancel={() => setRenamingId(null)}
                    onFavorite={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(null);
                      onToggleFavorite?.(c.id);
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(null);
                      if (window.confirm(`Delete "${c.title}"?`))
                        onDeleteConversation?.(c.id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent */}
        {!isLoading && recent.length > 0 && (
          <div className="mb-3">
            <div className="px-1 mb-1">
              <SectionHeader
                label="Recent"
                count={recent.length}
                open={recentOpen}
                onToggle={() => setRecentOpen((v) => !v)}
              />
            </div>
            {recentOpen && (
              <div className="space-y-0.5" style={{ animation: 'fadeIn 0.15s ease' }}>
                {recent.map((c) => (
                  <ConversationItem
                    key={c.id}
                    conversation={c}
                    isActive={activeConversationId === c.id}
                    isRenaming={renamingId === c.id}
                    menuOpenId={menuOpenId}
                    renameValue={renameValue}
                    menuRef={menuRef}
                    onSelect={() => onSelectConversation(c.id)}
                    onMenuToggle={() =>
                      setMenuOpenId(menuOpenId === c.id ? null : c.id)
                    }
                    onRenameStart={() => {
                      setRenamingId(c.id);
                      setRenameValue(c.title);
                    }}
                    onRenameChange={setRenameValue}
                    onRenameSubmit={() => handleRenameSubmit(c)}
                    onRenameCancel={() => setRenamingId(null)}
                    onFavorite={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(null);
                      onToggleFavorite?.(c.id);
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(null);
                      if (window.confirm(`Delete "${c.title}"?`))
                        onDeleteConversation?.(c.id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ── Footer ── */}
      <div
        className="px-3 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid var(--ui-border-faint)' }}
      >
        <StorageBar used={conversations.length} total={5} />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuIn {
          from { opacity: 0; transform: scale(0.94) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </aside>
  );
};