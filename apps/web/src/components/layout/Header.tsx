// src/components/layout/Header.tsx
import React from 'react';
import { Search, Bell, Settings, ChevronDown, Command } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderUser {
  name:   string;
  avatar?: string;
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
  // Default placeholder until auth is wired up
  const displayUser = user ?? { name: 'You' };

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

        {/* Right — actions + user */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-surface-200 mx-1" />

          <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-100 transition-colors">
            {displayUser.avatar ? (
              <img
                src={displayUser.avatar}
                alt={displayUser.name}
                className="w-8 h-8 rounded-full bg-surface-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-semibold">
                {displayUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium text-surface-700 hidden sm:block">
              {displayUser.name}
            </span>
            <ChevronDown className="w-4 h-4 text-surface-400" />
          </button>
        </div>
      </div>
    </header>
  );
};