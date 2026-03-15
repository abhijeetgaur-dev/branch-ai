// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d    = typeof date === 'string' ? new Date(date) : date;
  const now  = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  if (days <  7) return `${days}d ago`;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str ?? '';
  return str.substring(0, length) + '…';
}

// Depth → filled dot color (for tree sidebar)
export function getDepthColor(depth: number): string {
  const colors = [
    'bg-brand-500',
    'bg-violet-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
  ];
  return colors[depth % colors.length];
}

// Depth → left border accent color (for answer cards)
export function getDepthAccent(depth: number): string {
  const accents = [
    'border-l-brand-400',
    'border-l-violet-400',
    'border-l-emerald-400',
    'border-l-amber-400',
    'border-l-rose-400',
    'border-l-cyan-400',
  ];
  return accents[depth % accents.length];
}

export function getDepthBorderColor(depth: number): string {
  const colors = [
    'border-brand-500',
    'border-violet-500',
    'border-emerald-500',
    'border-amber-500',
    'border-rose-500',
    'border-cyan-500',
  ];
  return colors[depth % colors.length];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}