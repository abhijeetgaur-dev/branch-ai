// src/components/conversation/BranchInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BranchInputProps {
  onSubmit:     (question: string) => void;
  onCancel:     () => void;
  placeholder?: string;
  autoFocus?:   boolean;
}

export const BranchInput: React.FC<BranchInputProps> = ({
  onSubmit,
  onCancel,
  placeholder = 'Ask a follow-up question...',
  autoFocus   = true,
}) => {
  const [value, setValue]   = useState('');
  const inputRef            = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = () => {
    const q = value.trim();
    if (!q) return;
    // Call onSubmit directly — no fake delay.
    // The isBranching state in Zustand handles the loading indicator globally.
    onSubmit(q);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const suggestions = [
    'Explain this in more detail',
    'Show me an example',
    'What are the trade-offs?',
  ];

  return (
    <div className="bg-gradient-to-r from-brand-50 to-violet-50 rounded-xl p-4 border border-brand-100 animate-slide-down">
      <div className="flex items-center gap-2 mb-3 text-xs text-brand-600">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="font-medium">Create a branch</span>
      </div>

      <div className="relative">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className={cn(
            'w-full bg-white rounded-lg px-4 py-3 pr-24 text-sm resize-none',
            'border border-brand-200 focus:border-brand-400',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/20',
            'placeholder:text-surface-400 transition-all duration-200'
          )}
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <button
            onClick={onCancel}
            className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className={cn(
              'p-2 rounded-lg transition-all duration-200',
              value.trim()
                ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                : 'bg-surface-100 text-surface-400 cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested starters */}
      <div className="flex flex-wrap gap-2 mt-3">
        {suggestions.map((q) => (
          <button
            key={q}
            onClick={() => setValue(q)}
            className="px-3 py-1.5 text-xs bg-white border border-brand-200 rounded-full text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};