// src/pages/BillingPage.tsx
import React, { useState } from 'react';
import {
  Check, Zap, Crown, Users, Sprout, TreePine, Trees,
  Globe, ChevronRight, Star, ArrowRight, Sparkles,
  CreditCard, Calendar, TrendingUp, BarChart3,
  Download, FileText, Gauge, HardDrive, MessageSquare,
  GitBranch, ArrowUpRight, Shield, Clock, Bolt,
  Package, Plus, Minus, AlertCircle, Receipt,
  ChevronDown, ExternalLink, X,
} from 'lucide-react';
import { cn } from '../lib/utils';

/* ─────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────── */

type PlanTier = 'seed' | 'growth' | 'canopy' | 'forest';
type BillingCycle = 'monthly' | 'yearly';

interface UserSubscription {
  plan: PlanTier;
  billingCycle: BillingCycle;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  usage: {
    messagesUsed: number;
    messagesLimit: number;
    storageUsedMB: number;
    storageLimitMB: number;
    workspacesUsed: number;
    workspacesLimit: number;
    branchDepthUsed: number;
    branchDepthLimit: number;
  };
  invoices: Invoice[];
  paymentMethod?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  addOns: AddOn[];
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl?: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  active: boolean;
}

/* ─────────────────────────────────────────────────────
   PLAN DATA
   ───────────────────────────────────────────────────── */

const plans = [
  {
    tier: 'seed' as PlanTier,
    name: 'Seed',
    tagline: 'Plant your first ideas.',
    icon: Sprout,
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    color: 'emerald',
    features: [
      { text: '50 AI messages / day', highlight: false },
      { text: '10 levels branching depth', highlight: false },
      { text: '10 MB document uploads', highlight: false },
      { text: 'Basic AI models', highlight: false },
      { text: '1 workspace', highlight: false },
      { text: 'Community support', highlight: false },
    ],
    limitations: [
      'Limited branching depth',
      'Basic models only',
      'No export features',
    ],
  },
  {
    tier: 'growth' as PlanTier,
    name: 'Growth',
    tagline: 'Expand your thinking.',
    icon: TreePine,
    monthlyPrice: 10,
    yearlyPrice: 96,
    popular: true,
    color: 'brand',
    features: [
      { text: '500 AI messages / day', highlight: true },
      { text: '50+ nodes per tree', highlight: true },
      { text: '100 MB document uploads', highlight: true },
      { text: 'Faster responses', highlight: false },
      { text: 'Better AI models', highlight: true },
      { text: 'Multiple workspaces', highlight: false },
      { text: 'Email support', highlight: false },
    ],
    limitations: [],
  },
  {
    tier: 'canopy' as PlanTier,
    name: 'Canopy',
    tagline: 'See the full picture.',
    icon: Trees,
    monthlyPrice: 24,
    yearlyPrice: 230,
    popular: false,
    color: 'amber',
    features: [
      { text: '1000+ AI messages / day', highlight: true },
      { text: 'Near-unlimited branching', highlight: true },
      { text: '200 MB+ document ingestion', highlight: true },
      { text: 'Priority processing', highlight: true },
      { text: 'Best AI models (GPT-4 class)', highlight: true },
      { text: 'Advanced RAG depth', highlight: false },
      { text: 'Export (Markdown / trees)', highlight: true },
      { text: 'Early access features', highlight: false },
      { text: 'Priority support', highlight: false },
    ],
    limitations: [],
  },
  {
    tier: 'forest' as PlanTier,
    name: 'Forest',
    tagline: 'Grow together.',
    icon: Globe,
    monthlyPrice: 49,
    yearlyPrice: 470,
    popular: false,
    color: 'violet',
    features: [
      { text: 'Everything in Canopy', highlight: false },
      { text: 'Shared workspaces', highlight: true },
      { text: 'Multi-user collaboration', highlight: true },
      { text: 'Role-based permissions', highlight: true },
      { text: 'Shared knowledge trees', highlight: true },
      { text: 'Higher limits across usage', highlight: false },
      { text: 'Admin dashboard', highlight: true },
      { text: 'Dedicated support', highlight: false },
      { text: 'Custom integrations', highlight: false },
    ],
    limitations: [],
  },
];

