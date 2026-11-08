import React, { useState } from 'react';
import { useQuran, TranslationLanguage } from '../context/QuranContext';
import {
  Play,
  Pause,
  Bookmark,
  Share2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  Copy,
  Check
} from 'lucide-react';

export const MushafView: React.FC = () => {
  const {
    surahDetail,
    isLoadingSurah,
    selectedSurahNumber,
    setSelectedSurahNumber,
    activeTranslation,
    setActiveTranslation,
    arabicFontSize,
    playAyah,
    activePlayingAyah,
    isPlaying,
    toggleBookmark,
    isBookmarked,
    masteredAyahs,
    setAyahMastery
  } = useQuran();

  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  if (isLoadingSurah) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-400">
        <div className="w-12 h-12 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Loading Sacred Verses...</p>
      </div>
    );
  }

  if (!surahDetail) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-stone-400">
        <p>Surah not found.</p>
      </div>
    );
  }

  const handleCopy = (text: string, num: number) => {
    navigator.clipboard.writeText(text);
    setCopiedAyah(num);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const showBismillah = surahDetail.number !== 1 && surahDetail.number !== 9;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full">
      {/* Surah Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 mb-8 shadow-xl text-center">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-700/50 backdrop-blur-sm text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <span>Surah {surahDetail.number}</span>
            <span>•</span>
            <span>{surahDetail.revelationType}</span>
            <span>•</span>
            <span>{surahDetail.numberOfAyahs} Ayahs</span>
          </div>

          <h1 className="font-arabic text-3xl sm:text-5xl font-bold tracking-wide text-amber-200 drop-shadow-sm">
            {surahDetail.name}
          </h1>

          <div className="text-lg font-medium text-emerald-100">
            {surahDetail.englishName}
            <span className="text-sm font-normal text-emerald-300 ml-2">
              ({surahDetail.englishNameTranslation})
            </span>
          </div>

          {/* Translation Switcher Pills */}
          <div className="pt-3 flex flex-wrap justify-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTranslation('en')}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                activeTranslation === 'en'
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTranslation('fr')}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                activeTranslation === 'fr'
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              Français
            </button>
            <button
              onClick={() => setActiveTranslation('tafsir')}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                activeTranslation === 'tafsir'
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              التفسير الميسر
            </button>
            <button
              onClick={() => setActiveTranslation('none')}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                activeTranslation === 'none'
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              Arabic Only
            </button>
          </div>
        </div>
      </div>

      {/* Bismillah Header (except Surah 9) */}
      {showBismillah && (
        <div className="my-8 text-center">
          <div className="inline-block p-4 font-arabic text-2xl sm:text-3xl text-emerald-800 dark:text-emerald-400 border-b border-amber-500/20">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>
      )}

      {/* Ayahs Stream */}
      <div className="space-y-4">
        {surahDetail.ayahs.map(ayah => {
          const isCurrentPlaying =
            activePlayingAyah === ayah.numberInSurah && isPlaying;
          const bookmarked = isBookmarked(surahDetail.number, ayah.numberInSurah);
          const mastery = masteredAyahs[`${surahDetail.number}:${ayah.numberInSurah}`];

          return (
            <div
              key={ayah.numberInSurah}
              id={`ayah-${ayah.numberInSurah}`}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                isCurrentPlaying
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              {/* Top Row: Ayah Number Badge & Action Buttons */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-mono font-semibold">
                    {ayah.numberInSurah}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    Juz {ayah.juz} • Page {ayah.page}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Play Ayah Audio */}
                  <button
                    onClick={() => playAyah(surahDetail.number, ayah.numberInSurah)}
                    className={`p-1.5 rounded-lg transition ${
                      isCurrentPlaying
                        ? 'bg-emerald-600 text-white'
                        : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-600'
                    }`}
                    title="Play Recitation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Bookmark Toggle */}
                  <button
                    onClick={() => toggleBookmark(ayah)}
                    className={`p-1.5 rounded-lg transition ${
                      bookmarked
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                        : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-500'
                    }`}
                    title={bookmarked ? 'Remove Bookmark' : 'Bookmark Ayah'}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Copy Ayah */}
                  <button
                    onClick={() => handleCopy(ayah.text, ayah.numberInSurah)}
                    className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-200 transition"
                    title="Copy Verse"
                  >
                    {copiedAyah === ayah.numberInSurah ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Mastery Quick Mark */}
                  <button
                    onClick={() =>
                      setAyahMastery(
                        surahDetail.number,
                        ayah.numberInSurah,
                        mastery === 'mastered' ? 'new' : 'mastered'
                      )
                    }
                    className={`p-1.5 rounded-lg transition ${
                      mastery === 'mastered'
                        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                        : 'text-stone-300 dark:text-stone-600 hover:text-emerald-600'
                    }`}
                    title={mastery === 'mastered' ? 'Marked as Memorized' : 'Mark as Memorized'}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${mastery === 'mastered' ? 'fill-emerald-100 dark:fill-emerald-950' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Arabic Verse Text */}
              <div
                dir="rtl"
                className="font-quran text-right pt-4 text-stone-900 dark:text-stone-100 leading-loose"
                style={{ fontSize: `${arabicFontSize}px` }}
              >
                {ayah.text}
                <span className="ayah-end-symbol">
                  <span className="text-amber-600 dark:text-amber-400 font-bold font-arabic">
                    ﴿{ayah.numberInSurah}﴾
                  </span>
                </span>
              </div>

              {/* Translations / Tafsir */}
              {activeTranslation !== 'none' && (
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                  {activeTranslation === 'en' && ayah.translation && (
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                      {ayah.translation}
                    </p>
                  )}

                  {activeTranslation === 'fr' && ayah.frenchTranslation && (
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-sans italic">
                      {ayah.frenchTranslation}
                    </p>
                  )}

                  {activeTranslation === 'tafsir' && ayah.tafsir && (
                    <div dir="rtl" className="bg-amber-50/50 dark:bg-stone-800/50 p-3.5 rounded-xl border border-amber-200/50 dark:border-stone-700">
                      <div className="text-xs font-bold text-amber-900 dark:text-amber-400 mb-1">
                        التفسير الميسر:
                      </div>
                      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-arabic">
                        {ayah.tafsir}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Surah Navigation Footer */}
      <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <button
          disabled={selectedSurahNumber <= 1}
          onClick={() => setSelectedSurahNumber(selectedSurahNumber - 1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Surah</span>
        </button>

        <span className="text-xs font-mono text-stone-400">
          Surah {selectedSurahNumber} of 114
        </span>

        <button
          disabled={selectedSurahNumber >= 114}
          onClick={() => setSelectedSurahNumber(selectedSurahNumber + 1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm font-semibold"
        >
          <span>Next Surah</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
