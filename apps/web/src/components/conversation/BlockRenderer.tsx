// src/components/conversation/BlockRenderer.tsx
import React, { useState } from 'react';
import {
  GitBranch,
  Copy,
  Check,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Block, Node } from '../../types';
import { BranchInput } from './BranchInput';

interface BlockRendererProps {
  block: Block;
  depth: number;
  childBranches?: Node[];
  onAskFollowup?: (blockId: string, question: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  childBranches = [],
  onAskFollowup,
}) => {
  const [showBranchInput, setShowBranchInput] = useState(false);
  const [copied, setCopied]                   = useState(false);
  const [isHovered, setIsHovered]             = useState(false);

  const hasChildBranches = childBranches.length > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBranchSubmit = (question: string) => {
    onAskFollowup?.(block.id, question);
    setShowBranchInput(false);
  };

  // ── Callout styles ──────────────────────────────
  const getCalloutStyles = () => {
    switch (block.calloutType) {
      case 'info':    return { bg: 'bg-blue-50',    border: 'border-blue-200',   icon: <Info         className="w-4 h-4 text-blue-500"    />, text: 'text-blue-800'    };
      case 'warning': return { bg: 'bg-amber-50',   border: 'border-amber-200',  icon: <AlertTriangle className="w-4 h-4 text-amber-500"   />, text: 'text-amber-800'   };
      case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-200',icon: <CheckCircle  className="w-4 h-4 text-emerald-500"  />, text: 'text-emerald-800' };
      case 'error':   return { bg: 'bg-red-50',     border: 'border-red-200',    icon: <XCircle      className="w-4 h-4 text-red-500"      />, text: 'text-red-800'     };
      default:        return { bg: 'bg-surface-50', border: 'border-surface-200',icon: <Info         className="w-4 h-4 text-surface-500"  />, text: 'text-surface-700' };
    }
  };

  // ── Block content ───────────────────────────────
  const renderContent = () => {
    switch (block.type) {

      case 'heading':
        return (
          <div className="relative group">
            <div className="flex items-start gap-3">
              <h3 className="text-lg font-semibold text-surface-900 flex-1">
                {block.content}
              </h3>

              {/* Branch button — always visible if branch exists, hover otherwise */}
              <div className={cn(
                'flex items-center gap-1 transition-opacity',
                (hasChildBranches || isHovered) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              )}>
                {hasChildBranches && (
                  <span className="text-xs text-brand-500 font-medium px-2 py-0.5 bg-brand-50 rounded-full">
                    {childBranches.length} {childBranches.length === 1 ? 'branch' : 'branches'}
                  </span>
                )}
                <button
                  onClick={() => setShowBranchInput(!showBranchInput)}
                  className={cn(
                    'p-1.5 rounded-lg transition-all duration-200',
                    showBranchInput
                      ? 'bg-brand-100 text-brand-600'
                      : 'hover:bg-surface-100 text-surface-400 hover:text-brand-500'
                  )}
                  title="Ask follow-up about this section"
                >
                  <GitBranch className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showBranchInput && (
              <div className="mt-3">
                <BranchInput
                  onSubmit={handleBranchSubmit}
                  onCancel={() => setShowBranchInput(false)}
                  placeholder={`Ask about "${block.content}"...`}
                />
              </div>
            )}
          </div>
        );

      case 'paragraph':
        return (
          <p className="text-surface-600 leading-relaxed">
            {block.content}
          </p>
        );

      case 'code':
        return (
          <div className="relative group rounded-xl overflow-hidden border border-surface-200">
            <div className="flex items-center justify-between px-4 py-2 bg-surface-800 text-surface-300 text-xs">
              <span className="font-mono">{block.language ?? 'code'}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-surface-700 transition-colors"
              >
                {copied ? (
                  <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
                )}
              </button>
            </div>
            <pre className="p-4 bg-surface-900 text-surface-100 text-sm font-mono overflow-x-auto">
              <code>{block.content}</code>
            </pre>
          </div>
        );

      case 'bullet_list':
        return (
          <ul className="space-y-2">
            {/* items is BlockItem[] from API — use item.content */}
            {block.items.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-surface-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        );

      case 'numbered_list':
        return (
          <ol className="space-y-2">
            {block.items.map((item, idx) => (
              <li key={item.id} className="flex items-start gap-3 text-surface-600">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{item.content}</span>
              </li>
            ))}
          </ol>
        );

      case 'callout': {
        const styles = getCalloutStyles();
        return (
          <div className={cn('flex items-start gap-3 p-4 rounded-xl border', styles.bg, styles.border)}>
            {styles.icon}
            <p className={cn('text-sm', styles.text)}>{block.content}</p>
          </div>
        );
      }

      case 'quote':
        return (
          <blockquote className="border-l-4 border-brand-300 pl-4 py-1 italic text-surface-600">
            {block.content}
          </blockquote>
        );

      default:
        return <p className="text-surface-600">{block.content}</p>;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderContent()}
    </div>
  );
};