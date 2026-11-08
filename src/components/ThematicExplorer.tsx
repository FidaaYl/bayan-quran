import React, { useState } from 'react';
import { THEME_CATEGORIES, THEMATIC_AYAHS } from '../data/thematicAyahs';
import { ThematicAyah } from '../types/quran';
import { useQuran } from '../context/QuranContext';
import {
  Compass,
  Radio,
  BookOpenText,
  Lightbulb,
  Sparkle
} from 'lucide-react';

export const ThematicExplorer: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('anxiety-fear');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const { setSelectedSurahNumber, setViewMode } = useQuran();

  const activeCategory = THEME_CATEGORIES.find(c => c.id === selectedThemeId) || THEME_CATEGORIES[0];
  const filteredAyahs = THEMATIC_AYAHS.filter(a => a.themeId === selectedThemeId);

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
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      {/* Hero Header */}
      <div className="mb-6 text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Life & Tadabbur Navigator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          How is your heart feeling today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Explore curated divine verses mapped to human emotions, trials, and daily mental resilience.
        </p>
      </div>

      {/* Modern Theme Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {THEME_CATEGORIES.map(category => {
          const isSelected = category.id === selectedThemeId;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedThemeId(category.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <span>{category.nameEn}</span>
              <span className="font-arabic text-[11px] opacity-80">({category.nameAr})</span>
            </button>
          );
        })}
      </div>

      {/* Active Theme Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-slate-100 dark:from-indigo-950/40 dark:to-slate-900/60 border border-indigo-200/60 dark:border-indigo-900/50 mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-indigo-950 dark:text-indigo-200">
            {activeCategory.nameEn} — <span className="font-arabic font-bold">{activeCategory.nameAr}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {activeCategory.descriptionEn}
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0 ml-4">
          {filteredAyahs.length} Verses
        </span>
      </div>

      {/* Ayahs Display */}
      <div className="space-y-4">
        {filteredAyahs.map(ayah => {
          const isAudioPlaying = playingAudioId === ayah.id;

          return (
            <div
              key={ayah.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 transition hover:border-indigo-300 dark:hover:border-indigo-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold">
                    {ayah.surahNameEn} {ayah.surahNumber}:{ayah.ayahNumber}
                  </span>
                  <span className="font-arabic text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    سُورَة {ayah.surahNameAr}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Listen */}
                  <button
                    onClick={() => handlePlayAudio(ayah)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      isAudioPlaying
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>{isAudioPlaying ? 'Playing...' : 'Audio'}</span>
                  </button>

                  {/* Read in Mushaf */}
                  <button
                    onClick={() => handleJumpToMushaf(ayah.surahNumber)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition"
                  >
                    <BookOpenText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open in Mushaf</span>
                  </button>
                </div>
              </div>

              {/* Arabic Verse */}
              <div
                dir="rtl"
                className="font-quran text-right text-slate-900 dark:text-slate-100 text-xl sm:text-2xl leading-loose"
              >
                {ayah.arabicText}
                <span className="ayah-num-tag">{ayah.ayahNumber}</span>
              </div>

              {/* Translations */}
              <div className="space-y-1.5 pt-1">
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                  {ayah.englishTranslation}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs italic">
                  {ayah.frenchTranslation}
                </p>
              </div>

              {/* Tafsir Summary & Tadabbur Contemplation */}
              <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                    Tafsir Insight:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {ayah.tafsirSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Tadabbur Contemplation (تأمل):
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
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
