import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  GitBranch, ArrowRight, Sparkles, Layers, Zap, Loader2,
  Network, BookOpen, Plus, ChevronRight,
} from 'lucide-react';
import { TreeSidebar } from '../components/tree/TreeSidebar';
import { ConversationView } from '../components/conversation/ConversationView';
import { useConversationStore } from '../store/conversationStore';
import type { AppLayoutContext } from '../layouts/AppLayout';
import type { TreeNode } from '../lib/api';

function countQuestions(node: TreeNode): number {
  let n = node.type === 'question' ? 1 : 0;
  node.children?.forEach((c) => { n += countQuestions(c); });
  return n;
}

/* ─────────────────────────────────────────────────────
   Animated background canvas (subtle, minimal)
   ───────────────────────────────────────────────────── */
function PageCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    type P = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
    let pts: P[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      pts = Array.from({ length: 16 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.5 + 0.6,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.phase += 0.006;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const a = 0.06 + Math.sin(p.phase) * 0.03;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,88,111,${a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(212,88,111,${0.025 * (1 - d / 180)})`;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ─────────────────────────────────────────────────────
   Feature card
   ───────────────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200"
      style={{
        backgroundColor: 'var(--ui-bg-elevated)',
        borderColor: 'var(--ui-border-faint)',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background-color 0.15s ease, border-color 0.15s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,88,111,0.3)';
        e.currentTarget.style.backgroundColor = 'var(--ui-brand-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ui-border-faint)';
        e.currentTarget.style.backgroundColor = 'var(--ui-bg-elevated)';
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
        style={{ backgroundColor: color + '18' }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ui-text-primary)' }}>
        {title}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--ui-text-faint)' }}>
        {desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Prompt suggestion chip
   ───────────────────────────────────────────────────── */
function PromptChip({
  label,
  delay,
  onClick,
}: {
  label: string;
  delay: number;
  onClick: () => void;
}) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium text-left transition-all duration-150 group"
      style={{
        backgroundColor: 'var(--ui-bg-elevated)',
        borderColor: 'var(--ui-border)',
        color: 'var(--ui-text-secondary)',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,88,111,0.4)';
        e.currentTarget.style.color = 'var(--ui-brand-text)';
        e.currentTarget.style.backgroundColor = 'var(--ui-brand-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ui-border)';
        e.currentTarget.style.color = 'var(--ui-text-secondary)';
        e.currentTarget.style.backgroundColor = 'var(--ui-bg-elevated)';
      }}
    >
      <ChevronRight
        className="w-3 h-3 flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
        style={{ color: 'var(--ui-brand-muted)' }}
      />
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────
   SVG Branch diagram (decorative)
   ───────────────────────────────────────────────────── */
function BranchDecor() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const path = (delay: number) => ({
    strokeDasharray: 120,
    strokeDashoffset: drawn ? 0 : 120,
    transition: `stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  const dot = (delay: number) => ({
    opacity: drawn ? 1 : 0,
    transform: drawn ? 'scale(1)' : 'scale(0)',
    transition: `all 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
    transformOrigin: 'center',
  });

  return (
    <svg
      viewBox="0 0 160 100"
      className="w-full max-w-[200px]"
      fill="none"
      style={{ opacity: 0.55 }}
    >
      <path d="M80 12 L80 50"   stroke="var(--ui-brand-muted)" strokeWidth="1.5" strokeLinecap="round" style={path(0)} />
      <path d="M80 35 Q58 35 45 58" stroke="var(--ui-brand-muted)" strokeWidth="1.2" strokeLinecap="round" style={path(0.25)} />
      <path d="M80 35 Q102 35 115 58" stroke="var(--ui-brand-muted)" strokeWidth="1.2" strokeLinecap="round" style={path(0.25)} />
      <path d="M80 50 L80 80"   stroke="var(--ui-brand-muted)" strokeWidth="1.2" strokeLinecap="round" style={path(0.4)} />
      <path d="M45 58 L35 82"   stroke="var(--ui-brand-muted)" strokeWidth="0.9" strokeLinecap="round" style={path(0.55)} />
      <path d="M45 58 L58 82"   stroke="var(--ui-brand-muted)" strokeWidth="0.9" strokeLinecap="round" style={path(0.55)} />
      <path d="M115 58 L105 82" stroke="var(--ui-brand-muted)" strokeWidth="0.9" strokeLinecap="round" style={path(0.55)} />
      <path d="M115 58 L125 82" stroke="var(--ui-brand-muted)" strokeWidth="0.9" strokeLinecap="round" style={path(0.55)} />

      <circle cx="80"  cy="12"  r="4"   fill="var(--ui-brand)"      style={dot(0.05)} />
      <circle cx="80"  cy="12"  r="7"   fill="none" stroke="var(--ui-brand)" strokeWidth="1" opacity={0.25} style={dot(0.1)} />
      <circle cx="80"  cy="35"  r="3"   fill="var(--ui-brand-muted)" style={dot(0.3)} />
      <circle cx="45"  cy="58"  r="3.5" fill="var(--ui-brand)"      style={dot(0.45)} />
      <circle cx="115" cy="58"  r="3.5" fill="var(--ui-brand)"      style={dot(0.45)} />
      <circle cx="80"  cy="80"  r="3"   fill="var(--ui-brand-muted)" style={dot(0.55)} />
      <circle cx="35"  cy="82"  r="2.5" fill="var(--ui-brand-muted)" style={dot(0.7)} />
      <circle cx="58"  cy="82"  r="2.5" fill="var(--ui-brand-muted)" style={dot(0.7)} />
      <circle cx="105" cy="82"  r="2.5" fill="var(--ui-brand-muted)" style={dot(0.7)} />
      <circle cx="125" cy="82"  r="2.5" fill="var(--ui-brand-muted)" style={dot(0.7)} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   Loading screen
   ───────────────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <div
      className="flex-1 flex items-center justify-center"
      style={{ backgroundColor: 'var(--ui-bg-page)' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${50 + Math.cos(a) * 28}%`,
                  top:  `${50 + Math.sin(a) * 28}%`,
                  transform: 'translate(-50%,-50%)',
                  backgroundColor: 'var(--ui-brand)',
                  animation: `chatPulse 1.4s ease-in-out ${i * 0.18}s infinite`,
                }}
              />
            );
          })}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)' }}
          >
            <GitBranch className="w-7 h-7 text-white" />
          </div>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--ui-text-muted)' }}>
          Loading conversation…
        </p>
      </div>
      <style>{`
        @keyframes chatPulse {
          0%,100% { opacity:0.25; transform:translate(-50%,-50%) scale(0.8); }
          50%      { opacity:1;    transform:translate(-50%,-50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Empty / welcome state
   ───────────────────────────────────────────────────── */
const SUGGESTIONS = [
  'Explain quantum entanglement like I\'m 10',
  'Help me debug a complex async React issue',
  'What are the best practices for system design?',
  'Break down the history of the Roman Empire',
  'How does retrieval-augmented generation work?',
  'Compare TypeScript utility types with examples',
];

const FEATURES = [
  {
    icon: GitBranch,
    title: 'Branch freely',
    desc: 'Fork any idea into its own thread without losing where you started',
    color: '#d4586f',
  },
  {
    icon: Layers,
    title: 'Stay organized',
    desc: 'Navigate your thinking like a mind map, not a scroll',
    color: '#7c6f9f',
  },
  {
    icon: Network,
    title: 'Knowledge graph',
    desc: 'Watch your ideas connect semantically across conversations',
    color: '#4a9f7c',
  },
  {
    icon: Zap,
    title: 'Go deeper',
    desc: 'Every answer becomes a launchpad for the next question',
    color: '#c4933f',
  },
];

function EmptyState({ onNew, onPrompt }: { onNew: () => void; onPrompt: (p: string) => void }) {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const firstName = user?.firstName;

  return (
    <div
      className="flex-1 flex flex-col items-center justify-start overflow-y-auto relative"
      style={{ backgroundColor: 'var(--ui-bg-page)' }}
    >
      {/* Ambient canvas */}
      <PageCanvas />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(212,88,111,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        {/* ── Hero ── */}
        <div
          className="text-center mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Branch SVG */}
          <div className="flex justify-center mb-6">
            <BranchDecor />
          </div>

          {/* Greeting */}
          <h1
            className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
            style={{ color: 'var(--ui-text-primary)' }}
          >
            {firstName ? (
              <>
                Good to see you,{' '}
                <span style={{ color: 'var(--ui-brand-text)' }}>{firstName}</span>
              </>
            ) : (
              <>
                Welcome to{' '}
                <span style={{ color: 'var(--ui-brand-text)' }}>BranchAI</span>
              </>
            )}
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-md mx-auto"
            style={{ color: 'var(--ui-text-muted)' }}
          >
            Think in branches, not threads. Start a conversation and explore
            ideas without ever losing your place.
          </p>
        </div>

        {/* ── CTA ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          <button
            onClick={onNew}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 group w-full sm:w-auto justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
              color: 'white',
              boxShadow: '0 6px 20px rgba(181,56,79,0.3)',
            }}
          >
            <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            New Thread
            <Sparkles className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>

        {/* ── Prompt suggestions ── */}
        <div
          className="mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest text-center mb-3"
            style={{ color: 'var(--ui-text-faint)' }}
          >
            Try a prompt
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUGGESTIONS.map((s, i) => (
              <PromptChip
                key={s}
                label={s}
                delay={300 + i * 60}
                onClick={() => {
                  onNew();
                  // Small delay to let the conversation initialise
                  setTimeout(() => onPrompt(s), 150);
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              color={f.color}
              delay={500 + i * 80}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Main ChatPage
   ───────────────────────────────────────────────────── */
export function ChatPage() {
  const { treeOpen, setTreeOpen } = useOutletContext<AppLayoutContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const conversationParam = searchParams.get('conversation');
  const nodeParam         = searchParams.get('node');

  const {
    conversations, activeConversationId, activeTree,
    activeNodeId, isLoadingTree, isBranching,
    setActiveNodeId, selectConversation, toggleFavorite, renameConversation,
  } = useConversationStore();

  /* Sync URL → store */
  React.useEffect(() => {
    if (conversationParam && conversationParam !== activeConversationId)
      void selectConversation(conversationParam);
  }, [conversationParam, activeConversationId, selectConversation]);

  React.useEffect(() => {
    if (activeTree && nodeParam && nodeParam !== activeNodeId) {
      setTimeout(() => setActiveNodeId(nodeParam), 100);
      setSearchParams({});
    }
  }, [activeTree, nodeParam, activeNodeId, setActiveNodeId, setSearchParams]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const branchCount = activeTree
    ? activeTree.reduce((sum, root) => sum + countQuestions(root) - 1, 0)
    : 0;

  const handleNewConversation = () => {
    useConversationStore.getState().createConversation('New Thread');
  };

  const handleBranchCreate = (
    parentNodeId: string,
    blockId: string | null,
    question: string
  ) => {
    if (!activeConversationId) return;
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId, parentBlockId: blockId, question,
    });
  };

  const handleBottomBarSubmit = (question: string) => {
    if (!activeConversationId) return;
    if (branchCount === 0 || !activeTree || activeTree.length === 0) {
      let newTitle = question.trim().split(/\s+/).slice(0, 5).join(' ');
      if (newTitle.length > 35) newTitle = newTitle.slice(0, 35) + '…';
      renameConversation(activeConversationId, newTitle);
    }
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId: null, parentBlockId: null, question,
    });
  };

  /* ── Loading ── */
  if (isLoadingTree) return <LoadingScreen />;

  /* ── Active conversation ── */
  if (activeTree !== null && activeConversation) {
    return (
      <>
        {/* Desktop tree sidebar */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{ borderRight: '1px solid var(--ui-border-faint)' }}
        >
          <TreeSidebar
            rootNodes={activeTree as any}
            activeNodeId={activeNodeId}
            onNodeSelect={setActiveNodeId}
          />
        </div>

        {/* Mobile tree drawer */}
        {treeOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setTreeOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slide-in-right">
              <TreeSidebar
                rootNodes={activeTree as any}
                activeNodeId={activeNodeId}
                onNodeSelect={(id) => { setActiveNodeId(id); setTreeOpen(false); }}
              />
            </div>
          </div>
        )}

        {/* Conversation */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <ConversationView
            conversation={{
              ...activeConversation,
              ownerId: '',
              workspaceId: '',
              rootNodes: activeTree as any,
            }}
            isBranching={isBranching}
            onBranchCreate={handleBranchCreate}
            onBottomBarSubmit={handleBottomBarSubmit}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </>
    );
  }

  /* ── Empty state ── */
  return (
    <EmptyState
      onNew={handleNewConversation}
      onPrompt={handleBottomBarSubmit}
    />
  );
}