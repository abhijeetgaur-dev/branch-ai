// src/components/ui/Input.tsx
import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, className, ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
          {icon}
        </div>
      )}
      <input
        className={cn(
          'w-full bg-white border border-surface-200 rounded-lg px-4 py-2.5 text-sm',
          'placeholder:text-surface-400',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500',
          'transition-all duration-200',
          icon && 'pl-10',
          className
        )}
        {...props}
      />
    </div>
  );
};