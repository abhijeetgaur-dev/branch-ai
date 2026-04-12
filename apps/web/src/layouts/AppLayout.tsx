import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { DocumentManagerModal } from '../components/documents/DocumentManagerModal';
import { useConversationStore } from '../store/conversationStore';
import { setTokenGetter } from '../lib/api';
import type { TreeNode } from '../lib/api';

function countQuestions(node: TreeNode): number {
  let n = node.type === 'question' ? 1 : 0;
  node.children?.forEach((c) => { n += countQuestions(c); });
  return n;
}

export type AppLayoutContext = {
  treeOpen: boolean;
  setTreeOpen: (open: boolean) => void;
};

export function AppLayout() {
  const { user } = useUser();
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Shared state for the chat screen's mobile tree
  const [treeOpen, setTreeOpen] = useState(false);

  const {
    conversations, activeConversationId, activeTree,
    isLoadingList, error,
    selectConversation, toggleFavorite, deleteConversation,
    renameConversation, clearError,
  } = useConversationStore();

  const handleSelectConversation = useCallback((id: string) => {
    selectConversation(id);
    setSidebarOpen(false);
  }, [selectConversation]);

  const handleNewConversation = () => {
    useConversationStore.getState().createConversation('New Chat').then(() => {
      setSidebarOpen(false);
    });
  };

  const { getToken, isLoaded, isSignedIn } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (initialized.current) return;
    initialized.current = true;
    setTokenGetter(() => getToken());
    useConversationStore.getState().fetchConversations();
  }, [isLoaded, isSignedIn, getToken]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const branchCount = activeTree
    ? activeTree.reduce((sum, root) => sum + countQuestions(root) - 1, 0)
    : 0;

  const location = useLocation();
  const isBillingPage = location.pathname === '/billing';

  return (
    <div className="h-screen flex overflow-hidden bg-page">
      {error && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[60] flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-xl shadow-xl text-sm">
          <span className="flex-1">{error}</span>
          <button onClick={clearError} className="text-white/80 hover:text-white font-bold flex-shrink-0">✕</button>
        </div>
      )}

      {showDocumentManager && (
        <DocumentManagerModal
          onClose={() => setShowDocumentManager(false)}
        />
      )}

      {/* ── Desktop sidebar (static) — hidden on billing page ── */}
      {!isBillingPage && (
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
            onOpenKnowledgeBase={() => setShowDocumentManager(true)}
          />
        </div>
      )}

      {/* ── Mobile sidebar drawer — hidden on billing page ── */}
      {!isBillingPage && sidebarOpen && (
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
              onOpenKnowledgeBase={() => setShowDocumentManager(true)}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Main content shell ── */}
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
          onTreeOpen={() => setTreeOpen(true)}
          showTreeButton={!isBillingPage && activeTree !== null && activeTree.length > 0}
        />

        <div className="flex-1 flex min-h-0 overflow-hidden min-w-0">
          <Outlet context={{ treeOpen, setTreeOpen }} />
        </div>
      </div>
    </div>
  );
}
