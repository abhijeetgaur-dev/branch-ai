// src/components/tree/TreeSidebar.tsx
import React, { useState } from 'react';
import {
  ChevronRight, MessageSquare, Bot,
  GitBranch, EyeOff, Maximize2,
} from 'lucide-react';
import { cn, getDepthColor, truncate } from '../../lib/utils';
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

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node, activeNodeId, onNodeSelect, level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isActive    = activeNodeId === node.id;

  const getNodeLabel = (): string => {
    if (node.type === 'question') return truncate(node.content ?? 'Question', 32);
    const firstHeading = node.blocks?.find((b) => b.type === 'heading');
    return firstHeading ? truncate(firstHeading.content, 32) : 'AI Response';
  };

  const handleClick = () => {
    onNodeSelect(node.id);
    const el = document.getElementById(`node-${node.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.style.transition  = 'box-shadow 0.15s ease';
      el.style.boxShadow   = '0 0 0 2px #3b82f6, 0 0 0 4px #bfdbfe';
      setTimeout(() => { el.style.boxShadow = ''; }, 1200);
    }
  };

  return (
    <div className="relative">
      {level > 0 && (
        <div
          className="absolute top-0 bottom-0 w-px bg-surface-200"
          style={{ left: `${(level - 1) * 16 + 8}px` }}
        />
      )}

      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-left transition-all duration-150',
          'hover:bg-surface-100',
          isActive && 'bg-brand-50 text-brand-700'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="p-0.5 rounded hover:bg-surface-200 transition-colors flex-shrink-0"
          >
            <ChevronRight className={cn(
              'w-3 h-3 text-surface-400 transition-transform duration-200',
              isExpanded && 'rotate-90'
            )} />
          </button>
        ) : (
          <div className="w-4 flex-shrink-0" />
        )}

        <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', getDepthColor(node.depth))} />

        {node.type === 'question'
          ? <MessageSquare className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
          : <Bot           className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}

        <span className={cn(
          'truncate text-xs',
          isActive ? 'text-brand-700 font-medium' : 'text-surface-600'
        )}>
          {getNodeLabel()}
        </span>
      </button>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
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

function countByType(nodes: Node[], type: 'question' | 'answer'): number {
  return nodes.reduce((sum, n) => {
    let count = n.type === type ? 1 : 0;
    if (n.children?.length) count += countByType(n.children, type);
    return sum + count;
  }, 0);
}

export const TreeSidebar: React.FC<TreeSidebarProps> = ({
  rootNodes, activeNodeId, onNodeSelect,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const questionCount = countByType(rootNodes, 'question');
  const answerCount   = countByType(rootNodes, 'answer');

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-surface-50 border-r border-surface-200 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
          title="Show navigator"
        >
          <GitBranch className="w-5 h-5 text-surface-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-60 md:w-60 h-full bg-surface-50 border-r border-surface-200 flex flex-col">
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-semibold text-surface-900">Navigator</h3>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 rounded hover:bg-surface-200 transition-colors"
          >
            <EyeOff className="w-4 h-4 text-surface-400" />
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs text-surface-500">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />{questionCount}
          </span>
          <span className="flex items-center gap-1">
            <Bot className="w-3 h-3" />{answerCount}
          </span>
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />{rootNodes.length} threads
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {rootNodes.length === 0 ? (
          <p className="text-xs text-surface-400 text-center py-4">No threads yet</p>
        ) : (
          rootNodes.map((root) => (
            <TreeNodeItem
              key={root.id}
              node={root}
              activeNodeId={activeNodeId}
              onNodeSelect={onNodeSelect}
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-surface-200">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors">
          <Maximize2 className="w-3 h-3" />
          Expand full view
        </button>
      </div>
    </div>
  );
};