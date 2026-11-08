import React from 'react';
import { useQuran, ViewMode, AppTheme } from '../context/QuranContext';
import {
  BookOpen,
  Brain,
  HeartHandshake,
  Trophy,
  Bookmark,
  Sun,
  Moon,
  Coffee,
  Menu,
  GraduationCap,
  Sparkles
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
    bookmarks,
    setIsProjectInfoOpen
  } = useQuran();

  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { mode: 'mushaf', label: 'Mushaf', icon: <BookOpen className="w-4 h-4" /> },
    { mode: 'hifz', label: 'Hifz Studio', icon: <Brain className="w-4 h-4" /> },
    { mode: 'themes', label: 'Tadabbur Themes', icon: <HeartHandshake className="w-4 h-4" /> },
    { mode: 'quiz', label: 'Quran Quiz', icon: <Trophy className="w-4 h-4" /> },
    {
      mode: 'bookmarks',
      label: 'Saved',
      icon: <Bookmark className="w-4 h-4" />,
      badge: bookmarks.length > 0 ? bookmarks.length : undefined
    }
  ];

  const cycleTheme = () => {
    if (appTheme === 'light') setAppTheme('sepia');
    else if (appTheme === 'sepia') setAppTheme('dark');
    else setAppTheme('light');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none"
            aria-label="Toggle Surahs drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setViewMode('mushaf')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 group-hover:scale-105 transition">
              <span className="font-arabic text-lg font-bold">ب</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-stone-900 dark:text-white tracking-tight text-base sm:text-lg">
                  Bayan Quran
                </span>
                <span className="font-arabic text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  (بَيَان)
                </span>
              </div>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 hidden sm:block">
                Smart Memorization & Thematic Tadabbur
              </p>
            </div>
          </div>
        </div>

        {/* Center: Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl">
          {navItems.map(item => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition relative ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & TP Info Button */}
        <div className="flex items-center space-x-2">
          {/* Font Size Adjuster (active in mushaf & hifz) */}
          {(viewMode === 'mushaf' || viewMode === 'hifz') && (
            <div className="hidden lg:flex items-center space-x-1 bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5 text-xs text-stone-600 dark:text-stone-300">
              <button
                onClick={() => setArabicFontSize(Math.max(22, arabicFontSize - 2))}
                className="px-2 py-1 hover:bg-white dark:hover:bg-stone-700 rounded transition font-bold"
                title="Decrease Arabic font size"
              >
                A-
              </button>
              <span className="px-1 text-[11px] font-mono text-stone-400">{arabicFontSize}px</span>
              <button
                onClick={() => setArabicFontSize(Math.min(42, arabicFontSize + 2))}
                className="px-2 py-1 hover:bg-white dark:hover:bg-stone-700 rounded transition font-bold"
                title="Increase Arabic font size"
              >
                A+
              </button>
            </div>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            title={`Current theme: ${appTheme}. Click to cycle.`}
          >
            {appTheme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {appTheme === 'sepia' && <Coffee className="w-4 h-4 text-amber-700" />}
            {appTheme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* University TP Submission Pill */}
          <button
            onClick={() => setIsProjectInfoOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-xs transition"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TP Project Info</span>
            <span className="sm:hidden">TP</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 py-1 bg-stone-50/90 dark:bg-stone-900/90">
        {navItems.map(item => {
          const isActive = viewMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium transition ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full text-[9px] bg-emerald-600 text-white font-bold">
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
