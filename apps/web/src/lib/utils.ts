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
    month: 'short', day: 'numeric',
    year:  d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str ?? '';
  return str.substring(0, length) + '…';
}

// Depth → dot color in TreeSidebar
// Warm palette: rose, amber, sage, terracotta, mauve, olive
export function getDepthColor(depth: number): string {
  const colors = [
    'bg-rose-400',
    'bg-amber-400',
    'bg-emerald-500',
    'bg-orange-400',
    'bg-purple-400',
    'bg-yellow-500',
  ];
  return colors[depth % colors.length];
}

export function getDepthTextColor(depth: number): string {
  const colors = [
    'text-rose-500',
    'text-amber-600',
    'text-emerald-600',
    'text-orange-500',
    'text-purple-500',
    'text-yellow-600',
  ];
  return colors[depth % colors.length];
}

// Depth → top border accent on answer cards
// Inline style approach so we use exact hex values from the palette
export function getDepthAccentStyle(depth: number): React.CSSProperties {
  const colors = [
    '#d4586f',  // dusty rose
    '#c9914a',  // warm amber
    '#6a9e78',  // muted sage
    '#c07050',  // terracotta
    '#9b7bb5',  // soft mauve
    '#8a9e50',  // olive
  ];
  return { borderTopColor: colors[depth % colors.length] };
}

// Keep for backward compat — returns a Tailwind class string
export function getDepthAccent(depth: number): string {
  // These are overridden by getDepthAccentStyle in NodeRenderer
  const accents = [
    'border-t-rose-400',
    'border-t-amber-400',
    'border-t-emerald-500',
    'border-t-orange-400',
    'border-t-purple-400',
    'border-t-yellow-500',
  ];
  return accents[depth % accents.length];
}

export function getDepthBorderColor(depth: number): string {
  const colors = [
    'border-rose-400',
    'border-amber-400',
    'border-emerald-500',
    'border-orange-400',
    'border-purple-400',
    'border-yellow-500',
  ];
  return colors[depth % colors.length];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}