const addOns = [
  {
    id: 'usage-pack-light',
    name: 'Extra Queries Pack',
    description: '200 additional AI messages',
    price: 5,
    icon: MessageSquare,
    category: 'usage',
  },
  {
    id: 'usage-pack-heavy',
    name: 'Heavy Usage Pack',
    description: '500 additional AI messages + priority',
    price: 10,
    icon: Zap,
    category: 'usage',
  },
  {
    id: 'storage-extra',
    name: 'Extra Storage',
    description: '+500 MB document storage',
    price: 5,
    icon: HardDrive,
    category: 'storage',
  },
  {
    id: 'priority-boost',
    name: 'Priority Boost',
    description: 'Faster processing during peak hours',
    price: 8,
    icon: Bolt,
    category: 'boost',
  },
];

/* ─────────────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────────────── */

const mockSubscription: UserSubscription = {
  plan: 'growth',
  billingCycle: 'monthly',
  currentPeriodStart: '2025-01-15',
  currentPeriodEnd: '2025-02-15',
  cancelAtPeriodEnd: false,
  usage: {
    messagesUsed: 342,
    messagesLimit: 500,
    storageUsedMB: 67,
    storageLimitMB: 100,
    workspacesUsed: 2,
    workspacesLimit: 5,
    branchDepthUsed: 38,
    branchDepthLimit: 50,
  },
  invoices: [
    { id: 'inv_001', date: '2025-01-15', amount: 10, status: 'paid' },
    { id: 'inv_002', date: '2024-12-15', amount: 10, status: 'paid' },
    { id: 'inv_003', date: '2024-11-15', amount: 10, status: 'paid' },
    { id: 'inv_004', date: '2024-10-15', amount: 10, status: 'paid' },
  ],
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2027,
  },
  addOns: [
    { id: 'usage-pack-light', name: 'Extra Queries Pack', price: 5, active: true },
  ],
};

/* ─────────────────────────────────────────────────────
   HELPER COMPONENTS
   ───────────────────────────────────────────────────── */

const UsageBar: React.FC<{
  label: string;
  used: number;
  limit: number;
  unit?: string;
  icon: React.ReactNode;
}> = ({ label, used, limit, unit = '', icon }) => {
  const pct = Math.min((used / limit) * 100, 100);
  const isHigh = pct > 80;
  const isCritical = pct > 95;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--ui-text-faint)' }}>{icon}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--ui-text-secondary)' }}>
            {label}
          </span>
        </div>
        <span className={cn(
          'text-sm font-semibold',
          isCritical ? 'text-red-500' : isHigh ? 'text-amber-500' : ''
        )} style={!isCritical && !isHigh ? { color: 'var(--ui-text-primary)' } : {}}>
          {used.toLocaleString()}{unit} / {limit.toLocaleString()}{unit}
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--ui-bg-subtle)' }}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            isCritical ? 'bg-red-500' : isHigh ? 'bg-amber-500' : ''
          )}
          style={{
            width: `${pct}%`,
            ...(!isCritical && !isHigh ? { background: 'var(--ui-brand)' } : {}),
          }}
        />
      </div>
      {isCritical && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Approaching limit — consider upgrading
        </p>
      )}
    </div>
  );
};

const PlanBadge: React.FC<{ tier: PlanTier }> = ({ tier }) => {
  const plan = plans.find((p) => p.tier === tier)!;
  const Icon = plan.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{
        background: 'var(--ui-brand-subtle)',
        color: 'var(--ui-brand-text)',
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      {plan.name}
    </span>
  );
};

/* ─────────────────────────────────────────────────────
   PRICING CARDS VIEW
   ───────────────────────────────────────────────────── */

