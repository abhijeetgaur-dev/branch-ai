// src/App.tsx
import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TreeSidebar } from './components/tree/TreeSidebar';
import { ConversationView } from './components/conversation/ConversationView';
import { allConversations } from './data/dummyData';
import type { Conversation } from './types';
import { GitBranch, ArrowRight, Sparkles, Layers, Zap } from 'lucide-react';

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(allConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleNewConversation = () => {
    // Would create a new conversation
    console.log('Create new conversation');
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setActiveNodeId(null);
  };

  const handleNodeSelect = (nodeId: string) => {
    setActiveNodeId(nodeId);
    // Could scroll to node
  };

  const handleBranchCreate = (parentNodeId: string, blockId: string | null, question: string) => {
    console.log('Creating branch:', { parentNodeId, blockId, question });
    // Would create a new branch in the conversation
  };

  const handleToggleFavorite = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
  };

  // Empty state when no conversation selected
  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-surface-50 to-brand-50/30">
      <div className="text-center max-w-md px-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <GitBranch className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-3">
          Welcome to BranchAI
        </h2>
        <p className="text-surface-500 mb-8">
          Transform your conversations into structured, explorable knowledge trees.
          Start a new conversation or select one from the sidebar.
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
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-brand-100 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-sm font-semibold text-surface-900 mb-1">Branch Freely</h3>
            <p className="text-xs text-surface-500">Explore tangents without losing context</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Layers className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold text-surface-900 mb-1">Stay Organized</h3>
            <p className="text-xs text-surface-500">Structured answers you can navigate</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-violet-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="text-sm font-semibold text-surface-900 mb-1">Think Better</h3>
            <p className="text-xs text-surface-500">AI that helps you explore deeply</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-surface-50">
      {/* Main Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header conversationTitle={activeConversation?.title} />

        <div className="flex-1 flex min-h-0">
          {activeConversation ? (
            <>
              {/* Tree Sidebar */}
              <TreeSidebar
                rootNode={activeConversation.rootNode}
                activeNodeId={activeNodeId}
                onNodeSelect={handleNodeSelect}
              />

              {/* Conversation View */}
              <ConversationView
                conversation={activeConversation}
                onBranchCreate={handleBranchCreate}
                onToggleFavorite={handleToggleFavorite}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;