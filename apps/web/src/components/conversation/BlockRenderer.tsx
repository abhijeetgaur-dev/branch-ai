// src/components/conversation/BlockRenderer.tsx
import React, { useState } from 'react';
import {
  GitBranch, Copy, Check,
  Info, AlertTriangle, CheckCircle, XCircle,
  Terminal, ChevronDown,
} from 'lucide-react';
import type { Block, Node } from '../../types';
import { BranchInput } from './BranchInput';
import { pal } from './design-tokens';

interface BlockRendererProps {
  block:          Block;
  depth:          number;
  conversationId: string;
  childBranches?: Node[];
  onAskFollowup?: (blockId: string, question: string) => void;
}

/* ── Code block ── */
function CodeBlock({ block }: { block: Block }) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const lines = block.content.split('\n').length;

  const copy = () => {
    navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="rounded-xl overflow-hidden text-xs"
      style={{
        backgroundColor: 'var(--ui-code-body)',
        border: '1px solid var(--ui-border-faint)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3.5 py-2"
        style={{ backgroundColor: 'var(--ui-code-header)' }}
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--ui-brand-muted)' }} />
          <span
            className="font-mono font-medium text-[11px]"
            style={{ color: 'var(--ui-text-muted)' }}
          >
            {block.language ?? 'code'}
          </span>
          <span className="text-[10px]" style={{ color: 'var(--ui-text-faint)' }}>
            {lines} line{lines !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {lines > 12 && (
            <button
              onClick={() => setCollapsed(v => !v)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-all hover:scale-105"
              style={{ color: 'var(--ui-text-faint)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <ChevronDown
                className="w-3 h-3 transition-transform duration-200"
                style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
              />
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          )}
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-all hover:scale-105"
            style={{
              color: copied ? '#4a9f7c' : 'var(--ui-text-faint)',
              backgroundColor: copied ? 'rgba(74,159,124,0.1)' : 'rgba(255,255,255,0.05)',
            }}
          >
            {copied
              ? <><Check className="w-3 h-3" />Copied</>
              : <><Copy  className="w-3 h-3" />Copy</>}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div
        style={{
          maxHeight: collapsed ? 0 : 500,
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <pre
          className="p-3.5 overflow-x-auto leading-relaxed font-mono"
          style={{ color: 'var(--ui-code-text)', fontSize: 12 }}
        >
          <code>{block.content}</code>
        </pre>
      </div>
    </div>
  );
}

/* ── Callout ── */
const CALLOUT_CONFIG = {
  info:    { icon: Info,          bg: 'var(--ui-callout-info-bg)',  border: 'var(--ui-callout-info-border)',  text: 'var(--ui-callout-info-text)'  },
  warning: { icon: AlertTriangle, bg: 'var(--ui-callout-warn-bg)',  border: 'var(--ui-callout-warn-border)',  text: 'var(--ui-callout-warn-text)'  },
  success: { icon: CheckCircle,   bg: 'var(--ui-callout-ok-bg)',    border: 'var(--ui-callout-ok-border)',    text: 'var(--ui-callout-ok-text)'    },
  error:   { icon: XCircle,       bg: 'var(--ui-callout-err-bg)',   border: 'var(--ui-callout-err-border)',   text: 'var(--ui-callout-err-text)'   },
} as const;

/* ── Branch button on block ── */
function BlockBranchBtn({
  block,
  conversationId,
  onAskFollowup,
}: {
  block:          Block;
  conversationId: string;
  onAskFollowup?: (blockId: string, q: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (open) {
    return (
      <div className="mt-3">
        <BranchInput
          conversationId={conversationId}
          onSubmit={q => { onAskFollowup?.(block.id, q); setOpen(false); }}
          onCancel={() => setOpen(false)}
          placeholder={`Explore this section deeper…`}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-2 flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-all duration-150 hover:scale-105"
      style={{
        color: hovered ? 'var(--ui-brand-text)' : 'var(--ui-text-faint)',
        backgroundColor: hovered ? 'var(--ui-brand-subtle)' : 'transparent',
        border: '1px dashed',
        borderColor: hovered ? 'rgba(212,88,111,0.35)' : 'var(--ui-border-faint)',
      }}
    >
      <GitBranch className="w-3 h-3" />
      Branch
    </button>
  );
}

/* ── Main BlockRenderer ── */
export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block, depth, conversationId, childBranches = [], onAskFollowup,
}) => {
  const hasBranches = childBranches.length > 0;

  const renderBlock = () => {
    switch (block.type) {

      case 'heading':
        return (
          <div>
            <div className="flex items-start justify-between gap-2 group">
              <h3
                className="text-sm font-semibold leading-snug flex-1"
                style={{ color: 'var(--ui-text-primary)' }}
              >
                {block.content}
              </h3>
              {hasBranches && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
                  style={{ backgroundColor: 'var(--ui-brand-subtle)', color: 'var(--ui-brand-text)' }}
                >
                  {childBranches.length}
                </span>
              )}
            </div>
            <BlockBranchBtn block={block} conversationId={conversationId} onAskFollowup={onAskFollowup} />
          </div>
        );

      case 'paragraph':
        return (
          <div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ui-text-secondary)' }}>
              {block.content}
            </p>
            <BlockBranchBtn block={block} conversationId={conversationId} onAskFollowup={onAskFollowup} />
          </div>
        );

      case 'code':
        return (
          <div>
            <CodeBlock block={block} />
            <BlockBranchBtn block={block} conversationId={conversationId} onAskFollowup={onAskFollowup} />
          </div>
        );

      case 'bullet_list':
        return (
          <div>
            <ul className="space-y-2">
              {block.items?.map(item => (
                <li key={item.id} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--ui-text-secondary)' }}>
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: pal(depth).dot }}
                  />
                  <span className="leading-relaxed">{item.content}</span>
                </li>
              ))}
            </ul>
            <BlockBranchBtn block={block} conversationId={conversationId} onAskFollowup={onAskFollowup} />
          </div>
        );

      case 'numbered_list':
        return (
          <div>
            <ol className="space-y-2">
              {block.items?.map((item, idx) => (
                <li key={item.id} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--ui-text-secondary)' }}>
                  <span
                    className="w-5 h-5 rounded-lg text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: pal(depth).glow,
                      color: pal(depth).dot,
                      border: `1px solid ${pal(depth).line}`,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{item.content}</span>
                </li>
              ))}
            </ol>
            <BlockBranchBtn block={block} conversationId={conversationId} onAskFollowup={onAskFollowup} />
          </div>
        );

      case 'callout': {
        const cfg = CALLOUT_CONFIG[block.calloutType ?? 'info'] ?? CALLOUT_CONFIG.info;
        const Icon = cfg.icon;
        return (
          <div
            className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl"
            style={{
              backgroundColor: cfg.bg,
              border: `1px solid ${cfg.border}`,
            }}
          >
            <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cfg.text }} />
            <p className="text-xs leading-relaxed" style={{ color: cfg.text }}>{block.content}</p>
          </div>
        );
      }

      case 'quote':
        return (
          <blockquote
            className="pl-4 py-0.5 text-sm italic leading-relaxed"
            style={{
              borderLeft: `2px solid ${pal(depth).dot}`,
              color: 'var(--ui-text-muted)',
            }}
          >
            {block.content}
          </blockquote>
        );

      default:
        return (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ui-text-secondary)' }}>
            {block.content}
          </p>
        );
    }
  };

  return <div>{renderBlock()}</div>;
};

