// apps/web/src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { GitBranch } from 'lucide-react';

import { AppLayout } from './layouts/AppLayout';
import { ChatPage } from './pages/ChatPage';
import BillingPage from './pages/billing';

export default function App() {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-page px-4 py-8">
          <div className="text-center w-full max-w-sm">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
              <GitBranch className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-1">BranchAI</h1>
            <p className="text-muted text-sm mb-8">Explore ideas without losing context.</p>
            <SignIn />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ChatPage />} />
            <Route path="/billing" element={<div className="flex-1 min-w-0 overflow-y-auto"><BillingPage /></div>} />
          </Route>
        </Routes>
      </SignedIn>
    </>
  );
}
