import React, { useState } from 'react';
import { TAFSIR_PASSAGES } from '../data/tafsirPassages';
import { TafsirPassage } from '../types/quran';
import { useQuran } from '../context/QuranContext';
import {
  BookOpenText,
  Radio,
  ScrollText,
  Sparkle,
  Library,
  GraduationCap,
  ListChecks,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const TafsirStudio: React.FC = () => {
  const [selectedPassageId, setSelectedPassageId] = useState<string>(TAFSIR_PASSAGES[0].id);
  const [activeTab, setActiveTab] = useState<'asbab' | 'saadi' | 'ibnkathir' | 'lessons'>('asbab');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const { setSelectedSurahNumber, setViewMode } = useQuran();

  const passage = TAFSIR_PASSAGES.find(p => p.id === selectedPassageId) || TAFSIR_PASSAGES[0];

  const handlePlayAudio = () => {
    if (audioObj) {
      audioObj.pause();
    }
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    const audio = new Audio(passage.audioUrl);
    setAudioObj(audio);
    setIsPlayingAudio(true);
    audio.play().catch(console.error);

    audio.onended = () => {
      setIsPlayingAudio(false);
    };
  };

  const handleJumpToMushaf = () => {
    setSelectedSurahNumber(passage.surahNumber);
    setViewMode('mushaf');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      {/* Hero Header */}
      <div className="mb-6 text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
          <ScrollText className="w-3.5 h-3.5" />
          <span>Scholars Commentary & Context</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Audio Tafsir & Revelation Context
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Explore classical Quranic commentaries (Tafsir As-Sa'di & Ibn Kathir) alongside the historical occasions of revelation (أسباب النزول).
        </p>
      </div>

      {/* Passage Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {TAFSIR_PASSAGES.map(p => {
          const isSelected = p.id === selectedPassageId;
          return (
            <button
              key={p.id}
              onClick={() => {
                if (audioObj) audioObj.pause();
                setIsPlayingAudio(false);
                setSelectedPassageId(p.id);
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <span>{p.titleEn.split('(')[0].trim()}</span>
              <span className="font-arabic text-[11px] opacity-80">({p.surahNameAr})</span>
            </button>
          );
        })}
      </div>

      {/* Main Study Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
        {/* Card Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <span>{passage.surahNameEn} {passage.surahNumber}</span>
              <span>•</span>
              <span>{passage.ayahRange}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <span>{passage.titleEn}</span>
            </h2>
            <div className="font-arabic text-amber-400 text-sm font-bold mt-0.5">
              {passage.titleAr}
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Play Audio Recitation */}
            <button
              onClick={handlePlayAudio}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Pause Audio' : 'Listen Verse'}</span>
            </button>

            {/* Read in Mushaf */}
            <button
              onClick={handleJumpToMushaf}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            >
              <BookOpenText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in Mushaf</span>
            </button>
          </div>
        </div>

        {/* Sacred Arabic Text */}
        <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
          <div
            dir="rtl"
            className="font-quran text-right text-slate-900 dark:text-slate-100 text-xl sm:text-2xl leading-loose font-medium"
          >
            {passage.arabicText}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm">
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {passage.englishTranslation}
            </p>
            <p className="text-slate-500 dark:text-slate-400 italic">
              {passage.frenchTranslation}
            </p>
          </div>
        </div>

        {/* Tafsir & Asbab Tabs */}
        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('asbab')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'asbab'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Occasion of Revelation (أسباب النزول)</span>
            </button>

            <button
              onClick={() => setActiveTab('saadi')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'saadi'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              <span>Tafsir As-Sa'di (السعدي)</span>
            </button>

            <button
              onClick={() => setActiveTab('ibnkathir')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'ibnkathir'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Tafsir Ibn Kathir (ابن كثير)</span>
            </button>

            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'lessons'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>Moral Lessons & Takeaways</span>
            </button>
          </div>

          {/* Tab 1: Asbab an-Nuzul */}
          {activeTab === 'asbab' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60">
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Historical Background & Companion Narrations (بالعربية):
                </span>
                <p dir="rtl" className="font-arabic text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-loose">
                  {passage.asbabAnNuzulAr}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  English Contextual Translation:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {passage.asbabAnNuzulEn}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Tafsir As-Sa'di */}
          {activeTab === 'saadi' && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Sparkle className="w-3.5 h-3.5 fill-current" />
                <span>تيسير الكريم الرحمن في تفسير كلام المنان — الشيخ عبد الرحمن السعدي</span>
              </div>
              <p dir="rtl" className="font-arabic text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-loose pt-2">
                {passage.tafsirSaadi}
              </p>
            </div>
          )}

          {/* Tab 3: Tafsir Ibn Kathir */}
          {activeTab === 'ibnkathir' && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Sparkle className="w-3.5 h-3.5 fill-current" />
                <span>تفسير القرآن العظيم — الحافظ عماد الدين إسماعيل بن كثير</span>
              </div>
              <p dir="rtl" className="font-arabic text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-loose pt-2">
                {passage.tafsirIbnKathir}
              </p>
            </div>
          )}

          {/* Tab 4: Moral Lessons */}
          {activeTab === 'lessons' && (
            <div className="space-y-3 animate-fadeIn">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Key Spiritual & Academic Takeaways:
              </span>
              {passage.keyLessons.map((lesson, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-start space-x-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {lesson}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
