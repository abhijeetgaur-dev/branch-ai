// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import {
  GitBranch,
  Plus,
  FolderOpen,
  Star,
  Clock,
  Archive,
  ChevronRight,
  Hash,
  MoreHorizontal,
  Trash2,
  Edit3,
  Share2,
} from 'lucide-react';
import { cn, formatDate, truncate } from '../../lib/utils';
import { Button } from '../ui/Button';
import { type Conversation } from '../../types';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    favorites: true,
    recent: true,
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const favorites = conversations.filter(c => c.isFavorite);
  const recent = conversations.filter(c => !c.isFavorite);

  const ConversationItem: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const isActive = activeConversationId === conversation.id;
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
          <p className="text-xs text-surface-400 mt-0.5">
            {formatDate(conversation.updatedAt)}
          </p>
        </div>
        {(isHovered || isActive) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Show menu
            }}
            className="p-1 rounded hover:bg-surface-200 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-surface-400" />
          </button>
        )}
      </button>
    );
  };

  const SectionHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    sectionKey: string;
    count: number;
  }> = ({ title, icon, sectionKey, count }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-surface-500 uppercase tracking-wider hover:text-surface-700 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
        <span className="text-surface-400 font-normal">({count})</span>
      </div>
      <ChevronRight
        className={cn(
          'w-3 h-3 transition-transform duration-200',
          expandedSections[sectionKey] && 'rotate-90'
        )}
      />
    </button>
  );

  return (
    <aside className="w-72 h-screen bg-white border-r border-surface-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-surface-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-surface-900">BranchAI</span>
        </div>
      </div>

      {/* New Conversation Button */}
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="mb-4">
            <SectionHeader
              title="Favorites"
              icon={<Star className="w-3 h-3" />}
              sectionKey="favorites"
              count={favorites.length}
            />
            {expandedSections.favorites && (
              <div className="mt-1 space-y-0.5">
                {favorites.map(conv => (
                  <ConversationItem key={conv.id} conversation={conv} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent */}
        <div className="mb-4">
          <SectionHeader
            title="Recent"
            icon={<Clock className="w-3 h-3" />}
            sectionKey="recent"
            count={recent.length}
          />
          {expandedSections.recent && (
            <div className="mt-1 space-y-0.5">
              {recent.map(conv => (
                <ConversationItem key={conv.id} conversation={conv} />
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-surface-200">
        <div className="bg-gradient-to-r from-brand-50 to-violet-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-brand-700 mb-2">
            <Archive className="w-4 h-4" />
            <span className="text-sm font-medium">Storage</span>
          </div>
          <div className="w-full bg-white rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 to-violet-500 h-full w-3/5 rounded-full" />
          </div>
          <p className="text-xs text-surface-500 mt-2">15 of 25 conversations used</p>
        </div>
      </div>
    </aside>
  );
};