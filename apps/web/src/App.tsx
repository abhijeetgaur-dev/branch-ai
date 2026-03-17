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
import { useConversationStore } from './store/conversationStore';
import { setTokenGetter }       from './lib/api';
import type { Node }            from './types';
import {
  GitBranch, ArrowRight, Sparkles,
  Layers, Zap, Loader2, Send,
} from 'lucide-react';

function countQuestions(node: Node): number {
  let n = node.type === 'question' ? 1 : 0;
  node.children?.forEach((c) => { n += countQuestions(c); });
  return n;
}

function AuthenticatedApp() {
  const { user }                       = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const initialized                    = useRef(false);

  const {
    conversations,
    activeConversationId,
    activeTree,
    activeNodeId,
    isLoadingList,
    isLoadingTree,
    isBranching,
    error,
    selectConversation,
    setActiveNodeId,
    toggleFavorite,
    clearError,
  } = useConversationStore();

  useEffect(() => {
    console.log('[App] auth state — isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);
    if (!isLoaded || !isSignedIn) return;
    if (initialized.current) return;
    initialized.current = true;

    console.log('[App] Clerk ready — setting token getter and fetching conversations');
    setTokenGetter(async () => {
      const token = await getToken();
      console.log('[App] getToken called — has token:', !!token);
      return token;
    });

    useConversationStore.getState().fetchConversations();
  }, [isLoaded, isSignedIn, getToken]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const branchCount = activeTree ? Math.max(0, countQuestions(activeTree) - 1) : 0;

  const handleNewConversation = () => {
    const title = window.prompt('Conversation title:');
    if (title?.trim()) {
      useConversationStore.getState().createConversation(title.trim());
    }
  };

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

  // First question handler for empty conversations
  const handleFirstQuestion = (question: string) => {
    if (!activeConversationId || !question.trim()) return;
    useConversationStore.getState().createBranch({
      conversationId: activeConversationId,
      parentNodeId:   null,  // no parent — this is the root
      parentBlockId:  null,
      question:       question.trim(),
    });
  };

  // ── Empty conversation — ask first question ──
  const FirstQuestionScreen = () => {
    const [q, setQ] = useState('');
    const conv = conversations.find((c) => c.id === activeConversationId);

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-surface-50">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
              <GitBranch className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-surface-900 mb-2">
              {conv?.title ?? 'New Conversation'}
            </h2>
            <p className="text-surface-500 text-sm mb-8">
              Ask your first question to start building the knowledge tree.
            </p>

            <div className="flex items-center gap-3 bg-white border border-surface-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
              <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && q.trim()) {
                    e.preventDefault();
                    handleFirstQuestion(q);
                  }
                }}
                disabled={isBranching}
                placeholder="What do you want to explore?"
                className="flex-1 bg-transparent text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                onClick={() => handleFirstQuestion(q)}
                disabled={!q.trim() || isBranching}
                className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:bg-surface-200 disabled:text-surface-400 transition-colors flex-shrink-0"
              >
                {isBranching
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send    className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-surface-400 mt-3">
              Press Enter to ask · Your answer will be structured into explorable sections
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ── No conversation selected ─────────────────
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

  // Decide what to show in the main area
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

    // Conversation selected but no tree yet — show first question input
    if (activeConversationId && !activeTree) {
      return <FirstQuestionScreen />;
    }

    // Conversation with tree — show full view
    if (activeTree && activeConversation) {
      return (
        <>
          <TreeSidebar
            rootNode={activeTree}
            activeNodeId={activeNodeId}
            onNodeSelect={setActiveNodeId}
          />
          <ConversationView
            conversation={{ ...activeConversation, rootNode: activeTree }}
            isBranching={isBranching}
            onBranchCreate={handleBranchCreate}
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

      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        isLoading={isLoadingList}
        onSelectConversation={selectConversation}
        onNewConversation={handleNewConversation}
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