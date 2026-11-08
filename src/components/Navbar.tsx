import React from 'react';
import { useQuran, ViewMode } from '../context/QuranContext';
import {
  BookOpenText,
  BrainCircuit,
  ScrollText,
  Zap,
  BookmarkCheck,
  Sun,
  Moon,
  Menu,
  Sparkle
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    viewMode,
    setViewMode,
    appTheme,
    setAppTheme,
    arabicFontSize,
    setArabicFontSize,
    bookmarks
  } = useQuran();

  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { mode: 'mushaf', label: 'Mushaf Reader', icon: <BookOpenText className="w-4 h-4" /> },
    { mode: 'hifz', label: 'Hifz Studio', icon: <BrainCircuit className="w-4 h-4" /> },
    { mode: 'tafsir', label: 'Audio Tafsir & Context', icon: <ScrollText className="w-4 h-4" /> },
    { mode: 'quiz', label: 'Quiz Battle', icon: <Zap className="w-4 h-4" /> },
    {
      mode: 'bookmarks',
      label: 'Bookmarks',
      icon: <BookmarkCheck className="w-4 h-4" />,
      badge: bookmarks.length > 0 ? bookmarks.length : undefined
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Surah drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setViewMode('mushaf')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:rotate-6 transition duration-300">
              <Sparkle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                  Qabas
                </span>
                <span className="font-arabic text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  (قَبَس)
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Active Memorization & Audio Navigator
              </p>
            </div>
          </div>
        </div>

        {/* Center: Segmented Navigation Pills (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
          {navItems.map(item => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-700/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center space-x-2">
          {/* Font Size Adjuster */}
          {(viewMode === 'mushaf' || viewMode === 'hifz') && (
            <div className="hidden lg:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
              <button
                onClick={() => setArabicFontSize(Math.max(20, arabicFontSize - 2))}
                className="px-2 py-0.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition font-bold"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="px-1 text-[11px] font-mono text-slate-400 font-semibold">{arabicFontSize}px</span>
              <button
                onClick={() => setArabicFontSize(Math.min(38, arabicFontSize + 2))}
                className="px-2 py-0.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition font-bold"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={() => setAppTheme(appTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition"
            title={appTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {appTheme === 'light' ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-1.5 bg-white/95 dark:bg-slate-900/95">
        {navItems.map(item => {
          const isActive = viewMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full text-[8px] bg-indigo-600 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
