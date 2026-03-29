// src/components/tree/TreeSidebar.tsx
import React, { useState } from 'react';
import {
  ChevronRight, Circle, CircleDot,
  GitBranch, EyeOff, Hash, Eye,
} from 'lucide-react';
import { useConversationStore } from '../../store/conversationStore';
import { cn, getDepthTextColor, truncate } from '../../lib/utils';
import type { Node } from '../../types/index';

interface TreeSidebarProps {
  rootNodes:    Node[];        // array of root threads
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

interface TreeNodeItemProps {
  node:         Node;
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  level?:       number;
}

/**
 * getEffectiveChildren
 * Skips the 'answer' level and returns sub-questions directly.
 * Tree Structure: Question -> Answer -> (Sub-Questions)
 * We want: Question -> (Sub-Questions)
 */
function getEffectiveChildren(node: Node): Node[] {
  if (node.type !== 'question') return [];
  // For each child (which is an answer), pull its children (which are sub-questions)
  return node.children?.flatMap((answer) => answer.children ?? []) ?? [];
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node, activeNodeId, onNodeSelect, level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { toggleNodeCollapse, collapsedNodeIds } = useConversationStore();
  
  const effectiveChildren = getEffectiveChildren(node);
  const hasChildren = effectiveChildren.length > 0;
  
  const answerNode = node.children?.find(c => c.type === 'answer');
  const isAnswerCollapsed = answerNode ? collapsedNodeIds.has(answerNode.id) : false;
  
  const isActive    = activeNodeId === node.id;

  const getNodeLabel = (): string => {
    return truncate(node.content ?? 'Question', 32);
  };

  const handleClick = () => {
    onNodeSelect(node.id);
    const el = document.getElementById(`node-${node.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.style.transition  = 'box-shadow 0.15s ease';
      el.style.boxShadow   = '0 0 0 2px #3b82f633, 0 0 0 4px #3b82f611';
      setTimeout(() => { el.style.boxShadow = ''; }, 1200);
    }
  };

  return (
    <div className="relative">
      {level > 0 && (
        <div
          className="absolute top-0 bottom-0 w-[0.5px] bg-brand-200/40"
          style={{ left: `${(level - 1) * 16 + 8}px` }}
        />
      )}

      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-left transition-all duration-200 group relative',
          isActive ? 'bg-white shadow-sm ring-1 ring-black/5' : 'hover:bg-surface-100/60',
          isAnswerCollapsed && !isActive && 'opacity-60'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {hasChildren ? (
            <button
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="p-0.5 -ml-1 rounded-md hover:bg-surface-200 transition-colors flex-shrink-0"
            >
              <ChevronRight className={cn(
                'w-3 h-3 text-surface-300 transition-transform duration-300',
                isExpanded && 'rotate-90 text-surface-500'
              )} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-3" />
          )}

          {/* Simple Branch Icons */}
          {level === 0 ? (
            <GitBranch 
              className={cn("w-3.5 h-3.5 flex-shrink-0 transition-colors", isActive ? "text-brand-500" : "text-surface-400")} 
              strokeWidth={1.5}
            />
          ) : isActive ? (
            <CircleDot 
              className={cn("w-3 h-3 flex-shrink-0", getDepthTextColor(node.depth))} 
              strokeWidth={2}
            />
          ) : (
            <Circle 
              className={cn("w-3 h-3 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity", getDepthTextColor(node.depth))} 
              strokeWidth={1.5}
            />
          )}

          <span className={cn(
            'truncate text-[11px] tracking-tight leading-tight',
            isActive ? 'text-surface-900 font-semibold' : 'text-surface-500 font-medium group-hover:text-surface-700'
          )}>
            {getNodeLabel()}
          </span>
        </div>
        
        {isActive && !isAnswerCollapsed && (
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-subtle flex-shrink-0 mr-1" />
        )}

        {/* Answer Collapse Toggle */}
        {answerNode && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleNodeCollapse(answerNode.id); }}
            className={cn(
              "p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-surface-200 text-surface-400 hover:text-surface-600",
              isAnswerCollapsed && "opacity-100 text-brand-500"
            )}
            title={isAnswerCollapsed ? "Show AI Answer" : "Hide AI Answer"}
          >
            {isAnswerCollapsed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        )}
      </button>

      {hasChildren && isExpanded && (
        <div className="animate-in fade-in slide-in-from-left-1 duration-300">
          {effectiveChildren.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              activeNodeId={activeNodeId}
              onNodeSelect={onNodeSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeSidebar: React.FC<TreeSidebarProps> = ({
  rootNodes, activeNodeId, onNodeSelect,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-surface-50 border-r border-surface-200 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
          title="Show navigator"
        >
          <GitBranch className="w-5 h-5 text-surface-500" strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-60 h-full bg-surface-50 border-r border-surface-200 flex flex-col transition-all duration-300">
      <div className="p-3 border-b border-surface-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-brand-500" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-surface-900">Navigator</h3>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-surface-200/50 transition-colors text-surface-400 hover:text-surface-600"
          >
            <EyeOff className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide hover:scrollbar-default transition-all">
        {rootNodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Hash className="w-8 h-8 text-surface-200 mb-3" strokeWidth={1} />
            <p className="text-[10px] text-surface-400 font-medium leading-relaxed uppercase tracking-tighter">Your mental map<br/>starts here</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {rootNodes.map((root) => (
              <TreeNodeItem
                key={root.id}
                node={root}
                activeNodeId={activeNodeId}
                onNodeSelect={onNodeSelect}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-surface-200">
        <div className="px-3 py-2 rounded-lg bg-surface-100 flex items-center justify-between">
          <span className="text-[10px] text-surface-500 font-semibold uppercase tracking-wider">Hierarchy</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-1 h-1 rounded-full bg-brand-400" />
            <div className="w-1 h-1 rounded-full bg-amber-400" />
            <div className="w-1 h-1 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};