/* ── Loading shimmer ── */
export const LoadingShimmer: React.FC = () => (
  <div
    className="pointer-events-none"
    style={{ animation: 'nrFadeUp 0.3s ease' }}
  >
    {/* Question placeholder */}
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 animate-pulse"
        style={{ backgroundColor: 'var(--ui-brand-subtle)' }}
      />
      <div className="h-3.5 rounded-full animate-pulse" style={{ width: '48%', backgroundColor: 'var(--ui-bg-subtle)' }} />
    </div>

    {/* Answer card placeholder */}
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--ui-card-bg)',
        border: '1px solid var(--ui-card-border)',
      }}
    >
      {/* Accent bar */}
      <div
        className="h-0.5 w-full animate-pulse"
        style={{ backgroundColor: 'var(--ui-brand-subtle)' }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3">
        <div
          className="w-6 h-6 rounded-lg flex-shrink-0 animate-pulse"
          style={{ backgroundColor: 'var(--ui-brand-subtle)' }}
        />
        <div className="h-3 rounded-full animate-pulse" style={{ width: 60, backgroundColor: 'var(--ui-bg-subtle)' }} />
        <div className="h-2.5 rounded-full animate-pulse ml-2" style={{ width: 40, backgroundColor: 'var(--ui-bg-subtle)' }} />
      </div>

      <div className="h-px mx-4" style={{ backgroundColor: 'var(--ui-border-faint)' }} />

      {/* Body lines */}
      <div className="px-4 py-4 space-y-3">
        {[82, 100, 68, 90, 55].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full animate-pulse"
            style={{
              width: `${w}%`,
              backgroundColor: 'var(--ui-bg-subtle)',
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}

        {/* Fake code block */}
        <div
          className="mt-4 rounded-xl overflow-hidden"
          style={{ backgroundColor: 'var(--ui-code-body)', border: '1px solid var(--ui-border-faint)' }}
        >
          <div className="h-7 animate-pulse" style={{ backgroundColor: 'var(--ui-code-header)' }} />
          <div className="p-3 space-y-2">
            {[60, 85, 45, 70].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded animate-pulse"
                style={{
                  width: `${w}%`,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);