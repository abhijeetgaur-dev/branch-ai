// src/components/conversation/BlockRenderer.tsx
import React, { useState } from 'react';
import {
  GitBranch, Copy, Check,
  Info, AlertTriangle, CheckCircle, XCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Block, Node } from '../../types';
import { BranchInput } from './BranchInput';

interface BlockRendererProps {
  block:          Block;
  depth:          number;
  childBranches?: Node[];
  onAskFollowup?: (blockId: string, question: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  depth,
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

  const getCalloutStyles = () => {
    switch (block.calloutType) {
      case 'info':    return { bg: 'bg-blue-50',    border: 'border-blue-200',    icon: <Info          className="w-3.5 h-3.5 text-blue-500"    />, text: 'text-blue-800'    };
      case 'warning': return { bg: 'bg-amber-50',   border: 'border-amber-200',   icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500"   />, text: 'text-amber-800'   };
      case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle   className="w-3.5 h-3.5 text-emerald-500" />, text: 'text-emerald-800' };
      case 'error':   return { bg: 'bg-red-50',     border: 'border-red-200',     icon: <XCircle       className="w-3.5 h-3.5 text-red-500"     />, text: 'text-red-800'     };
      default:        return { bg: 'bg-surface-50', border: 'border-surface-200', icon: <Info          className="w-3.5 h-3.5 text-surface-400"  />, text: 'text-surface-700' };
    }
  };

  const renderContent = () => {
    switch (block.type) {

      case 'heading':
        return (
          <div
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-surface-900 flex-1 leading-snug">
                {block.content}
              </h3>

              {/* Branch button — appears on hover or if branches exist */}
              <div className={cn(
                'flex items-center gap-1.5 transition-opacity duration-150',
                (hasChildBranches || isHovered) ? 'opacity-100' : 'opacity-0'
              )}>
                {hasChildBranches && (
                  <span className="text-xs text-brand-500 font-medium px-1.5 py-0.5 bg-brand-50 rounded">
                    {childBranches.length}
                  </span>
                )}
                <button
                  onClick={() => setShowBranchInput(!showBranchInput)}
                  className={cn(
                    'p-1 rounded transition-all duration-150',
                    showBranchInput
                      ? 'bg-brand-100 text-brand-600'
                      : 'hover:bg-surface-100 text-surface-300 hover:text-brand-500'
                  )}
                  title="Branch from this section"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {showBranchInput && (
              <div className="mt-2 animate-slide-down">
                <BranchInput
                  onSubmit={handleBranchSubmit}
                  onCancel={() => setShowBranchInput(false)}
                  placeholder={`Explore "${block.content}" deeper...`}
                />
              </div>
            )}
          </div>
        );

      case 'paragraph':
        return (
          <p className="text-sm text-surface-600 leading-relaxed">
            {block.content}
          </p>
        );

      case 'code':
        return (
          <div className="rounded-lg overflow-hidden border border-surface-200 text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-surface-800 text-surface-300">
              <span className="font-mono text-xs">{block.language ?? 'code'}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-surface-700 transition-colors"
              >
                {copied
                  ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                  : <><Copy  className="w-3 h-3" /><span>Copy</span></>}
              </button>
            </div>
            <pre className="p-3 bg-surface-900 text-surface-100 font-mono overflow-x-auto leading-relaxed">
              <code>{block.content}</code>
            </pre>
          </div>
        );

      case 'bullet_list':
        return (
          <ul className="space-y-1.5">
            {block.items.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5 text-sm text-surface-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item.content}</span>
              </li>
            ))}
          </ul>
        );

      case 'numbered_list':
        return (
          <ol className="space-y-1.5">
            {block.items.map((item, idx) => (
              <li key={item.id} className="flex items-start gap-2.5 text-sm text-surface-600">
                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-200">
                  {idx + 1}
                </span>
                <span className="leading-relaxed pt-0.5">{item.content}</span>
              </li>
            ))}
          </ol>
        );

      case 'callout': {
        const s = getCalloutStyles();
        return (
          <div className={cn('flex items-start gap-2.5 px-3 py-2.5 rounded-lg border', s.bg, s.border)}>
            <span className="flex-shrink-0 mt-0.5">{s.icon}</span>
            <p className={cn('text-xs leading-relaxed', s.text)}>{block.content}</p>
          </div>
        );
      }

      case 'quote':
        return (
          <blockquote className="border-l-2 border-brand-300 pl-3 py-0.5 text-sm italic text-surface-500">
            {block.content}
          </blockquote>
        );

      default:
        return <p className="text-sm text-surface-600">{block.content}</p>;
    }
  };

  return <div>{renderContent()}</div>;
};