// apps/web/src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { GitBranch, Sparkles, Network, Brain, Layers } from 'lucide-react';

import { AppLayout } from './layouts/AppLayout';
import { ChatPage } from './pages/ChatPage';
import BillingPage from './pages/billing';
import { KnowledgeGraphView } from './components/graph/KnowledgeGraphView';

/* ─────────────────────────────────────────────────────
   Animated tree-branch canvas background
   ───────────────────────────────────────────────────── */
function BranchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];
    let edges: { from: number; to: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const initNodes = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.max(18, Math.floor((w * h) / 25000));
      nodes = [];
      edges = [];

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1.5,
          opacity: Math.random() * 0.4 + 0.15,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.005,
        });
      }

      // Create tree-like connections
      for (let i = 1; i < count; i++) {
        const parent = Math.floor(Math.random() * i);
        edges.push({ from: parent, to: i, opacity: 0.08 + Math.random() * 0.08 });
      }
      // Add a few extra cross-links
      for (let i = 0; i < count * 0.3; i++) {
        const a = Math.floor(Math.random() * count);
        const b = Math.floor(Math.random() * count);
        if (a !== b) edges.push({ from: a, to: b, opacity: 0.04 + Math.random() * 0.04 });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Draw edges
      edges.forEach((e) => {
        const a = nodes[e.from];
        const b = nodes[e.to];
        if (!a || !b) return;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const maxDist = 220;
        if (dist > maxDist) return;
        const alpha = e.opacity * (1 - dist / maxDist);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        // Slightly curved lines for organic feel
        const mx = (a.x + b.x) / 2 + (Math.sin(a.pulse) * 8);
        const my = (a.y + b.y) / 2 + (Math.cos(b.pulse) * 8);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle = `rgba(212, 88, 111, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const pulseOpacity = n.opacity + Math.sin(n.pulse) * 0.1;
        const pulseRadius = n.radius + Math.sin(n.pulse) * 0.5;

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 88, 111, ${pulseOpacity * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 88, 111, ${pulseOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─────────────────────────────────────────────────────
   Floating feature pills
   ───────────────────────────────────────────────────── */
const features = [
  { icon: Network, label: 'Tree-structured thinking' },
  { icon: Brain, label: 'Context-preserving branches' },
  { icon: Layers, label: 'Structured AI responses' },
  { icon: Sparkles, label: 'Built-in knowledge (RAG)' },
];

function FeaturePill({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-700 select-none"
      style={{
        borderColor: 'var(--ui-border)',
        backgroundColor: 'var(--ui-bg-elevated)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ui-brand-text)' }} />
      <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--ui-text-secondary)' }}>
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Animated branch diagram (illustrative SVG)
   ───────────────────────────────────────────────────── */
function BranchDiagram() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 600);
    return () => clearTimeout(t);
  }, []);

  const pathStyle = (delay: number) => ({
    strokeDasharray: 200,
    strokeDashoffset: drawn ? 0 : 200,
    transition: `stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  const dotStyle = (delay: number) => ({
    opacity: drawn ? 1 : 0,
    transform: drawn ? 'scale(1)' : 'scale(0)',
    transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
  });

  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full max-w-[280px] mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main trunk */}
      <path
        d="M120 20 L120 80"
        stroke="var(--ui-brand-muted)"
        strokeWidth="2"
        strokeLinecap="round"
        style={pathStyle(0)}
      />
      {/* Left branch */}
      <path
        d="M120 55 Q90 55 70 80"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={pathStyle(0.3)}
      />
      {/* Right branch */}
      <path
        d="M120 55 Q150 55 170 80"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={pathStyle(0.3)}
      />
      {/* Left sub-branch */}
      <path
        d="M70 80 Q55 95 45 115"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1"
        strokeLinecap="round"
        style={pathStyle(0.6)}
      />
      <path
        d="M70 80 Q80 95 90 115"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1"
        strokeLinecap="round"
        style={pathStyle(0.6)}
      />
      {/* Right sub-branch */}
      <path
        d="M170 80 Q160 95 150 115"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1"
        strokeLinecap="round"
        style={pathStyle(0.6)}
      />
      <path
        d="M170 80 Q185 95 195 115"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1"
        strokeLinecap="round"
        style={pathStyle(0.6)}
      />
      {/* Center continuation */}
      <path
        d="M120 80 L120 120"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={pathStyle(0.4)}
      />
      <path
        d="M120 120 Q105 130 100 145"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1"
        strokeLinecap="round"
        style={pathStyle(0.7)}
      />
      <path
        d="M120 120 Q135 130 140 145"
        stroke="var(--ui-brand-muted)"
        strokeWidth="1"
        strokeLinecap="round"
        style={pathStyle(0.7)}
      />

      {/* Nodes */}
      {/* Root */}
      <circle cx="120" cy="20" r="6" fill="var(--ui-brand)" style={dotStyle(0.1)} />
      <circle cx="120" cy="20" r="10" fill="none" stroke="var(--ui-brand)" strokeWidth="1" opacity="0.3" style={dotStyle(0.15)} />

      {/* Mid trunk */}
      <circle cx="120" cy="55" r="4" fill="var(--ui-brand-muted)" style={dotStyle(0.35)} />

      {/* L/R branches */}
      <circle cx="70" cy="80" r="4.5" fill="var(--ui-brand)" opacity="0.8" style={dotStyle(0.55)} />
      <circle cx="170" cy="80" r="4.5" fill="var(--ui-brand)" opacity="0.8" style={dotStyle(0.55)} />
      <circle cx="120" cy="80" r="3.5" fill="var(--ui-brand-muted)" style={dotStyle(0.5)} />

      {/* Leaves */}
      <circle cx="45" cy="115" r="3" fill="var(--ui-brand-muted)" opacity="0.7" style={dotStyle(0.8)} />
      <circle cx="90" cy="115" r="3" fill="var(--ui-brand-muted)" opacity="0.7" style={dotStyle(0.8)} />
      <circle cx="150" cy="115" r="3" fill="var(--ui-brand-muted)" opacity="0.7" style={dotStyle(0.8)} />
      <circle cx="195" cy="115" r="3" fill="var(--ui-brand-muted)" opacity="0.7" style={dotStyle(0.8)} />

      <circle cx="120" cy="120" r="3.5" fill="var(--ui-brand-muted)" style={dotStyle(0.65)} />
      <circle cx="100" cy="145" r="2.5" fill="var(--ui-brand-muted)" opacity="0.6" style={dotStyle(0.9)} />
      <circle cx="140" cy="145" r="2.5" fill="var(--ui-brand-muted)" opacity="0.6" style={dotStyle(0.9)} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   Sign-in page
   ───────────────────────────────────────────────────── */
function SignInPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ backgroundColor: 'var(--ui-bg-page)' }}
    >
      {/* ── Left panel (hero / branding) — hidden on mobile ── */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col items-center justify-center p-12 overflow-hidden"
        style={{ backgroundColor: 'var(--ui-bg-subtle)' }}
      >
        {/* Canvas background */}
        <BranchCanvas />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,88,111,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 max-w-lg text-center transition-all duration-1000"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Branch diagram */}
          <div className="mb-8">
            <BranchDiagram />
          </div>

          <h2
            className="text-3xl xl:text-4xl font-bold mb-3 leading-tight"
            style={{ color: 'var(--ui-text-primary)' }}
          >
            Think in branches,
            <br />
            <span style={{ color: 'var(--ui-brand-text)' }}>not threads.</span>
          </h2>

          <p
            className="text-base mb-8 max-w-sm mx-auto leading-relaxed"
            style={{ color: 'var(--ui-text-muted)' }}
          >
            A non-linear AI conversation platform that transforms chat into a
            tree-structured thinking system.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {features.map((f, i) => (
              <FeaturePill key={f.label} icon={f.icon} label={f.label} delay={800 + i * 150} />
            ))}
          </div>
        </div>

        {/* Bottom attribution */}
        <p
          className="absolute bottom-6 text-xs transition-opacity duration-1000"
          style={{
            color: 'var(--ui-text-faint)',
            opacity: mounted ? 1 : 0,
          }}
        >
          Explore → Branch → Organize → Navigate
        </p>
      </div>

      {/* ── Right panel (sign-in form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative">
        {/* Subtle glow behind form on mobile */}
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(212,88,111,0.06) 0%, transparent 70%)',
          }}
        />

        <div
          className="relative z-10 w-full max-w-sm transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {/* Logo + title */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--ui-brand) 0%, var(--ui-bot-to) 100%)',
              }}
            >
              <GitBranch className="w-7 h-7 text-white relative z-10" />
              {/* Shimmer effect */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />
            </div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: 'var(--ui-text-primary)' }}
            >
              BranchAI
            </h1>
            <p className="text-sm" style={{ color: 'var(--ui-text-muted)' }}>
              Explore ideas without losing context.
            </p>
          </div>

          {/* Mobile-only: mini branch diagram */}
          <div className="lg:hidden mb-6">
            <BranchDiagram />
          </div>

          {/* Clerk sign-in widget */}
          <div
            className="rounded-2xl p-1 transition-all duration-500"
            style={{
              opacity: mounted ? 1 : 0,
              transitionDelay: '200ms',
            }}
          >
            <SignIn />
          </div>

          {/* Mobile-only feature pills */}
          <div className="lg:hidden flex flex-wrap justify-center gap-2 mt-8">
            {features.map((f, i) => (
              <FeaturePill key={f.label} icon={f.icon} label={f.label} delay={600 + i * 120} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <p
          className="absolute bottom-5 text-xs text-center transition-opacity duration-1000"
          style={{
            color: 'var(--ui-text-faint)',
            opacity: mounted ? 0.7 : 0,
            transitionDelay: '1s',
          }}
        >
          Not just AI chat — a thinking system for structured exploration.
        </p>
      </div>

      {/* Shimmer keyframe (injected once) */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   App root
   ───────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ChatPage />} />
            <Route path="/graph" element={<KnowledgeGraphView />} />
            <Route
              path="/billing"
              element={
                <div className="flex-1 min-w-0 overflow-y-auto">
                  <BillingPage />
                </div>
              }
            />
          </Route>
        </Routes>
      </SignedIn>
    </>
  );
}