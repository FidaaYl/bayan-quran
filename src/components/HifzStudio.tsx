import React from 'react';
import { useQuran } from '../context/QuranContext';
import confetti from 'canvas-confetti';
import {
  BrainCircuit,
  Volume2,
  CheckCircle2,
  Sparkle,
  HelpCircle,
  Eye,
  EyeOff
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

  if (isLoadingSurah || !surahDetail) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400">
        <p className="text-xs uppercase font-semibold">Loading Memorization Deck...</p>
      </div>
    );
  }

  const total = surahDetail.numberOfAyahs;
  let masteredCount = 0;
  for (let i = 1; i <= total; i++) {
    if (masteredAyahs[`${surahDetail.number}:${i}`] === 'mastered') {
      masteredCount++;
    }
  }

  const percent = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

  const handleMarkMastered = (ayahNum: number) => {
    const isCurrently = masteredAyahs[`${surahDetail.number}:${ayahNum}`] === 'mastered';
    setAyahMastery(surahDetail.number, ayahNum, isCurrently ? 'new' : 'mastered');

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

  const renderRecallText = (text: string, ayahNum: number) => {
    const isRevealed = revealedAyahsInMasked.has(ayahNum);

    if (recallMode === 'normal') {
      return text;
    }

    if (recallMode === 'masked') {
      if (isRevealed) {
        return (
          <span className="text-indigo-900 dark:text-indigo-200 transition-all duration-200">
            {text}
          </span>
        );
      }
      return (
        <span className="inline-block select-none filter blur-md opacity-30 hover:opacity-50 transition cursor-pointer">
          {text}
        </span>
      );
    }

    if (recallMode === 'first-words') {
      if (isRevealed) {
        return (
          <span className="text-indigo-900 dark:text-indigo-200 transition-all duration-200">
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
          <span className="font-extrabold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {promptWords}
          </span>{' '}
          <span className="filter blur-md opacity-30 select-none">{hiddenPart}</span>
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
                  className="inline-block border-b-2 border-indigo-500 min-w-[2.5rem] mx-1 text-center font-mono text-indigo-600 dark:text-indigo-400 text-sm select-none"
                >
                  [...]
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
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      {/* Studio Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 mb-6 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/20">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Cognitive Recall Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {surahDetail.englishName}
              <span className="font-arabic text-amber-400 ml-2 font-bold">
                ({surahDetail.name})
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Train your memory with progressive masking, prompt cues, and spaced repetition.
            </p>
          </div>

          {/* Progress Widget */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center min-w-[150px] border border-white/10">
            <div className="text-2xl font-black text-amber-400 font-mono">{percent}%</div>
            <div className="text-[11px] text-slate-300 mt-0.5 font-medium">
              {masteredCount} / {total} Mastered
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recall Mode Buttons */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 text-xs">
            <button
              onClick={() => {
                setRecallMode('normal');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                recallMode === 'normal'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              Full Text
            </button>
            <button
              onClick={() => {
                setRecallMode('first-words');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                recallMode === 'first-words'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              First Word Cues
            </button>
            <button
              onClick={() => {
                setRecallMode('masked');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                recallMode === 'masked'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              Tap to Unmask
            </button>
            <button
              onClick={() => {
                setRecallMode('blanks');
                resetMaskedReveals();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                recallMode === 'blanks'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              Cloze Blanks
            </button>
          </div>

          {recallMode !== 'normal' && (
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={handleRevealAll}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition font-medium"
              >
                Reveal All
              </button>
              <button
                onClick={resetMaskedReveals}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition font-medium"
              >
                Mask All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Guide Note */}
      {recallMode !== 'normal' && (
        <div className="mb-4 p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start space-x-2.5 text-xs text-indigo-900 dark:text-indigo-200">
          <HelpCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
          <p>
            {recallMode === 'first-words' &&
              'Look at the highlighted starting words, then recite the remainder aloud. Tap any verse to verify your recall.'}
            {recallMode === 'masked' &&
              'The sacred verses are masked. Recite the verse from memory, then tap the card to verify your pronunciation.'}
            {recallMode === 'blanks' &&
              'Key words are concealed with [...]. Actively fill the missing words from memory as you read.'}
          </p>
        </div>
      )}

      {/* Verses Cards */}
      <div className="space-y-3.5">
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
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isMastered
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/50'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600'
              } ${isCurrentPlaying ? 'ring-2 ring-indigo-500 shadow-md' : ''}`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-mono font-bold">
                    {ayah.numberInSurah}
                  </span>
                  {recallMode !== 'normal' && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      {isRevealed ? '(Revealed)' : '(Masked - Tap)'}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => playAyah(surahDetail.number, ayah.numberInSurah)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition"
                    title="Audio Recitation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMarkMastered(ayah.numberInSurah)}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition ${
                      isMastered
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-950/60 hover:text-amber-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Mastered' : 'Mark'}</span>
                  </button>
                </div>
              </div>

              {/* Arabic Verse Body */}
              <div
                dir="rtl"
                className="font-quran text-right pt-4 text-slate-900 dark:text-slate-100 leading-loose"
                style={{ fontSize: `${arabicFontSize}px` }}
              >
                {renderRecallText(ayah.text, ayah.numberInSurah)}
                <span className="ayah-num-tag">{ayah.numberInSurah}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