const PricingView: React.FC<{
  billingCycle: BillingCycle;
  setBillingCycle: (c: BillingCycle) => void;
  currentPlan?: PlanTier;
  onSelectPlan: (tier: PlanTier) => void;
}> = ({ billingCycle, setBillingCycle, currentPlan, onSelectPlan }) => {

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
          style={{ background: 'var(--ui-brand-subtle)', color: 'var(--ui-brand-text)' }}>
          <Sparkles className="w-3.5 h-3.5" />
          Simple, transparent pricing
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--ui-text-primary)' }}>
          Choose your growth plan
        </h2>
        <p className="text-base" style={{ color: 'var(--ui-text-muted)' }}>
          Start free, scale as your ideas branch out. No hidden fees, cancel anytime.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative p-1 rounded-xl" style={{ background: 'var(--ui-bg-subtle)', border: '1px solid var(--ui-border)' }}>
          <div className="flex relative">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'relative z-10 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
              )}
              style={{
                color: billingCycle === 'monthly' ? 'var(--ui-text-inverted)' : 'var(--ui-text-muted)',
                background: billingCycle === 'monthly' ? 'var(--ui-brand)' : 'transparent',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                'relative z-10 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
              )}
              style={{
                color: billingCycle === 'yearly' ? 'var(--ui-text-inverted)' : 'var(--ui-text-muted)',
                background: billingCycle === 'yearly' ? 'var(--ui-brand)' : 'transparent',
              }}
            >
              Yearly
            </button>
          </div>
        </div>
        {billingCycle === 'yearly' && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Save 20%
          </span>
        )}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          const monthlyEquiv = billingCycle === 'yearly' && plan.yearlyPrice > 0
            ? (plan.yearlyPrice / 12).toFixed(0) : null;
          const isCurrent = currentPlan === plan.tier;
          const isPopular = plan.popular;
          const isDowngrade = currentPlan && plans.findIndex(p => p.tier === currentPlan) > plans.findIndex(p => p.tier === plan.tier);

          return (
            <div
              key={plan.tier}
              className={cn(
                'relative rounded-2xl p-6 flex flex-col transition-all duration-200',
                isPopular ? 'ring-2 scale-[1.02] md:scale-105' : '',
              )}
              style={{
                background: 'var(--ui-card-bg)',
                border: isPopular ? 'none' : '1px solid var(--ui-border)',
                boxShadow: isPopular
                  ? '0 8px 32px var(--ui-card-shadow), 0 0 0 2px var(--ui-brand)'
                  : '0 2px 8px var(--ui-card-shadow)',
                ...(isPopular ? { borderColor: 'var(--ui-brand)' } : {}),
              }}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: 'var(--ui-brand)', color: 'var(--ui-text-inverted)' }}>
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--ui-brand-subtle)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--ui-brand-text)' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--ui-text-primary)' }}>
                      {plan.name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--ui-text-muted)' }}>
                  {plan.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: 'var(--ui-text-primary)' }}>
                    {price === 0 ? 'Free' : `$${price}`}
                  </span>
                  {price > 0 && (
                    <span className="text-sm" style={{ color: 'var(--ui-text-muted)' }}>
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
                {monthlyEquiv && (
                  <p className="text-xs mt-1" style={{ color: 'var(--ui-text-faint)' }}>
                    ${monthlyEquiv}/mo billed yearly
                  </p>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={() => onSelectPlan(plan.tier)}
                disabled={isCurrent}
                className={cn(
                  'w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 mb-6',
                  isCurrent ? 'cursor-default opacity-60' : 'hover:opacity-90 active:scale-[0.98]',
                )}
                style={{
                  background: isCurrent
                    ? 'var(--ui-bg-subtle)'
                    : isPopular
                      ? 'var(--ui-brand)'
                      : 'var(--ui-bg-subtle)',
                  color: isCurrent
                    ? 'var(--ui-text-muted)'
                    : isPopular
                      ? 'var(--ui-text-inverted)'
                      : 'var(--ui-text-primary)',
                  border: isCurrent || isPopular ? 'none' : '1px solid var(--ui-border)',
                }}
              >
                {isCurrent ? 'Current Plan' : isDowngrade ? 'Downgrade' : price === 0 ? 'Get Started' : 'Upgrade'}
              </button>

              {/* Features */}
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check
                      className={cn('w-4 h-4 mt-0.5 flex-shrink-0', f.highlight ? '' : '')}
                      style={{ color: f.highlight ? 'var(--ui-brand)' : 'var(--ui-text-faint)' }}
                    />
                    <span className="text-sm" style={{
                      color: f.highlight ? 'var(--ui-text-primary)' : 'var(--ui-text-secondary)',
                      fontWeight: f.highlight ? 500 : 400,
                    }}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.tier === 'forest' && (
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--ui-border-faint)' }}>
                  <p className="text-xs text-center" style={{ color: 'var(--ui-text-faint)' }}>
                    Coming soon — <span className="font-medium" style={{ color: 'var(--ui-text-muted)' }}>join waitlist</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add-ons section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--ui-text-primary)' }}>
            Power-up Add-ons
          </h3>
          <p className="text-sm" style={{ color: 'var(--ui-text-muted)' }}>
            Boost your plan with extras — available on any paid plan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addon) => {
            const Icon = addon.icon;
            return (
              <div
                key={addon.id}
                className="rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer group"
                style={{
                  background: 'var(--ui-card-bg)',
                  border: '1px solid var(--ui-border)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--ui-brand-subtle)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--ui-brand-text)' }} />
                  </div>
                  <span className="text-lg font-bold" style={{ color: 'var(--ui-text-primary)' }}>
                    ${addon.price}
                  </span>
                </div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--ui-text-primary)' }}>
                  {addon.name}
                </h4>
                <p className="text-xs" style={{ color: 'var(--ui-text-muted)' }}>
                  {addon.description}
                </p>
                <button
                  className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold transition-all opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'var(--ui-brand-subtle)',
                    color: 'var(--ui-brand-text)',
                  }}
                >
                  Add to plan
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-5xl mx-auto">
        <ComparisonTable billingCycle={billingCycle} currentPlan={currentPlan} />
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <FAQ />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   COMPARISON TABLE
   ───────────────────────────────────────────────────── */

const comparisonRows = [
  { feature: 'AI Messages / Day', seed: '50', growth: '500', canopy: '1,000+', forest: 'Custom' },
  { feature: 'Branching Depth', seed: '10 levels', growth: '50+ nodes', canopy: 'Near-unlimited', forest: 'Unlimited' },
  { feature: 'Document Uploads', seed: '10 MB', growth: '100 MB', canopy: '200 MB+', forest: '500 MB+' },
  { feature: 'AI Model Quality', seed: 'Basic', growth: 'Better', canopy: 'Best (GPT-4)', forest: 'Best (GPT-4)' },
  { feature: 'Workspaces', seed: '1', growth: 'Multiple', canopy: 'Unlimited', forest: 'Shared' },
  { feature: 'Response Speed', seed: 'Standard', growth: 'Fast', canopy: 'Priority', forest: 'Priority' },
  { feature: 'RAG Depth', seed: '—', growth: 'Standard', canopy: 'Advanced', forest: 'Advanced' },
  { feature: 'Export', seed: '—', growth: '—', canopy: '✓', forest: '✓' },
  { feature: 'Collaboration', seed: '—', growth: '—', canopy: '—', forest: '✓' },
  { feature: 'Admin Dashboard', seed: '—', growth: '—', canopy: '—', forest: '✓' },
  { feature: 'Support', seed: 'Community', growth: 'Email', canopy: 'Priority', forest: 'Dedicated' },
];

const ComparisonTable: React.FC<{ billingCycle: BillingCycle; currentPlan?: PlanTier }> = ({ billingCycle, currentPlan }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--ui-border)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 transition-colors"
        style={{ background: 'var(--ui-bg-subtle)' }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--ui-text-primary)' }}>
          Compare all features
        </span>
        <ChevronDown
          className={cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180')}
          style={{ color: 'var(--ui-text-muted)' }}
        />
      </button>

      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--ui-bg-subtle)', borderBottom: '1px solid var(--ui-border)' }}>
                <th className="text-left px-6 py-3 font-semibold" style={{ color: 'var(--ui-text-primary)' }}>Feature</th>
                {plans.map((p) => (
                  <th key={p.tier} className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--ui-text-primary)' }}>
                    <div className="flex flex-col items-center gap-1">
                      <span>{p.name}</span>
                      {currentPlan === p.tier && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--ui-brand-subtle)', color: 'var(--ui-brand-text)' }}>
                          Current
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{
                    borderBottom: '1px solid var(--ui-border-faint)',
                    background: i % 2 === 0 ? 'var(--ui-card-bg)' : 'var(--ui-bg-subtle)',
                  }}
                >
                  <td className="px-6 py-3 font-medium" style={{ color: 'var(--ui-text-secondary)' }}>
                    {row.feature}
                  </td>
                  {(['seed', 'growth', 'canopy', 'forest'] as const).map((tier) => (
                    <td key={tier} className="text-center px-4 py-3" style={{ color: 'var(--ui-text-muted)' }}>
                      {row[tier] === '✓' ? (
                        <Check className="w-4 h-4 mx-auto" style={{ color: 'var(--ui-brand)' }} />
                      ) : row[tier] === '—' ? (
                        <Minus className="w-4 h-4 mx-auto" style={{ color: 'var(--ui-text-faint)' }} />
                      ) : (
                        <span className="text-sm" style={{ color: 'var(--ui-text-secondary)' }}>{row[tier]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────── */

const faqItems = [
  {
    q: 'Can I change plans anytime?',
    a: 'Yes! Upgrade instantly or downgrade at the end of your billing period. No lock-in contracts.',
  },
  {
    q: 'What happens when I hit my message limit?',
    a: 'You can purchase an add-on pack for extra messages, or wait until the next day when your quota resets.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a 14-day money-back guarantee on all paid plans. No questions asked.',
  },
  {
    q: 'What AI models do you use?',
    a: 'Seed uses cost-optimized models. Growth uses mid-tier models with faster inference. Canopy and Forest get access to GPT-4 class models with priority processing.',
  },
  {
    q: 'When will the Forest (Teams) plan launch?',
    a: 'Forest is planned for later this year. Join the waitlist to get early access and special pricing.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-center" style={{ color: 'var(--ui-text-primary)' }}>
        Frequently Asked Questions
      </h3>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all"
            style={{ border: '1px solid var(--ui-border)' }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ background: openIndex === i ? 'var(--ui-bg-subtle)' : 'var(--ui-card-bg)' }}
            >
              <span className="text-sm font-semibold pr-4" style={{ color: 'var(--ui-text-primary)' }}>
                {item.q}
              </span>
              <ChevronDown
                className={cn('w-4 h-4 flex-shrink-0 transition-transform duration-200', openIndex === i && 'rotate-180')}
                style={{ color: 'var(--ui-text-muted)' }}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 py-4" style={{ background: 'var(--ui-card-bg)', borderTop: '1px solid var(--ui-border-faint)' }}>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ui-text-muted)' }}>
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   DASHBOARD VIEW (subscribed user)
   ───────────────────────────────────────────────────── */

const DashboardView: React.FC<{
  subscription: UserSubscription;
  onChangePlan: () => void;
  onCancelPlan: () => void;
  onManagePayment: () => void;
  onBuyAddOn: (id: string) => void;
  onRemoveAddOn: (id: string) => void;
}> = ({ subscription, onChangePlan, onCancelPlan, onManagePayment, onBuyAddOn, onRemoveAddOn }) => {
  const currentPlan = plans.find((p) => p.tier === subscription.plan)!;
  const Icon = currentPlan.icon;
  const daysLeft = Math.ceil(
    (new Date(subscription.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top banner — current plan */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background: 'var(--ui-card-bg)',
          border: '1px solid var(--ui-border)',
          boxShadow: '0 4px 16px var(--ui-card-shadow)',
        }}
      >
        {/* Decorative gradient */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--ui-brand)' }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--ui-brand-subtle)' }}>
              <Icon className="w-7 h-7" style={{ color: 'var(--ui-brand-text)' }} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--ui-text-primary)' }}>
                  {currentPlan.name} Plan
                </h2>
                <PlanBadge tier={subscription.plan} />
              </div>
              <p className="text-sm" style={{ color: 'var(--ui-text-muted)' }}>
                {currentPlan.tagline}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--ui-text-secondary)' }}>
                  <CreditCard className="w-4 h-4" style={{ color: 'var(--ui-text-faint)' }} />
                  <span className="font-semibold">
                    ${currentPlan.monthlyPrice}
                  </span>
                  <span style={{ color: 'var(--ui-text-muted)' }}>
                    /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--ui-text-secondary)' }}>
                  <Calendar className="w-4 h-4" style={{ color: 'var(--ui-text-faint)' }} />
                  <span>{daysLeft} days remaining</span>
                </div>
              </div>
              {subscription.cancelAtPeriodEnd && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'var(--ui-callout-warn-bg)', color: 'var(--ui-callout-warn-text)', border: '1px solid var(--ui-callout-warn-border)' }}>
                  <AlertCircle className="w-3.5 h-3.5" />
                  Cancels on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:items-end flex-shrink-0">
            <button
              onClick={onChangePlan}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'var(--ui-brand)', color: 'var(--ui-text-inverted)' }}
            >
              <span className="flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Change Plan
              </span>
            </button>
            {!subscription.cancelAtPeriodEnd && (
              <button
                onClick={onCancelPlan}
                className="px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{ color: 'var(--ui-text-faint)' }}
              >
                Cancel subscription
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Usage stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: 'var(--ui-card-bg)', border: '1px solid var(--ui-border)' }}>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--ui-brand-text)' }} />
            <h3 className="text-base font-bold" style={{ color: 'var(--ui-text-primary)' }}>
              Usage This Period
            </h3>
          </div>
          <div className="space-y-5">
            <UsageBar
              label="AI Messages"
              used={subscription.usage.messagesUsed}
              limit={subscription.usage.messagesLimit}
              icon={<MessageSquare className="w-4 h-4" />}
            />
            <UsageBar
              label="Document Storage"
              used={subscription.usage.storageUsedMB}
              limit={subscription.usage.storageLimitMB}
              unit=" MB"
              icon={<HardDrive className="w-4 h-4" />}
            />
            <UsageBar
              label="Branch Depth"
              used={subscription.usage.branchDepthUsed}
              limit={subscription.usage.branchDepthLimit}
              icon={<GitBranch className="w-4 h-4" />}
            />
            <UsageBar
              label="Workspaces"
              used={subscription.usage.workspacesUsed}
              limit={subscription.usage.workspacesLimit}
              icon={<Package className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-6">
          {/* Payment method */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--ui-card-bg)', border: '1px solid var(--ui-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" style={{ color: 'var(--ui-brand-text)' }} />
                <h3 className="text-base font-bold" style={{ color: 'var(--ui-text-primary)' }}>
                  Payment Method
                </h3>
              </div>
              <button
                onClick={onManagePayment}
                className="text-sm font-medium flex items-center gap-1 transition-colors"
                style={{ color: 'var(--ui-brand-text)' }}
              >
                Manage <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscription.paymentMethod ? (
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--ui-bg-subtle)' }}>
                <div className="w-12 h-8 rounded-md flex items-center justify-center"
                  style={{ background: 'var(--ui-bg-page)', border: '1px solid var(--ui-border)' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--ui-text-muted)' }}>
                    {subscription.paymentMethod.brand}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--ui-text-primary)' }}>
                    •••• •••• •••• {subscription.paymentMethod.last4}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--ui-text-muted)' }}>
                    Expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={onManagePayment}
                className="w-full py-3 rounded-xl text-sm font-medium border-2 border-dashed transition-colors"
                style={{ borderColor: 'var(--ui-border)', color: 'var(--ui-text-muted)' }}
              >
                + Add payment method
              </button>
            )}
          </div>

          {/* Active add-ons */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--ui-card-bg)', border: '1px solid var(--ui-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: 'var(--ui-brand-text)' }} />
                <h3 className="text-base font-bold" style={{ color: 'var(--ui-text-primary)' }}>
                  Active Add-ons
                </h3>
              </div>
            </div>
            {subscription.addOns.length > 0 ? (
              <div className="space-y-3">
                {subscription.addOns.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'var(--ui-bg-subtle)' }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--ui-text-primary)' }}>
                        {addon.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--ui-text-muted)' }}>
                        ${addon.price}/mo
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveAddOn(addon.id)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: 'var(--ui-text-faint)' }}
                      title="Remove add-on"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--ui-text-muted)' }}>
                No active add-ons
              </p>
            )}
            <button
              onClick={() => { /* scroll to add-ons or open modal */ }}
              className="mt-3 w-full py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
              style={{ background: 'var(--ui-brand-subtle)', color: 'var(--ui-brand-text)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Browse add-ons
            </button>
          </div>
        </div>
      </div>

      {/* Billing history */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--ui-card-bg)', border: '1px solid var(--ui-border)' }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--ui-border-faint)' }}>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5" style={{ color: 'var(--ui-brand-text)' }} />
            <h3 className="text-base font-bold" style={{ color: 'var(--ui-text-primary)' }}>
              Billing History
            </h3>
          </div>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--ui-border-faint)' }}>
          {subscription.invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-[var(--ui-bg-subtle)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--ui-bg-subtle)' }}>
                  <FileText className="w-4 h-4" style={{ color: 'var(--ui-text-faint)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--ui-text-primary)' }}>
                    {new Date(inv.date).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--ui-text-muted)' }}>
                    Invoice #{inv.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--ui-text-primary)' }}>
                  ${inv.amount.toFixed(2)}
                </span>
                <span className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  inv.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  inv.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                )}>
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </span>
                <button
                  className="p-1.5 rounded-lg transition-colors hover:bg-[var(--ui-bg-subtle)]"
                  style={{ color: 'var(--ui-text-faint)' }}
                  title="Download invoice"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next billing info */}
      <div className="rounded-xl p-5 flex items-center justify-between"
        style={{ background: 'var(--ui-bg-subtle)', border: '1px solid var(--ui-border-faint)' }}>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" style={{ color: 'var(--ui-text-faint)' }} />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--ui-text-secondary)' }}>
              Next billing date
            </p>
            <p className="text-xs" style={{ color: 'var(--ui-text-muted)' }}>
              {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <p className="text-lg font-bold" style={{ color: 'var(--ui-text-primary)' }}>
          ${(currentPlan.monthlyPrice + subscription.addOns.reduce((s, a) => s + a.price, 0)).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   MAIN BILLING PAGE
   ───────────────────────────────────────────────────── */

interface BillingPageProps {
  /** If provided, renders the dashboard view; otherwise shows pricing */
  subscription?: UserSubscription | null;
}

export const BillingPage: React.FC<BillingPageProps> = ({
  subscription: subProp,
}) => {
  // For demo: toggle between views
  const [viewMode, setViewMode] = useState<'pricing' | 'dashboard'>(
    subProp ? 'dashboard' : 'pricing'
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Use mock data for dashboard demo
  const subscription = subProp ?? mockSubscription;

  const handleSelectPlan = (tier: PlanTier) => {
    console.log('Selected plan:', tier);
    // In production: redirect to Stripe checkout
  };

  return (
    <div style={{ background: 'var(--ui-bg-page)' }}>
      {/* Page header */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* View mode tabs (for demo/navigation) */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--ui-text-primary)' }}>
              {viewMode === 'dashboard' ? 'Billing & Subscription' : 'Pricing'}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--ui-text-muted)' }}>
              {viewMode === 'dashboard'
                ? 'Manage your subscription, usage, and billing details.'
                : 'Find the perfect plan for your workflow.'}
            </p>
          </div>

          {/* Toggle for demo */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--ui-bg-subtle)', border: '1px solid var(--ui-border)' }}>
            <button
              onClick={() => setViewMode('pricing')}
              className={cn('px-4 py-2 text-sm font-medium rounded-lg transition-all')}
              style={{
                background: viewMode === 'pricing' ? 'var(--ui-brand)' : 'transparent',
                color: viewMode === 'pricing' ? 'var(--ui-text-inverted)' : 'var(--ui-text-muted)',
              }}
            >
              Plans
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={cn('px-4 py-2 text-sm font-medium rounded-lg transition-all')}
              style={{
                background: viewMode === 'dashboard' ? 'var(--ui-brand)' : 'transparent',
                color: viewMode === 'dashboard' ? 'var(--ui-text-inverted)' : 'var(--ui-text-muted)',
              }}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'pricing' ? (
          <PricingView
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            currentPlan={subscription?.plan}
            onSelectPlan={handleSelectPlan}
          />
        ) : (
          <DashboardView
            subscription={subscription}
            onChangePlan={() => setViewMode('pricing')}
            onCancelPlan={() => console.log('Cancel plan')}
            onManagePayment={() => console.log('Manage payment')}
            onBuyAddOn={(id) => console.log('Buy add-on:', id)}
            onRemoveAddOn={(id) => console.log('Remove add-on:', id)}
          />
        )}

        {/* Footer */}
        <div className="mt-16 text-center space-y-4 pb-8">
          <div className="flex items-center justify-center gap-6 text-sm" style={{ color: 'var(--ui-text-faint)' }}>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
              Powered by Stripe
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Cancel anytime
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--ui-text-faint)' }}>
            All prices in USD. Yearly plans save 20%. Need a custom plan?{' '}
            <button className="underline font-medium" style={{ color: 'var(--ui-brand-text)' }}>
              Contact us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;