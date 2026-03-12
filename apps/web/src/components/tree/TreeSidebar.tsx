// src/components/tree/TreeSidebar.tsx
import React, { useState } from 'react';
import {
  ChevronRight,
  MessageSquare,
  Bot,
  GitBranch,
  Eye,
  EyeOff,
  Maximize2,
} from 'lucide-react';
import { cn, getDepthColor, truncate } from '../../lib/utils';
import type { Node } from '../../types/index';

interface TreeSidebarProps {
  rootNode: Node;
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

interface TreeNodeProps {
  node: Node;
  activeNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  level?: number;
}

const TreeNodeItem: React.FC<TreeNodeProps> = ({
  node,
  activeNodeId,
  onNodeSelect,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeNodeId === node.id;

  const getNodeLabel = () => {
    if (node.type === 'question') {
      return truncate(node.content || '', 30);
    }
    // For answer nodes, use first heading block or generic label
    const firstHeading = node.blocks?.find(b => b.type === 'heading');
    return firstHeading ? truncate(firstHeading.content, 30) : 'AI Response';
  };

  return (
    <div className="relative">
      {/* Connection line */}
      {level > 0 && (
        <div
          className="absolute left-2 top-0 bottom-0 w-px bg-surface-200"
          style={{ left: `${(level - 1) * 16 + 8}px` }}
        />
      )}

      <button
        onClick={() => onNodeSelect(node.id)}
        className={cn(
          'w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-left text-sm transition-all duration-150',
          'hover:bg-surface-100',
          isActive && 'bg-brand-50 text-brand-700'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 rounded hover:bg-surface-200 transition-colors"
          >
            <ChevronRight
              className={cn(
                'w-3 h-3 text-surface-400 transition-transform duration-200',
                isExpanded && 'rotate-90'
              )}
            />
          </button>
        ) : (
          <div className="w-4" />
        )}

        <div className={cn(
          'w-1.5 h-1.5 rounded-full flex-shrink-0',
          getDepthColor(node.depth)
        )} />

        {node.type === 'question' ? (
          <MessageSquare className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        )}

        <span className={cn(
          'truncate',
          isActive ? 'text-brand-700 font-medium' : 'text-surface-600'
        )}>
          {getNodeLabel()}
        </span>
      </button>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {node.children!.map((child, idx) => (
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
  rootNode,
  activeNodeId,
  onNodeSelect,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const countNodes = (node: Node): number => {
    let count = 1;
    if (node.children) {
      node.children.forEach(child => {
        count += countNodes(child);
      });
    }
    return count;
  };

  const totalNodes = countNodes(rootNode);
  const branchCount = totalNodes - 1;

  if (isCollapsed) {
    return (
      <div className="w-12 bg-surface-50 border-r border-surface-200 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
        >
          <GitBranch className="w-5 h-5 text-surface-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-surface-50 border-r border-surface-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-semibold text-surface-900">
              Branch Navigator
            </h3>
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
            <MessageSquare className="w-3 h-3" />
            {Math.ceil(totalNodes / 2)} questions
          </span>
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            {branchCount} branches
          </span>
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <TreeNodeItem
          node={rootNode}
          activeNodeId={activeNodeId}
          onNodeSelect={onNodeSelect}
        />
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-surface-200">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors">
          <Maximize2 className="w-3 h-3" />
          Expand Full View
        </button>
      </div>
    </div>
  );
};  