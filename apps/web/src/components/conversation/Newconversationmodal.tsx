// src/components/conversation/NewConversationModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X, GitBranch, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewConversationModalProps {
  onConfirm: (title: string) => void;
  onClose:   () => void;
}

const SUGGESTIONS = [
  'Understanding React hooks',
  'System design interview prep',
  'Exploring machine learning',
  'Building a side project',
];

export const NewConversationModal: React.FC<NewConversationModalProps> = ({
  onConfirm,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const inputRef          = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = () => {
    const t = title.trim();
    if (!t) return;
    onConfirm(t);
    onClose();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-surface-900">New conversation</h2>
              <p className="text-xs text-surface-500">Give it a clear topic to explore</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 text-surface-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div className="px-6 pb-4">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder="What do you want to explore?"
            maxLength={200}
            className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
          />
        </div>

        {/* Suggestions */}
        <div className="px-6 pb-4">
          <p className="text-xs text-surface-400 mb-2">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setTitle(s)}
                className="px-3 py-1.5 text-xs bg-surface-50 border border-surface-200 text-surface-600 rounded-full hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              title.trim()
                ? 'bg-brand-600 text-white hover:bg-brand-700'
                : 'bg-surface-100 text-surface-400 cursor-not-allowed'
            )}
          >
            Start exploring
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

};