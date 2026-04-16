// src/components/conversation/design-tokens.ts
export const DEPTH_PALETTE = [
  { line: 'rgba(212,88,111,0.3)',  dot: '#d4586f', glow: 'rgba(212,88,111,0.08)',  badge: 'rgba(212,88,111,0.12)'  },
  { line: 'rgba(124,111,159,0.3)', dot: '#7c6f9f', glow: 'rgba(124,111,159,0.08)', badge: 'rgba(124,111,159,0.12)' },
  { line: 'rgba(74,159,124,0.3)',  dot: '#4a9f7c', glow: 'rgba(74,159,124,0.08)',  badge: 'rgba(74,159,124,0.12)'  },
  { line: 'rgba(196,147,63,0.3)',  dot: '#c4933f', glow: 'rgba(196,147,63,0.08)',  badge: 'rgba(196,147,63,0.12)'  },
  { line: 'rgba(99,130,196,0.3)',  dot: '#6382c4', glow: 'rgba(99,130,196,0.08)',  badge: 'rgba(99,130,196,0.12)'  },
] as const;

export type PaletteEntry = typeof DEPTH_PALETTE[number];
export const pal = (d: number): PaletteEntry => DEPTH_PALETTE[d % DEPTH_PALETTE.length];