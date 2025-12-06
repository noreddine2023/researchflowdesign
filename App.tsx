import React, { useState } from 'react';
import { NavView } from './types';
import { Layout } from './components/Layout';
import { LandingPage } from './views/LandingPage';
import { Dashboard } from './views/Dashboard';
import { Search } from './views/Search';
import { Library } from './views/Library';
import { PaperDetail } from './views/PaperDetail';
import { PDFReader } from './views/PDFReader';
import { Insights } from './views/Insights';
import { WritingAssistant } from './views/WritingAssistant';
import { Collections } from './views/Collections';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('landing');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleNavigate = (view: NavView, id?: string) => {
    setCurrentView(view);
    if (id) setSelectedId(id);
  };

  // Special full-screen views
  if (currentView === 'landing') {
    return <LandingPage onEnterApp={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'pdf') {
    return <PDFReader onBack={() => setCurrentView(selectedId ? 'paper' : 'library')} />;
  }

  return (
    <Layout currentView={currentView} onChangeView={(v) => handleNavigate(v)}>
      {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentView === 'search' && <Search onNavigate={handleNavigate} />}
      {currentView === 'library' && <Library onNavigate={handleNavigate} />}
      {currentView === 'papers' && <Library onNavigate={handleNavigate} />} {/* Map sidebar 'papers' to Library view */}
      {currentView === 'paper' && selectedId && <PaperDetail id={selectedId} onNavigate={handleNavigate} />}
      {currentView === 'collections' && <Collections onNavigate={handleNavigate} />}
      {currentView === 'insights' && <Insights />}
      {currentView === 'write' && <WritingAssistant />}
      {currentView === 'settings' && <div className="text-center py-20 text-slate-400">Settings view implementation placeholder</div>}
    </Layout>
  );
}