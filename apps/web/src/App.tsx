// apps/web/src/App.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SignedIn, SignedOut, SignIn,
  useUser, useAuth,
} from '@clerk/clerk-react';
import { Sidebar }              from './components/layout/Sidebar';
import { Header }               from './components/layout/Header';
import { TreeSidebar }          from './components/tree/TreeSidebar';
import { ConversationView }     from './components/conversation/ConversationView';
import { NewConversationModal } from './components/conversation/NewConversationModal';
import { useConversationStore } from './store/conversationStore';
import { setTokenGetter }       from './lib/api';
import type { Node }            from './types';
import { GitBranch, ArrowRight, Sparkles, Layers, Zap, Loader2 } from 'lucide-react';

function countQuestions(node: Node): number {
  let n = node.type === 'question' ? 1 : 0;
  node.children?.forEach((c) => { n += countQuestions(c); });
  return n;
}

function AuthenticatedApp() {
  const { user }                           = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const initialized                        = useRef(false);
  const [showNewModal, setShowNewModal]    = useState(false);

  // Mobile drawer states
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [treeOpen, setTreeOpen]         = useState(false);

  const {
    conversations, activeConversationId, activeTree,
    activeNodeId, isLoadingList, isLoadingTree,
    isBranching, error,
    selectConversation, setActiveNodeId,
    toggleFavorite, deleteConversation,
    renameConversation, clearError,
  } = useConversationStore();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (initialized.current) return;
    initialized.current = true;
    setTokenGetter(() => getToken());
    useConversationStore.getState().fetchConversations();
  }, [isLoaded, isSignedIn, getToken]);

  // Close drawers when conversation changes on mobile
  const handleSelectConversation = useCallback((id: string) => {
    selectConversation(id);
    setSidebarOpen(false);
  }, [selectConversation]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const branchCount = activeTree
    ? activeTree.reduce((sum, root) => sum + countQuestions(root) - 1, 0)
    : 0;

  const handleNewConversation = () => {
    setShowNewModal(true);
    setSidebarOpen(false);
  };

  const handleCreateConversation = (title: string) => {
    useConversationStore.getState().createConversation(title);
  };

  const handleBranchCreate = (parentNodeId: string, blockId: string | null, question: string) => {
    if (!activeConversationId) return;
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId, parentBlockId: blockId, question,
    });
  };

  const handleBottomBarSubmit = (question: string) => {
    if (!activeConversationId) return;
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId: null, parentBlockId: null, question,
    });
  };

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center bg-page px-6">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
          <GitBranch className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Welcome{user?.firstName ? `, ${user.firstName}` : ''} to BranchAI
        </h2>
        <p className="text-muted text-sm mb-8">
          Transform your conversations into structured, explorable knowledge trees.
        </p>
        <button
          onClick={handleNewConversation}
          className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 active:bg-brand-800 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Start Your First Branch
          <ArrowRight className="w-4 h-4" />
        </button>
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { icon: <GitBranch className="w-5 h-5 text-brand-600" />,   bg: 'bg-brand-100',   title: 'Branch',      desc: 'Without losing context' },
            { icon: <Layers    className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-100', title: 'Organize',    desc: 'Navigate your thoughts'  },
            { icon: <Zap       className="w-5 h-5 text-amber-600" />,   bg: 'bg-amber-100',   title: 'Think deep',  desc: 'AI that goes deeper'     },
          ].map(({ icon, bg, title, desc }) => (
            <div key={title} className="text-center">
              <div className={`w-10 h-10 mx-auto mb-2 rounded-xl ${bg} flex items-center justify-center`}>{icon}</div>
              <p className="text-xs font-semibold text-primary">{title}</p>
              <p className="text-xs text-faint mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMain = () => {
    if (isLoadingTree) {
      return (
        <div className="flex-1 flex items-center justify-center bg-page">
          <div className="flex flex-col items-center gap-3 text-faint">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">Loading conversation...</span>
          </div>
        </div>
      );
    }
    if (activeTree !== null && activeConversation) {
      return (
        <ConversationView
          conversation={{ ...activeConversation, rootNodes: activeTree }}
          isBranching={isBranching}
          onBranchCreate={handleBranchCreate}
          onBottomBarSubmit={handleBottomBarSubmit}
          onToggleFavorite={toggleFavorite}
        />
      );
    }
    return <EmptyState />;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-page">
      {/* Error toast */}
      {error && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[60] flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-xl shadow-xl text-sm">
          <span className="flex-1">{error}</span>
          <button onClick={clearError} className="text-white/80 hover:text-white font-bold flex-shrink-0">✕</button>
        </div>
      )}

      {showNewModal && (
        <NewConversationModal
          onConfirm={handleCreateConversation}
          onClose={() => setShowNewModal(false)}
        />
      )}

      {/* ── Desktop sidebar (static) ── */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          isLoading={isLoadingList}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={deleteConversation}
          onRenameConversation={renameConversation}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {/* ── Mobile sidebar drawer ── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slide-in-left">
            <Sidebar
              conversations={conversations}
              activeConversationId={activeConversationId}
              isLoading={isLoadingList}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onDeleteConversation={deleteConversation}
              onRenameConversation={renameConversation}
              onToggleFavorite={toggleFavorite}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          conversationTitle={activeConversation?.title}
          branchCount={branchCount}
          user={user ? {
            name:   user.fullName ?? user.firstName ?? 'You',
            avatar: user.imageUrl,
            email:  user.primaryEmailAddress?.emailAddress,
          } : undefined}
          onMenuOpen={() => setSidebarOpen(true)}
          onTreeOpen={() => setTreeOpen((o) => !o)}
          showTreeButton={!!(activeTree && activeTree.length > 0)}
        />

        <div className="flex-1 flex min-h-0 overflow-hidden min-w-0">
          {/* ── Desktop tree sidebar (static) ── */}
          {activeTree && activeTree.length > 0 && (
            <div className="hidden md:block flex-shrink-0">
              <TreeSidebar
                rootNodes={activeTree}
                activeNodeId={activeNodeId}
                onNodeSelect={setActiveNodeId}
              />
            </div>
          )}

          {/* ── Mobile tree drawer ── */}
          {treeOpen && activeTree && activeTree.length > 0 && (
            <div className="md:hidden fixed inset-0 z-50 flex justify-end">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setTreeOpen(false)}
              />
              <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slide-in-right">
                <TreeSidebar
                  rootNodes={activeTree}
                  activeNodeId={activeNodeId}
                  onNodeSelect={(id) => { setActiveNodeId(id); setTreeOpen(false); }}
                />
              </div>
            </div>
          )}

          {/* ── Conversation area ── */}
          <div className="flex-1 min-w-0 flex flex-col min-h-0">
            {renderMain()}
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <AuthenticatedApp />
      </SignedIn>
    </>
  );
}