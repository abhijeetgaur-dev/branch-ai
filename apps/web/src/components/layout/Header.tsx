// apps/web/src/components/layout/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Settings, ChevronDown, Command,
  LogOut, User, CreditCard, HelpCircle, Moon, Sun,
  Menu, GitBranch,
} from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../lib/utils';

interface HeaderUser {
  name:    string;
  avatar?: string;
  email?:  string;
}

interface HeaderProps {
  conversationTitle?: string;
  branchCount?:       number;
  user?:              HeaderUser;
  // Mobile
  onMenuOpen?:        () => void;
  onTreeOpen?:        () => void;
  showTreeButton?:    boolean;
}

export const Header: React.FC<HeaderProps> = ({
  conversationTitle, branchCount, user,
  onMenuOpen, onTreeOpen, showTreeButton,
}) => {
  const { signOut }            = useClerk();
  const { isDark, toggle }     = useThemeStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayUser = user ?? { name: 'You' };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    if (dropdownOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setDropdownOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="h-14 md:h-16 border-b border-ui flex-shrink-0 sticky top-0 z-40"
      style={{ backgroundColor: 'color-mix(in srgb, var(--ui-bg-base) 88%, transparent)', backdropFilter: 'blur(12px)' }}
    >
      <div className="h-full px-3 md:px-6 flex items-center gap-2 md:gap-4">

        {/* ── Mobile: hamburger ── */}
        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-500 transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* ── Left: title ── */}
        <div className="flex-1 min-w-0">
          {conversationTitle ? (
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-sm md:text-base font-semibold text-primary truncate">
                {conversationTitle}
              </h1>
              {branchCount != null && branchCount > 0 && (
                <span className="hidden sm:block text-xs text-muted whitespace-nowrap flex-shrink-0">
                  · {branchCount} {branchCount === 1 ? 'branch' : 'branches'}
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-faint hidden md:block">No conversation selected</span>
          )}
        </div>

        {/* ── Center: search (desktop) ── */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint group-focus-within:text-brand-500 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl pl-9 pr-10 py-2 text-sm transition-all"
              style={{ background: 'var(--ui-bg-subtle)', color: 'var(--ui-text-primary)', border: '1px solid var(--ui-border)' }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-faint">
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs rounded"
                style={{ background: 'var(--ui-border)', color: 'var(--ui-text-muted)' }}>
                <Command className="w-3 h-3" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* ── Right: actions ── */}
        <div className="flex items-center gap-1 flex-shrink-0">

          {/* Mobile search */}
          <button
            className="md:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-100 transition-colors"
            onClick={() => setSearchOpen((o) => !o)}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile tree toggle */}
          {showTreeButton && (
            <button
              onClick={onTreeOpen}
              className="md:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-100 transition-colors"
              aria-label="Open branch navigator"
            >
              <GitBranch className="w-5 h-5" />
            </button>
          )}

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className={cn(
                'flex items-center gap-1.5 px-1.5 py-1 rounded-lg transition-colors',
                dropdownOpen ? 'bg-surface-100' : 'hover:bg-surface-100'
              )}
            >
              {displayUser.avatar ? (
                <img src={displayUser.avatar} alt={displayUser.name}
                  className="w-7 h-7 rounded-full object-cover bg-surface-200 flex-shrink-0" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold flex-shrink-0">
                  {displayUser.name.charAt(0).toUpperCase()}
                </div>
              )}
              <ChevronDown className={cn('w-3.5 h-3.5 text-faint transition-transform duration-200 hidden sm:block', dropdownOpen && 'rotate-180')} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 rounded-xl shadow-lg py-1.5 z-50 animate-fade-in"
                style={{ background: 'var(--ui-bg-elevated)', border: '1px solid var(--ui-border)', boxShadow: '0 8px 24px var(--ui-card-shadow)' }}
              >
                {/* User info */}
                <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--ui-border-faint)' }}>
                  <div className="flex items-center gap-3">
                    {displayUser.avatar ? (
                      <img src={displayUser.avatar} alt={displayUser.name}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold flex-shrink-0">
                        {displayUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary truncate">{displayUser.name}</p>
                      {displayUser.email && <p className="text-xs text-muted truncate">{displayUser.email}</p>}
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  {[
                    { icon: <User className="w-4 h-4" />, label: 'Profile' },
                    { icon: <CreditCard className="w-4 h-4" />, label: 'Billing' },
                    { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
                  ].map(({ icon, label }) => (
                    <button key={label} onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--ui-text-secondary)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--ui-sidebar-hover)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ color: 'var(--ui-text-faint)' }}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                <div className="py-1 border-t" style={{ borderColor: 'var(--ui-border-faint)' }}>
                  <button
                    onClick={() => { toggle(); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                    style={{ color: 'var(--ui-text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--ui-sidebar-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ color: 'var(--ui-text-faint)' }}>
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </span>
                    {isDark ? 'Light mode' : 'Dark mode'}
                  </button>
                  <button
                    onClick={() => { setDropdownOpen(false); signOut(); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 transition-colors"
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--ui-callout-err-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>

                <div className="py-1 border-t" style={{ borderColor: 'var(--ui-border-faint)' }}>
                  <button onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                    style={{ color: 'var(--ui-text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--ui-sidebar-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ color: 'var(--ui-text-faint)' }}><HelpCircle className="w-4 h-4" /></span>
                    Help & feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar — expands below header */}
      {searchOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 z-40 px-4 pb-3 animate-slide-down"
          style={{ background: 'var(--ui-bg-base)', borderBottom: '1px solid var(--ui-border)' }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
            <input
              autoFocus
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm"
              style={{ background: 'var(--ui-bg-subtle)', color: 'var(--ui-text-primary)', border: '1px solid var(--ui-border)' }}
            />
          </div>
        </div>
      )}
    </header>
  );
};