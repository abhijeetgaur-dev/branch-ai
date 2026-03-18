// apps/web/src/components/layout/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Bell, Settings, ChevronDown, Command,
  LogOut, User, CreditCard, HelpCircle, Moon, Sun,
} from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { useThemeStore } from '../../store/themeStore';
import { Button } from '../ui/Button';
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
}

export const Header: React.FC<HeaderProps> = ({
  conversationTitle,
  branchCount,
  user,
}) => {
  const { signOut }      = useClerk();
  const { isDark, toggle } = useThemeStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef                     = useRef<HTMLDivElement>(null);

  const displayUser = user ?? { name: 'You' };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setDropdownOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
  };

  return (
    <header className="h-16 border-b border-surface-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">

        {/* Left — conversation title */}
        <div className="flex items-center gap-4 min-w-0">
          {conversationTitle ? (
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-base font-semibold text-surface-900 truncate">
                {conversationTitle}
              </h1>
              {branchCount != null && branchCount > 0 && (
                <>
                  <span className="text-surface-300">·</span>
                  <span className="text-sm text-surface-500 whitespace-nowrap">
                    {branchCount} {branchCount === 1 ? 'branch' : 'branches'}
                  </span>
                </>
              )}
            </div>
          ) : (
            <span className="text-sm text-surface-400">No conversation selected</span>
          )}
        </div>

        {/* Center — search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-focus-within:text-brand-500 transition-colors" />
            <input
              type="text"
              placeholder="Search conversations, branches, ideas..."
              className="w-full bg-surface-50 border-0 rounded-xl pl-10 pr-12 py-2.5 text-sm placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:bg-white transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-surface-400">
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-surface-200 rounded">
                <Command className="w-3 h-3" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right — actions + user dropdown */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-surface-200 mx-1" />

          {/* User button + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors',
                dropdownOpen ? 'bg-surface-100' : 'hover:bg-surface-100'
              )}
            >
              {displayUser.avatar ? (
                <img
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  className="w-8 h-8 rounded-full object-cover bg-surface-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-semibold">
                  {displayUser.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-surface-700 hidden sm:block max-w-[120px] truncate">
                {displayUser.name}
              </span>
              <ChevronDown className={cn(
                'w-4 h-4 text-surface-400 transition-transform duration-200',
                dropdownOpen && 'rotate-180'
              )} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className={cn(
                'absolute right-0 top-full mt-2 w-64',
                'bg-white border border-surface-200 rounded-xl shadow-lg shadow-surface-900/10',
                'py-1.5 z-50',
                'animate-fade-in'
              )}>

                {/* User info */}
                <div className="px-4 py-3 border-b border-surface-100">
                  <div className="flex items-center gap-3">
                    {displayUser.avatar ? (
                      <img
                        src={displayUser.avatar}
                        alt={displayUser.name}
                        className="w-10 h-10 rounded-full object-cover bg-surface-200 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold flex-shrink-0">
                        {displayUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-surface-900 truncate">
                        {displayUser.name}
                      </p>
                      {displayUser.email && (
                        <p className="text-xs text-surface-500 truncate">
                          {displayUser.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <DropdownItem icon={<User className="w-4 h-4" />} label="Profile" onClick={() => setDropdownOpen(false)} />
                  <DropdownItem icon={<CreditCard className="w-4 h-4" />} label="Billing" onClick={() => setDropdownOpen(false)} />
                  <DropdownItem icon={<Settings className="w-4 h-4" />} label="Settings" onClick={() => setDropdownOpen(false)} />
                  <button
                    onClick={() => { toggle(); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
                  >
                    <span className="text-surface-400">
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </span>
                    {isDark ? 'Light mode' : 'Dark mode'}
                    <span className="ml-auto text-xs text-surface-400 bg-surface-100 px-1.5 py-0.5 rounded">
                      {isDark ? '☀' : '☾'}
                    </span>
                  </button>
                </div>

                <div className="border-t border-surface-100 py-1">
                  <DropdownItem icon={<HelpCircle className="w-4 h-4" />} label="Help & feedback" onClick={() => setDropdownOpen(false)} />
                </div>

                {/* Sign out */}
                <div className="border-t border-surface-100 py-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// ── Reusable dropdown item ───────────────────────

interface DropdownItemProps {
  icon:    React.ReactNode;
  label:   string;
  onClick: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
  >
    <span className="text-surface-400">{icon}</span>
    {label}
  </button>
);