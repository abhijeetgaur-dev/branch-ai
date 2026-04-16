// src/components/conversation/SuggestionChips.tsx
import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect:    (s: string) => void;
  disabled?:   boolean;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  suggestions, onSelect, disabled,
}) => {
  if (!suggestions.length) return null;

  return (
    <div className="mt-4">
      <div
        className="flex items-center gap-1.5 mb-2.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: 'var(--ui-text-faint)' }}
      >
        <Sparkles className="w-3 h-3" style={{ color: 'var(--ui-brand-muted)' }} />
        Suggested follow-ups
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            disabled={disabled}
            onClick={() => onSelect(s)}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--ui-bg-subtle)',
              color: 'var(--ui-text-secondary)',
              border: '1px solid var(--ui-border-faint)',
              animationDelay: `${i * 80}ms`,
              animation: 'nrFadeUp 0.3s ease both',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--ui-brand-subtle)';
              e.currentTarget.style.color = 'var(--ui-brand-text)';
              e.currentTarget.style.borderColor = 'rgba(212,88,111,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--ui-bg-subtle)';
              e.currentTarget.style.color = 'var(--ui-text-secondary)';
              e.currentTarget.style.borderColor = 'var(--ui-border-faint)';
            }}
          >
            <span className="flex-1 leading-relaxed">{s}</span>
            <ArrowRight
              className="w-3 h-3 flex-shrink-0 transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
              style={{ color: 'var(--ui-brand-muted)' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};