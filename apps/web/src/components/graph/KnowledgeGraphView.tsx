// apps/web/src/components/graph/KnowledgeGraphView.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';
import { Loader2, Network, Search, ZoomIn, ZoomOut, Maximize2, Info, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api, type GraphData, type GraphNode, type GraphEdge } from '../../lib/api';

/* ─────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────── */
interface EnrichedNode extends GraphNode {
  val: number;
  degree: number;
  x?: number;
  y?: number;
}

interface EnrichedLink {
  source: string;
  target: string;
  weight: number;
}

interface ProcessedGraphData {
  nodes: EnrichedNode[];
  links: EnrichedLink[];
}

/* ─────────────────────────────────────────────────────
   Animated background canvas
   ───────────────────────────────────────────────────── */
function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; phase: number }[] =
      [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 28 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.8 + 0.8,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.phase += 0.008;

        const alpha = 0.12 + Math.sin(p.phase) * 0.06;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(p.phase) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,88,111,${alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212,88,111,${0.04 * (1 - d / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─────────────────────────────────────────────────────
   Stats chip with count-up animation
   ───────────────────────────────────────────────────── */
function StatChip({ label, value }: { label: string; value: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 900;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.round(eased * value));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div
      className="flex flex-col items-center px-4 py-2 rounded-xl border"
      style={{
        backgroundColor: 'var(--ui-bg-elevated)',
        borderColor: 'var(--ui-border)',
      }}
    >
      <span className="text-lg font-bold leading-none" style={{ color: 'var(--ui-brand-text)' }}>
        {displayed}
      </span>
      <span
        className="text-[10px] mt-0.5 uppercase tracking-wide"
        style={{ color: 'var(--ui-text-faint)' }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Node tooltip card
   ───────────────────────────────────────────────────── */
function NodeTooltip({
  node,
  onClose,
  onNavigate,
}: {
  node: EnrichedNode;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className="absolute bottom-6 left-1/2 z-30 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border shadow-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--ui-bg-elevated)',
        borderColor: 'var(--ui-border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, 16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}
    >
      <div
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, var(--ui-brand) 0%, var(--ui-brand-muted) 100%)',
        }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--ui-brand-subtle)' }}
            >
              <Network className="w-4 h-4" style={{ color: 'var(--ui-brand-text)' }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--ui-text-muted)' }}>
                {node.conversationTitle}
              </p>
              <p
                className="text-sm font-semibold truncate"
                style={{ color: 'var(--ui-text-primary)' }}
              >
                {node.label}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--ui-bg-subtle)', color: 'var(--ui-text-faint)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
            style={{ backgroundColor: 'var(--ui-bg-subtle)', color: 'var(--ui-text-muted)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--ui-brand-muted)' }}
            />
            {node.degree} connection{node.degree !== 1 ? 's' : ''}
          </div>
          <button
            onClick={onNavigate}
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--ui-brand)',
              color: 'white',
            }}
          >
            Open in chat →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Empty state
   ───────────────────────────────────────────────────── */
function EmptyState() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-6">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${i * 38}px`,
              height: `${i * 38}px`,
              borderColor: `rgba(212,88,111,${0.25 - i * 0.06})`,
              borderStyle: 'dashed',
              animation: `kg-spin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
              opacity: animate ? 1 : 0,
              transition: `opacity 0.6s ease ${i * 0.2}s`,
            }}
          />
        ))}
        <Network className="w-7 h-7 relative z-10" style={{ color: 'var(--ui-brand-text)' }} />
      </div>
      <div className="text-center">
        <p
          className="text-base font-semibold mb-1"
          style={{
            color: 'var(--ui-text-primary)',
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.5s ease 0.4s',
          }}
        >
          Your knowledge map is empty
        </p>
        <p
          className="text-sm max-w-xs"
          style={{
            color: 'var(--ui-text-muted)',
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.5s ease 0.55s',
          }}
        >
          Start exploring ideas in BranchAI. As you branch and explore, semantic connections will
          appear here.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Loading state
   ───────────────────────────────────────────────────── */
function LoadingState() {
  return (
    <div
      className="flex-1 min-w-0 flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: 'var(--ui-bg-page)' }}
    >
      <div className="relative w-24 h-24">
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 32;
          const y = 50 + Math.sin(angle) * 32;
          return (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%,-50%)',
                backgroundColor: 'var(--ui-brand)',
                animation: `kg-pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          );
        })}
        <div
          className="absolute w-5 h-5 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            backgroundColor: 'var(--ui-brand)',
            animation: 'kg-pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: 'var(--ui-text-secondary)' }}>
          Mapping your knowledge...
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--ui-text-faint)' }}>
          Building semantic connections
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Small icon button
   ───────────────────────────────────────────────────── */
