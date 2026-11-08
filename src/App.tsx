import React, { useState } from 'react';
import { QuranProvider, useQuran } from './context/QuranContext';
import { Navbar } from './components/Navbar';
import { SurahSidebar } from './components/SurahSidebar';
import { MushafView } from './components/MushafView';
import { HifzStudio } from './components/HifzStudio';
import { TafsirStudio } from './components/TafsirStudio';
import { QuranQuiz } from './components/QuranQuiz';
import { BookmarksView } from './components/BookmarksView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { viewMode } = useQuran();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const showSidebar = viewMode === 'mushaf' || viewMode === 'hifz';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <div className="hidden md:block">
            <SurahSidebar />
          </div>
        )}

        {/* Mobile Drawer */}
        {showSidebar && isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-50 animate-slideRight">
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Select Chapter
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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

        {/* Center Active View Container (with bottom padding for the floating player) */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-24 sm:pb-28">
          {viewMode === 'mushaf' && <MushafView />}
          {viewMode === 'hifz' && <HifzStudio />}
          {viewMode === 'tafsir' && <TafsirStudio />}
          {viewMode === 'quiz' && <QuranQuiz />}
          {viewMode === 'bookmarks' && <BookmarksView />}
        </main>
      </div>

      {/* Floating Dynamic Island Audio Player */}
      <AudioPlayerBar />
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
