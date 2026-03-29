// apps/web/src/components/conversation/RelatedPanel.tsx
// Shown inside an answer node card when related branches exist.
// Fetches lazily on first expand — data is cached by TanStack Query.

import React, { useState } from 'react';
import { useQuery }         from '@tanstack/react-query';
import { GitBranch, ExternalLink, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { api }              from '../../lib/api';
import type { RelatedNode } from '../../lib/api';
import { cn }               from '../../lib/utils';
import { useConversationStore } from '../../store/conversationStore';

interface RelatedPanelProps {
  nodeId:         string;
  /** Called when the user clicks a related branch to jump to it */
  onNavigate?:    (conversationId: string) => void;
}

function SimilarityBadge({ score }: { score: number }) {
  const pct   = Math.round(score * 100);
  const color = pct >= 70 ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
              : pct >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200'
              :             'text-surface-500 bg-surface-50 border-surface-200';
  return (
    <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded border', color)}>
      {pct}% match
    </span>
  );
}

export const RelatedPanel: React.FC<RelatedPanelProps> = ({ nodeId, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const { selectConversation }  = useConversationStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['related', nodeId],
    queryFn:  () => api.intelligence.getRelated(nodeId),
    // Only fetch once the panel is toggled open
    enabled:  expanded,
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry:    1,
  });

  const related: RelatedNode[] = data?.related ?? [];

  const handleNavigate = (conversationId: string) => {
    selectConversation(conversationId);
    onNavigate?.(conversationId);
  };

  return (
    <div className="mt-3 border-t border-surface-100 pt-3">
      {/* Toggle header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-brand-600 transition-colors group"
      >
        <Sparkles className="w-3 h-3 group-hover:text-brand-500" />
        <span className="font-medium">Related Branches</span>
        {!expanded && related.length === 0 && !isLoading && (
          <span className="text-[10px] text-surface-300 ml-1">click to load</span>
        )}
        {expanded
          ? <ChevronDown  className="w-3 h-3 ml-auto" />
          : <ChevronRight className="w-3 h-3 ml-auto" />}
      </button>

      {/* Content */}
      {expanded && (
        <div className="mt-2 space-y-1.5 animate-slide-down">
          {isLoading && (
            <div className="flex items-center gap-2 py-2 text-xs text-surface-400">
              <div className="w-3 h-3 rounded-full border-2 border-brand-400 border-t-transparent animate-spin" />
              Finding related branches...
            </div>
          )}

          {isError && (
            <p className="text-xs text-red-400 py-1">Could not load related branches.</p>
          )}

          {!isLoading && !isError && related.length === 0 && (
            <p className="text-xs text-surface-400 italic py-1">
              No related branches yet. Ask more questions to build your knowledge graph.
            </p>
          )}

          {!isLoading && related.map((item) => (
            <div
              key={item.nodeId}
              className="group flex items-start gap-2 px-2.5 py-2 rounded-lg bg-surface-50 hover:bg-brand-50 border border-surface-100 hover:border-brand-200 transition-all duration-150 cursor-pointer"
              onClick={() => handleNavigate(item.conversationId)}
              title={`From: ${item.conversationTitle}`}
            >
              <GitBranch className="w-3 h-3 text-surface-300 group-hover:text-brand-500 flex-shrink-0 mt-0.5 transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-surface-700 group-hover:text-surface-900 leading-snug truncate transition-colors">
                  {item.questionContent ?? '(untitled branch)'}
                </p>
                <p className="text-[10px] text-surface-400 mt-0.5 truncate">
                  {item.conversationTitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <SimilarityBadge score={item.similarity} />
                <ExternalLink className="w-3 h-3 text-surface-300 group-hover:text-brand-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
