// apps/web/src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
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

function AuthenticatedApp() {
  const { user }                           = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const initialized                        = useRef(false);
  const [showNewModal, setShowNewModal]    = useState(false);

  const {
    conversations,
    activeConversationId,
    activeTree,         // now TreeNode[] | null
    activeNodeId,
    isLoadingList,
    isLoadingTree,
    isBranching,
    error,
    selectConversation,
    setActiveNodeId,
    toggleFavorite,
    deleteConversation,
    renameConversation,
    clearError,
  } = useConversationStore();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (initialized.current) return;
    initialized.current = true;

    setTokenGetter(() => getToken());
    useConversationStore.getState().fetchConversations();
  }, [isLoaded, isSignedIn, getToken]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Count branches across all root threads
  const branchCount = activeTree
    ? activeTree.reduce((sum, root) => sum + countQuestions(root) - 1, 0)
    : 0;

  const handleNewConversation = () => setShowNewModal(true);

  const handleCreateConversation = (title: string) => {
    useConversationStore.getState().createConversation(title);
  };

  // Inline branch buttons on answer cards
  const handleBranchCreate = (
    parentNodeId: string,
    blockId: string | null,
    question: string,
  ) => {
    if (!activeConversationId) return;
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId,
      parentBlockId:  blockId,
      question,
    });
  };

  // Bottom bar — always creates a new root thread (parentNodeId: null)
  const handleBottomBarSubmit = (question: string) => {
    if (!activeConversationId) return;
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId:   null,  // ← new root thread, depth 0
      parentBlockId:  null,
      question,
    });
  };

  // ── Empty state (no conversation selected) ────
  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-surface-50 to-brand-50/30">
      <div className="text-center max-w-md px-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <GitBranch className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-3">
          Welcome{user?.firstName ? `, ${user.firstName}` : ''} to BranchAI
        </h2>
        <p className="text-surface-500 mb-8">
          Transform your conversations into structured, explorable knowledge trees.
        </p>
        <button
          onClick={handleNewConversation}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30"
        >
          <Sparkles className="w-4 h-4" />
          Start Your First Branch
          <ArrowRight className="w-4 h-4" />
        </button>
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { icon: <GitBranch className="w-6 h-6 text-brand-600" />,   bg: 'bg-brand-100',   title: 'Branch Freely',  desc: 'Explore tangents without losing context' },
            { icon: <Layers    className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-100', title: 'Stay Organized', desc: 'Structured answers you can navigate'     },
            { icon: <Zap       className="w-6 h-6 text-violet-600" />,  bg: 'bg-violet-100',  title: 'Think Better',   desc: 'AI that helps you explore deeply'        },
          ].map(({ icon, bg, title, desc }) => (
            <div key={title} className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${bg} flex items-center justify-center`}>{icon}</div>
              <h3 className="text-sm font-semibold text-surface-900 mb-1">{title}</h3>
              <p className="text-xs text-surface-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMain = () => {
    if (isLoadingTree) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-surface-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">Loading conversation...</span>
          </div>
        </div>
      );
    }

    // activeTree is TreeNode[] — null means not selected, [] means selected but empty
    if (activeTree !== null && activeConversation) {
      return (
        <>
          <TreeSidebar
            rootNodes={activeTree}
            activeNodeId={activeNodeId}
            onNodeSelect={setActiveNodeId}
          />
          <ConversationView
            conversation={{ ...activeConversation, rootNodes: activeTree }}
            isBranching={isBranching}
            onBranchCreate={handleBranchCreate}
            onBottomBarSubmit={handleBottomBarSubmit}
            onToggleFavorite={toggleFavorite}
          />
        </>
      );
    }

    return <EmptyState />;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-surface-50">
      {error && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-xl shadow-xl text-sm max-w-sm">
          <span className="flex-1">{error}</span>
          <button onClick={clearError} className="text-white/80 hover:text-white font-bold">✕</button>
        </div>
      )}

      {showNewModal && (
        <NewConversationModal
          onConfirm={handleCreateConversation}
          onClose={() => setShowNewModal(false)}
        />
      )}

      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        isLoading={isLoadingList}
        onSelectConversation={selectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
        onToggleFavorite={toggleFavorite}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          conversationTitle={activeConversation?.title}
          branchCount={branchCount}
          user={user ? {
            name:   user.fullName ?? user.firstName ?? 'You',
            avatar: user.imageUrl,
            email:  user.primaryEmailAddress?.emailAddress,
          } : undefined}
        />
        <div className="flex-1 flex min-h-0">
          {renderMain()}
        </div>
      </div>
    </div>
  );
}

function countQuestions(node: Node): number {
  let n = node.type === 'question' ? 1 : 0;
  node.children?.forEach((c) => { n += countQuestions(c); });
  return n;
}

export default function App() {
  return (
    <>
      <SignedOut>
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 to-brand-50/30">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <GitBranch className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-surface-900 mb-2">BranchAI</h1>
            <p className="text-surface-500 mb-8 text-sm">Explore ideas without losing context.</p>
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