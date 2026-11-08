import React, { useState } from 'react';
import { useQuran, RecallMode } from '../context/QuranContext';
import confetti from 'canvas-confetti';
import {
  Eye,
  EyeOff,
  Sparkles,
  Trophy,
  RotateCcw,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Brain,
  Layers,
  ArrowRight
} from 'lucide-react';

export const HifzStudio: React.FC = () => {
  const {
    surahDetail,
    isLoadingSurah,
    recallMode,
    setRecallMode,
    masteredAyahs,
    setAyahMastery,
    revealedAyahsInMasked,
    toggleRevealMaskedAyah,
    resetMaskedReveals,
    playAyah,
    activePlayingAyah,
    isPlaying,
    arabicFontSize
  } = useQuran();

  const [activeTab, setActiveTab] = useState<'memorize' | 'test'>('memorize');

  if (isLoadingSurah || !surahDetail) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-stone-400">
        <p>Loading Surah for Memorization...</p>
      </div>
    );
  }

  // Calculate mastery statistics
  const total = surahDetail.numberOfAyahs;
  let masteredCount = 0;
  let learningCount = 0;

  for (let i = 1; i <= total; i++) {
    const status = masteredAyahs[`${surahDetail.number}:${i}`];
    if (status === 'mastered') masteredCount++;
    else if (status === 'learning') learningCount++;
  }

  const percent = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

  const handleMarkMastered = (ayahNum: number) => {
    const isCurrently = masteredAyahs[`${surahDetail.number}:${ayahNum}`] === 'mastered';
    setAyahMastery(surahDetail.number, ayahNum, isCurrently ? 'new' : 'mastered');

    // If this completed the surah, fire confetti!
    if (!isCurrently && masteredCount + 1 === total) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRevealAll = () => {
    surahDetail.ayahs.forEach(a => {
      if (!revealedAyahsInMasked.has(a.numberInSurah)) {
        toggleRevealMaskedAyah(a.numberInSurah);
      }
    });
  };

  // Helper to format text based on recall mode
  const renderRecallText = (text: string, ayahNum: number) => {
    const isRevealed = revealedAyahsInMasked.has(ayahNum);

    if (recallMode === 'normal') {
      return text;
    }

    if (recallMode === 'masked') {
      if (isRevealed) {
        return (
          <span className="text-emerald-950 dark:text-emerald-200 transition-all duration-300">
            {text}
          </span>
        );
      }
      return (
        <span className="inline-block select-none filter blur-md opacity-40 hover:opacity-60 transition cursor-pointer">
          {text}
        </span>
      );
    }

    if (recallMode === 'first-words') {
      if (isRevealed) {
        return (
          <span className="text-emerald-950 dark:text-emerald-200 transition-all duration-300">
            {text}
          </span>
        );
      }
      const words = text.split(' ');
      const promptCount = Math.min(2, words.length);
      const promptWords = words.slice(0, promptCount).join(' ');
      const hiddenPart = words.slice(promptCount).join(' ');

      return (
        <span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
            {promptWords}
          </span>{' '}
          <span className="filter blur-md opacity-40 select-none">{hiddenPart}</span>
        </span>
      );
    }

    if (recallMode === 'blanks') {
      if (isRevealed) {
        return <span>{text}</span>;
      }
      const words = text.split(' ');
      return (
        <span>
          {words.map((w, idx) => {
            if (idx % 2 === 1) {
              return (
                <span
                  key={idx}
                  className="inline-block border-b-2 border-emerald-500/60 min-w-[3rem] mx-1 text-center font-mono text-emerald-600 dark:text-emerald-400 select-none"
                >
                  [ ? ]
                </span>
              );
            }
            return <span key={idx}> {w} </span>;
          })}
        </span>
      );
    }

    return text;
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full">
      {/* Top Banner / Studio Dashboard */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-300 text-xs font-semibold">
              <Brain className="w-3.5 h-3.5" />
              <span>Interactive Memorization Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Hifz Companion: {surahDetail.englishName}{' '}
              <span className="font-arabic text-amber-200">({surahDetail.name})</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Inspired by Muhaffidh & Tarteel. Train your memory using cognitive recall cues,
              progressive masking, and spaced repetition.
            </p>
          </div>

          {/* Mastery Circular / Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center min-w-[160px] border border-white/10">
            <div className="text-3xl font-extrabold text-amber-300 font-mono">{percent}%</div>
            <div className="text-xs text-stone-300 mt-0.5">
              {masteredCount} of {total} Mastered
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recall Mode Selector Tabs */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-stone-300 font-medium mr-1 hidden sm:inline">Recall Mode:</span>
            <button
              onClick={() => {
                setRecallMode('normal');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                recallMode === 'normal'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              Full Text
            </button>
            <button
              onClick={() => {
                setRecallMode('first-words');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                recallMode === 'first-words'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              First Words Prompt
            </button>
            <button
              onClick={() => {
                setRecallMode('masked');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                recallMode === 'masked'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              Tap to Reveal
            </button>
            <button
              onClick={() => {
                setRecallMode('blanks');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                recallMode === 'blanks'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-white/10 text-stone-200 hover:bg-white/20'
              }`}
            >
              Fill Blanks
            </button>
          </div>

          {recallMode !== 'normal' && (
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={handleRevealAll}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-stone-200 transition"
              >
                Reveal All
              </button>
              <button
                onClick={resetMaskedReveals}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-stone-200 transition"
              >
                Hide All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Guide Note */}
      {recallMode !== 'normal' && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-200">
          <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p>
            {recallMode === 'first-words' &&
              'Look at the highlighted starting word(s), then recite the rest from memory. Click the verse card anytime to reveal and check yourself.'}
            {recallMode === 'masked' &&
              'The verses are masked. Try reciting Ayah by Ayah. Click on any Ayah card to unmask and verify your memorization.'}
            {recallMode === 'blanks' &&
              'Every second word is masked as [ ? ]. Recall the missing words as you read through.'}
          </p>
        </div>
      )}

      {/* Ayahs Memorization Cards */}
      <div className="space-y-4">
        {surahDetail.ayahs.map(ayah => {
          const isMastered =
            masteredAyahs[`${surahDetail.number}:${ayah.numberInSurah}`] === 'mastered';
          const isCurrentPlaying =
            activePlayingAyah === ayah.numberInSurah && isPlaying;
          const isRevealed = revealedAyahsInMasked.has(ayah.numberInSurah);

          return (
            <div
              key={ayah.numberInSurah}
              onClick={() => {
                if (recallMode !== 'normal') {
                  toggleRevealMaskedAyah(ayah.numberInSurah);
                }
              }}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                isMastered
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-400 dark:hover:border-emerald-600'
              } ${isCurrentPlaying ? 'ring-2 ring-emerald-500 shadow-md' : ''}`}
            >
              {/* Card Top Row */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-mono font-semibold">
                    {ayah.numberInSurah}
                  </span>
                  {recallMode !== 'normal' && (
                    <span className="text-[11px] text-stone-400">
                      {isRevealed ? '(Revealed - click to hide)' : '(Masked - click to reveal)'}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                  {/* Play audio */}
                  <button
                    onClick={() => playAyah(surahDetail.number, ayah.numberInSurah)}
                    className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-600 transition"
                    title="Listen & Echo"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Mark as Mastered Button */}
                  <button
                    onClick={() => handleMarkMastered(ayah.numberInSurah)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      isMastered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-emerald-100 dark:hover:bg-emerald-950 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                  </button>
                </div>
              </div>

              {/* Arabic Verse Body */}
              <div
                dir="rtl"
                className="font-quran text-right pt-4 text-stone-900 dark:text-stone-100 leading-loose transition-all duration-300"
                style={{ fontSize: `${arabicFontSize}px` }}
              >
                {renderRecallText(ayah.text, ayah.numberInSurah)}
                <span className="ayah-end-symbol">
                  <span className="text-amber-600 dark:text-amber-400 font-bold font-arabic">
                    ﴿{ayah.numberInSurah}﴾
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
