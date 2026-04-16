// src/components/conversation/BranchInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Sparkles, Paperclip, Loader2, FileText, Plus } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import type { DocumentSummary } from '../../lib/api';

interface BranchInputProps {
  onSubmit:       (question: string) => void;
  onCancel:       () => void;
  conversationId: string;
  placeholder?:   string;
  autoFocus?:     boolean;
}

const QUICK_STARTERS = [
  'Explain this further',
  'Show me an example',
  'What are the trade-offs?',
];

export const BranchInput: React.FC<BranchInputProps> = ({
  onSubmit,
  onCancel,
  conversationId,
  placeholder = 'Ask a follow-up…',
  autoFocus   = true,
}) => {
  const [value, setValue]         = useState('');
  const [focused, setFocused]     = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [stagedDocs, setStagedDocs] = useState<DocumentSummary[]>([]);
  const inputRef                  = useRef<HTMLTextAreaElement>(null);
  const fileInputRef              = useRef<HTMLInputElement>(null);
  const { uploadDocument, isUploading } = useDocumentStore();

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    if (autoFocus) setTimeout(() => inputRef.current?.focus(), 60);
  }, [autoFocus]);

  // Auto-resize
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleSubmit = () => {
    let q = value.trim();
    if (!q && stagedDocs.length === 0) return;
    if (stagedDocs.length > 0) {
      if (q) q += '\n\n';
      stagedDocs.forEach(d => { q += `📝 [Attached: ${d.title}](${d.url || '#'})\n`; });
    }
    onSubmit(q);
    setValue('');
    setStagedDocs([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
    if (e.key === 'Escape') onCancel();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = '';
    const up = await uploadDocument(file, conversationId);
    if (up) setStagedDocs(p => [...p, up]);
  };

  const canSend = value.trim().length > 0 || stagedDocs.length > 0;

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.98)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      {/* Label */}
      <div
        className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: 'var(--ui-brand-text)' }}
      >
        <Sparkles className="w-3 h-3" />
        Branch from here
      </div>

      {/* Staged docs */}
      {stagedDocs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {stagedDocs.map(doc => (
            <div
              key={doc.id}
              className="flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-lg border text-xs font-medium"
              style={{
                backgroundColor: 'var(--ui-brand-subtle)',
                borderColor: 'rgba(212,88,111,0.2)',
                color: 'var(--ui-brand-text)',
              }}
            >
              <FileText className="w-3 h-3 flex-shrink-0" />
              <span className="truncate max-w-[120px]">{doc.title}</span>
              <button
                onClick={() => setStagedDocs(p => p.filter(d => d.id !== doc.id))}
                className="p-0.5 rounded transition-colors"
                style={{ color: 'var(--ui-brand-muted)' }}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div
        className="rounded-xl overflow-hidden transition-all duration-200"
        style={{
          border: '1.5px solid',
          borderColor: focused ? 'var(--ui-brand)' : 'var(--ui-border)',
          backgroundColor: 'var(--ui-bg-input)',
          boxShadow: focused ? '0 0 0 3px rgba(181,56,79,0.08)' : 'none',
        }}
      >
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={1}
          className="w-full px-3 py-2.5 text-sm bg-transparent resize-none focus:outline-none"
          style={{
            color: 'var(--ui-text-primary)',
            minHeight: 40,
            maxHeight: 120,
          }}
        />

        {/* Quick starters */}
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {QUICK_STARTERS.map(q => (
            <button
              key={q}
              onClick={() => { setValue(q); inputRef.current?.focus(); }}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150 hover:scale-105"
              style={{
                backgroundColor: 'var(--ui-bg-subtle)',
                color: 'var(--ui-text-muted)',
                border: '1px solid var(--ui-border-faint)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--ui-brand-subtle)';
                e.currentTarget.style.color = 'var(--ui-brand-text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)';
                e.currentTarget.style.color = 'var(--ui-text-muted)';
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ borderTop: '1px solid var(--ui-border-faint)' }}
        >
          <div className="flex items-center gap-1">
            <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept=".pdf,.txt,.md,.csv" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-1.5 rounded-lg transition-all hover:scale-105 disabled:opacity-40"
              style={{ color: 'var(--ui-text-faint)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {isUploading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: 'var(--ui-brand-muted)' }} />
                : <Paperclip className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onCancel}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              style={{ color: 'var(--ui-text-faint)', backgroundColor: 'var(--ui-bg-subtle)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSend}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: canSend ? 'var(--ui-brand)' : 'var(--ui-bg-subtle)',
                color: canSend ? 'white' : 'var(--ui-text-faint)',
                boxShadow: canSend ? '0 2px 8px rgba(181,56,79,0.3)' : 'none',
              }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};