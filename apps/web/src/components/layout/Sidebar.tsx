// src/components/layout/Sidebar.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  GitBranch, Plus, Star, Clock, Archive,
  ChevronRight, MoreHorizontal, Loader2,
  Trash2, Edit3, StarOff, PanelLeftClose, PanelLeftOpen, X,
} from 'lucide-react';
import { cn, formatDate, truncate } from '../../lib/utils';
import { Button } from '../ui/Button';
import type { ConversationSummary } from '../../types';

interface SidebarProps {
  conversations:        ConversationSummary[];
  activeConversationId: string | null;
  isLoading?:           boolean;
  onSelectConversation: (id: string) => void;
  onNewConversation:    () => void;
  onDeleteConversation?: (id: string) => void;
  onRenameConversation?: (id: string, newTitle: string) => void;
  onToggleFavorite?:    (id: string) => void;
  onOpenKnowledgeBase?: () => void;
  onClose?:             () => void;
}

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
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    favorites: true,
    recent:    true,
  });
  const [isCollapsed, setIsCollapsed]   = useState(false);
  const [menuOpenId, setMenuOpenId]     = useState<string | null>(null);
  const [renamingId, setRenamingId]     = useState<string | null>(null);
  const [renameValue, setRenameValue]   = useState('');
  const menuRef                         = useRef<HTMLDivElement>(null);

  const toggleSection = (key: string) =>
    setExpandedSections((p) => ({ ...p, [key]: !p[key] }));

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    if (menuOpenId) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpenId]);

  const favorites = conversations.filter((c) =>  c.isFavorite);
  const recent    = conversations.filter((c) => !c.isFavorite);

  const handleMenuAction = (
    e: React.MouseEvent,
    action: 'rename' | 'delete' | 'favorite',
    conv: ConversationSummary
  ) => {
    e.stopPropagation();
    setMenuOpenId(null);

    if (action === 'rename') {
      setRenamingId(conv.id);
      setRenameValue(conv.title);
    }
    if (action === 'delete') {
      if (window.confirm(`Delete "${conv.title}"? This cannot be undone.`)) {
        onDeleteConversation?.(conv.id);
      }
    }
    if (action === 'favorite') {
      onToggleFavorite?.(conv.id);
    }
  };

  const handleRenameSubmit = (conv: ConversationSummary) => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== conv.title) {
      onRenameConversation?.(conv.id, trimmed);
    }
    setRenamingId(null);
  };

  const ConversationItem: React.FC<{ conversation: ConversationSummary }> = ({ conversation }) => {
    const isActive   = activeConversationId === conversation.id;
    const isRenaming = renamingId === conversation.id;
    const menuOpen   = menuOpenId === conversation.id;

    return (
      <div className="relative group">
        <button
          onClick={() => !isRenaming && onSelectConversation(conversation.id)}
          className={cn(
            'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150',
            isActive ? 'bg-brand-50' : 'hover:bg-surface-100'
          )}
        >
          <GitBranch className={cn(
            'w-4 h-4 mt-0.5 flex-shrink-0',
            isActive ? 'text-brand-500' : 'text-surface-400'
          )} />

          <div className="flex-1 min-w-0">
            {isRenaming ? (
              <input
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter')  handleRenameSubmit(conversation);
                  if (e.key === 'Escape') setRenamingId(null);
                }}
                onBlur={() => handleRenameSubmit(conversation)}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-sm bg-white border border-brand-400 rounded px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            ) : (
              <p className={cn(
                'text-sm font-medium truncate',
                isActive ? 'text-brand-700' : 'text-surface-700'
              )}>
                {truncate(conversation.title, 28)}
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs text-surface-400">{formatDate(conversation.updatedAt)}</p>
              {conversation._count?.nodes > 0 && (
                <span className="text-xs text-surface-400">· {conversation._count.nodes} nodes</span>
              )}
            </div>
          </div>
        </button>

        {/* Direct edit button */}
        {!isRenaming && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); setRenamingId(conversation.id); setRenameValue(conversation.title); }}
              className="p-1 rounded transition-colors hover:bg-surface-200 text-surface-400 hover:text-brand-600"
              title="Edit conversation name"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Context menu trigger */}
        {!isRenaming && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpenId(menuOpen ? null : conversation.id);
              }}
              className={cn(
                'p-1 rounded transition-colors',
                menuOpen ? 'bg-surface-200 text-surface-700' : 'hover:bg-surface-200 text-surface-400'
              )}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dropdown menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-2 top-full mt-1 w-44 bg-white border border-surface-200 rounded-xl shadow-lg shadow-surface-900/10 py-1 z-50"
          >
            <button
              onClick={(e) => handleMenuAction(e, 'favorite', conversation)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
            >
              {conversation.isFavorite
                ? <><StarOff className="w-4 h-4 text-surface-400" />Remove from favorites</>
                : <><Star    className="w-4 h-4 text-amber-400" />Add to favorites</>}
            </button>
            <div className="border-t border-surface-100 my-1" />
            <button
              onClick={(e) => handleMenuAction(e, 'delete', conversation)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  const SectionHeader: React.FC<{
    title: string; icon: React.ReactNode; sectionKey: string; count: number;
  }> = ({ title, icon, sectionKey, count }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-surface-500 uppercase tracking-wider hover:text-surface-700 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
        <span className="text-surface-400 font-normal normal-case">({count})</span>
      </div>
      <ChevronRight className={cn(
        'w-3 h-3 transition-transform duration-200',
        expandedSections[sectionKey] && 'rotate-90'
      )} />
    </button>
  );

  // ── Collapsed view ────────────────────────────
  if (isCollapsed) {
    return (
      <aside className="w-14 h-full bg-white border-r border-surface-200 flex flex-col items-center py-4 gap-4 flex-shrink-0">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-surface-700 transition-colors"
          title="Expand sidebar"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
        <button
          onClick={onNewConversation}
          className="p-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          title="New conversation"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onOpenKnowledgeBase}
          className="p-2 rounded-lg bg-surface-100 text-surface-600 hover:bg-surface-200 transition-colors"
          title="Knowledge Base"
        >
          <Archive className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-1">
          {conversations.slice(0, 6).map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectConversation(c.id)}
              title={c.title}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors',
                activeConversationId === c.id
                  ? 'bg-brand-100 text-brand-700'
                  : 'hover:bg-surface-100 text-surface-500'
              )}
            >
              {c.title.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex-1" />
      </aside>
    );
  }

  return (
    <aside className="w-72 h-full bg-white border-r border-surface-200 flex flex-col flex-shrink-0">
      <div className="h-16 px-5 flex items-center border-b border-surface-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-100 border border-brand-200 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-brand-600" />
          </div>
          <span className="text-lg font-bold text-surface-900">BranchAI</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <Button variant="primary" size="md" className="w-full" onClick={onNewConversation}>
          <Plus className="w-3.5 h-3.5" />
          New Thread
        </Button>
        <Button variant="secondary" size="md" className="w-full bg-surface-100 hover:bg-surface-200 text-surface-700" onClick={onOpenKnowledgeBase}>
          <Archive className="w-4 h-4" />
          Knowledge Base (RAG)
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {isLoading && (
          <div className="flex items-center justify-center py-8 text-surface-400 gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}

        {!isLoading && conversations.length === 0 && (
          <div className="text-center py-8 px-4">
            <GitBranch className="w-8 h-8 text-surface-300 mx-auto mb-2" />
            <p className="text-sm text-surface-400">No conversations yet</p>
            <p className="text-xs text-surface-300 mt-1">Click "New Conversation" to start</p>
          </div>
        )}

        {!isLoading && favorites.length > 0 && (
          <div className="mb-4">
            <SectionHeader
              title="Favorites" icon={<Star className="w-3 h-3" />}
              sectionKey="favorites" count={favorites.length}
            />
            {expandedSections.favorites && (
              <div className="mt-1 space-y-0.5">
                {favorites.map((c) => <ConversationItem key={c.id} conversation={c} />)}
              </div>
            )}
          </div>
        )}

        {!isLoading && recent.length > 0 && (
          <div className="mb-4">
            <SectionHeader
              title="Recent" icon={<Clock className="w-3 h-3" />}
              sectionKey="recent" count={recent.length}
            />
            {expandedSections.recent && (
              <div className="mt-1 space-y-0.5">
                {recent.map((c) => <ConversationItem key={c.id} conversation={c} />)}
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-surface-200">
        <div className="rounded-xl p-4 border border-surface-200/50">
          <div className="flex items-center gap-2 text-surface-600 mb-2">
            <Archive className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Storage</span>
          </div>
          <div className="w-full bg-surface-200/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-400/60 h-full rounded-full transition-all"
              style={{ width: `${Math.min((conversations.length / 25) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-surface-400 font-medium mt-2 uppercase tracking-tight">
            {conversations.length} of 25 nodes used
          </p>
        </div>
      </div>
    </aside>
  );
};