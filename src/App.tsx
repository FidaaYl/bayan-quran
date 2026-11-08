import React, { useState } from 'react';
import { QuranProvider, useQuran } from './context/QuranContext';
import { Navbar } from './components/Navbar';
import { SurahSidebar } from './components/SurahSidebar';
import { MushafView } from './components/MushafView';
import { HifzStudio } from './components/HifzStudio';
import { ThematicExplorer } from './components/ThematicExplorer';
import { QuranQuiz } from './components/QuranQuiz';
import { BookmarksView } from './components/BookmarksView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import { X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { viewMode } = useQuran();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Determine if sidebar should be shown (primarily relevant in mushaf and hifz modes)
  const showSidebar = viewMode === 'mushaf' || viewMode === 'hifz';

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar (visible on md+ when in mushaf or hifz mode) */}
        {showSidebar && (
          <div className="hidden md:block">
            <SurahSidebar />
          </div>
        )}

        {/* Mobile Drawer Backdrop & Sidebar */}
        {showSidebar && isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-80 max-w-[85vw] bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col z-50 animate-slideRight">
              <div className="p-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                  Select Surah
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SurahSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Center Active View Container */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {viewMode === 'mushaf' && <MushafView />}
          {viewMode === 'hifz' && <HifzStudio />}
          {viewMode === 'themes' && <ThematicExplorer />}
          {viewMode === 'quiz' && <QuranQuiz />}
          {viewMode === 'bookmarks' && <BookmarksView />}
        </main>
      </div>

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar />

      {/* University TP Academic Information Modal */}
      <ProjectInfoModal />
    </div>
  );
};

export default function App() {
  return (
    <QuranProvider>
      <MainLayout />
    </QuranProvider>
  );
}
