// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import {
  GitBranch,
  Plus,
  Star,
  Clock,
  Archive,
  ChevronRight,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';
import { cn, formatDate, truncate } from '../../lib/utils';
import { Button } from '../ui/Button';
import type { ConversationSummary } from '../../types';

interface SidebarProps {
  conversations:        ConversationSummary[];
  activeConversationId: string | null;
  isLoading?:           boolean;
  onSelectConversation: (id: string) => void;  // can be async — void return is fine
  onNewConversation:    () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  isLoading = false,
  onSelectConversation,
  onNewConversation,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    favorites: true,
    recent:    true,
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const favorites = conversations.filter((c) =>  c.isFavorite);
  const recent    = conversations.filter((c) => !c.isFavorite);

  // ── Conversation item ───────────────────────────
  const ConversationItem: React.FC<{ conversation: ConversationSummary }> = ({
    conversation,
  }) => {
    const isActive  = activeConversationId === conversation.id;
    const isHovered = hoveredId === conversation.id;

    return (
      <button
        onClick={() => onSelectConversation(conversation.id)}
        onMouseEnter={() => setHoveredId(conversation.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={cn(
          'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
          isActive
            ? 'bg-brand-50 text-brand-700'
            : 'text-surface-600 hover:bg-surface-100'
        )}
      >
        <GitBranch className={cn(
          'w-4 h-4 mt-0.5 flex-shrink-0',
          isActive ? 'text-brand-500' : 'text-surface-400'
        )} />
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm font-medium truncate',
            isActive ? 'text-brand-700' : 'text-surface-700'
          )}>
            {truncate(conversation.title, 28)}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-surface-400">
              {formatDate(conversation.updatedAt)}
            </p>
            {/* Node count badge */}
            {conversation._count?.nodes > 0 && (
              <span className="text-xs text-surface-400">
                · {conversation._count.nodes} nodes
              </span>
            )}
          </div>
        </div>
        {(isHovered || isActive) && (
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded hover:bg-surface-200 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-surface-400" />
          </button>
        )}
      </button>
    );
  };

  // ── Section header ──────────────────────────────
  const SectionHeader: React.FC<{
    title:      string;
    icon:       React.ReactNode;
    sectionKey: string;
    count:      number;
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

  return (
    <aside className="w-72 h-screen bg-white border-r border-surface-200 flex flex-col">

      {/* ── Logo ─────────────────────────────────── */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-surface-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-surface-900">BranchAI</span>
        </div>
      </div>

      {/* ── New conversation ─────────────────────── */}
      <div className="p-4">
        <Button
          variant="primary"
          size="md"
          className="w-full shadow-md shadow-brand-500/20"
          onClick={onNewConversation}
        >
          <Plus className="w-4 h-4" />
          New Conversation
        </Button>
      </div>

      {/* ── Nav ──────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">

        {/* Loading skeleton */}
        {isLoading && (
          <div className="flex items-center justify-center py-8 text-surface-400 gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && conversations.length === 0 && (
          <div className="text-center py-8 px-4">
            <GitBranch className="w-8 h-8 text-surface-300 mx-auto mb-2" />
            <p className="text-sm text-surface-400">No conversations yet</p>
            <p className="text-xs text-surface-300 mt-1">Click "New Conversation" to start</p>
          </div>
        )}

        {/* Favorites */}
        {!isLoading && favorites.length > 0 && (
          <div className="mb-4">
            <SectionHeader
              title="Favorites"
              icon={<Star className="w-3 h-3" />}
              sectionKey="favorites"
              count={favorites.length}
            />
            {expandedSections.favorites && (
              <div className="mt-1 space-y-0.5">
                {favorites.map((conv) => (
                  <ConversationItem key={conv.id} conversation={conv} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent */}
        {!isLoading && recent.length > 0 && (
          <div className="mb-4">
            <SectionHeader
              title="Recent"
              icon={<Clock className="w-3 h-3" />}
              sectionKey="recent"
              count={recent.length}
            />
            {expandedSections.recent && (
              <div className="mt-1 space-y-0.5">
                {recent.map((conv) => (
                  <ConversationItem key={conv.id} conversation={conv} />
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ── Storage footer ───────────────────────── */}
      <div className="p-4 border-t border-surface-200">
        <div className="bg-gradient-to-r from-brand-50 to-violet-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-brand-700 mb-2">
            <Archive className="w-4 h-4" />
            <span className="text-sm font-medium">Conversations</span>
          </div>
          <div className="w-full bg-white rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-500 to-violet-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min((conversations.length / 25) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-surface-500 mt-2">
            {conversations.length} of 25 conversations used
          </p>
        </div>
      </div>
    </aside>
  );
};