function IconBtn({
  onClick,
  children,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:scale-105 active:scale-95"
      style={{
        backgroundColor: 'var(--ui-bg-elevated)',
        borderColor: 'var(--ui-border)',
        color: 'var(--ui-text-secondary)',
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────
   Helper: resolve node id from a link's source/target
   ForceGraph2D mutates links in-place — source/target
   start as strings but become object references after
   the first simulation tick.
   ───────────────────────────────────────────────────── */
function resolveId(val: string | { id: string } | any): string {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object' && 'id' in val) return val.id;
  return String(val);
}

/* ─────────────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────────────── */
export function KnowledgeGraphView() {
  const navigate = useNavigate();
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<EnrichedNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<EnrichedNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<GraphData>({
    queryKey: ['global-graph'],
    queryFn: () => api.intelligence.getGraph(),
    staleTime: 1000 * 60 * 5,
  });

  /* ── Mount animation ── */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Resize observer ── */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Build enriched graph data ──
       CRITICAL: ForceGraph2D needs { nodes[], links[] }
       where each link has { source: <node id>, target: <node id> }
       We also make sure every link references a node that
       actually exists in the nodes array. */
  const graphData: ProcessedGraphData = useMemo(() => {
    if (!data || !data.nodes || !data.edges) return { nodes: [], links: [] };

    // Build a Set of valid node IDs for fast lookup
    const nodeIds = new Set(data.nodes.map((n) => n.id));

    // Compute degree counts (only for valid edges)
    const degrees: Record<string, number> = {};
    const validEdges: EnrichedLink[] = [];

    data.edges.forEach((e) => {
      const srcId = typeof e.source === 'string' ? e.source : (e as any).from ?? '';
      const tgtId = typeof e.target === 'string' ? e.target : (e as any).to ?? '';

      // Only include edges whose endpoints both exist in nodes
      if (srcId && tgtId && nodeIds.has(srcId) && nodeIds.has(tgtId) && srcId !== tgtId) {
        degrees[srcId] = (degrees[srcId] || 0) + 1;
        degrees[tgtId] = (degrees[tgtId] || 0) + 1;
        validEdges.push({
          source: srcId,
          target: tgtId,
          weight: (e as any).weight ?? (e as any).score ?? 1,
        });
      }
    });

    const nodes: EnrichedNode[] = data.nodes.map((n) => ({
      ...n,
      degree: degrees[n.id] || 0,
      val: Math.max(2, Math.min(12, (degrees[n.id] || 0) * 1.4 + 2)),
    }));

    return { nodes, links: validEdges };
  }, [data]);

  /* ── Search highlight set ── */
  const highlightIds = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return new Set(
      graphData.nodes
        .filter(
          (n) =>
            n.label?.toLowerCase().includes(q) || n.conversationTitle?.toLowerCase().includes(q)
        )
        .map((n) => n.id)
    );
  }, [searchQuery, graphData.nodes]);

  /* ── Edges connected to the selected node ── */
  const selectedEdgeNodeIds = useMemo(() => {
    if (!selectedNode) return null;
    const ids = new Set<string>();
    ids.add(selectedNode.id);
    graphData.links.forEach((l) => {
      const srcId = resolveId(l.source);
      const tgtId = resolveId(l.target);
      if (srcId === selectedNode.id) ids.add(tgtId);
      if (tgtId === selectedNode.id) ids.add(srcId);
    });
    return ids;
  }, [selectedNode, graphData.links]);

  /* ── Zoom to fit on first data ── */
  useEffect(() => {
    if (graphData.nodes.length > 0 && fgRef.current) {
      const t = setTimeout(() => fgRef.current?.zoomToFit(600, 60), 700);
      return () => clearTimeout(t);
    }
  }, [graphData]);

  /* ── Custom node painter ── */
  const paintNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const x: number = node.x ?? 0;
      const y: number = node.y ?? 0;
      const baseRadius = Math.max(3, (node.val ?? 4) * 1.1);

      const isSelected = selectedNode?.id === node.id;
      const isHovered = hoveredNode?.id === node.id;
      const isNeighbour = selectedEdgeNodeIds?.has(node.id) && !isSelected;
      const isSearchHit = highlightIds ? highlightIds.has(node.id) : false;
      const isDimmedBySearch = highlightIds !== null && !isSearchHit;
      const isDimmedBySelection = selectedEdgeNodeIds !== null && !selectedEdgeNodeIds.has(node.id);
      const isDimmed = isDimmedBySearch || isDimmedBySelection;

      const radius = isSelected ? baseRadius * 1.25 : isHovered ? baseRadius * 1.15 : baseRadius;

      /* 1 — Selection / hover ring */
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected
          ? 'rgba(212,88,111,0.45)'
          : 'rgba(212,88,111,0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      /* 2 — Glow halo */
      if (!isDimmed) {
        const grd = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius * 3);
        grd.addColorStop(0, `rgba(212,88,111,${isSelected ? 0.3 : 0.18})`);
        grd.addColorStop(1, 'rgba(212,88,111,0)');
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      /* 3 — Core disc */
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      if (isSelected) {
        ctx.fillStyle = 'rgba(181,56,79,1)';
      } else if (isNeighbour) {
        ctx.fillStyle = 'rgba(212,88,111,0.85)';
      } else if (isSearchHit) {
        ctx.fillStyle = 'rgba(212,88,111,0.9)';
      } else if (isDimmed) {
        ctx.fillStyle = 'rgba(212,88,111,0.12)';
      } else {
        ctx.fillStyle = 'rgba(212,88,111,0.65)';
      }
      ctx.fill();

      /* 4 — Inner highlight (glass effect) */
      if (!isDimmed) {
        ctx.beginPath();
        ctx.arc(x - radius * 0.22, y - radius * 0.25, radius * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.fill();
      }

      /* 5 — Border ring */
      if (!isDimmed) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,88,111,${isSelected ? 0.9 : 0.35})`;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();
      }

      /* 6 — Label */
      const showLabel =
        globalScale >= 1.2 || isSelected || isHovered || isNeighbour || isSearchHit;
      if (showLabel && !isDimmed) {
        const fontSize = Math.max(10, Math.min(14, radius * 1.2)) / globalScale;
        ctx.font = `${isSelected || isHovered ? 600 : 500} ${fontSize}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const label =
          node.label && node.label.length > 26 ? node.label.slice(0, 26) + '…' : node.label ?? '';
        const metrics = ctx.measureText(label);
        const textW = metrics.width;
        const padX = 4 / globalScale;
        const padY = 2 / globalScale;
        const labelY = y + radius + 5 / globalScale;

        // Label pill background
        const pillR = 3 / globalScale;
        const pillX = x - textW / 2 - padX;
        const pillY2 = labelY - padY;
        const pillW = textW + padX * 2;
        const pillH = fontSize + padY * 2;

        ctx.fillStyle = 'rgba(26,20,16,0.72)';
        ctx.beginPath();
        ctx.roundRect(pillX, pillY2, pillW, pillH, pillR);
        ctx.fill();

        ctx.fillStyle = 'rgba(240,232,216,0.95)';
        ctx.fillText(label, x, labelY);
      }
    },
    [selectedNode, hoveredNode, highlightIds, selectedEdgeNodeIds]
  );

  /* ── Link colour ── */
  const linkColor = useCallback(
    (link: any): string => {
      const srcId = resolveId(link.source);
      const tgtId = resolveId(link.target);

      // During search: highlight matching links
      if (highlightIds) {
        return highlightIds.has(srcId) && highlightIds.has(tgtId)
          ? 'rgba(212,88,111,0.55)'
          : 'rgba(212,88,111,0.03)';
      }

      // During selection: highlight connected links
      if (selectedNode) {
        if (selectedNode.id === srcId || selectedNode.id === tgtId) {
          return 'rgba(212,88,111,0.6)';
        }
        return 'rgba(212,88,111,0.04)';
      }

      // Default
      return 'rgba(212,88,111,0.18)';
    },
    [highlightIds, selectedNode]
  );

  /* ── Link width ── */
  const linkWidth = useCallback(
    (link: any): number => {
      const srcId = resolveId(link.source);
      const tgtId = resolveId(link.target);
      const w = link.weight ?? 0.5;

      if (selectedNode && (selectedNode.id === srcId || selectedNode.id === tgtId)) {
        return Math.max(1.5, w * 3);
      }
      return Math.max(0.5, w * 1.2);
    },
    [selectedNode]
  );

  /* ── Link particles (only on selected node's edges) ── */
  const linkParticles = useCallback(
    (link: any): number => {
      if (!selectedNode) return 0;
      const srcId = resolveId(link.source);
      const tgtId = resolveId(link.target);
      return selectedNode.id === srcId || selectedNode.id === tgtId ? 3 : 0;
    },
    [selectedNode]
  );

  /* ── Node pointer area ── */
  const nodePointerArea = useCallback(
    (node: any, color: string, ctx: CanvasRenderingContext2D) => {
      const r = Math.max(6, (node.val ?? 4) * 2.5);
      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    },
    []
  );

  /* ── Custom link drawing (optional: curved links) ── */
  const paintLink = useCallback(
    (link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const src = link.source;
      const tgt = link.target;

      // After the simulation runs, source/target become objects with x,y
      const srcX = typeof src === 'object' ? src.x : undefined;
      const srcY = typeof src === 'object' ? src.y : undefined;
      const tgtX = typeof tgt === 'object' ? tgt.x : undefined;
      const tgtY = typeof tgt === 'object' ? tgt.y : undefined;

      if (srcX == null || srcY == null || tgtX == null || tgtY == null) return;

      const srcId = resolveId(src);
      const tgtId = resolveId(tgt);
      const w = link.weight ?? 0.5;

      // Determine styling
      let alpha = 0.18;
      let lineW = Math.max(0.5, w * 1.2);

      if (highlightIds) {
        if (highlightIds.has(srcId) && highlightIds.has(tgtId)) {
          alpha = 0.55;
          lineW = Math.max(1.2, w * 2.5);
        } else {
          alpha = 0.03;
        }
      } else if (selectedNode) {
        if (selectedNode.id === srcId || selectedNode.id === tgtId) {
          alpha = 0.6;
          lineW = Math.max(1.5, w * 3);
        } else {
          alpha = 0.04;
        }
      }

      // Draw slightly curved line for visual interest
      const dx = tgtX - srcX;
      const dy = tgtY - srcY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const curvature = 0.15;
      const mx = (srcX + tgtX) / 2 + dy * curvature;
      const my = (srcY + tgtY) / 2 - dx * curvature;

      ctx.beginPath();
      ctx.moveTo(srcX, srcY);
      ctx.quadraticCurveTo(mx, my, tgtX, tgtY);
      ctx.strokeStyle = `rgba(212,88,111,${alpha})`;
      ctx.lineWidth = lineW;
      ctx.stroke();
    },
    [highlightIds, selectedNode]
  );

  /* ── Event handlers ── */
  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node || null);
    if (containerRef.current) {
      containerRef.current.style.cursor = node ? 'pointer' : 'grab';
    }
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /* ── Zoom helpers ── */
  const zoomIn = useCallback(() => {
    if (fgRef.current) {
      const current = fgRef.current.zoom();
      fgRef.current.zoom(current * 1.5, 300);
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (fgRef.current) {
      const current = fgRef.current.zoom();
      fgRef.current.zoom(current * 0.67, 300);
    }
  }, []);

  const zoomFit = useCallback(() => {
    fgRef.current?.zoomToFit(400, 60);
  }, []);

  /* ── Render states ── */
  if (isLoading) return <LoadingState />;

  if (isError) {
    return (
      <div
        className="flex-1 min-w-0 flex items-center justify-center"
        style={{ backgroundColor: 'var(--ui-bg-page)' }}
      >
        <div className="text-center">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--ui-text-primary)' }}>
            Failed to load Knowledge Graph
          </p>
          <p className="text-xs" style={{ color: 'var(--ui-text-faint)' }}>
            Please refresh and try again.
          </p>
        </div>
      </div>
    );
  }

  const nodeCount = graphData.nodes.length;
  const edgeCount = graphData.links.length;
  const uniqueConvos = new Set(graphData.nodes.map((n) => n.conversationId)).size;

  return (
    <div
      className="flex-1 h-full flex flex-col min-w-0 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--ui-bg-page)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Ambient background */}
      <AmbientCanvas />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, rgba(26,20,16,0.35) 100%)',
        }}
      />

      {/* ── Header ── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between gap-3"
        style={{
          background: 'linear-gradient(to bottom, var(--ui-bg-page) 60%, transparent)',
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 0.5s ease 0.1s',
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{
              background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
            }}
          >
            <Network className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1
              className="text-sm font-bold leading-tight"
              style={{ color: 'var(--ui-text-primary)' }}
            >
              Knowledge Graph
            </h1>
            <p
              className="text-[11px] leading-tight hidden sm:block"
              style={{ color: 'var(--ui-text-faint)' }}
            >
              Semantic connections across your conversations
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 0.5s ease 0.2s',
          }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200"
            style={{
              backgroundColor: 'var(--ui-bg-elevated)',
              borderColor: searchFocused ? 'var(--ui-brand)' : 'var(--ui-border)',
              boxShadow: searchFocused ? '0 0 0 3px rgba(181,56,79,0.1)' : 'none',
              width: searchFocused || searchQuery ? '180px' : '130px',
            }}
          >
            <Search
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: 'var(--ui-text-faint)' }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search nodes…"
              className="text-xs bg-transparent border-none outline-none w-full"
              style={{ color: 'var(--ui-text-primary)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="tap-sm">
                <X className="w-3 h-3" style={{ color: 'var(--ui-text-faint)' }} />
              </button>
            )}
          </div>

          <IconBtn onClick={() => setLegendOpen((v) => !v)} title="Legend">
            <Info className="w-4 h-4" />
          </IconBtn>
        </div>
      </div>

      {/* ── Stats (bottom left) ── */}
      {nodeCount > 0 && (
        <div
          className="absolute bottom-6 left-4 sm:left-6 z-20 flex items-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.6s ease 0.4s',
          }}
        >
          <StatChip label="Nodes" value={nodeCount} />
          <StatChip label="Links" value={edgeCount} />
          <StatChip label="Topics" value={uniqueConvos} />
        </div>
      )}

      {/* ── Zoom controls (bottom right) ── */}
      {nodeCount > 0 && (
        <div
          className="absolute bottom-6 right-4 sm:right-6 z-20 flex flex-col gap-1.5"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.6s ease 0.5s',
          }}
        >
          <IconBtn onClick={zoomIn} title="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </IconBtn>
          <IconBtn onClick={zoomOut} title="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </IconBtn>
          <IconBtn onClick={zoomFit} title="Fit to screen">
            <Maximize2 className="w-4 h-4" />
          </IconBtn>
        </div>
      )}

      {/* ── Legend panel ── */}
      {legendOpen && (
        <div
          className="absolute top-16 right-4 sm:right-6 z-30 w-52 rounded-2xl border p-4 shadow-xl"
          style={{
            backgroundColor: 'var(--ui-bg-elevated)',
            borderColor: 'var(--ui-border)',
            animation: 'kg-fadeSlideDown 0.2s ease',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--ui-text-primary)' }}>
              Legend
            </span>
            <button onClick={() => setLegendOpen(false)} className="tap-sm">
              <X className="w-3.5 h-3.5" style={{ color: 'var(--ui-text-faint)' }} />
            </button>
          </div>
          {[
            { label: 'Concept node', size: 10, desc: 'An idea or topic' },
            { label: 'Hub node', size: 16, desc: 'Highly connected concept' },
            { label: 'Semantic link', isLine: true, desc: 'Shared meaning' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 mb-3 last:mb-0">
              {'isLine' in item && item.isLine ? (
                <div className="w-6 flex-shrink-0 flex items-center">
                  <div
                    className="w-full h-px"
                    style={{ backgroundColor: 'var(--ui-brand-muted)', opacity: 0.6 }}
                  />
                </div>
              ) : (
                <div className="w-6 flex-shrink-0 flex items-center justify-center">
                  <div
                    className="rounded-full"
                    style={{
                      width: item.size,
                      height: item.size,
                      backgroundColor: 'var(--ui-brand)',
                      opacity: 0.8,
                    }}
                  />
                </div>
              )}
              <div>
                <p
                  className="text-[11px] font-medium"
                  style={{ color: 'var(--ui-text-secondary)' }}
                >
                  {item.label}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--ui-text-faint)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
          <div
            className="mt-3 pt-3 text-[10px] leading-snug"
            style={{ borderTop: '1px solid var(--ui-border)', color: 'var(--ui-text-faint)' }}
          >
            Larger nodes = more connections.
            <br />
            Click a node to inspect.
          </div>
        </div>
      )}

      {/* ── Graph canvas ── */}
      <div ref={containerRef} className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        {nodeCount > 0 ? (
          <ForceGraph2D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            /* ── Node rendering ── */
            nodeCanvasObject={paintNode}
            nodeCanvasObjectMode={() => 'replace'}
            nodePointerAreaPaint={nodePointerArea}
            /* ── Link rendering ── */
            linkCanvasObject={paintLink}
            linkCanvasObjectMode={() => 'replace'}
            /* ── Particles on selected edges ── */
            linkDirectionalParticles={linkParticles}
            linkDirectionalParticleWidth={2.5}
            linkDirectionalParticleColor={() => 'rgba(212,88,111,0.8)'}
            linkDirectionalParticleSpeed={0.005}
            /* ── Interaction ── */
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onBackgroundClick={handleBackgroundClick}
            /* ── Physics ── */
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.35}
            cooldownTicks={150}
            warmupTicks={50}
            /* ── Misc ── */
            backgroundColor="transparent"
            enableNodeDrag={true}
            enableZoomPanInteraction={true}
          />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* ── Selected node tooltip ── */}
      {selectedNode && (
        <NodeTooltip
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onNavigate={() =>
            navigate(`/?conversation=${selectedNode.conversationId}&node=${selectedNode.id}`)
          }
        />
      )}

      {/* ── Search results count ── */}
      {searchQuery && highlightIds && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full border text-xs"
          style={{
            backgroundColor: 'var(--ui-bg-elevated)',
            borderColor: 'var(--ui-border)',
            color: 'var(--ui-text-muted)',
            animation: 'kg-fadeSlideDown 0.2s ease',
          }}
        >
          {highlightIds.size === 0
            ? 'No nodes match'
            : `${highlightIds.size} node${highlightIds.size !== 1 ? 's' : ''} found`}
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes kg-fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kg-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes kg-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%,-50%) scale(0.85); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
      `}</style>
    </div>
  );
}