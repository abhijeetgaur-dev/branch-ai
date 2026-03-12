// src/components/conversation/NodeRenderer.tsx
import React, { useState } from 'react';
import {
  User,
  Bot,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Clock,
  MoreHorizontal,
  Copy,
  Bookmark,
  Share2,
  Trash2,
} from 'lucide-react';
import { cn, formatDate, getDepthColor, getDepthBorderColor } from '../../lib/utils';
import type { Node } from '../../types';
import { BlockRenderer } from './BlockRenderer';
import { BranchInput } from './BranchInput';

interface NodeRendererProps {
  node: Node;
  onBranchCreate?: (parentNodeId: string, blockId: string | null, question: string) => void;
  isRoot?: boolean;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  onBranchCreate,
  isRoot = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showMainBranchInput, setShowMainBranchInput] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  // Find child branches for specific blocks
  const getChildBranchesForBlock = (blockId: string): Node[] => {
    if (!node.children) return [];
    return node.children.filter(
      child => child.type === 'question' && child.parentBlockId === blockId
    );
  };

  // Get direct follow-up (not from specific block)
  const directFollowups = node.children?.filter(
    child => child.type === 'question' && !child.parentBlockId
  ) || [];

  const handleAskFollowup = (blockId: string, question: string) => {
    onBranchCreate?.(node.id, blockId, question);
  };

  if (node.type === 'question') {
    return (
      <div className="relative">
        {/* Question node */}
        <div 
          className={cn(
            'relative rounded-2xl overflow-hidden animate-fade-in',
            !isRoot && 'ml-6'
          )}
        >
          {/* Depth indicator */}
          {node.depth > 0 && (
            <div className={cn(
              'depth-indicator',
              getDepthColor(node.depth)
            )} />
          )}

          <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 text-brand-100 text-sm">
                <span className="font-medium">You</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(node.createdAt)}
                </span>
                {node.depth > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      Depth {node.depth}
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-lg font-medium leading-relaxed">
                {node.content}
              </p>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && (
          <div className="mt-4">
            {node.children!.map((child) => (
              <NodeRenderer
                key={child.id}
                node={child}
                onBranchCreate={onBranchCreate}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Answer node
  return (
    <div className="relative">
      {/* Answer node */}
      <div 
        className={cn(
          'relative rounded-2xl overflow-hidden bg-white border border-surface-200 shadow-sm animate-fade-in',
          'hover:shadow-md transition-shadow duration-300'
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Depth indicator */}
        {node.depth > 1 && (
          <div className={cn(
            'depth-indicator',
            getDepthColor(node.depth)
          )} />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-surface-900">BranchAI</span>
                <span className="text-surface-400">•</span>
                <span className="text-surface-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(node.createdAt)}
                </span>
              </div>
              {node.blocks && (
                <span className="text-xs text-surface-400">
                  {node.blocks.length} sections
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className={cn(
            'flex items-center gap-1 transition-opacity duration-200',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            {hasChildren && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {node.children!.length} branches
              </button>
            )}
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {node.blocks?.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              depth={node.depth}
              childBranches={getChildBranchesForBlock(block.id)}
              onAskFollowup={handleAskFollowup}
            />
          ))}
        </div>

        {/* Footer with branch option */}
        <div className="px-5 pb-5">
          {!showMainBranchInput ? (
            <button
              onClick={() => setShowMainBranchInput(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-surface-200 rounded-xl text-sm text-surface-500 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-200"
            >
              <GitBranch className="w-4 h-4" />
              Ask a follow-up question
            </button>
          ) : (
            <BranchInput
              onSubmit={(q) => {
                onBranchCreate?.(node.id, null, q);
                setShowMainBranchInput(false);
              }}
              onCancel={() => setShowMainBranchInput(false)}
            />
          )}
        </div>
      </div>

      {/* Child branches */}
      {hasChildren && !isCollapsed && (
        <div className="mt-4 space-y-4 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-0 bottom-4 w-px bg-gradient-to-b from-surface-300 to-transparent" />
          
          {node.children!.map((child) => (
            <div key={child.id} className="relative pl-8">
              {/* Horizontal connector */}
              <div className="absolute left-6 top-8 w-4 h-px bg-surface-300" />
              
              <NodeRenderer
                node={child}
                onBranchCreate={onBranchCreate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};