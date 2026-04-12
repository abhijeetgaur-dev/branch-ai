import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { GitBranch, ArrowRight, Sparkles, Layers, Zap, Loader2 } from 'lucide-react';
import { TreeSidebar } from '../components/tree/TreeSidebar';
import { ConversationView } from '../components/conversation/ConversationView';
import { useConversationStore } from '../store/conversationStore';
import type { AppLayoutContext } from '../layouts/AppLayout';
import type { TreeNode } from '../lib/api';

function countQuestions(node: TreeNode): number {
  let n = node.type === 'question' ? 1 : 0;
  node.children?.forEach((c) => { n += countQuestions(c); });
  return n;
}

export function ChatPage() {
  const { user } = useUser();
  const { treeOpen, setTreeOpen } = useOutletContext<AppLayoutContext>();
  
  const {
    conversations, activeConversationId, activeTree,
    activeNodeId, isLoadingTree, isBranching,
    setActiveNodeId, toggleFavorite, renameConversation,
  } = useConversationStore();

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  
  const branchCount = activeTree
    ? activeTree.reduce((sum, root) => sum + countQuestions(root) - 1, 0)
    : 0;

  const handleNewConversation = () => {
    useConversationStore.getState().createConversation('New Chat');
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

    if (branchCount === 0 || !activeTree || activeTree.length === 0) {
      // First message in the conversation - auto rename
      let newTitle = question.trim().split(/\s+/).slice(0, 5).join(' ');
      if (newTitle.length > 35) newTitle = newTitle.slice(0, 35) + '...';
      renameConversation(activeConversationId, newTitle);
    }

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
      <>
        {/* ── Desktop tree sidebar (static) ── */}
        <div className="hidden md:block flex-shrink-0">
          <TreeSidebar
            rootNodes={activeTree as any}
            activeNodeId={activeNodeId}
            onNodeSelect={setActiveNodeId}
          />
        </div>

        {/* ── Mobile tree drawer ── */}
        {treeOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setTreeOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slide-in-right">
              <TreeSidebar
                rootNodes={activeTree as any}
                activeNodeId={activeNodeId}
                onNodeSelect={(id) => { setActiveNodeId(id); setTreeOpen(false); }}
              />
            </div>
          </div>
        )}

        {/* ── Conversation area ── */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <ConversationView
            conversation={{ ...activeConversation, ownerId: '', workspaceId: '', rootNodes: activeTree as any }}
            isBranching={isBranching}
            onBranchCreate={handleBranchCreate}
            onBottomBarSubmit={handleBottomBarSubmit}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </>
    );
  }

  return <EmptyState />;
}
