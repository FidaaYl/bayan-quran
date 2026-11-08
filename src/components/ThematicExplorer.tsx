import React, { useState } from 'react';
import { THEME_CATEGORIES, THEMATIC_AYAHS, ThemeCategory } from '../data/thematicAyahs';
import { ThematicAyah } from '../types/quran';
import { useQuran } from '../context/QuranContext';
import {
  HeartHandshake,
  ShieldAlert,
  Compass,
  Sparkles,
  SunMedium,
  Milestone,
  Coins,
  Play,
  Volume2,
  BookOpen,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

export const ThematicExplorer: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('anxiety-fear');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const { setSelectedSurahNumber, setViewMode } = useQuran();

  const activeCategory = THEME_CATEGORIES.find(c => c.id === selectedThemeId) || THEME_CATEGORIES[0];
  const filteredAyahs = THEMATIC_AYAHS.filter(a => a.themeId === selectedThemeId);

  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4" />;
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'SunMedium':
        return <SunMedium className="w-4 h-4" />;
      case 'Milestone':
        return <Milestone className="w-4 h-4" />;
      case 'Coins':
        return <Coins className="w-4 h-4" />;
      default:
        return <HeartHandshake className="w-4 h-4" />;
    }
  };

  const handlePlayAudio = (ayah: ThematicAyah) => {
    if (audioObj) {
      audioObj.pause();
    }
    if (playingAudioId === ayah.id) {
      setPlayingAudioId(null);
      return;
    }

    const audio = new Audio(ayah.audioUrl);
    setAudioObj(audio);
    setPlayingAudioId(ayah.id);
    audio.play().catch(console.error);

    audio.onended = () => {
      setPlayingAudioId(null);
    };
  };

  const handleJumpToMushaf = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    setViewMode('mushaf');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full">
      {/* Hero Header */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Spiritual Navigator & Tadabbur</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          How is your heart feeling today?
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          Navigate divine verses curated for psychological well-being, life struggles, and contemplative reflection (تَدَبُّر).
        </p>
      </div>

      {/* Theme Selector Pills Carousel */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {THEME_CATEGORIES.map(category => {
          const isSelected = category.id === selectedThemeId;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedThemeId(category.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition shadow-xs ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-emerald-400'
              }`}
            >
              {getThemeIcon(category.iconName)}
              <span>{category.nameEn}</span>
              <span className="font-arabic text-xs opacity-80">({category.nameAr})</span>
            </button>
          );
        })}
      </div>

      {/* Active Theme Description Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-stone-900/40 border border-emerald-200/60 dark:border-emerald-900/40 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-200">
              {activeCategory.nameEn} —{' '}
              <span className="font-arabic">{activeCategory.nameAr}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
              {activeCategory.descriptionEn}
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold shrink-0 ml-4">
            {filteredAyahs.length} Verses
          </span>
        </div>
      </div>

      {/* Ayahs Display */}
      <div className="space-y-6">
        {filteredAyahs.map(ayah => {
          const isAudioPlaying = playingAudioId === ayah.id;

          return (
            <div
              key={ayah.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4 transition hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              {/* Header: Surah and Ayah reference */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-xs font-bold">
                    {ayah.surahNameEn} {ayah.surahNumber}:{ayah.ayahNumber}
                  </span>
                  <span className="font-arabic text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                    سُورَة {ayah.surahNameAr}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Play Audio */}
                  <button
                    onClick={() => handlePlayAudio(ayah)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isAudioPlaying
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isAudioPlaying ? 'Playing' : 'Listen'}</span>
                  </button>

                  {/* Read in Mushaf */}
                  <button
                    onClick={() => handleJumpToMushaf(ayah.surahNumber)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold transition"
                    title="Open in full Mushaf"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open in Mushaf</span>
                  </button>
                </div>
              </div>

              {/* Arabic Verse */}
              <div
                dir="rtl"
                className="font-quran text-right text-stone-900 dark:text-stone-100 text-2xl sm:text-3xl leading-loose"
              >
                {ayah.arabicText}
                <span className="ayah-end-symbol">
                  <span className="text-amber-600 dark:text-amber-400 font-bold font-arabic">
                    ﴿{ayah.ayahNumber}﴾
                  </span>
                </span>
              </div>

              {/* Translation */}
              <div className="space-y-1.5 pt-2">
                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                  {ayah.englishTranslation}
                </p>
                <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm italic">
                  {ayah.frenchTranslation}
                </p>
              </div>

              {/* Tafsir Summary & Tadabbur Reflection Prompt */}
              <div className="mt-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 space-y-2.5">
                <div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                    Tafsir Insight:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-0.5">
                    {ayah.tafsirSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                      Tadabbur Contemplation (تأمل):
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      {ayah.reflectionPrompt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
