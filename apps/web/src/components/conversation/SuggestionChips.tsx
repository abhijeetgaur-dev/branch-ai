// apps/web/src/components/conversation/SuggestionChips.tsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SuggestionChipsProps {
  suggestions:  string[];
  onSelect:     (suggestion: string) => void;
  disabled?:    boolean;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({ 
  suggestions, 
  onSelect, 
  disabled 
}) => {
  if (!suggestions.length) return null;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-surface-400 uppercase tracking-wider px-1">
        <Sparkles className="w-3 h-3 text-brand-500" />
        Suggested Follow-ups
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className={cn(
              "group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-left",
              "bg-white border border-surface-200 text-surface-600 hover:border-brand-300 hover:text-brand-600",
              "hover:bg-brand-50/50 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
              disabled && "opacity-50 cursor-not-allowed grayscale"
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="flex-1 leading-relaxed">{suggestion}</span>
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-500" />
          </button>
        ))}
      </div>
    </div>
  );
};
