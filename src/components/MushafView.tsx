import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import {
  Volume2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Share2
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
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
        <div className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold tracking-wider uppercase">Loading Chapter...</p>
      </div>
    );
  }

  if (!surahDetail) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400">
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
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      {/* Modern Surah Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 mb-6 shadow-xl border border-indigo-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/20">
              <span>Chapter {surahDetail.number}</span>
              <span>•</span>
              <span>{surahDetail.revelationType}</span>
              <span>•</span>
              <span>{surahDetail.numberOfAyahs} Verses</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {surahDetail.englishName}
              <span className="font-arabic text-amber-400 ml-3 text-3xl font-bold">
                {surahDetail.name}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              {surahDetail.englishNameTranslation}
            </p>
          </div>

          {/* Translation Switcher Segment */}
          <div className="flex flex-wrap gap-1 bg-black/30 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 self-start md:self-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTranslation('en')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTranslation === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTranslation('fr')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTranslation === 'fr'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Français
            </button>
            <button
              onClick={() => setActiveTranslation('tafsir')}
              className={`px-3 py-1.5 rounded-xl transition font-arabic ${
                activeTranslation === 'tafsir'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              التفسير الميسر
            </button>
            <button
              onClick={() => setActiveTranslation('none')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTranslation === 'none'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Arabic Only
            </button>
          </div>
        </div>
      </div>

      {/* Bismillah Header */}
      {showBismillah && (
        <div className="my-6 text-center">
          <div className="inline-block px-6 py-2 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 font-arabic text-xl sm:text-2xl text-indigo-700 dark:text-indigo-400 font-bold border border-slate-200/80 dark:border-slate-800">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>
      )}

      {/* Ayahs Cards */}
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
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                isCurrentPlaying
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-xs font-mono font-bold">
                    {ayah.numberInSurah}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Juz {ayah.juz} • Page {ayah.page}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Listen Audio */}
                  <button
                    onClick={() => playAyah(surahDetail.number, ayah.numberInSurah)}
                    className={`p-1.5 rounded-lg transition ${
                      isCurrentPlaying
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600'
                    }`}
                    title="Play Ayah"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => toggleBookmark(ayah)}
                    className={`p-1.5 rounded-lg transition ${
                      bookmarked
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500'
                    }`}
                    title={bookmarked ? 'Saved' : 'Bookmark'}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Copy */}
                  <button
                    onClick={() => handleCopy(ayah.text, ayah.numberInSurah)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
                    title="Copy Verse"
                  >
                    {copiedAyah === ayah.numberInSurah ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Memorization status */}
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
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                        : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                    }`}
                    title={mastery === 'mastered' ? 'Memorized' : 'Mark as Memorized'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Verse */}
              <div
                dir="rtl"
                className="font-quran text-right pt-4 text-slate-900 dark:text-slate-100 leading-loose"
                style={{ fontSize: `${arabicFontSize}px` }}
              >
                {ayah.text}
                <span className="ayah-num-tag">{ayah.numberInSurah}</span>
              </div>

              {/* Translations */}
              {activeTranslation !== 'none' && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {activeTranslation === 'en' && ayah.translation && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
                      {ayah.translation}
                    </p>
                  )}

                  {activeTranslation === 'fr' && ayah.frenchTranslation && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans italic">
                      {ayah.frenchTranslation}
                    </p>
                  )}

                  {activeTranslation === 'tafsir' && ayah.tafsir && (
                    <div dir="rtl" className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                      <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-1 font-arabic">
                        التفسير الميسر:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-arabic">
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

      {/* Footer Navigation */}
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          disabled={selectedSurahNumber <= 1}
          onClick={() => setSelectedSurahNumber(selectedSurahNumber - 1)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-mono text-slate-400 font-semibold">
          {selectedSurahNumber} / 114
        </span>

        <button
          disabled={selectedSurahNumber >= 114}
          onClick={() => setSelectedSurahNumber(selectedSurahNumber + 1)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-bold"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
